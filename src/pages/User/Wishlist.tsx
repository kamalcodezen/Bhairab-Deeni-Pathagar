/* =============================================
   Wishlist Page
   ইউজারের পছন্দের বইয়ের তালিকা
   সবচেয়ে আকর্ষণীয় এবং ইউজার-ফ্রেন্ডলি লেআউটে সাজানো
   ============================================= */

import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Trash2, ShoppingCart, Check, Star } from 'lucide-react'
import { useWishlist } from '../../context/WishlistContext'
import { useCart } from '../../context/CartContext'

const Wishlist: React.FC = () => {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart, isInCart } = useCart()

  return (
    <div className="py-2">
      {/* হেডার এবং কন্ট্রোল সেকশন */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
            <Heart size={28} className="text-red-500 fill-red-500 animate-pulse" />
            আমার উইশলিস্ট
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            আপনার পছন্দের তালিকায় রাখা বইয়ের সংখ্যা: <span className="font-semibold text-primary-600 dark:text-primary-400">{wishlistItems.length}টি</span>
          </p>
        </div>
        {wishlistItems.length > 0 && (
          <button
            onClick={clearWishlist}
            className="flex items-center justify-center gap-2 text-sm text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 font-semibold px-4 py-2 border.5 border-red-500/20 hover:bg-red-500/5 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Trash2 size={16} />
            উইশলিস্ট খালি করুন
          </button>
        )}
      </div>

      {/* বইয়ের তালিকা */}
      {wishlistItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((book) => (
            <div
              key={book.id}
              className="card-hover group relative bg-white dark:bg-dark-card rounded-xl overflow-hidden flex flex-col h-full border border-gray-100 dark:border-dark-border transition-all duration-300 shadow-sm hover:shadow-md"
            >
              {/* কভার ইমেজ সেকশন */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-dark-border">
                <Link to={`/book/${book.id}`}>
                  <img
                    src={book.cover || `https://source.unsplash.com/400x600/?book,${book.categoryId || book.id}`}
                    alt={book.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </Link>

                {/* স্ট্যাটাস ব্যাজ */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {book.isNew && (
                    <span className="badge bg-primary-600 text-white border-none px-2 py-1 text-xs shadow-sm font-semibold">
                      নতুন
                    </span>
                  )}
                  {book.availableCopies < 1 ? (
                    <span className="badge bg-red-500 text-white border-none px-2 py-1 text-xs shadow-sm font-semibold">
                      স্টক আউট
                    </span>
                  ) : (
                    <span className="badge bg-green-500 text-white border-none px-2 py-1 text-xs shadow-sm font-semibold">
                      স্টকে আছে
                    </span>
                  )}
                </div>

                {/* উইশলিস্ট থেকে ডিলিট করার বাটন */}
                <button
                  onClick={() => removeFromWishlist(book.id)}
                  className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 hover:bg-red-50 dark:hover:bg-red-950/40 transition-all duration-200 cursor-pointer"
                  title="উইশলিস্ট থেকে মুছুন"
                >
                  <Trash2 size={16} className="text-red-500 hover:text-red-600" />
                </button>
              </div>

              {/* কার্ড কন্টেন্ট */}
              <div className="p-4 flex flex-col flex-grow">
                <div className="text-xs text-primary-600 dark:text-primary-400 font-bold mb-1 truncate">
                  {book.category}
                </div>

                <Link
                  to={`/book/${book.id}`}
                  className="group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
                >
                  <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-2 mb-1 leading-snug">
                    {book.title}
                  </h3>
                </Link>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 truncate">
                  {book.author}
                </p>

                {/* রেটিং সেকশন */}
                <div className="flex items-center gap-1 mb-4">
                  <Star size={14} className="fill-amber-400 text-amber-400" />
                  <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    {book.rating || '4.5'}
                  </span>
                  <span className="text-xs text-gray-400">
                    ({book.reviewCount || 0})
                  </span>
                </div>

                {/* কার্ট এবং রিমুভ অ্যাকশন বাটনসমূহ */}
                <div className="mt-auto pt-3 border-t border-gray-100 dark:border-dark-border flex flex-col gap-2">
                  {isInCart(book.id) ? (
                    <button
                      disabled
                      className="w-full py-2.5 px-3 bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20 rounded-lg flex items-center justify-center gap-2 text-xs font-bold"
                    >
                      <Check size={14} />
                      কার্টে যুক্ত আছে
                    </button>
                  ) : (
                    <button
                      onClick={() => addToCart(book)}
                      className="w-full py-2.5 px-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-all duration-200 hover:shadow-md active:scale-[0.98] cursor-pointer"
                    >
                      <ShoppingCart size={14} />
                      কার্টে যোগ করুন
                    </button>
                  )}

                  <button
                    onClick={() => removeFromWishlist(book.id)}
                    className="w-full py-1.5 px-3 border border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-border rounded-lg flex items-center justify-center gap-2 text-xs font-bold transition-colors cursor-pointer"
                  >
                    <Trash2 size={12} />
                    সরিয়ে ফেলুন
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* এম্পটি স্টেট ইউজার ইন্টারফেস */
        <div className="card p-12 text-center max-w-2xl mx-auto border border-gray-100 dark:border-dark-border bg-white dark:bg-dark-card rounded-2xl shadow-sm">
          <div className="w-20 h-20 bg-red-50 dark:bg-red-950/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={36} className="text-red-500 fill-red-500/20 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">আপনার উইশলিস্ট খালি</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
            আপনার পছন্দের তালিকায় এখনো কোনো বই যুক্ত করা হয়নি। নতুন বই খুঁজতে আমাদের বইমেলা ব্রাউজ করুন এবং আপনার পছন্দের তালিকা সাজান।
          </p>
          <Link
            to="/books"
            className="btn-primary px-8 py-3 rounded-full inline-flex items-center gap-2 shadow-lg hover:shadow-primary-500/20 transition-all active:scale-[0.98]"
          >
            বই খুঁজতে চলুন
          </Link>
        </div>
      )}
    </div>
  )
}

export default Wishlist
