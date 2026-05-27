/* ============================================================================
   WishlistContext — User Wishlist Management (পছন্দের তালিকা ম্যানেজমেন্ট)
   এখানে ইউজারদের পছন্দের বইয়ের তালিকা (Wishlist) গ্লোবালি হ্যান্ডেল করা হয়।
   ডাটা localStorage এ সেভ থাকে যাতে পেজ রিলোড বা সেশন রিফ্রেশ করলেও ডাটা টিকে থাকে।
   ============================================================================ */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import toast from 'react-hot-toast'
import { Book, WishlistContextType } from '../types'

// উইশলিস্ট কন্টেক্সট তৈরি করা হচ্ছে
const WishlistContext = createContext<WishlistContextType | null>(null)

// Local Storage Key
const WISHLIST_KEY = 'pathagar_wishlist_items'

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  // উইশলিস্টেড বইয়ের স্টেট — default হিসেবে localStorage থেকে ডাটা লোড করা হচ্ছে
  const [wishlistItems, setWishlistItems] = useState<Book[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // উইশলিস্ট পরিবর্তন হলে localStorage এ সেভ করা হচ্ছে
  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistItems))
  }, [wishlistItems])

  // উইশলিস্টে বই যুক্ত করার ফাংশন
  const addToWishlist = (book: Book) => {
    const exists = wishlistItems.some((item) => item.id === book.id)
    if (exists) return

    setWishlistItems((prev) => [...prev, book])
    toast.success('বইটি উইশলিস্টে যোগ করা হয়েছে!')
  }

  // উইশলিস্ট থেকে বই রিমুভ করার ফাংশন
  const removeFromWishlist = (bookId: string) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== bookId))
    toast.success('বইটি উইশলিস্ট থেকে সরানো হয়েছে।')
  }

  // উইশলিস্টে বই যোগ/বাদ দেওয়ার টগল ফাংশন
  const toggleWishlist = (book: Book) => {
    const exists = wishlistItems.some((item) => item.id === book.id)
    if (exists) {
      removeFromWishlist(book.id)
    } else {
      addToWishlist(book)
    }
  }

  // বইটি উইশলিস্ট করা আছে কিনা তা চেক করার হেল্পার
  const isWishlisted = (bookId: string): boolean => {
    return wishlistItems.some((item) => item.id === bookId)
  }

  // উইশলিস্ট সম্পূর্ণ খালি করার ফাংশন
  const clearWishlist = () => {
    setWishlistItems([])
    toast.success('উইশলিস্ট সম্পূর্ণ খালি করা হয়েছে।')
  }

  const value: WishlistContextType = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isWishlisted,
    clearWishlist,
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}

// Custom hook — useWishlist দিয়ে উইশলিস্টের সকল স্টেট ও ফাংশন অ্যাক্সেস করা যাবে
export const useWishlist = (): WishlistContextType => {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within a WishlistProvider')
  return ctx
}

export default WishlistContext
