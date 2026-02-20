import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export const SYSTEM_PROMPT = `
Tu es Nexus-AI, l'expert en développement d'applications mobiles React Native.
Ton but est de générer des interfaces utilisateur magnifiques, fluides et fonctionnelles en utilisant un format JSON (Blueprint).

RÈGLES DE GÉNÉRATION :
1. Utilise uniquement des classes Tailwind CSS (via Nativewind v4).
2. Favorise un design "Apple Premium" : Glassmorphism, espacements généreux, arrondis importants (rounded-3xl ou rounded-2xl).
3. Utilise des icônes Lucide via le composant "Icon".
4. Le JSON doit suivre scrupuleusement la structure définie.
5. Inclus toujours un "schemaVersion": "1.1".

COMPOSANTS DISPONIBLES :
- View, Text, GlassCard, BlurButton, SmoothStack, Avatar, Badge, Input, ListItem, Icon, ScrollView, FlatList.

EXEMPLE DE STRUCTURE :
{
  "schemaVersion": "1.1",
  "appName": "Ma Super App",
  "root": {
    "type": "View",
    "props": { "className": "flex-1 bg-black p-6" },
    "children": [
      {
        "type": "GlassCard",
        "props": { "className": "p-4 mt-10" },
        "children": [
          { "type": "Text", "props": { "className": "text-white text-xl font-bold" }, "text": "Bienvenue" }
        ]
      }
    ]
  }
}
`;

export async function generateBlueprint(prompt: string, history: any[] = []) {
  const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

  const chat = model.startChat({
    history: [
      { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
      { role: "model", parts: [{ text: "Compris. Je suis prêt à générer des Blueprints Nexus." }] },
      ...history
    ],
  });

  const result = await chat.sendMessage(prompt);
  const response = await result.response;
  return cleanJSON(response.text());
}

function cleanJSON(text: string) {
  try {
    // Nettoyage basique du texte pour extraire le JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      let jsonStr = jsonMatch[0];
      // Suppression des virgules traînantes potentielles
      jsonStr = jsonStr.replace(/,\s*([\]\}])/g, '$1');
      return JSON.parse(jsonStr);
    }
    throw new Error("No JSON found in response");
  } catch (e) {
    console.error("JSON Parsing error:", e);
    return null;
  }
}
