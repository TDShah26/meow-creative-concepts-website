"""
Background Removal Script for all 120 frames
Uses rembg library to remove backgrounds from images
"""
from rembg import remove
from PIL import Image
import os

# Paths
input_dir = r"c:\Users\tanay\OneDrive\Desktop\football_visualisation\meow-website\public\images"
output_dir = r"c:\Users\tanay\OneDrive\Desktop\football_visualisation\meow-website\public\images-nobg"

# Create output directory
os.makedirs(output_dir, exist_ok=True)

print("Starting background removal for 120 frames...")
print("This may take several minutes...\n")

for i in range(1, 121):
    frame_name = f"ezgif-frame-{i:03d}.webp"
    input_path = os.path.join(input_dir, frame_name)
    output_path = os.path.join(output_dir, frame_name)
    
    if os.path.exists(input_path):
        try:
            # Open image
            input_img = Image.open(input_path)
            
            # Remove background
            output_img = remove(input_img)
            
            # Save as WebP with transparency
            output_img.save(output_path, 'WEBP', lossless=False, quality=85)
            
            print(f"✓ Processed {i}/120: {frame_name}")
        except Exception as e:
            print(f"✗ Error processing {frame_name}: {e}")
    else:
        print(f"✗ File not found: {frame_name}")

print(f"\n✓ Complete! Processed images saved to: {output_dir}")
print("\nNext steps:")
print("1. Update GiftScroll.tsx to use '/images-nobg/' path")
print("2. Enable alpha channel in canvas context")
