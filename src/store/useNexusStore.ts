import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface NexusState {
  blueprints: any[];
  currentBlueprintIndex: number;
  language: 'fr' | 'en';
  setLanguage: (lang: 'fr' | 'en') => void;
  addBlueprint: (blueprint: any) => void;
  undo: () => void;
  redo: () => void;
  reset: () => void;
}

export const useNexusStore = create<NexusState>()(
  persist(
    (set) => ({
      blueprints: [],
      currentBlueprintIndex: -1,
      language: 'fr',
      setLanguage: (language) => set({ language }),
      addBlueprint: (blueprint) => set((state) => {
        const newBlueprints = state.blueprints.slice(0, state.currentBlueprintIndex + 1);
        return {
          blueprints: [...newBlueprints, blueprint],
          currentBlueprintIndex: newBlueprints.length,
        };
      }),
      undo: () => set((state) => ({
        currentBlueprintIndex: Math.max(0, state.currentBlueprintIndex - 1),
      })),
      redo: () => set((state) => ({
        currentBlueprintIndex: Math.min(state.blueprints.length - 1, state.currentBlueprintIndex + 1),
      })),
      reset: () => set({ blueprints: [], currentBlueprintIndex: -1 }),
    }),
    {
      name: 'nexus-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
