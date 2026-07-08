export interface CustomizationProject {
    id: string;
    title: string;
    label: string;
    description: string;
    tag?: string;
    images: string[];
}

export const customizationProjects: CustomizationProject[] = [
    {
        id: "custom-quilt",
        title: "Customized Quilt",
        label: "Request to Reality",
        description: "A client requested a bespoke patchwork memory quilt combining family photos and meaningful fabric swatches — a warm, one-of-a-kind keepsake.",
        tag: "Special Order",
        images: [
            "/images-optimized/table-runner/table-runner-hero.webp",
            "/images-optimized/table-runner/table-runner-01.webp",
            "/images-optimized/table-runner/table-runner-02.webp"
        ]
    },
    {
        id: "birthday-gifts",
        title: "Birthday Return Gifts",
        label: "Custom Curation",
        description: "Personalized, themed return gifts for a milestone children's birthday. Each handcrafted box was filled with age-appropriate goodies and wrapped in signature festive style.",
        tag: "Bulk Order",
        images: [
            "/images-optimized/hampers/hampers-hero.webp",
            "/images-optimized/hampers/hampers-01.webp",
            "/images-optimized/hampers/hampers-02.webp"
        ]
    },
    {
        id: "kids-workshop",
        title: "Kids Workshop",
        label: "Creative Curation",
        description: "An interactive craft workshop designed for children. Complete with customized DIY kits, guided hands-on instructions, and wonderful take-home masterpieces.",
        tag: "Event Workshop",
        images: [
            "/images-optimized/toran/toran-01.webp",
            "/images-optimized/toran/toran-02.webp",
            "/images-optimized/toran/toran-03.webp"
        ]
    }
];
