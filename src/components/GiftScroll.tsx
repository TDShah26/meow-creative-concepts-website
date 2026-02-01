"use client";

import { motion, AnimatePresence, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { useEffect, useRef, useState, useCallback } from "react";

export default function GiftScroll() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const contextRef = useRef<CanvasRenderingContext2D | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [loadingProgress, setLoadingProgress] = useState(0);

    // Direct Frame Tracking (No Spring = Zero Lag)
    const totalFrames = 144;
    const scrollProgress = useMotionValue(0);

    const [isLocked, setIsLocked] = useState(true);

    // Load images - Optimized Batched Loading with Progressive Updates
    useEffect(() => {
        const loadImages = async () => {
            const BATCH_SIZE = 36;
            const loadedImages: HTMLImageElement[] = new Array(totalFrames).fill(null);
            let loadedCount = 0;

            const loadImage = (index: number) => {
                return new Promise<HTMLImageElement>((resolve) => {
                    const img = new Image();
                    const frameNumber = (index + 1).toString().padStart(3, "0");
                    img.src = `/images-optimized/ezgif-frame-${frameNumber}.webp`;

                    const onFinish = () => {
                        loadedCount++;
                        setLoadingProgress(Math.round((loadedCount / totalFrames) * 100));
                        resolve(img);
                    };

                    img.decode()
                        .then(onFinish)
                        .catch(() => {
                            img.onload = onFinish;
                            img.onerror = () => {
                                console.error(`Failed to load frame ${index + 1}`);
                                onFinish();
                            };
                            if (img.complete) onFinish();
                        });
                });
            };

            for (let i = 0; i < totalFrames; i += BATCH_SIZE) {
                const batchPromises = [];
                for (let j = 0; j < BATCH_SIZE && (i + j) < totalFrames; j++) {
                    batchPromises.push(loadImage(i + j));
                }
                const batchResults = await Promise.all(batchPromises);
                batchResults.forEach((img, batchIndex) => {
                    loadedImages[i + batchIndex] = img;
                });

                // Update images state after each batch to enable progressive loading
                setImages([...loadedImages]);
            }
        };

        loadImages();
    }, []);

    // Set isLoaded to true when 25% of frames are loaded
    useEffect(() => {
        if (loadingProgress >= 25 && images.length > 0) {
            console.log(`Setting isLoaded=true at ${loadingProgress}% (${images.length} images loaded)`);
            setIsLoaded(true);
        }
    }, [loadingProgress, images]);

    // Virtual Scroll / Lock Logic
    useEffect(() => {
        if (!isLocked) return;

        document.body.style.overflow = "hidden";

        const handleWheel = (e: WheelEvent) => {
            if (!isLocked) return;

            const sensitivity = 0.375;
            const current = scrollProgress.get();
            const next = current + (e.deltaY * sensitivity);

            if (current >= totalFrames - 1 && e.deltaY > 0) {
                setIsLocked(false);
                scrollProgress.set(totalFrames - 1);
                return;
            }

            scrollProgress.set(Math.max(0, Math.min(next, totalFrames - 1)));
        };

        window.addEventListener("wheel", handleWheel, { passive: true });

        return () => {
            window.removeEventListener("wheel", handleWheel);
            document.body.style.overflow = "";
        };
    }, [isLocked, scrollProgress]);

    useEffect(() => {
        if (!isLocked) {
            document.body.style.overflow = "";
        }
    }, [isLocked]);

    // Optimized Drawing Function
    const drawFrame = useCallback((frameFloat: number) => {
        const canvas = canvasRef.current;
        if (!canvas || images.length === 0) return;

        if (!contextRef.current) {
            contextRef.current = canvas.getContext("2d", { alpha: false });
        }
        const ctx = contextRef.current;
        if (!ctx) return;

        const index = Math.floor(frameFloat);
        const img = images[index];

        if (img) {
            const paddingScale = 0.8;
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const canvasRatio = canvasWidth / canvasHeight;
            const imgRatio = img.width / img.height;

            let drawWidth, drawHeight, offsetX, offsetY;

            if (imgRatio > canvasRatio) {
                drawWidth = canvasWidth * paddingScale;
                drawHeight = drawWidth / imgRatio;
            } else {
                drawHeight = canvasHeight * paddingScale;
                drawWidth = drawHeight * imgRatio;
            }

            // Dynamic Layout Shift: Start centered, shift right as it opens
            const progress = index / totalFrames;
            const shiftFactor = Math.min(progress * 1.66, 1);
            const easeShift = 1 - Math.pow(1 - shiftFactor, 3);
            const horizontalShift = (canvasWidth * 0.15) * easeShift;

            offsetX = (canvasWidth - drawWidth) / 2 + horizontalShift;
            offsetY = (canvasHeight - drawHeight) / 2 + 50;

            ctx.fillStyle = "#000000";
            ctx.fillRect(0, 0, canvasWidth, canvasHeight);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        }
    }, [images]);

    // Use Motion Value Event for direct canvas updates
    useMotionValueEvent(scrollProgress, "change", (latest) => {
        drawFrame(latest as number);
    });

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                canvasRef.current.width = window.innerWidth;
                canvasRef.current.height = window.innerHeight;
                drawFrame(scrollProgress.get());
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [drawFrame, scrollProgress]);

    // Draw first frame when images are loaded
    useEffect(() => {
        if (images.length > 0 && canvasRef.current) {
            drawFrame(0);
        }
    }, [images, drawFrame]);

    // Transformation Values for Text
    const progressVal = useTransform(scrollProgress, [0, totalFrames - 1], [0, 1]);

    const titleOpacity = useTransform(progressVal, [0.1, 0.3], [0, 1]);
    const titleY = useTransform(progressVal, [0.1, 0.3], [20, 0]);

    const subOpacity = useTransform(progressVal, [0.45, 0.85], [0, 1]);
    const subY = useTransform(progressVal, [0.45, 0.85], [20, 0]);

    return (
        <div ref={containerRef} className="h-screen w-full relative bg-black overflow-hidden">
            <AnimatePresence>
                {!isLoaded && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
                        className="fixed inset-0 flex flex-col items-center justify-center z-50 bg-black text-white"
                    >
                        <div className="text-center space-y-4">
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xl font-light tracking-[0.2em] uppercase"
                            >
                                Good things take time
                            </motion.div>
                            <div className="text-white/30 text-xs tracking-widest">
                                CURATING EXPERIENCE &nbsp; {loadingProgress}%
                            </div>
                            <div className="w-48 h-px bg-white/10 mx-auto mt-4 overflow-hidden">
                                <motion.div
                                    className="h-full bg-white"
                                    initial={{ width: 0 }}
                                    animate={{ width: `${loadingProgress}%` }}
                                    transition={{ type: "tween", ease: "linear", duration: 0.2 }}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full"
            />

            <div className="absolute inset-0 pointer-events-none flex flex-col justify-center px-6 md:px-24 pt-32">
                <div className="max-w-4xl w-full">
                    <motion.h2
                        style={{ opacity: titleOpacity, y: titleY }}
                        className="text-white/40 font-medium tracking-widest uppercase mb-4 text-sm md:text-base"
                    >
                        The Art of Gifting
                    </motion.h2>
                    <motion.h1
                        style={{ opacity: subOpacity, y: subY }}
                        className="text-5xl md:text-8xl font-light text-white tracking-tighter leading-none"
                    >
                        Curated.<br />
                        Customized.<br />
                        Yours.
                    </motion.h1>
                </div>
            </div>

            <AnimatePresence>
                {isLocked && isLoaded && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/20 text-xs animate-pulse"
                    >
                        Scroll slowly to reveal the magic
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

