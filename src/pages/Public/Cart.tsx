/* =============================================
   Cart Page
   ব্যবহারকারীর বুকিং/কার্ট লিস্ট পেজ
   ============================================= */

import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ShoppingCart, Trash2, ArrowRight, Minus, Plus, BookOpen, Star, ShieldCheck } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useLibrary } from '../../context/LibraryContext'

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, clearCart, cartCount } = useCart()
  const { borrowBook } = useLibrary()
  const navigate = useNavigate()

  const handleConfirmBooking = () => {
    cartItems.forEach(({ book }) => {
      borrowBook(book.id)
    })
    clearCart()
    navigate('/dashboard/borrowed')
  }

  // বইয়ের আনুমানিক মূল্য বা ফি হিসাব (লাইব্রেরি মেম্বারশিপ সার্ভিস চার্জ হিসেবে)
  const getBookPrice = (bookId: string) => {
    // বুক আইডির ওপর ভিত্তি করে ডাইনামিক ফেক প্রাইস জেনারেট করা হচ্ছে
    const hash = bookId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return (hash % 3) * 50 + 120 // ৳১২০ থেকে ৳২২০ এর মধ্যে
  }

  // মোট মূল্য হিসাব
  const subtotal = cartItems.reduce((acc, item) => acc + getBookPrice(item.book.id) * item.quantity, 0)
  const serviceCharge = cartItems.length > 0 ? 30 : 0 // সার্ভিস ফি
  const total = subtotal + serviceCharge

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-16 min-h-[80vh]">
      {/* পেজ টাইটেল */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white flex items-center gap-3">
            <ShoppingCart size={32} className="text-primary-600 dark:text-primary-400 animate-bounce" />
            আপনার বইয়ের ঝুড়ি (কার্ট)
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            আপনার কার্টে মোট <span className="font-bold text-primary-600 dark:text-primary-400">{cartCount}টি</span> বই রয়েছে
          </p>
        </div>
        {cartItems.length > 0 && (
          <button
            onClick={clearCart}
            className="flex items-center justify-center gap-2 text-sm text-red-500 hover:text-red-600 font-bold px-4 py-2 border.5 border-red-500/20 hover:bg-red-500/5 rounded-lg transition-colors cursor-pointer self-start md:self-auto"
          >
            <Trash2 size={16} />
            কার্ট খালি করুন
          </button>
        )}
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* কার্ট আইটেম লিস্ট */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(({ book, quantity }) => {
              const price = getBookPrice(book.id)
              return (
                <div
                  key={book.id}
                  className="bg-white dark:bg-dark-card rounded-xl p-4 border border-gray-100 dark:border-dark-border flex flex-col sm:flex-row gap-4 hover:shadow-md transition-shadow duration-300 relative group"
                >
                  {/* বুক ইমেজ */}
                  <div className="w-full sm:w-24 aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 dark:bg-dark-border flex-shrink-0">
                    <img
                      src={book.cover || `https://source.unsplash.com/400x600/?book,${book.id}`}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* বইয়ের ইনফরমেশন */}
                  <div className="flex flex-col flex-grow">
                    <span className="text-xs text-primary-600 dark:text-primary-400 font-bold uppercase mb-1">
                      {book.category}
                    </span>
                    <Link to={`/book/${book.id}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 leading-snug">
                        {book.title}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-0.5">
                      {book.author}
                    </p>

                    {/* রেটিং ও পৃষ্ঠা সংখ্যা */}
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                        {book.rating || '4.5'}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen size={14} />
                        {book.pages || book.pageCount || 200} পৃষ্ঠা
                      </span>
                    </div>

                    {/* কোয়ান্টিটি এবং প্রাইস */}
                    <div className="flex items-center justify-between mt-auto pt-4 flex-wrap gap-4">
                      {/* Quantity Controls (Library Requests are typically 1 copy, but displays beautifully) */}
                      <div className="flex items-center gap-2 border border-gray-200 dark:border-dark-border rounded-lg p-1 bg-gray-50 dark:bg-dark-bg">
                        <button className="p-1 hover:text-primary-600 dark:hover:text-primary-400 text-gray-400 cursor-not-allowed">
                          <Minus size={14} />
                        </button>
                        <span className="text-sm font-bold text-gray-900 dark:text-white px-2">
                          {quantity}
                        </span>
                        <button className="p-1 hover:text-primary-600 dark:hover:text-primary-400 text-gray-400 cursor-not-allowed">
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* প্রাইস বা চার্জ ডিসপ্লে */}
                      <div className="text-right">
                        <span className="text-xs text-gray-400 block">সার্ভিস ফি</span>
                        <span className="text-lg font-extrabold text-gray-900 dark:text-white">
                          ৳{price * quantity}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* মুছে ফেলার অ্যাকশন */}
                  <button
                    onClick={() => removeFromCart(book.id)}
                    className="absolute top-4 right-4 p-2 bg-gray-50 hover:bg-red-50 dark:bg-dark-bg dark:hover:bg-red-950/20 text-gray-400 hover:text-red-500 dark:hover:text-red-400 rounded-lg transition-colors cursor-pointer"
                    title="ঝুড়ি থেকে সরান"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )
            })}
          </div>

          {/* অর্ডার সামারি */}
          <div className="bg-white dark:bg-dark-card rounded-xl p-6 border border-gray-100 dark:border-dark-border h-fit shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white border-b border-gray-100 dark:border-dark-border pb-4 mb-4">
              অর্ডার সামারি
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>বইয়ের মোট বিল</span>
                <span className="font-semibold text-gray-900 dark:text-white">৳{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600 dark:text-gray-400">
                <span>সার্ভিস গেটওয়ে চার্জ</span>
                <span className="font-semibold text-gray-900 dark:text-white">৳{serviceCharge}</span>
              </div>
              <div className="border-t border-gray-100 dark:border-dark-border pt-3 flex justify-between text-base font-extrabold text-gray-900 dark:text-white">
                <span>সর্বমোট পরিশোধযোগ্য</span>
                <span className="text-primary-600 dark:text-primary-400 text-lg">৳{total}</span>
              </div>
            </div>

            {/* সিকিউরিটি আশ্বাস */}
            <div className="mt-6 p-3 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 rounded-lg text-xs flex items-start gap-2">
              <ShieldCheck size={18} className="flex-shrink-0 mt-0.5" />
              <span>
                আমাদের দ্বীনি লাইব্রেরি প্রসেস সম্পূর্ণ নিরাপদ। বইসমূহ ফেরত দেওয়ার শর্তে কার্ট প্রসেস করা হচ্ছে।
              </span>
            </div>

            {/* চেকআউট বাটন */}
            <button 
              onClick={handleConfirmBooking}
              className="w-full mt-6 bg-primary-600 hover:bg-primary-700 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:shadow-lg transition-all active:scale-[0.98] cursor-pointer"
            >
              বুকিং নিশ্চিত করুন
              <ArrowRight size={16} />
            </button>

            <Link
              to="/books"
              className="text-xs text-primary-600 dark:text-primary-400 hover:underline text-center block mt-4 font-bold"
            >
              আরো বই যোগ করুন
            </Link>
          </div>
        </div>
      ) : (
        /* এম্পটি স্টেট ইউজার ইন্টারফেস */
        <div className="bg-white dark:bg-dark-card rounded-2xl p-12 text-center max-w-2xl mx-auto border border-gray-100 dark:border-dark-border shadow-sm">
          <div className="w-20 h-20 bg-primary-50 dark:bg-primary-950/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCart size={36} className="text-primary-600 dark:text-primary-400 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">আপনার বইয়ের ঝুড়ি খালি</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
            আপনি এখনো কার্টে কোনো বই যুক্ত করেননি। আপনার পছন্দের বইটি কার্টে যুক্ত করুন এবং অর্ডার কনফার্ম করে বাসায় নিয়ে যান।
          </p>
          <Link
            to="/books"
            className="btn-primary px-8 py-3 rounded-full inline-flex items-center gap-2 shadow-lg hover:shadow-primary-500/20 transition-all active:scale-[0.98]"
          >
            বইয়ের গ্যালারিতে চলুন
            <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  )
}

export default Cart
