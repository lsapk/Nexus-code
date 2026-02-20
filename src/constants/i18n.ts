const translations = {
  fr: {
    welcome: "Bienvenue sur Nexus Code",
    tagline: "L'IA qui code votre vision.",
    start_chat: "Décrivez votre application...",
    generating: "Génération en cours...",
    export: "Exporter le code",
    settings: "Paramètres",
    language: "Langue",
    history: "Historique",
    undo: "Annuler",
    redo: "Rétablir",
  },
  en: {
    welcome: "Welcome to Nexus Code",
    tagline: "AI coding your vision.",
    start_chat: "Describe your app...",
    generating: "Generating...",
    export: "Export Code",
    settings: "Settings",
    language: "Language",
    history: "History",
    undo: "Undo",
    redo: "Redo",
  }
};

export type Language = 'fr' | 'en';

export const t = (key: keyof typeof translations['fr'], lang: Language) => {
  return translations[lang][key] || key;
};
