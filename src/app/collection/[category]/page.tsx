import { categoryInfo, products } from "@/data/products";
import CategoryProductGrid from "@/components/CategoryProductGrid";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

// Generate static params for static export
export function generateStaticParams() {
    return categoryInfo.map((cat) => ({
        category: cat.slug,
    }));
}

// Dynamic metadata
export async function generateMetadata({
    params,
}: {
    params: Promise<{ category: string }>;
}): Promise<Metadata> {
    const { category: slug } = await params;
    const category = categoryInfo.find((c) => c.slug === slug);

    if (!category) {
        return { title: "Not Found" };
    }

    return {
        title: `${category.name} — Meow Creative Concepts`,
        description: category.description,
    };
}

export default async function CategoryPage({
    params,
}: {
    params: Promise<{ category: string }>;
}) {
    const { category: slug } = await params;
    const category = categoryInfo.find((c) => c.slug === slug);

    if (!category) {
        notFound();
    }

    const categoryProducts = products.filter(
        (p) => p.category === category.name
    );

    return <CategoryProductGrid category={category} products={categoryProducts} />;
}
