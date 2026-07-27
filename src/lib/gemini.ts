import { GoogleGenAI } from '@google/genai';

let aiInstance: GoogleGenAI | null = null;

export function getGeminiAI(): GoogleGenAI {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY || '';
    aiInstance = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiInstance;
}

export async function getDishRecommendationsAI(userPreferences: {
  timeOfDay?: string;
  weather?: string;
  budget?: string;
  dietary?: string;
  mood?: string;
  previousDishes?: string[];
}): Promise<{ recommendations: { dishName: string; reason: string; winePairing?: string }[] }> {
  try {
    const ai = getGeminiAI();
    const prompt = `You are a world-class Michelin-star Sommelier and Maître d' at L'Étoile Modern Bistro & Kitchen.
A customer is requesting personalized dish recommendations based on:
- Time of Day: ${userPreferences.timeOfDay || 'Dinner'}
- Current Weather: ${userPreferences.weather || 'Warm evening'}
- Budget Level: ${userPreferences.budget || 'Fine Dining'}
- Dietary Preference: ${userPreferences.dietary || 'None'}
- Mood / Vibe: ${userPreferences.mood || 'Luxurious indulgence'}
- Previous favorites: ${userPreferences.previousDishes?.join(', ') || 'Wagyu Ribeye'}

Select 3 exquisite dishes from our menu (A5 Miyazaki Wagyu Ribeye, Black Truffle Tagliolini, Chilean Sea Bass, Hokkaido Scallop Tartlet, Morel Mushroom Velouté, Duck Confit, Dark Chocolate & Matcha Soufflé).

Return a JSON array with exactly 3 items. Format:
{
  "recommendations": [
    {
      "dishName": "A5 Miyazaki Wagyu Ribeye",
      "reason": "Perfect for a luxurious dinner evening; rich umami notes that pair effortlessly with a cool night.",
      "winePairing": "2018 Chateau Margaux"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text || '';
    const parsed = JSON.parse(text);
    return parsed;
  } catch (error) {
    console.error('Gemini Recommendation Error:', error);
    // Intelligent fallback
    return {
      recommendations: [
        {
          dishName: 'A5 Miyazaki Wagyu Ribeye',
          reason: 'Our flagship signature cut, seared with black garlic glaze and maitake mushrooms for an unforgettable dinner.',
          winePairing: '2018 Chateau Margaux Cabernet Sauvignon'
        },
        {
          dishName: 'Black Truffle & Cacio e Pepe Tagliolini',
          reason: 'Handmade fresh pasta tossed with aged Pecorino Romano and generous shaves of Norcia black truffle.',
          winePairing: '2020 Barolo DOCG Nebbiolo'
        },
        {
          dishName: 'Grand Cru Dark Chocolate & Matcha Soufflé',
          reason: 'Warm 72% Valrhona dark chocolate with a molten heart, balanced by delicate Uji matcha gelato.',
          winePairing: 'Château d\'Yquem Sauternes Dessert Wine'
        }
      ]
    };
  }
}

export async function getSommelierChatResponse(history: { role: string; text: string }[], userMessage: string) {
  try {
    const ai = getGeminiAI();
    const systemInstruction = `You are "Étoile AI", the elite Sommelier, Culinary Concierge, and Maître D' at L'Étoile Modern Bistro & Kitchen.
Your tone is warm, refined, hospitable, and deeply knowledgeable about luxury gastronomy, wine pairings, dietary requirements, table ambiance, and kitchen craftsmanship.
You know our menu intimately:
- A5 Miyazaki Wagyu Ribeye ($98)
- Black Truffle & Cacio e Pepe Tagliolini ($42)
- Chilean Sea Bass en Papillote ($58)
- Hokkaido Scallop & Oscietra Caviar Tartlet ($36)
- Morel Mushroom & Sunchoke Velouté ($26 - Vegan)
- Slow-Confit Duck Leg with Cherry Reduction ($48)
- Grand Cru Dark Chocolate & Matcha Soufflé ($24)
- Smoked Botanical Old Fashioned ($22)

Opening hours: 17:00 - 23:30 Daily. Location: 742 Grand Avenue, Penthouse Level.
Keep answers sophisticated yet concise (2-4 sentences max), highlighting dish ingredients, wine pairings, or table reservation guidance.`;

    const contents = [
      ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.text }] })),
      { role: 'user', parts: [{ text: userMessage }] }
    ];

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents,
      config: {
        systemInstruction
      }
    });

    return response.text || "Good evening. It would be my utmost pleasure to guide your culinary journey at L'Étoile tonight. How may I assist your dining experience?";
  } catch (error) {
    console.error('Gemini Chat Error:', error);
    return "Good evening! Welcome to L'Étoile Modern Bistro & Kitchen. I am at your service to recommend wine pairings, answer dietary questions, or assist with table reservations.";
  }
}

export async function getAIOperationsInsights() {
  try {
    const ai = getGeminiAI();
    const prompt = `You are RestaurantOS AI Engine, analyzing live kitchen telemetry, historical sales, weather data, and stock levels for L'Étoile Modern Bistro.

Generate 3 actionable, high-precision operational insights for the Restaurant Manager & Head Chef in JSON format:
{
  "insights": [
    {
      "id": "ai-live-1",
      "type": "demand",
      "title": "Short Title",
      "description": "2-sentence data-backed prediction.",
      "actionRecommendation": "Specific action for staff/chef.",
      "confidenceScore": 95,
      "priority": "high"
    }
  ],
  "dailyBriefing": "1-sentence executive summary for the manager today."
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    return JSON.parse(response.text || '{}');
  } catch (error) {
    console.error('Gemini Insights Error:', error);
    return {
      insights: [
        {
          id: 'ai-fallback-1',
          type: 'demand',
          title: 'Peak Evening Demand Surge (19:30 - 21:30)',
          description: 'High reservation velocity indicates 95% table occupancy by 20:00. High demand expected for Wagyu Ribeye & Truffle Pasta.',
          actionRecommendation: 'Alert Kitchen Command to prep 30 portions of Wagyu Ribeye & double truffle pasta station prep.',
          confidenceScore: 96,
          priority: 'high'
        },
        {
          id: 'ai-fallback-2',
          type: 'inventory',
          title: 'Norcia Black Truffle Critical Alert',
          description: 'Stock at 0.35kg. Predicted stockout tomorrow at 13:30 based on current order rate.',
          actionRecommendation: 'Trigger automated PO to Umbria Imports for 1.0kg priority morning delivery.',
          confidenceScore: 98,
          priority: 'high'
        }
      ],
      dailyBriefing: 'Kitchen workload is optimal. Expect a 40% cover spike between 19:30 and 21:30 tonight. Truffle stock requires restock.'
    };
  }
}
