import { useState, useEffect } from 'react';
import { PlusCircle, ArrowLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FeatureItem } from "./FeatureItem";
import { ProductItem } from "./ProductItem";
import { LoadingScreen } from "./LoadingScreen";
import type { Product, Importance, Option } from "@/types/product";

interface StepThreeProps {
    products: Product[];
    newFeature: string;
    option: Option;
    onNewFeatureChange: (value: string) => void;
    onAddFeature: (productIndex: number) => void;
    onImportanceChange: (productIndex: number, featureId: number, importance: Importance) => void;
    onBack: () => void;
    onContinue: () => void;
    loading: boolean;
    onProductsChange?: (products: Product[]) => void;
}

export function StepThree({
    products,
    newFeature,
    option,
    onNewFeatureChange,
    onAddFeature,
    onImportanceChange,
    onBack,
    onContinue,
    loading,
    onProductsChange,
}: StepThreeProps) {
    const [newProduct, setNewProduct] = useState("");
    const actualProducts = products.filter(p => p.name !== 'Features');
    const featuresProduct = products.find(p => p.name === 'Features');
    const showProductSection = option === 'compare' || option === 'recommend';

    const handleRemoveProduct = (productToRemove: Product) => {
        const updatedProducts = products.filter(p => p.name !== productToRemove.name);
        onProductsChange?.(updatedProducts);
    };

    if (!products || products.length === 0) {
        return (
            <div className="text-center">
                <p className="text-sm sm:text-base">No products available. Please go back and try again.</p>
                <Button onClick={onBack} className="mt-4">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Button>
            </div>
        );
    }

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <div className="space-y-4 animate-in fade-in">
            {/* Concise Product List */}
            {(option === 'compare' || option === 'recommend') && (
                <div className="bg-secondary/50 p-3 rounded-lg">
                    <h3 className="text-sm font-bold uppercase mb-2">Suggested Products</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {actualProducts.map((p, i) => (
                            <div key={i} className="flex items-center justify-between bg-background p-2 rounded border">
                                <span className="text-sm truncate">{p.name}</span>
                                <Button variant="ghost" size="sm" onClick={() => handleRemoveProduct(p)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3 w-3"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </Button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Concise Feature List */}
            <div className="bg-secondary/50 p-3 rounded-lg">
                <h3 className="text-sm font-bold uppercase mb-2">Key Features</h3>
                <div className="space-y-1">
                    {featuresProduct?.features.map(f => (
                        <FeatureItem key={f.id} feature={f} onImportanceChange={(importance) =>
                            onImportanceChange(products.length - 1, f.id, importance)
                        } />
                    ))}
                </div>
            </div>

            {/* Compact Navigation */}
            <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={onBack}>Back</Button>
                <Button className="flex-[2]" onClick={onContinue} disabled={loading || (showProductSection && actualProducts.length === 0)}>
                    {loading ? "Analyzing..." : "Get Recommendation"}
                </Button>
            </div>
        </div>
    );
}
