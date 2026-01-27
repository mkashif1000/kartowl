import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import type { ProductInfo, ProductComparison, ProductRecommendations, ProductReport, FeatureSet, ReviewResult } from '@/types/product';

// Initialize with your API key
const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

// Use gemini-1.5-flash for speed
const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash-lite',
    safetySettings: [
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
    ],
});

// Use a standard model for simple JSON tasks
const jsonModel = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash-lite',
    safetySettings: [
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_NONE,
        },
    ],
});

let apiLogs: any[] = [];

export function getApiLogs() {
    return apiLogs;
}

export function clearApiLogs() {
    apiLogs = [];
}

function addApiLog(log: any) {
    apiLogs.push(log);
    console.log(`API Log [${log.type}]:`, log);
}

// --- Helper for JSON Extraction ---
async function generateJson<T>(prompt: string, logType: string): Promise<T> {
    const timestamp = new Date().toISOString();
    try {
        addApiLog({ timestamp, type: 'gemini', endpoint: logType, request: { prompt: prompt.substring(0, 100) + '...' } });

        const result = await jsonModel.generateContent(prompt);
        const text = result.response.text();

        const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```|{[\s\S]*?}/);
        if (!jsonMatch) throw new Error('No valid JSON found in response');

        const parsed = JSON.parse(jsonMatch[0].replace(/```json|```/g, '').trim());

        addApiLog({ timestamp, type: 'gemini', endpoint: logType, response: { status: 200, body: 'Success' } });
        return parsed as T;
    } catch (error) {
        addApiLog({ timestamp, type: 'gemini', endpoint: logType, error: { message: error instanceof Error ? error.message : 'Unknown error' } });
        throw error;
    }
}

// --- Core Features ---

export async function fetchProductInfo(productName: string): Promise<ProductInfo> {
    const prompt = `Provide a feature list for "${productName}".
  Include the top 6 most meaningful and relevant attributes (features) and their descriptions.
  Each feature name MUST be in Title Case format.
  Respond in this exact JSON format:
  {
    "productName": "${productName}",
    "considerations": [
      { "key": "Feature Name", "value": "Description" }
    ]
  }`;
    return generateJson<ProductInfo>(prompt, 'fetchProductInfo');
}

export async function fetchProductComparisons(productName: string): Promise<ProductComparison> {
    const prompt = `Suggest top 3 alternative products for "${productName}".
  Respond in this exact JSON format:
  {
    "mainProduct": "${productName}",
    "alternatives": [
      { "name": "Alt Product Name", "considerations": [{ "key": "Feature", "value": "Comparison" }] }
    ]
  }`;
    return generateJson<ProductComparison>(prompt, 'fetchProductComparisons');
}

export async function fetchProductRecommendations(userDescription: string): Promise<ProductRecommendations> {
    const prompt = `Based on this user need: "${userDescription}", identify the 6 most important technical specifications or features a buyer should consider. 
  Also, suggest the top 4 specific products that best meet this description.
  
  Respond in this exact JSON format:
  {
    "recommendations": [
      { 
        "name": "Product Name", 
        "considerations": [
          { "key": "Feature Name", "value": "Why it matters for this product" }
        ] 
      }
    ]
  }`;
    return generateJson<ProductRecommendations>(prompt, 'fetchProductRecommendations');
}

// --- Unified Research Function ---

export async function performDeepResearch(
    productName: string,
    features: FeatureSet
): Promise<ProductReport> {
    const timestamp = new Date().toISOString();

    // NEW PROMPT: Extremely strict constraint for brevity
    const prompt = `Review "${productName}" based on these priorities: ${features.veryImportant.join(', ')}.
  
  CRITICAL: Do not write a full report. 
  Output a SINGLE JSON object with a "finalReport" field containing exactly 2 or 3 sentences.
  The sentences must clearly state if the product is good and why, addressing the user's top priority.

  Respond in this exact JSON format:
  {
    "productName": "${productName}",
    "youtubeResults": [], 
    "websiteResults": "",
    "redditResults": "",
    "finalReport": "Your 2-3 sentence verdict here."
  }`;

    try {
        addApiLog({ timestamp, type: 'gemini', endpoint: 'deepResearch', request: { productName } });
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonMatch = text.match(/```json\s*([\s\S]*?)\s*```|{[\s\S]*?}/);

        if (!jsonMatch) throw new Error('Invalid AI response');

        // Parse and return
        const parsedData = JSON.parse(jsonMatch[0].replace(/```json|```/g, '').trim());
        return parsedData;

    } catch (error) {
        addApiLog({ timestamp, type: 'gemini', endpoint: 'deepResearch', error: { message: error instanceof Error ? error.message : 'Timeout' } });
        throw error;
    }
}

// ALSO UPDATE: Multi-product comparison prompt
export async function generateComparisonReport(products: string[], features: FeatureSet, reports: string[]): Promise<string> {
    const prompt = `Compare these products: ${products.join(', ')}.
   Priorities: ${JSON.stringify(features)}.
   
   Output ONLY a 2-3 sentence recommendation. 
   Name the winner clearly and give the main reason why.
   Do not use introduction, limitations, or feature lists.
   
   Return JSON: { "verdict": "The 2-3 sentence text here" }`;

    const res = await generateJson<any>(prompt, 'comparisonReport');
    return JSON.stringify(res);
}

// --- New Feature: Product Review/Verdict ---

export async function reviewProduct(productName: string, userPreferences: string): Promise<ReviewResult> {
    const prompt = `Act as an expert product reviewer.
  Product: "${productName}"
  User Requirements/Preferences: "${userPreferences}"

  Analyze if this product actually meets the user's specific needs.
  If the product is a good match, verdict should be "Recommended".
  If the product fails to meet key requirements or is a bad fit, verdict should be "Not Recommended".
  
  Provide a match score from 0 to 100.
  Provide a concise explanation (2-3 sentences) justifying the verdict based on the requirements.

  Respond in this exact JSON format:
  {
    "productName": "${productName}",
    "verdict": "Recommended", 
    "matchScore": 85,
    "explanation": "The product meets most of your requirements, specifically..."
  }`;

    return generateJson<ReviewResult>(prompt, 'reviewProduct');
}
