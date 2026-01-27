import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertCircle, Terminal } from "lucide-react";


// Mocking SiteConfig if not present or adjust import
// For now, I'll remove site-config dependency to ensure portability

export function ErrorDialog({ logs }: { logs: any[] }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="ghost" className="text-destructive underline h-auto p-0">
                    See details
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-destructive">
                        <AlertCircle className="h-5 w-5" />
                        Research Error Details
                    </DialogTitle>
                    <DialogDescription>
                        Technical logs for debugging purposes.
                    </DialogDescription>
                </DialogHeader>

                <ScrollArea className="h-[400px] w-full rounded-md border p-4 bg-muted/50">
                    <div className="space-y-4">
                        {logs.map((log, i) => (
                            <div key={i} className="flex flex-col gap-2 text-xs font-mono">
                                <div className="flex items-center gap-2 text-muted-foreground border-b pb-1">
                                    <Terminal className="h-3 w-3" />
                                    <span className="font-semibold">{log.type.toUpperCase()}</span>
                                    <span>{new Date(log.timestamp).toLocaleTimeString()}</span>
                                    <span className="bg-muted px-1 rounded">{log.endpoint}</span>
                                </div>

                                {log.request && (
                                    <div className="pl-4 border-l-2 border-blue-500/20">
                                        <div className="text-blue-500 font-semibold mb-1">Request</div>
                                        <pre className="whitespace-pre-wrap break-all text-muted-foreground">
                                            {JSON.stringify(log.request, null, 2)}
                                        </pre>
                                    </div>
                                )}

                                {log.error && (
                                    <div className="pl-4 border-l-2 border-red-500/20">
                                        <div className="text-red-500 font-semibold mb-1">Error</div>
                                        <pre className="whitespace-pre-wrap break-all text-destructive">
                                            {JSON.stringify(log.error, null, 2)}
                                        </pre>
                                    </div>
                                )}

                                {log.response && (
                                    <div className="pl-4 border-l-2 border-green-500/20">
                                        <div className="text-green-500 font-semibold mb-1">Response</div>
                                        <pre className="whitespace-pre-wrap break-all text-muted-foreground">
                                            {JSON.stringify(log.response, null, 2)}
                                        </pre>
                                    </div>
                                )}
                            </div>
                        ))}

                        {logs.length === 0 && (
                            <div className="text-center text-muted-foreground py-8">
                                No logs available.
                            </div>
                        )}
                    </div>
                </ScrollArea>
            </DialogContent>
        </Dialog>
    );
}
