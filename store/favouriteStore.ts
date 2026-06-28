import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandStorage } from './mmkv';

export type FavouriteState = {
  favoriteIds: number[];
  setFavorites: (ids: number[]) => void;
  toggleFavorite: (id: number) => void;
  clear: () => void;
};

const useFavouriteStore = create<FavouriteState>()(
  persist(
    (set) => ({
      favoriteIds: [],
      setFavorites: (ids) => set({ favoriteIds: ids }),
      toggleFavorite: (id) =>
        set((state) => {
          const has = state.favoriteIds.includes(id);
          return {
            favoriteIds: has
              ? state.favoriteIds.filter((x) => x !== id)
              : [...state.favoriteIds, id],
          };
        }),
      clear: () => set({ favoriteIds: [] }),
    }),
    {
      name: 'favourite-storage',
      storage: createJSONStorage(() => zustandStorage),
    }
  )
);

export default useFavouriteStore;

