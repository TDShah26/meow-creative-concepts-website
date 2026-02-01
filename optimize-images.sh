#!/bin/bash
# WebP Image Optimization Script
# Re-compresses images with optimal settings for web delivery

echo "=== WebP Image Optimization ==="
echo ""

# Setup paths
SOURCE_DIR="public/images-high-quality-black-bg"
TARGET_DIR="public/images-optimized"

# Create output directory if it doesn't exist
if [ ! -d "$TARGET_DIR" ]; then
    mkdir -p "$TARGET_DIR"
    echo "Created output directory: $TARGET_DIR"
else
    echo "Output directory already exists: $TARGET_DIR"
fi

# Count images
TOTAL_IMAGES=$(ls -1 "$SOURCE_DIR"/*.webp 2>/dev/null | wc -l)
CURRENT=0
TOTAL_ORIGINAL_SIZE=0
TOTAL_OPTIMIZED_SIZE=0

echo "Found $TOTAL_IMAGES images to optimize"
echo "Settings: Quality 75, Method 6, Multi-threading enabled"
echo ""

# Process each image
for INPUT_PATH in "$SOURCE_DIR"/*.webp; do
    FILENAME=$(basename "$INPUT_PATH")
    OUTPUT_PATH="$TARGET_DIR/$FILENAME"
    CURRENT=$((CURRENT + 1))
    
    # Get original file size
    ORIGINAL_SIZE=$(stat -f%z "$INPUT_PATH" 2>/dev/null || stat -c%s "$INPUT_PATH" 2>/dev/null)
    TOTAL_ORIGINAL_SIZE=$((TOTAL_ORIGINAL_SIZE + ORIGINAL_SIZE))
    
    # Show progress
    printf "[$CURRENT/$TOTAL_IMAGES] $FILENAME "
    
    # Run cwebp
    ./cwebp.exe -q 75 -m 6 -mt "$INPUT_PATH" -o "$OUTPUT_PATH" > /dev/null 2>&1
    
    if [ $? -eq 0 ]; then
        # Get optimized file size
        OPTIMIZED_SIZE=$(stat -f%z "$OUTPUT_PATH" 2>/dev/null || stat -c%s "$OUTPUT_PATH" 2>/dev/null)
        TOTAL_OPTIMIZED_SIZE=$((TOTAL_OPTIMIZED_SIZE + OPTIMIZED_SIZE))
        
        SAVINGS=$(awk "BEGIN {printf \"%.1f\", (($ORIGINAL_SIZE - $OPTIMIZED_SIZE) / $ORIGINAL_SIZE) * 100}")
        ORIGINAL_KB=$(awk "BEGIN {printf \"%.1f\", $ORIGINAL_SIZE / 1024}")
        OPTIMIZED_KB=$(awk "BEGIN {printf \"%.1f\", $OPTIMIZED_SIZE / 1024}")
        
        echo "✓ $ORIGINAL_KB KB → $OPTIMIZED_KB KB (-$SAVINGS%)"
    else
        echo "✗ FAILED"
    fi
done

# Summary
echo ""
echo "=== Optimization Complete ==="
TOTAL_SAVINGS=$(awk "BEGIN {printf \"%.1f\", (($TOTAL_ORIGINAL_SIZE - $TOTAL_OPTIMIZED_SIZE) / $TOTAL_ORIGINAL_SIZE) * 100}")
TOTAL_ORIGINAL_MB=$(awk "BEGIN {printf \"%.2f\", $TOTAL_ORIGINAL_SIZE / 1048576}")
TOTAL_OPTIMIZED_MB=$(awk "BEGIN {printf \"%.2f\", $TOTAL_OPTIMIZED_SIZE / 1048576}")
SAVED_MB=$(awk "BEGIN {printf \"%.2f\", ($TOTAL_ORIGINAL_SIZE - $TOTAL_OPTIMIZED_SIZE) / 1048576}")

echo "Original total:  $TOTAL_ORIGINAL_MB MB"
echo "Optimized total: $TOTAL_OPTIMIZED_MB MB"
echo "Saved:           $SAVED_MB MB (-$TOTAL_SAVINGS%)"
echo ""
echo "Next step: Update GiftScroll.tsx to use /images-optimized/ path"
