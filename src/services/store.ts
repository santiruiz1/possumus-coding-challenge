import { create } from "zustand";
import { getCategories, getToken, getTrivias } from "./openTrivia";
import type { Trivia } from "../types/openTrivia";
import type { SelectCategory } from "../application/trivia";

export type TriviaState = {
  points: number;
  trivias: Trivia[];
  loading: boolean;
  error: string | null;
  currentTriviaIndex: number;
  setCurrentTriviaIndex: (index: number) => void;
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  incPoints: () => void;
  clearPoints: () => void;
  setTrivias: (difficulty: string | null, category: number | null) => void;
  clearTrivias: () => void;
};

export type ConfigState = {
  token: string | null
  categories: SelectCategory[];
  choosenCategory: number | null;
  choosenDifficulty: string | null;
  loading: boolean;
  error: string | null;
  setToken: () => Promise<void>
  setError: (error: string | null) => void;
  setLoading: (loading: boolean) => void;
  setCategory: (category: number) => void;
  setDifficulty: (difficulty: string) => void;
  setCategories: () => Promise<void>;
};

export const useTriviaStore = create<TriviaState>((set) => ({
  points: 0,
  trivias: [],
  loading: false,
  error: null,
  currentTriviaIndex: 0,
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ loading }),
  setCurrentTriviaIndex: async (index) => {
    set({ currentTriviaIndex: index });
  },
  incPoints: () => set((state) => ({ points: state.points + 20 })),
  setTrivias: async (difficulty, category) => {
    set({ loading: true, error: null });
    try {
      const trivias = await getTrivias({ difficulty, category });
      if (trivias && trivias.results) {
        set({ trivias: trivias.results, loading: false });
        return;
      }
      set({ error: "No trivias found" });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        set({ error: error.message });
      } else {
        set({ error: "An unknown error occurred" });
      }
    }
  },
  clearTrivias: () => set({ trivias: [] }),
  clearPoints: () => set({ points: 0 }),
}));

export const useConfigStore = create<ConfigState>((set) => ({
  token: null,
  categories: [],
  choosenCategory: null,
  choosenDifficulty: null,
  loading: false,
  error: null,
  setToken: async () => {
    try {
      const response = await getToken();
      if (response && response.response_code === 0) set({ token: response.token });
      else set({ error: "No token found" })
    } catch (error) {
      console.log(error)
      set({ error: "Error getting token" })
    }
  },
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ loading }),
  setCategory: (category) => set({ choosenCategory: category }),
  setDifficulty: (difficulty) => set({ choosenDifficulty: difficulty }),
  setCategories: async () => {
    set({ loading: true, error: null });
    try {
      const rawCategories = await getCategories();
      if (
        rawCategories.trivia_categories &&
        rawCategories.trivia_categories.length > 0
      ) {
        const categories = rawCategories.trivia_categories.map((category) => ({
          value: category.id.toString(),
          label: category.name,
        }));
        set({ categories, loading: false });
        return;
      }
      set({ error: "No categories found" });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        set({ error: error.message });
      } else {
        set({ error: "An unknown error occurred" });
      }
    }
  },
}));
