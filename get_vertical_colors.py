from PIL import Image
import os
import json

def get_color_at_position(img, x_percent, y_percent):
    """Get color at a specific position (as percentage of image size)"""
    width, height = img.size
    x = int(width * x_percent)
    y = int(height * y_percent)
    pixel = img.getpixel((x, y))
    return '#{:02x}{:02x}{:02x}'.format(*pixel[:3])

# Generate gradient map for all 120 frames
gradient_map = []
base_path = r"c:\Users\tanay\OneDrive\Desktop\football_visualisation\meow-website\public\images\ezgif-frame-{:03d}.webp"

print("Generating vertical gradient color map...")
for i in range(1, 121):
    path = base_path.format(i)
    if os.path.exists(path):
        try:
            img = Image.open(path)
            
            # Sample at left edge: top (10%), middle (50%), bottom (90%)
            top_color = get_color_at_position(img, 0.05, 0.10)
            mid_color = get_color_at_position(img, 0.05, 0.50)
            bottom_color = get_color_at_position(img, 0.05, 0.90)
            
            gradient_map.append({
                "top": top_color,
                "middle": mid_color,
                "bottom": bottom_color
            })
            
            if i % 10 == 0:
                print(f"Processed frame {i}/120")
        except Exception as e:
            print(f"Error on frame {i}: {e}")
            # Use previous or default
            if gradient_map:
                gradient_map.append(gradient_map[-1])
            else:
                gradient_map.append({"top": "#aea086", "middle": "#aea086", "bottom": "#aea086"})
    else:
        print(f"Frame {i} not found")
        if gradient_map:
            gradient_map.append(gradient_map[-1])
        else:
            gradient_map.append({"top": "#aea086", "middle": "#aea086", "bottom": "#aea086"})

# Save to public/gradient-colors.json
output_path = r"c:\Users\tanay\OneDrive\Desktop\football_visualisation\meow-website\public\gradient-colors.json"
with open(output_path, "w") as f:
    json.dump(gradient_map, f, indent=2)
    
print(f"\nComplete! Saved gradient map to {output_path}")
print(f"Sample gradient for frame 1: {gradient_map[0]}")
