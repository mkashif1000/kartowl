import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ResearchResults, ReviewResult } from "@/types/product";

interface StepFiveProps {
    research: ResearchResults | ReviewResult;
    onBack: () => void;
}

export function StepFive({ research, onBack }: StepFiveProps) {
    // Check if it's a ReviewResult (has 'verdict' and 'matchScore')
    const isReview = (r: any): r is ReviewResult => 'verdict' in r && 'matchScore' in r;

    if (isReview(research)) {
        const isRecommended = research.verdict === "Recommended";

        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] animate-in zoom-in-95 duration-500">
                <div className={`bg-card border-2 ${isRecommended ? 'border-green-500/20' : 'border-red-500/20'} p-8 rounded-2xl shadow-xl max-w-2xl text-center relative overflow-hidden`}>

                    {/* Background Gradient */}
                    <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent ${isRecommended ? 'via-green-500' : 'via-red-500'} to-transparent`} />

                    {isRecommended ? (
                        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
                    ) : (
                        <XCircle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                    )}

                    <h2 className="text-2xl font-bold mb-2 text-foreground">
                        {research.verdict}
                    </h2>

                    <div className="mb-6 flex justify-center items-center gap-2">
                        <span className={`text-4xl font-black ${isRecommended ? 'text-green-500' : 'text-red-500'}`}>
                            {research.matchScore}%
                        </span>
                        <span className="text-sm text-muted-foreground uppercase tracking-widest font-semibold mt-2">
                            Match
                        </span>
                    </div>

                    <p className="text-lg leading-relaxed text-muted-foreground font-medium">
                        "{research.explanation}"
                    </p>
                </div>

                <div className="mt-8 flex gap-4">
                    <Button variant="outline" onClick={onBack}>
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                    </Button>
                    <Button onClick={() => window.location.reload()}>
                        Start Over
                    </Button>
                </div>
            </div>
        );
    }

    // Existing Logic for ResearchResults
    let finalText = "";
    if (research.comparisonReport) {
        try {
            const parsed = JSON.parse(research.comparisonReport);
            finalText = parsed.verdict || parsed.conclusion || "Recommendation ready.";
        } catch {
            finalText = research.comparisonReport;
        }
    } else if (research.reports.length > 0) {
        finalText = research.reports[0].finalReport;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] animate-in zoom-in-95 duration-500">
            <div className="bg-card border-2 border-primary/20 p-8 rounded-2xl shadow-xl max-w-2xl text-center relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
                <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-6" />
                <h2 className="text-2xl font-bold mb-4 text-foreground">
                    The Verdict
                </h2>
                <p className="text-lg sm:text-xl leading-relaxed text-muted-foreground font-medium">
                    "{finalText}"
                </p>
            </div>
            <div className="mt-8 flex gap-4">
                <Button variant="outline" onClick={onBack}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back
                </Button>
                <Button onClick={() => window.location.reload()}>
                    Start Over
                </Button>
            </div>
        </div>
    );
}
