import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/product";

interface ProductItemProps {
    product: Product;
    onRemove: () => void;
}

export function ProductItem({ product, onRemove }: ProductItemProps) {
    return (
        <div className="flex items-center justify-between bg-background p-4 rounded-lg animate-in fade-in duration-300">
            <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{product.name}</div>
                {product.price && (
                    <div className="text-sm text-muted-foreground">
                        Rs. {product.price.toLocaleString()}
                        {product.platform && ` • ${product.platform}`}
                    </div>
                )}
                {product.url && (
                    <a
                        href={product.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-primary hover:underline truncate block mt-1"
                    >
                        View Product
                    </a>
                )}
            </div>
            <Button
                variant="outline"
                size="sm"
                onClick={onRemove}
                className="h-8 px-2 ml-2 flex-shrink-0"
                aria-label="Remove product"
            >
                <X className="h-4 w-4" />
            </Button>
        </div>
    );
}
