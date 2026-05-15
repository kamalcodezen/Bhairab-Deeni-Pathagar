/* =============================================
   ThemeContext — Dark/Light Mode Management
   এই context টি dark/light mode toggle করে।
   User এর preference localStorage এ save থাকে।
   ============================================= */

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react'

// Theme context তৈরি করা হচ্ছে
const ThemeContext = createContext(null)

// Local storage key
const THEME_KEY = 'pathagar_theme'

export const ThemeProvider = ({ children }) => {
  // Dark mode state — default হিসেবে system preference check করা হচ্ছে
  const [isDark, setIsDark] = useState(() => {
    // localStorage এ saved preference আছে কিনা check করা হচ্ছে
    const saved = localStorage.getItem(THEME_KEY)
    if (saved) return saved === 'dark'

    // System preference check করা হচ্ছে
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  // isDark পরিবর্তন হলে html element এ 'dark' class toggle করা হচ্ছে
  useEffect(() => {
    const root = document.documentElement
    if (isDark) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    // User এর preference save করা হচ্ছে
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light')
  }, [isDark])

  // Dark mode toggle করার function
  const toggleTheme = () => setIsDark((prev) => !prev)

  const value = {
    isDark,
    toggleTheme,
    theme: isDark ? 'dark' : 'light',
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

// Custom hook — useTheme দিয়ে theme context access করা যাবে
export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}

export default ThemeContext
