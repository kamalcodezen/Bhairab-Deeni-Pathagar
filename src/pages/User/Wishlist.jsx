import { useLibrary } from '../../context/LibraryContext'
import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import BookCard from '../../components/shared/BookCard'

/* =============================================
   Wishlist Page
   ইউজারের পছন্দের বইয়ের তালিকা
   ============================================= */
const Wishlist = () => {
  const { wishlistBooks } = useLibrary()

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <Heart size={28} className="text-red-500 fill-red-500" />
          আমার উইশলিস্ট
        </h1>
        <p className="text-gray-600 dark:text-gray-400">আপনার পছন্দের তালিকায় রাখা সকল বই</p>
      </div>

      {wishlistBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="card p-12 text-center max-w-2xl mx-auto">
          <div className="w-20 h-20 bg-gray-100 dark:bg-dark-border rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart size={32} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">আপনার উইশলিস্ট খালি</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            আপনার পছন্দের বইটি খুঁজে বের করুন এবং হার্ট আইকনে ক্লিক করে উইশলিস্টে যোগ করুন।
          </p>
          <Link to="/books" className="btn-primary px-8">
            বই খুঁজুন
          </Link>
        </div>
      )}
    </div>
  )
}

export default Wishlist
