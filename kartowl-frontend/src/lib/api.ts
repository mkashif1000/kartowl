import { Product } from "@shared/schema";

const BACKEND_URL = "http://localhost:3000/api";

export const searchProducts = async (query: string): Promise<Product[]> => {
  try {
    const response = await fetch(`${BACKEND_URL}/search?q=${encodeURIComponent(query)}`);
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const json = await response.json();
    
    if (json.success && Array.isArray(json.data)) {
      return json.data;
    }
    
    return [];
  } catch (error) {
    console.error("API Error:", error);
    return []; // Return empty array on error so app doesn't crash
  }
};

// Add this function to client/src/lib/api.ts
export const getProductHistory = async (productUrl: string) => {
  try {
    const response = await fetch(`${BACKEND_URL}/history?url=${encodeURIComponent(productUrl)}`);
    if (!response.ok) throw new Error('Failed to fetch history');
    return await response.json();
  } catch (error) {
    console.error("History fetch error:", error);
    return [];
  }
};