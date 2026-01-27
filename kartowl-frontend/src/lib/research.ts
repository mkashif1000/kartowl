import { performDeepResearch, generateComparisonReport, getApiLogs as getGeminiLogs } from './gemini';
import type { Product, ResearchResults, FeatureSet, ApiLog } from '@/types/product';

// Simple cache
const researchCache: Record<string, any> = {};

export async function prefetchProductData(productName: string): Promise<void> {
    // Optional: You can implement a "warm-up" call here if desired, 
    // but with the single-call approach, it's less critical.
    console.log(`Prefetching hint for ${productName}`);
}

export async function performResearch(
    productName: string,
    features: FeatureSet
): Promise<ResearchResults> {
    try {
        const report = await performDeepResearch(productName, features);
        return { reports: [report] };
    } catch (error) {
        const errorWithLogs = new Error('Research failed');
        (errorWithLogs as any).logs = getGeminiLogs();
        throw errorWithLogs;
    }
}

export async function performMultiProductResearch(
    products: Product[],
    features: FeatureSet
): Promise<ResearchResults> {
    try {
        const productList = products.filter(p => p.name !== 'Features');

        // Run research in parallel
        const reports = await Promise.all(
            productList.map(product => performDeepResearch(product.name, features))
        );

        let comparisonReport: string | undefined;
        if (reports.length > 1) {
            comparisonReport = await generateComparisonReport(
                reports.map(r => r.productName),
                features,
                reports.map(r => typeof r.finalReport === 'string' ? r.finalReport : JSON.stringify(r.finalReport))
            );
        }

        return { reports, comparisonReport };
    } catch (error) {
        const errorWithLogs = new Error('Research failed');
        (errorWithLogs as any).logs = getGeminiLogs();
        throw errorWithLogs;
    }
}
