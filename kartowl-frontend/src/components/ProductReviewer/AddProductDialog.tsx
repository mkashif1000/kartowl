import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Search, Check, X, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast"; // Changed import to use useToast hook

interface AddProductDialogProps {
    onAddProduct: (product: { name: string; price: number; url: string; platform: string }) => void;
    existingProducts: string[];
}

export function AddProductDialog({ onAddProduct, existingProducts }: AddProductDialogProps) {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<Array<{
        name: string;
        price: number;
        url: string;
        platform: string;
        image?: string;
    }>>([]);
    const [selectedProduct, setSelectedProduct] = useState<{
        name: string;
        price: number;
        url: string;
        platform: string;
    } | null>(null);

    // Initialize toast
    const { toast } = useToast();

    const searchProducts = async () => {
        if (!searchTerm.trim()) return;

        setLoading(true);
        try {
            // Simulate API call to search real products on Daraz and PriceOye
            // In a real implementation, this would call actual APIs
            const mockResults = [
                {
                    name: `${searchTerm} - Daraz.pk`,
                    price: Math.floor(Math.random() * 50000) + 5000,
                    url: `https://www.daraz.pk/products/${searchTerm.replace(/\s+/g, '-')}`,
                    platform: 'Daraz',
                    image: 'https://placehold.co/100x100?text=Daraz'
                },
                {
                    name: `${searchTerm} - PriceOye.pk`,
                    price: Math.floor(Math.random() * 50000) + 5000,
                    url: `https://www.priceoye.pk/search?q=${searchTerm.replace(/\s+/g, '+')}`,
                    platform: 'PriceOye',
                    image: 'https://placehold.co/100x100?text=PriceOye'
                }
            ];

            // Filter out existing products
            const filteredResults = mockResults.filter(
                result => !existingProducts.some(p => p.includes(result.name.split(' - ')[0]))
            );

            setSearchResults(filteredResults);
            setSelectedProduct(null);
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to search products. Please try again.",
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAddProduct = () => {
        if (selectedProduct) {
            onAddProduct(selectedProduct);
            setOpen(false);
            setSearchTerm('');
            setSearchResults([]);
            setSelectedProduct(null);
            toast({
                title: "Product Added",
                description: `${selectedProduct.name} has been added to your list.`
            });
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Add Product
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>Add Real Product from Daraz/PriceOye</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Search Input */}
                    <div className="flex gap-2">
                        <Input
                            placeholder="Search for products (e.g., iPhone 15, Samsung Galaxy S24)"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && searchProducts()}
                        />
                        <Button onClick={searchProducts} disabled={loading}>
                            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                        </Button>
                    </div>

                    {/* Search Results */}
                    {searchResults.length > 0 && (
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            <Label>Available Products:</Label>
                            {searchResults.map((product, index) => (
                                <div
                                    key={index}
                                    className={`p-3 border rounded-lg cursor-pointer transition-all ${selectedProduct?.url === product.url
                                            ? 'border-primary bg-primary/10'
                                            : 'hover:bg-secondary'
                                        }`}
                                    onClick={() => setSelectedProduct(product)}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className="flex-shrink-0">
                                            {selectedProduct?.url === product.url ? (
                                                <Check className="h-5 w-5 text-primary" />
                                            ) : (
                                                <div className="w-5 h-5 border rounded" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium">{product.name}</h4>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {product.platform} • Rs. {product.price.toLocaleString()}
                                            </p>
                                            <a
                                                href={product.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-xs text-primary hover:underline mt-1 inline-block"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                View on {product.platform}
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Selected Product Preview */}
                    {selectedProduct && (
                        <div className="p-4 bg-secondary/50 rounded-lg">
                            <h4 className="font-medium mb-2">Selected Product:</h4>
                            <div className="text-sm">
                                <p><strong>Name:</strong> {selectedProduct.name}</p>
                                <p><strong>Price:</strong> Rs. {selectedProduct.price.toLocaleString()}</p>
                                <p><strong>Platform:</strong> {selectedProduct.platform}</p>
                            </div>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            <X className="h-4 w-4 mr-2" />
                            Cancel
                        </Button>
                        <Button
                            onClick={handleAddProduct}
                            disabled={!selectedProduct}
                            className="flex items-center gap-2"
                        >
                            <Plus className="h-4 w-4" />
                            Add Product
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
