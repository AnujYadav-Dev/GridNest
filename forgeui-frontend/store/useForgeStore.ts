'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface ForgeStore {
  // Saved component slugs
  savedSlugs: string[]
  saveComponent: (slug: string) => void
  unsaveComponent: (slug: string) => void
  isSaved: (slug: string) => boolean

  // Theme preferences (CSS token overrides)
  themePrefs: Record<string, string>
  setThemePref: (key: string, value: string) => void
  resetThemePrefs: () => void

  // Search palette open state
  searchOpen: boolean
  setSearchOpen: (open: boolean) => void
}

export const useForgeStore = create<ForgeStore>()(
  persist(
    (set, get) => ({
      savedSlugs: [],
      saveComponent: (slug) =>
        set((state) => ({
          savedSlugs: state.savedSlugs.includes(slug)
            ? state.savedSlugs
            : [...state.savedSlugs, slug],
        })),
      unsaveComponent: (slug) =>
        set((state) => ({
          savedSlugs: state.savedSlugs.filter((s) => s !== slug),
        })),
      isSaved: (slug) => get().savedSlugs.includes(slug),

      themePrefs: {},
      setThemePref: (key, value) =>
        set((state) => ({
          themePrefs: { ...state.themePrefs, [key]: value },
        })),
      resetThemePrefs: () => set({ themePrefs: {} }),

      searchOpen: false,
      setSearchOpen: (open) => set({ searchOpen: open }),
    }),
    {
      name: 'gridnest-store',
      partialize: (state) => ({
        savedSlugs: state.savedSlugs,
        themePrefs: state.themePrefs,
      }),
    }
  )
)
