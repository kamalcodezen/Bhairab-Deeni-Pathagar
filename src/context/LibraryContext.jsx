/* =============================================
   LibraryContext — Library State Management
   এই context টি library এর সমস্ত data manage করে:
   - Books (সব বই)
   - Wishlist (পছন্দের তালিকা)
   - Borrows (ধার নেওয়া বই)
   - Borrow requests
   ============================================= */

/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'
import { booksData }  from '../data/books'
import { borrowsData } from '../data/borrows'
import { useAuth }    from './AuthContext'

// Library context তৈরি করা হচ্ছে
const LibraryContext = createContext(null)

// Local storage keys
const WISHLIST_KEY = 'pathagar_wishlist'
const BORROWS_KEY  = 'pathagar_borrows'

export const LibraryProvider = ({ children }) => {
  const { user } = useAuth()

  // বর্তমানে mock data ব্যবহার করা হচ্ছে
  // ভবিষ্যতে এখানে API থেকে data fetch করা যাবে
  const [books, setBooks]     = useState(booksData)
  const [borrows, setBorrows] = useState(() => {
    try {
      const saved = localStorage.getItem(BORROWS_KEY)
      return saved ? JSON.parse(saved) : borrowsData
    } catch {
      return borrowsData
    }
  })

  // Wishlist — user এর পছন্দের বই ID গুলো
  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_KEY)
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })

  // Wishlist localStorage এ save করা হচ্ছে
  useEffect(() => {
    localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlist))
  }, [wishlist])

  // Borrows localStorage এ save করা হচ্ছে
  useEffect(() => {
    localStorage.setItem(BORROWS_KEY, JSON.stringify(borrows))
  }, [borrows])

  // Wishlist toggle — বই wishlist এ add/remove করা
  const toggleWishlist = useCallback((bookId) => {
    if (!user) {
      toast.error('উইশলিস্টে যোগ করতে আগে লগইন করুন')
      return
    }
    setWishlist((prev) => {
      if (prev.includes(bookId)) {
        toast.success('উইশলিস্ট থেকে সরানো হয়েছে')
        return prev.filter((id) => id !== bookId)
      } else {
        toast.success('উইশলিস্টে যোগ করা হয়েছে')
        return [...prev, bookId]
      }
    })
  }, [user])

  // বই ধার নেওয়ার request
  // ভবিষ্যতে এখানে backend API call করা যাবে
  const borrowBook = useCallback((bookId) => {
    if (!user) {
      toast.error('বই ধার নিতে আগে লগইন করুন')
      return
    }

    const book = books.find((b) => b.id === bookId)
    if (!book) return

    // ইতিমধ্যে এই বই ধার নেওয়া আছে কিনা check করা হচ্ছে
    const alreadyBorrowed = borrows.find(
      (b) => b.bookId === bookId && b.userId === user.id &&
             ['active', 'pending'].includes(b.status)
    )

    if (alreadyBorrowed) {
      toast.error('আপনি ইতিমধ্যে এই বইটি ধার নিয়েছেন')
      return
    }

    // বই available কিনা check করা হচ্ছে
    if (book.availableCopies < 1) {
      toast.error('দুঃখিত, বইটি এখন পাওয়া যাচ্ছে না')
      return
    }

    // নতুন borrow record তৈরি করা হচ্ছে
    const newBorrow = {
      id:          String(Date.now()),
      bookId,
      userId:      user.id,
      userName:    user.name,
      bookTitle:   book.title,
      bookAuthor:  book.author,
      bookCover:   book.cover,
      borrowDate:  new Date().toISOString(),
      dueDate:     new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      returnDate:  null,
      status:      'pending',
    }

    setBorrows((prev) => [newBorrow, ...prev])

    // বইয়ের available copies কমানো হচ্ছে
    setBooks((prev) =>
      prev.map((b) =>
        b.id === bookId
          ? { ...b, availableCopies: b.availableCopies - 1 }
          : b
      )
    )

    toast.success('ধার নেওয়ার আবেদন সফল হয়েছে!')
  }, [user, books, borrows])

  // বই ফেরত দেওয়া
  // ভবিষ্যতে এখানে backend API call করা যাবে
  const returnBook = useCallback((borrowId) => {
    const borrow = borrows.find((b) => b.id === borrowId)
    if (!borrow) return

    setBorrows((prev) =>
      prev.map((b) =>
        b.id === borrowId
          ? { ...b, status: 'returned', returnDate: new Date().toISOString() }
          : b
      )
    )

    // বইয়ের available copies বাড়ানো হচ্ছে
    setBooks((prev) =>
      prev.map((b) =>
        b.id === borrow.bookId
          ? { ...b, availableCopies: b.availableCopies + 1 }
          : b
      )
    )

    toast.success('বই সফলভাবে ফেরত দেওয়া হয়েছে')
  }, [borrows])

  // Admin: book add করা
  const addBook = useCallback((bookData) => {
    const newBook = {
      ...bookData,
      id:           String(Date.now()),
      rating:       0,
      reviewCount:  0,
      borrowCount:  0,
      createdAt:    new Date().toISOString(),
    }
    setBooks((prev) => [newBook, ...prev])
    toast.success('বই সফলভাবে যোগ করা হয়েছে')
    return newBook
  }, [])

  // Admin: book edit করা
  const updateBook = useCallback((bookId, updatedData) => {
    setBooks((prev) =>
      prev.map((b) => (b.id === bookId ? { ...b, ...updatedData } : b))
    )
    toast.success('বই সফলভাবে আপডেট করা হয়েছে')
  }, [])

  // Admin: book delete করা
  const deleteBook = useCallback((bookId) => {
    setBooks((prev) => prev.filter((b) => b.id !== bookId))
    toast.success('বই সফলভাবে মুছে ফেলা হয়েছে')
  }, [])

  // Admin: borrow approve করা
  const approveBorrow = useCallback((borrowId) => {
    setBorrows((prev) =>
      prev.map((b) => (b.id === borrowId ? { ...b, status: 'active' } : b))
    )
    toast.success('ধার অনুমোদন করা হয়েছে')
  }, [])

  // Admin: borrow reject করা
  const rejectBorrow = useCallback((borrowId) => {
    const borrow = borrows.find((b) => b.id === borrowId)
    if (!borrow) return

    setBorrows((prev) =>
      prev.map((b) => (b.id === borrowId ? { ...b, status: 'rejected' } : b))
    )

    // Rejected হলে copies ফেরত দেওয়া হচ্ছে
    setBooks((prev) =>
      prev.map((b) =>
        b.id === borrow.bookId
          ? { ...b, availableCopies: b.availableCopies + 1 }
          : b
      )
    )
    toast.success('ধার বাতিল করা হয়েছে')
  }, [borrows])

  // User এর নিজের borrow list
  const userBorrows = user
    ? borrows.filter((b) => b.userId === user.id)
    : []

  // Wishlist এর বই গুলো
  const wishlistBooks = books.filter((b) => wishlist.includes(b.id))

  const value = {
    books,
    borrows,
    wishlist,
    userBorrows,
    wishlistBooks,
    toggleWishlist,
    borrowBook,
    returnBook,
    addBook,
    updateBook,
    deleteBook,
    approveBorrow,
    rejectBorrow,
    isInWishlist: (id) => wishlist.includes(id),
  }

  return (
    <LibraryContext.Provider value={value}>
      {children}
    </LibraryContext.Provider>
  )
}

// Custom hook
export const useLibrary = () => {
  const ctx = useContext(LibraryContext)
  if (!ctx) throw new Error('useLibrary must be used within LibraryProvider')
  return ctx
}

export default LibraryContext
