/* =============================================
   AuthContext — Authentication System
   এই context টি সমস্ত authentication state
   manage করে। Login, logout, register এবং
   role-based access control এখানে আছে।

   ভবিষ্যতে এখানে backend API call যোগ হবে।
   ============================================= */

import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'

// Auth Context তৈরি করা হচ্ছে
const AuthContext = createContext(null)

// Mock users — বর্তমানে fake data ব্যবহার করা হচ্ছে
// ভবিষ্যতে এখানে backend API call করা যাবে
const MOCK_USERS = [
  {
    id: '1',
    name: 'আব্দুল্লাহ আল-মামুন',
    email: 'admin@pathagar.com',
    password: '123456',
    role: 'admin',
    phone: '01711234567',
    avatar: 'https://i.pravatar.cc/150?img=3',
    joinDate: '2023-01-15',
    address: 'ভৈরব, কিশোরগঞ্জ',
    borrowedCount: 0,
    donatedCount: 5,
  },
  {
    id: '2',
    name: 'মোহাম্মদ রাফি হোসেন',
    email: 'user@pathagar.com',
    password: '123456',
    role: 'user',
    phone: '01812345678',
    avatar: 'https://i.pravatar.cc/150?img=12',
    joinDate: '2023-06-20',
    address: 'ভৈরব, কিশোরগঞ্জ',
    borrowedCount: 3,
    donatedCount: 2,
  },
]

// Local Storage key names
const AUTH_KEY    = 'pathagar_auth_user'
const SESSION_KEY = 'pathagar_session'

export const AuthProvider = ({ children }) => {
  // বর্তমান লগইন করা user এর state
  const [user, setUser] = useState(null)

  // Loading state — auth check করার সময়
  const [loading, setLoading] = useState(true)

  // App শুরুতে Local Storage থেকে user data load করা হচ্ছে
  useEffect(() => {
    try {
      const savedUser    = localStorage.getItem(AUTH_KEY)
      const savedSession = localStorage.getItem(SESSION_KEY)

      if (savedUser && savedSession) {
        const parsedUser    = JSON.parse(savedUser)
        const sessionExpiry = JSON.parse(savedSession)

        // Session expired কিনা check করা হচ্ছে
        if (sessionExpiry > Date.now()) {
          setUser(parsedUser)
        } else {
          // Session শেষ হয়ে গেছে — logout করা হচ্ছে
          localStorage.removeItem(AUTH_KEY)
          localStorage.removeItem(SESSION_KEY)
        }
      }
    } catch {
      // Error হলে storage clear করা হচ্ছে
      localStorage.removeItem(AUTH_KEY)
      localStorage.removeItem(SESSION_KEY)
    } finally {
      setLoading(false)
    }
  }, [])

  // Login function — email এবং password দিয়ে login করা
  // ভবিষ্যতে এখানে backend API call করা যাবে
  const login = useCallback(async ({ email, password }) => {
    // Mock user খোঁজা হচ্ছে
    const foundUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    )

    if (!foundUser) {
      throw new Error('ইমেইল বা পাসওয়ার্ড সঠিক নয়')
    }

    // Password বাদ দিয়ে user data save করা হচ্ছে
    const { password: _, ...safeUser } = foundUser

    // Session 7 দিনের জন্য set করা হচ্ছে
    const sessionExpiry = Date.now() + 7 * 24 * 60 * 60 * 1000

    localStorage.setItem(AUTH_KEY,    JSON.stringify(safeUser))
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionExpiry))

    setUser(safeUser)
    return safeUser
  }, [])

  // Register function — নতুন user register করা
  // ভবিষ্যতে এখানে backend API call করা যাবে
  const register = useCallback(async ({ name, email, password, phone }) => {
    // Email already exists কিনা check করা হচ্ছে
    const exists = MOCK_USERS.find((u) => u.email === email)
    if (exists) {
      throw new Error('এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট আছে')
    }

    // নতুন user object তৈরি করা হচ্ছে
    const newUser = {
      id:          String(Date.now()),
      name,
      email,
      phone:        phone || '',
      role:        'user',
      avatar:      `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`,
      joinDate:    new Date().toISOString().split('T')[0],
      address:     '',
      borrowedCount: 0,
      donatedCount:  0,
    }

    // Mock users array এ যোগ করা হচ্ছে (session চলাকালীন)
    MOCK_USERS.push({ ...newUser, password })

    const sessionExpiry = Date.now() + 7 * 24 * 60 * 60 * 1000
    localStorage.setItem(AUTH_KEY,    JSON.stringify(newUser))
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionExpiry))

    setUser(newUser)
    return newUser
  }, [])

  // Logout function — user কে log out করা
  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY)
    localStorage.removeItem(SESSION_KEY)
    setUser(null)
    toast.success('সফলভাবে লগআউট হয়েছেন')
  }, [])

  // Profile update function
  // ভবিষ্যতে এখানে backend API call করা যাবে
  const updateProfile = useCallback((updatedData) => {
    const updated = { ...user, ...updatedData }
    localStorage.setItem(AUTH_KEY, JSON.stringify(updated))
    setUser(updated)
  }, [user])

  // Admin কিনা check করার helper
  const isAdmin = user?.role === 'admin'

  // Auth context value — সব component এ এই data পাওয়া যাবে
  const value = {
    user,
    loading,
    isAdmin,
    isLoggedIn: !!user,
    login,
    register,
    logout,
    updateProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook — useAuth দিয়ে auth context access করা যাবে
export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export default AuthContext
