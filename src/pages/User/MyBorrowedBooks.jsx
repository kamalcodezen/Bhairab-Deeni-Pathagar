import { useLibrary } from '../../context/LibraryContext'
import { BookMarked, AlertCircle, Clock, CheckCircle2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { format, formatDistanceToNow, isPast } from 'date-fns'
import { bn } from 'date-fns/locale'

/* =============================================
   My Borrowed Books Page
   ইউজারের ধার নেওয়া বইয়ের তালিকা
   ============================================= */
const MyBorrowedBooks = () => {
  const { userBorrows, returnBook } = useLibrary()

  // শুধুমাত্র active এবং pending বইগুলো দেখানো হবে
  const activeBorrows = userBorrows.filter(
    b => b.status === 'active' || b.status === 'pending'
  )

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">আমার ধার নেওয়া বইসমূহ</h1>
        <p className="text-gray-600 dark:text-gray-400">আপনার বর্তমানে ধার নেওয়া সকল বইয়ের তালিকা এবং মেয়াদ</p>
      </div>

      {activeBorrows.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeBorrows.map((borrow) => {
            const isPending = borrow.status === 'pending'
            const dueDate = new Date(borrow.dueDate)
            const isOverdue = !isPending && isPast(dueDate)
            
            return (
              <div key={borrow.id} className="card overflow-hidden flex flex-col relative group">
                {/* Status Ribbon */}
                <div className={`absolute top-4 -right-10 transform rotate-45 px-10 py-1 text-xs font-bold text-white shadow-md z-10 ${
                  isPending ? 'bg-amber-500' : (isOverdue ? 'bg-red-500' : 'bg-green-500')
                }`}>
                  {isPending ? 'অপেক্ষমান' : (isOverdue ? 'মেয়াদোত্তীর্ণ' : 'অনুমোদিত')}
                </div>

                <div className="p-5 flex gap-4 bg-gray-50 dark:bg-dark-border/30 border-b border-gray-100 dark:border-dark-border">
                  <Link to={`/book/${borrow.bookId}`} className="shrink-0 group-hover:scale-105 transition-transform">
                    <img 
                      src={borrow.bookCover} 
                      alt={borrow.bookTitle} 
                      className="w-24 h-36 object-cover rounded shadow-md border border-gray-200 dark:border-dark-border" 
                    />
                  </Link>
                  <div className="flex flex-col justify-center">
                    <div className="text-xs font-medium text-primary-600 dark:text-primary-400 mb-1">
                      {isPending ? 'অনুমোদনের অপেক্ষায়' : 'ধার নেওয়া হয়েছে'}
                    </div>
                    <Link to={`/book/${borrow.bookId}`}>
                      <h3 className="font-bold text-gray-900 dark:text-white leading-tight mb-2 hover:text-primary-600 transition-colors">
                        {borrow.bookTitle}
                      </h3>
                    </Link>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {borrow.bookAuthor}
                    </p>
                  </div>
                </div>

                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div className="space-y-3 mb-5">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">ধার নেওয়ার তারিখ:</span>
                      <span className="font-medium text-gray-900 dark:text-white">
                        {format(new Date(borrow.borrowDate), 'dd MMM, yyyy')}
                      </span>
                    </div>
                    {!isPending && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">ফেরত দেওয়ার শেষ তারিখ:</span>
                        <span className={`font-medium ${isOverdue ? 'text-red-600' : 'text-gray-900 dark:text-white'}`}>
                          {format(dueDate, 'dd MMM, yyyy')}
                        </span>
                      </div>
                    )}
                  </div>

                  {!isPending && (
                    <div className={`p-3 rounded-lg mb-5 text-sm flex items-start gap-2 ${
                      isOverdue 
                        ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400 border border-red-100 dark:border-red-900/30' 
                        : 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 border border-blue-100 dark:border-blue-900/30'
                    }`}>
                      {isOverdue ? (
                        <>
                          <AlertCircle size={18} className="shrink-0 mt-0.5" />
                          <p>আপনার বইটি ফেরত দেওয়ার সময় শেষ হয়ে গেছে! অনুগ্রহ করে দ্রুত বইটি ফেরত দিন।</p>
                        </>
                      ) : (
                        <>
                          <Clock size={18} className="shrink-0 mt-0.5" />
                          <p>বইটি ফেরত দিতে আর <strong>{formatDistanceToNow(dueDate, { locale: bn })}</strong> বাকি আছে।</p>
                        </>
                      )}
                    </div>
                  )}

                  <button 
                    onClick={() => {
                      if(window.confirm('আপনি কি নিশ্চিত যে বইটি ফেরত দিতে চান?')) {
                        returnBook(borrow.id)
                      }
                    }}
                    disabled={isPending}
                    className={`w-full py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors ${
                      isPending 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-dark-border dark:text-gray-500' 
                        : 'bg-primary-600 text-white hover:bg-primary-700 shadow-sm'
                    }`}
                  >
                    <CheckCircle2 size={18} />
                    {isPending ? 'অপেক্ষমান' : 'বই ফেরত দিন'}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="card p-12 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-gray-100 dark:bg-dark-border rounded-full flex items-center justify-center mx-auto mb-6">
            <BookMarked size={32} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">আপনি কোনো বই ধার নেননি</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            পাঠাগার থেকে আপনার পছন্দের বইটি খুঁজে বের করুন এবং খুব সহজেই ধার নিন। আমাদের সংগ্রহে হাজারো ইসলামিক বই রয়েছে।
          </p>
          <Link to="/books" className="btn-primary px-8">
            বই খুঁজুন
          </Link>
        </div>
      )}
    </div>
  )
}

export default MyBorrowedBooks
