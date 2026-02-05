
import { GoogleGenAI, Type } from "@google/genai";
import { AnalysisResult } from "../types";

export const analyzeArticle = async (content: string, isUrl: boolean = false): Promise<AnalysisResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = isUrl 
    ? `Analyze the article at this URL: ${content}. If you cannot access it directly, search for the content on Mpelembe Network (mpelembe.net).`
    : `Analyze the following article content from Mpelembe Network: \n\n${content}`;

  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING, description: 'The title of the article' },
          summary: { type: Type.STRING, description: 'A concise 3-4 sentence summary' },
          keyTakeaways: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: 'List of 3-5 major points from the article'
          },
          sentiment: { 
            type: Type.STRING, 
            description: 'General emotional tone (Positive, Neutral, Negative)' 
          },
          sentimentScore: { 
            type: Type.NUMBER, 
            description: 'Numerical score from 0 (negative) to 100 (positive)' 
          },
          category: { type: Type.STRING, description: 'Main category (e.g., News, Education, Tech, Politics)' },
          tags: { 
            type: Type.ARRAY, 
            items: { type: Type.STRING },
            description: 'Relevant keywords'
          },
          readingTime: { type: Type.STRING, description: 'Estimated reading time (e.g., 5 min)' },
          entities: {
            type: Type.OBJECT,
            properties: {
              people: { type: Type.ARRAY, items: { type: Type.STRING } },
              locations: { type: Type.ARRAY, items: { type: Type.STRING } },
              organizations: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ['people', 'locations', 'organizations']
          },
          complexity: { type: Type.STRING, description: 'Complexity level (Simple, Intermediate, Advanced)' }
        },
        required: [
          'title', 'summary', 'keyTakeaways', 'sentiment', 
          'sentimentScore', 'category', 'tags', 'readingTime', 
          'entities', 'complexity'
        ]
      },
      tools: isUrl ? [{ googleSearch: {} }] : undefined
    }
  });

  const jsonStr = response.text.trim();
  return JSON.parse(jsonStr);
};
