export type Category = "All" | "Hampers" | "Shubh Labh" | "Toran" | "Diya Platter" | "Table Runner";
export type CategorySlug = "hampers" | "shubh-labh" | "toran" | "diya-platter" | "table-runner";

export interface Product {
    id: string;
    category: Category;
    title: string;
    image: string;
    thumbnail?: string; // Smaller version for grid cards (lazy-loaded)
    color?: string; // Fallback for the current design
    specs: string[];
}

export interface CategoryInfo {
    name: Exclude<Category, "All">;
    slug: CategorySlug;
    description: string;
    coverImage: string;
    coverThumbnail?: string; // Smaller version for home page gallery cards
}

export const categoryInfo: CategoryInfo[] = [
    {
        name: "Hampers",
        slug: "hampers",
        description: "Curated gift sets for every occasion",
        coverImage: "/images-optimized/hampers/hampers-hero.webp",
        coverThumbnail: "/images-optimized/hampers/thumbs/hampers-hero.webp",
    },
    {
        name: "Shubh Labh",
        slug: "shubh-labh",
        description: "Auspicious pieces for your doorstep",
        coverImage: "/images-optimized/shubh-labh/shubh-labh-01.webp",
        coverThumbnail: "/images-optimized/shubh-labh/thumbs/shubh-labh-01.webp",
    },
    {
        name: "Toran",
        slug: "toran",
        description: "Exquisite handcrafted Torans for your entrance",
        coverImage: "/images-optimized/toran/toran-01.webp",
        coverThumbnail: "/images-optimized/toran/thumbs/toran-01.webp",
    },
    {
        name: "Diya Platter",
        slug: "diya-platter",
        description: "Elegant platters to illuminate your home",
        coverImage: "/images-optimized/diya-platter/diya-platter-hero.webp",
        coverThumbnail: "/images-optimized/diya-platter/thumbs/diya-platter-hero.webp",
    },
    {
        name: "Table Runner",
        slug: "table-runner",
        description: "Sophisticated runners to dress your table",
        coverImage: "/images-optimized/table-runner/table-runner-hero.webp",
        coverThumbnail: "/images-optimized/table-runner/thumbs/table-runner-hero.webp",
    },
];

export const products: Product[] = [
    {
        id: "trun-hero",
        category: "Table Runner",
        title: "Royal Velvet Runner",
        image: "/images-optimized/table-runner/table-runner-hero.webp",
        thumbnail: "/images-optimized/table-runner/thumbs/table-runner-hero.webp",
        color: "bg-amber-900/20",
        specs: ["Premium Velvet", "Gold Embroidery", "Elegant Drape"]
    },
    {
        id: "trun-01",
        category: "Table Runner",
        title: "Heritage Brocade Runner",
        image: "/images-optimized/table-runner/table-runner-01.webp",
        thumbnail: "/images-optimized/table-runner/thumbs/table-runner-01.webp",
        color: "bg-rose-900/20",
        specs: ["Silk Brocade", "Traditional Pattern", "Hand-finished"]
    },
    {
        id: "trun-02",
        category: "Table Runner",
        title: "Golden Jacquard Runner",
        image: "/images-optimized/table-runner/table-runner-02.webp",
        thumbnail: "/images-optimized/table-runner/thumbs/table-runner-02.webp",
        color: "bg-amber-500/20",
        specs: ["Jacquard Weave", "Metallic Thread", "Luxe Shine"]
    },
    {
        id: "trun-03",
        category: "Table Runner",
        title: "Minimalist Linen Runner",
        image: "/images-optimized/table-runner/table-runner-03.webp",
        thumbnail: "/images-optimized/table-runner/thumbs/table-runner-03.webp",
        color: "bg-stone-100/20",
        specs: ["Pure Linen", "Neutral Tones", "Modern Aesthetic"]
    },
    {
        id: "trun-04",
        category: "Table Runner",
        title: "Floral Embroidery Runner",
        image: "/images-optimized/table-runner/table-runner-04.webp",
        thumbnail: "/images-optimized/table-runner/thumbs/table-runner-04.webp",
        color: "bg-teal-900/20",
        specs: ["Hand-embroidered", "Floral Motif", "Soft Cotton"]
    },
    {
        id: "trun-06",
        category: "Table Runner",
        title: "Modern Abstract Runner",
        image: "/images-optimized/table-runner/table-runner-06.webp",
        thumbnail: "/images-optimized/table-runner/thumbs/table-runner-06.webp",
        color: "bg-blue-900/20",
        specs: ["Geometric Print", "Bold Colors", "Easy Care"]
    },
    {
        id: "trun-07",
        category: "Table Runner",
        title: "Artisan Block-print Runner",
        image: "/images-optimized/table-runner/table-runner-07.webp",
        thumbnail: "/images-optimized/table-runner/thumbs/table-runner-07.webp",
        color: "bg-indigo-900/20",
        specs: ["Block Printed", "Organic Dye", "Artisan Made"]
    },
    {
        id: "trun-08",
        category: "Table Runner",
        title: "Luxe Tassel Runner",
        image: "/images-optimized/table-runner/table-runner-08.webp",
        thumbnail: "/images-optimized/table-runner/thumbs/table-runner-08.webp",
        color: "bg-rose-950/20",
        specs: ["Silk Tassels", "Rich Texture", "Premium Weight"]
    },
    {
        id: "trun-09",
        category: "Table Runner",
        title: "Festive Shimmer Runner",
        image: "/images-optimized/table-runner/table-runner-09.webp",
        thumbnail: "/images-optimized/table-runner/thumbs/table-runner-09.webp",
        color: "bg-yellow-900/20",
        specs: ["Shimmer Thread", "Lightweight", "Festive Essential"]
    },
    {
        id: "dp-hero",
        category: "Diya Platter",
        title: "Royal Diya Platter",
        image: "/images-optimized/diya-platter/diya-platter-hero.webp",
        thumbnail: "/images-optimized/diya-platter/thumbs/diya-platter-hero.webp",
        color: "bg-amber-900/20",
        specs: ["Brass Finish", "Hand-painted", "Festive Centerpiece"]
    },
    {
        id: "dp-01",
        category: "Diya Platter",
        title: "Heritage Motif Platter",
        image: "/images-optimized/diya-platter/diya-platter-01.webp",
        thumbnail: "/images-optimized/diya-platter/thumbs/diya-platter-01.webp",
        color: "bg-rose-900/20",
        specs: ["Traditional Art", "Eco-friendly Base", "Multi-diya Holder"]
    },
    {
        id: "dp-02",
        category: "Diya Platter",
        title: "Golden Glow Tray",
        image: "/images-optimized/diya-platter/diya-platter-02.webp",
        thumbnail: "/images-optimized/diya-platter/thumbs/diya-platter-02.webp",
        color: "bg-amber-500/20",
        specs: ["Metallic Gold Finish", "Durable", "Elegant Design"]
    },
    {
        id: "dp-03",
        category: "Diya Platter",
        title: "Floral Accent Platter",
        image: "/images-optimized/diya-platter/diya-platter-03.webp",
        thumbnail: "/images-optimized/diya-platter/thumbs/diya-platter-03.webp",
        color: "bg-teal-900/20",
        specs: ["Floral Engraving", "Soft Patina", "Handcrafted"]
    },
    {
        id: "dp-04",
        category: "Diya Platter",
        title: "Classic Ceremonial Platter",
        image: "/images-optimized/diya-platter/diya-platter-04.webp",
        thumbnail: "/images-optimized/diya-platter/thumbs/diya-platter-04.webp",
        color: "bg-indigo-900/20",
        specs: ["Ceremonial Essential", "Heavy Base", "Ornate Border"]
    },
    {
        id: "dp-05",
        category: "Diya Platter",
        title: "Artisan Clay Platter",
        image: "/images-optimized/diya-platter/diya-platter-05.webp",
        thumbnail: "/images-optimized/diya-platter/thumbs/diya-platter-05.webp",
        color: "bg-orange-900/20",
        specs: ["Terracotta Style", "Rustic Finish", "Hand-painted Details"]
    },
    {
        id: "dp-06",
        category: "Diya Platter",
        title: "Vintage Patina Tray",
        image: "/images-optimized/diya-platter/diya-platter-06.webp",
        thumbnail: "/images-optimized/diya-platter/thumbs/diya-platter-06.webp",
        color: "bg-stone-900/20",
        specs: ["Aged Look", "Brass Construction", "Antique Charm"]
    },
    {
        id: "dp-07",
        category: "Diya Platter",
        title: "Modern Geometric Platter",
        image: "/images-optimized/diya-platter/diya-platter-07.webp",
        thumbnail: "/images-optimized/diya-platter/thumbs/diya-platter-07.webp",
        color: "bg-blue-900/20",
        specs: ["Minimalist Shape", "Sleek Finish", "Contemporary Vibe"]
    },
    {
        id: "dp-08",
        category: "Diya Platter",
        title: "Lotus Bloom Platter",
        image: "/images-optimized/diya-platter/diya-platter-08.webp",
        thumbnail: "/images-optimized/diya-platter/thumbs/diya-platter-08.webp",
        color: "bg-pink-900/20",
        specs: ["Lotus Petal Design", "Vibrant Colors", "Festive Favorite"]
    },
    {
        id: "dp-09",
        category: "Diya Platter",
        title: "Imperial Zari Platter",
        image: "/images-optimized/diya-platter/diya-platter-09.webp",
        thumbnail: "/images-optimized/diya-platter/thumbs/diya-platter-09.webp",
        color: "bg-purple-900/20",
        specs: ["Fabric Inlay", "Zari Embroidery", "Luxury Gifting"]
    },
    {
        id: "dp-10",
        category: "Diya Platter",
        title: "Silver Shimmer Tray",
        image: "/images-optimized/diya-platter/diya-platter-10.webp",
        thumbnail: "/images-optimized/diya-platter/thumbs/diya-platter-10.webp",
        color: "bg-slate-400/20",
        specs: ["Silver Finish", "Sparkling Accents", "Modern Classic"]
    },
    {
        id: "dp-11",
        category: "Diya Platter",
        title: "Mandala Art Platter",
        image: "/images-optimized/diya-platter/diya-platter-11.webp",
        thumbnail: "/images-optimized/diya-platter/thumbs/diya-platter-11.webp",
        color: "bg-cyan-900/20",
        specs: ["Mandala Print", "Acrylic Base", "Lightweight"]
    },
    {
        id: "dp-12",
        category: "Diya Platter",
        title: "Velvet Luxe Platter",
        image: "/images-optimized/diya-platter/diya-platter-12.webp",
        thumbnail: "/images-optimized/diya-platter/thumbs/diya-platter-12.webp",
        color: "bg-rose-950/20",
        specs: ["Velvet Lining", "Premium Feel", "Jeweled Accents"]
    },
    {
        id: "dp-13",
        category: "Diya Platter",
        title: "Radiant Festive Tray",
        image: "/images-optimized/diya-platter/diya-platter-13.webp",
        thumbnail: "/images-optimized/diya-platter/thumbs/diya-platter-13.webp",
        color: "bg-yellow-900/20",
        specs: ["High Gloss", "Vivid Colors", "Ready for Gifting"]
    },
    {
        id: "h-hero",
        category: "Hampers",
        title: "Signature Festive Hamper",
        image: "/images-optimized/hampers/hampers-hero.webp",
        thumbnail: "/images-optimized/hampers/thumbs/hampers-hero.webp",
        color: "bg-amber-900/20",
        specs: ["Premium Selection", "Hand-painted Box", "Festive Essential"]
    },
    {
        id: "h-01",
        category: "Hampers",
        title: "Marigold Celebration Box",
        image: "/images-optimized/hampers/hampers-01.webp",
        thumbnail: "/images-optimized/hampers/thumbs/hampers-01.webp",
        color: "bg-rose-900/20",
        specs: ["Eco-friendly", "Marigold Theme", "Gourmet Treats"]
    },
    {
        id: "h-02",
        category: "Hampers",
        title: "Royal Velvet Gifting Set",
        image: "/images-optimized/hampers/hampers-02.webp",
        thumbnail: "/images-optimized/hampers/thumbs/hampers-02.webp",
        color: "bg-indigo-900/20",
        specs: ["Velvet Finish", "Brass Accents", "Luxury Curation"]
    },
    {
        id: "h-03",
        category: "Hampers",
        title: "Golden Glow Hamper",
        image: "/images-optimized/hampers/hampers-03.webp",
        thumbnail: "/images-optimized/hampers/thumbs/hampers-03.webp",
        color: "bg-amber-500/20",
        specs: ["Gold Foiling", "Traditional Sweets", "Brass Diya"]
    },
    {
        id: "h-04",
        category: "Hampers",
        title: "Artisan Craft Box",
        image: "/images-optimized/hampers/hampers-04.webp",
        thumbnail: "/images-optimized/hampers/thumbs/hampers-04.webp",
        color: "bg-teal-900/20",
        specs: ["Handcrafted Decor", "Potpourri", "Scented Candles"]
    },
    {
        id: "h-05",
        category: "Hampers",
        title: "Classic Festive Trunk",
        image: "/images-optimized/hampers/hampers-05.webp",
        thumbnail: "/images-optimized/hampers/thumbs/hampers-05.webp",
        color: "bg-blue-900/20",
        specs: ["Reusable Trunk", "Assorted Nuts", "Toran Included"]
    },
    {
        id: "h-06",
        category: "Hampers",
        title: "Heritage Gifting Basket",
        image: "/images-optimized/hampers/hampers-06.webp",
        thumbnail: "/images-optimized/hampers/thumbs/hampers-06.webp",
        color: "bg-amber-950/20",
        specs: ["Woven Basket", "Copper Bottle", "Organic Tea"]
    },
    {
        id: "h-07",
        category: "Hampers",
        title: "Divine Blessing Set",
        image: "/images-optimized/hampers/hampers-07.webp",
        thumbnail: "/images-optimized/hampers/thumbs/hampers-07.webp",
        color: "bg-rose-950/20",
        specs: ["Silver Plated Idol", "Incense Sticks", "Dry Fruit Mix"]
    },
    {
        id: "h-08",
        category: "Hampers",
        title: "Modern Minimalist Hamper",
        image: "/images-optimized/hampers/hampers-08.webp",
        thumbnail: "/images-optimized/hampers/thumbs/hampers-08.webp",
        color: "bg-stone-900/20",
        specs: ["Sleek Design", "Premium Chocolate", "Notebook & Pen"]
    },
    {
        id: "h-09",
        category: "Hampers",
        title: "Floral Delight Box",
        image: "/images-optimized/hampers/hampers-09.webp",
        thumbnail: "/images-optimized/hampers/thumbs/hampers-09.webp",
        color: "bg-pink-900/20",
        specs: ["Dried Flowers", "Organic Honey", "Ceramic Mug"]
    },
    {
        id: "h-10",
        category: "Hampers",
        title: "Silver Jubilee Gifting",
        image: "/images-optimized/hampers/hampers-10.webp",
        thumbnail: "/images-optimized/hampers/thumbs/hampers-10.webp",
        color: "bg-slate-400/20",
        specs: ["Silver Finished Items", "Luxury Packaging"]
    },
    {
        id: "h-11",
        category: "Hampers",
        title: "Traditional Shagun Box",
        image: "/images-optimized/hampers/hampers-11.webp",
        thumbnail: "/images-optimized/hampers/thumbs/hampers-11.webp",
        color: "bg-red-900/20",
        specs: ["Silk Lining", "Lacquer Work", "Traditional Motif"]
    },
    {
        id: "h-12",
        category: "Hampers",
        title: "Zardozi Luxe Hamper",
        image: "/images-optimized/hampers/hampers-12.webp",
        thumbnail: "/images-optimized/hampers/thumbs/hampers-12.webp",
        color: "bg-purple-900/20",
        specs: ["Zardozi Embroidery", "Dry Fruits", "Perfumed Oils"]
    },
    {
        id: "h-13",
        category: "Hampers",
        title: "Eco-Friendly Festive Kit",
        image: "/images-optimized/hampers/hampers-13.webp",
        thumbnail: "/images-optimized/hampers/thumbs/hampers-13.webp",
        color: "bg-green-900/20",
        specs: ["Recycled Paper", "Seed Bombs", "Organic Cotton Bag"]
    },
    {
        id: "h-14",
        category: "Hampers",
        title: "Bespoke Corporate Set",
        image: "/images-optimized/hampers/hampers-14.webp",
        thumbnail: "/images-optimized/hampers/thumbs/hampers-14.webp",
        color: "bg-cyan-900/20",
        specs: ["Custom Branding", "Professional Polish", "Gourmet Selection"]
    },
    {
        id: "h-15",
        category: "Hampers",
        title: "Artisan Pottery Box",
        image: "/images-optimized/hampers/hampers-15.webp",
        thumbnail: "/images-optimized/hampers/thumbs/hampers-15.webp",
        color: "bg-orange-900/20",
        specs: ["Terracotta Items", "Hand-painted", "Rustic Charm"]
    },
    {
        id: "h-16",
        category: "Hampers",
        title: "Vibrant Festive Crate",
        image: "/images-optimized/hampers/hampers-16.webp",
        thumbnail: "/images-optimized/hampers/thumbs/hampers-16.webp",
        color: "bg-yellow-900/20",
        specs: ["Colorful Packaging", "Assorted Delicacies", "Rangoli Kit"]
    },
    {
        id: "sl-01",
        category: "Shubh Labh",
        title: "Minimalist Brass Leaf",
        image: "/images-optimized/shubh-labh/shubh-labh-01.webp",
        thumbnail: "/images-optimized/shubh-labh/thumbs/shubh-labh-01.webp",
        color: "bg-amber-900/20",
        specs: ["Laser-cut", "Polished Brass"]
    },
    {
        id: "sl-02",
        category: "Shubh Labh",
        title: "Crystal Lotus Pair",
        image: "/images-optimized/shubh-labh/shubh-labh-02.webp",
        thumbnail: "/images-optimized/shubh-labh/thumbs/shubh-labh-02.webp",
        color: "bg-teal-900/20",
        specs: ["Swarovski Elements", "Acrylic Base"]
    },
    {
        id: "sl-03",
        category: "Shubh Labh",
        title: "Heritage Diya Set",
        image: "/images-optimized/shubh-labh/shubh-labh-03.webp",
        thumbnail: "/images-optimized/shubh-labh/thumbs/shubh-labh-03.webp",
        color: "bg-rose-900/20",
        specs: ["Hand-painted", "Clay Base"]
    },
    {
        id: "sl-04",
        category: "Shubh Labh",
        title: "Floral Toran Accent",
        image: "/images-optimized/shubh-labh/shubh-labh-04.webp",
        thumbnail: "/images-optimized/shubh-labh/thumbs/shubh-labh-04.webp",
        color: "bg-indigo-900/20",
        specs: ["Handcrafted", "Festive Design"]
    },
    {
        id: "sl-05",
        category: "Shubh Labh",
        title: "Mandala Wall Hanging",
        image: "/images-optimized/shubh-labh/shubh-labh-05.webp",
        thumbnail: "/images-optimized/shubh-labh/thumbs/shubh-labh-05.webp",
        color: "bg-blue-900/20",
        specs: ["Wooden Frame", "Gold Finish"]
    },
    {
        id: "tr-01",
        category: "Toran",
        title: "Silk Brocade Toran",
        image: "/images-optimized/toran/toran-01.webp",
        thumbnail: "/images-optimized/toran/thumbs/toran-01.webp",
        color: "bg-rose-900/20",
        specs: ["Pure Silk", "Brocade Weave"]
    },
    {
        id: "tr-02",
        category: "Toran",
        title: "Velvet Embroidered Toran",
        image: "/images-optimized/toran/toran-02.webp",
        thumbnail: "/images-optimized/toran/thumbs/toran-02.webp",
        color: "bg-indigo-900/20",
        specs: ["Velvet Base", "Hand Embroidery"]
    },
    {
        id: "tr-03",
        category: "Toran",
        title: "Minimalist Linen Toran",
        image: "/images-optimized/toran/toran-03.webp",
        thumbnail: "/images-optimized/toran/thumbs/toran-03.webp",
        color: "bg-amber-900/20",
        specs: ["Pure Linen", "Neutral Tones"]
    },
    {
        id: "tr-04",
        category: "Toran",
        title: "Floral Jacquard Toran",
        image: "/images-optimized/toran/toran-04.webp",
        thumbnail: "/images-optimized/toran/thumbs/toran-04.webp",
        color: "bg-teal-900/20",
        specs: ["Jacquard Weave", "Floral Motif"]
    },
    {
        id: "tr-05",
        category: "Toran",
        title: "Zari Border Toran",
        image: "/images-optimized/toran/toran-05.webp",
        thumbnail: "/images-optimized/toran/thumbs/toran-05.webp",
        color: "bg-amber-950/20",
        specs: ["Zari Work", "Gold Border"]
    },
    {
        id: "tr-06",
        category: "Toran",
        title: "Cotton Handblock Toran",
        image: "/images-optimized/toran/toran-06.webp",
        thumbnail: "/images-optimized/toran/thumbs/toran-06.webp",
        color: "bg-blue-900/20",
        specs: ["Block Print", "Organic Cotton"]
    },
    {
        id: "tr-07",
        category: "Toran",
        title: "Royal Tapestry Toran",
        image: "/images-optimized/toran/toran-07.webp",
        thumbnail: "/images-optimized/toran/thumbs/toran-07.webp",
        color: "bg-rose-900/20",
        specs: ["Tapestry Weave", "Heritage Design"]
    },
    {
        id: "tr-08",
        category: "Toran",
        title: "Pastel Ombré Toran",
        image: "/images-optimized/toran/toran-08.webp",
        thumbnail: "/images-optimized/toran/thumbs/toran-08.webp",
        color: "bg-indigo-900/20",
        specs: ["Ombré Dye", "Soft Touch"]
    },
    {
        id: "tr-09",
        category: "Toran",
        title: "Festive Chanderi Toran",
        image: "/images-optimized/toran/toran-09.webp",
        thumbnail: "/images-optimized/toran/thumbs/toran-09.webp",
        color: "bg-teal-900/20",
        specs: ["Chanderi Fabric", "Festive Finish"]
    },
    {
        id: "tr-10",
        category: "Toran",
        title: "Velvet Tassel Toran",
        image: "/images-optimized/toran/toran-10.webp",
        thumbnail: "/images-optimized/toran/thumbs/toran-10.webp",
        color: "bg-rose-900/20",
        specs: ["Premium Velvet", "Silk Tassels"]
    },
    {
        id: "tr-11",
        category: "Toran",
        title: "Gold Leaf Toran",
        image: "/images-optimized/toran/toran-11.webp",
        thumbnail: "/images-optimized/toran/thumbs/toran-11.webp",
        color: "bg-amber-900/20",
        specs: ["Foil Accents", "Durable Fabric"]
    },
    {
        id: "tr-12",
        category: "Toran",
        title: "Pearl Accent Toran",
        image: "/images-optimized/toran/toran-12.webp",
        thumbnail: "/images-optimized/toran/thumbs/toran-12.webp",
        color: "bg-indigo-900/20",
        specs: ["Bead Work", "Artisan Made"]
    },
    {
        id: "tr-13",
        category: "Toran",
        title: "Heritage Silk Toran",
        image: "/images-optimized/toran/toran-13.webp",
        thumbnail: "/images-optimized/toran/thumbs/toran-13.webp",
        color: "bg-teal-900/20",
        specs: ["Antique Finish", "Traditional Pattern"]
    },
    {
        id: "tr-14",
        category: "Toran",
        title: "Modern Minimalist Toran",
        image: "/images-optimized/toran/toran-14.webp",
        thumbnail: "/images-optimized/toran/thumbs/toran-14.webp",
        color: "bg-blue-900/20",
        specs: ["Clean Lines", "Contemporary Style"]
    }
];
