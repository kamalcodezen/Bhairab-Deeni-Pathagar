/* =============================================
   Book Details Page
   বইয়ের বিস্তারিত তথ্য এবং ধার নেওয়ার অপশন
   ============================================= */

import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Heart, Share2, Star, BookOpen, Clock, User, CheckCircle2, AlertCircle } from 'lucide-react'
import { useLibrary } from '../../context/LibraryContext'
import toast from 'react-hot-toast'
import BookCard from '../../components/shared/BookCard'

const BookDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { books, borrowBook, toggleWishlist, isInWishlist } = useLibrary()
  
  const book = books.find(b => b.id === id)
  const isWishlisted = book ? isInWishlist(book.id) : false

  // Similar books (same category, excluding current)
  const similarBooks = book 
    ? books.filter(b => b.category === book.category && b.id !== book.id).slice(0, 4)
    : []

  if (!book) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">বইটি পাওয়া যায়নি</h2>
        <p className="text-gray-500 mb-6">আপনি যে বইটি খুঁজছেন তা হয়তো মুছে ফেলা হয়েছে অথবা URL টি ভুল।</p>
        <button onClick={() => navigate('/books')} className="btn-primary">বইয়ের তালিকায় ফিরে যান</button>
      </div>
    )
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('বইয়ের লিংক কপি করা হয়েছে!')
  }

  return (
    <div className="bg-gray-50 dark:bg-dark-bg min-h-screen py-8 pb-20 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-6 transition-colors"
        >
          <ArrowLeft size={20} />
          <span>ফিরে যান</span>
        </button>

        {/* Main Details Card */}
        <div className="card overflow-hidden mb-12">
          <div className="grid md:grid-cols-12 gap-0">
            
            {/* Left: Book Cover Image */}
            <div className="md:col-span-4 lg:col-span-3 bg-gray-100 dark:bg-dark-border p-8 flex items-center justify-center">
              <img 
                src={book.cover || `https://source.unsplash.com/400x600/?book,${book.categoryId || book.id}`}
                alt={book.title}
                className="w-full max-w-[250px] shadow-2xl rounded-md object-cover aspect-[3/4]"
              />
            </div>
            
            {/* Right: Details */}
            <div className="md:col-span-8 lg:col-span-9 p-6 lg:p-10 flex flex-col">
              
              <div className="flex justify-between items-start gap-4 mb-4">
                <div>
                  <div className="text-sm font-semibold text-primary-600 dark:text-primary-400 mb-2 uppercase tracking-wide">
                    {book.category}
                  </div>
                  <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-2 leading-tight">
                    {book.title}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400 font-medium">
                    লেখক: <span className="text-gray-900 dark:text-gray-200">{book.author}</span>
                  </p>
                </div>
                
                {/* Actions */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toggleWishlist(book.id)}
                    className="p-2.5 rounded-full bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    title="উইশলিস্টে যোগ করুন"
                  >
                    <Heart size={20} className={isWishlisted ? 'fill-red-500 text-red-500' : ''} />
                  </button>
                  <button 
                    onClick={handleShare}
                    className="p-2.5 rounded-full bg-gray-100 dark:bg-dark-border text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    title="শেয়ার করুন"
                  >
                    <Share2 size={20} />
                  </button>
                </div>
              </div>

              {/* Stats/Meta */}
              <div className="flex flex-wrap items-center gap-6 py-4 border-y border-gray-100 dark:border-dark-border my-4">
                <div className="flex items-center gap-2">
                  <Star size={18} className="fill-amber-400 text-amber-400" />
                  <span className="font-bold text-gray-900 dark:text-white">{book.rating || '4.5'}</span>
                  <span className="text-gray-500 text-sm">({book.reviewCount || 0} রিভিউ)</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <BookOpen size={18} />
                  <span className="text-sm font-medium">{book.pages || book.pageCount || 200} পৃষ্ঠা</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <User size={18} />
                  <span className="text-sm font-medium">{book.borrowCount || 0} বার ধার নেওয়া হয়েছে</span>
                </div>
              </div>

              {/* Description */}
              <div className="mb-8 flex-grow">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">বইয়ের সারসংক্ষেপ</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-justify">
                  {book.description || 'এই বইটি সম্পর্কে বিস্তারিত কোনো বিবরণ বর্তমানে দেওয়া নেই। তবে এটি এই ক্যাটাগরির অন্যতম একটি জনপ্রিয় বই।'}
                </p>
              </div>

              {/* Action Area */}
              <div className="bg-gray-50 dark:bg-dark-bg p-5 rounded-xl border border-gray-100 dark:border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    {book.availableCopies > 0 ? (
                      <>
                        <CheckCircle2 size={18} className="text-green-500" />
                        <span className="text-green-600 dark:text-green-400 font-bold">স্টকে আছে</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle size={18} className="text-red-500" />
                        <span className="text-red-600 dark:text-red-400 font-bold">স্টক আউট</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    বর্তমানে <span className="font-bold text-gray-900 dark:text-white">{book.availableCopies}</span> টি কপি লাইব্রেরিতে আছে
                  </p>
                </div>
                
                <button 
                  onClick={() => borrowBook(book.id)}
                  disabled={book.availableCopies < 1}
                  className="btn-primary w-full sm:w-auto px-8 py-3 text-lg"
                >
                  <Clock size={20} />
                  বইটি ধার নিন
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Similar Books Section */}
        {similarBooks.length > 0 && (
          <div>
            <div className="flex justify-between items-end mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">একই ক্যাটাগরির অন্যান্য বই</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {similarBooks.map(b => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default BookDetails
