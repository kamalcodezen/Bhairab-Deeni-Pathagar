/* ============================================================================
   CartContext — Shopping Cart Management (শপিং কার্ট ম্যানেজমেন্ট)
   এখানে ইউজারদের বই কার্টে যোগ করা, রিমুভ করা এবং কার্ট পারসিস্টেন্স ম্যানেজ করা হয়।
   ডাটা localStorage এ সেভ থাকে যাতে পেজ রিলোড করলেও কার্ট আইটেম ঠিক থাকে।
   ============================================================================ */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import toast from 'react-hot-toast'
import { Book, CartItem, CartContextType } from '../types'

// কার্ট কন্টেক্সট তৈরি করা হচ্ছে
const CartContext = createContext<CartContextType | null>(null)

// Local Storage Key
const CART_KEY = 'pathagar_cart_items'

export const CartProvider = ({ children }: { children: ReactNode }) => {
  // কার্ট আইটেম স্টেট — default হিসেবে localStorage থেকে ডাটা লোড করা হচ্ছে
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // কার্ট আইটেম পরিবর্তন হলে localStorage এ আপডেট করা হচ্ছে
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems))
  }, [cartItems])

  // কার্টে বই যোগ করার ফাংশন (ডুপ্লিকেট চেক সহ)
  const addToCart = (book: Book) => {
    const exists = cartItems.find((item) => item.book.id === book.id)

    if (exists) {
      toast.error('বইটি ইতিমধ্যে আপনার কার্টে যোগ করা হয়েছে!')
      return
    }

    const newItem: CartItem = { book, quantity: 1 }
    setCartItems((prev) => [...prev, newItem])
    toast.success('বইটি কার্টে যোগ করা হয়েছে!')
  }

  // কার্ট থেকে বই রিমুভ করার ফাংশন
  const removeFromCart = (bookId: string) => {
    setCartItems((prev) => prev.filter((item) => item.book.id !== bookId))
    toast.success('বইটি কার্ট থেকে সরানো হয়েছে।')
  }

  // কার্ট সম্পূর্ণ খালি করার ফাংশন
  const clearCart = () => {
    setCartItems([])
    toast.success('কার্ট সম্পূর্ণ খালি করা হয়েছে।')
  }

  // বইটি কার্টে আছে কিনা তা চেক করার হেল্পার ফাংশন
  const isInCart = (bookId: string): boolean => {
    return cartItems.some((item) => item.book.id === bookId)
  }

  // কার্টের মোট আইটেম সংখ্যা
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    isInCart,
    cartCount,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

// Custom hook — useCart দিয়ে কার্ট কন্টেক্সট সহজে ব্যবহার করা যাবে
export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within a CartProvider')
  return ctx
}

export default CartContext
