import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUIStore = create(
  persist(
    (set, get) => ({
      // State
      isDarkMode: false,
      
      // Actions
      toggleDarkMode: () => {
        const newMode = !get().isDarkMode;
        set({ isDarkMode: newMode });
        
        // Update document class for Tailwind dark mode
        if (newMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      
      setDarkMode: (value) => {
        set({ isDarkMode: value });
        if (value) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      
      // Initialize dark mode on app load
      initDarkMode: () => {
        const isDark = get().isDarkMode;
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    }),
    {
      name: 'fex-ui-storage',
      partialize: (state) => ({ isDarkMode: state.isDarkMode })
    }
  )
);

