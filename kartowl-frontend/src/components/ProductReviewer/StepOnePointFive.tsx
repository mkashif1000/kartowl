import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";
import { prefetchProductData } from "@/lib/research";
import type { Option, ResearchType } from "@/types/product";

interface StepOnePointFiveProps {
    input: string;
    loading: boolean;
    onInputChange: (value: string) => void;
    onOptionSelect: (option: Option) => void;
    onBack: () => void;
    researchType: ResearchType;
    userPreferences?: string;
    onUserPreferencesChange?: (value: string) => void;
}

export function StepOnePointFive({
    input,
    loading,
    onInputChange,
    onOptionSelect,
    onBack,
    researchType,
    userPreferences,
    onUserPreferencesChange
}: StepOnePointFiveProps) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onOptionSelect(researchType === 'single' ? 'research' : 'compare');
    };

    // Start prefetching data as soon as the user types
    useEffect(() => {
        const debounceTimer = setTimeout(() => {
            if (input.trim()) {
                prefetchProductData(input.trim());
            }
        }, 500); // Debounce for 500ms

        return () => clearTimeout(debounceTimer);
    }, [input]);

    return (
        <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in duration-500">
            <div className="space-y-4">
                <Input
                    value={input}
                    onChange={(e) => onInputChange(e.target.value)}
                    placeholder="Enter product name"
                    className="w-full"
                />

                {researchType === 'single' && onUserPreferencesChange && (
                    <div className="space-y-2 animate-in slide-in-from-top-2">
                        <label className="text-sm text-muted-foreground font-medium ml-1">
                            What are your specific requirements? (optional)
                        </label>
                        <Textarea
                            value={userPreferences}
                            onChange={(e) => onUserPreferencesChange(e.target.value)}
                            placeholder="e.g., 'Must have great battery life', 'Need iOS', 'For gaming'"
                            className="w-full min-h-[100px]"
                        />
                    </div>
                )}
            </div>

            <div className="flex gap-3">
                <Button variant="outline" onClick={onBack} type="button" className="flex-1">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Button>
                <Button type="submit" disabled={!input.trim() || loading} className="flex-1">
                    {loading ? 'Analyzing...' : 'Continue'}
                </Button>
            </div>
        </form>
    );
}
