from PIL import Image
import os

def get_bg_color(image_path):
    try:
        img = Image.open(image_path)
        # Get top-left pixel color
        pixel = img.getpixel((0, 0))
        # Convert to hex
        hex_color = '#{:02x}{:02x}{:02x}'.format(*pixel[:3])
        print(f"Background Color: {hex_color}")
    except Exception as e:
        print(f"Error: {e}")

import json

# Generate map for all 120 frames
color_map = []
base_path = r"c:\Users\tanay\OneDrive\Desktop\football_visualisation\meow-website\public\images\ezgif-frame-{:03d}.webp"

print("Generating full color map...")
for i in range(1, 121):
    path = base_path.format(i)
    if os.path.exists(path):
        try:
            img = Image.open(path)
            pixel = img.getpixel((0, 0))
            hex_color = '#{:02x}{:02x}{:02x}'.format(*pixel[:3])
            color_map.append(hex_color)
        except:
            # Fallback to previous or default
            color_map.append(color_map[-1] if color_map else "#aea086")
    else:
         color_map.append(color_map[-1] if color_map else "#aea086")

# Save to public/colors.json
output_path = r"c:\Users\tanay\OneDrive\Desktop\football_visualisation\meow-website\public\colors.json"
with open(output_path, "w") as f:
    json.dump(color_map, f)
    
print(f"Saved {len(color_map)} colors to {output_path}")
