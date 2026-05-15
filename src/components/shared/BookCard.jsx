import { Link } from 'react-router-dom'
import { Heart, Star, BookOpen } from 'lucide-react'
import { useLibrary } from '../../context/LibraryContext'

/* =============================================
   Book Card Component
   বই দেখানোর জন্য রিইউজেবল কার্ড (Amazon/Flipkart স্টাইল)
   ============================================= */
const BookCard = ({ book }) => {
  const { toggleWishlist, isInWishlist } = useLibrary()
  const isWishlisted = isInWishlist(book.id)

  return (
    <div className="card-hover group relative bg-white dark:bg-dark-card rounded-xl overflow-hidden flex flex-col h-full border border-gray-100 dark:border-dark-border">
      
      {/* Book Cover Image */}
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 dark:bg-dark-border">
        <Link to={`/book/${book.id}`}>
          <img
            src={book.cover || `https://source.unsplash.com/400x600/?book,${book.categoryId}`}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </Link>
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {book.isNew && (
            <span className="badge bg-primary-600 text-white border-none px-2 py-1 text-xs shadow-sm">
              নতুন
            </span>
          )}
          {book.availableCopies < 1 ? (
            <span className="badge bg-red-500 text-white border-none px-2 py-1 text-xs shadow-sm">
              স্টক আউট
            </span>
          ) : (
            <span className="badge bg-green-500 text-white border-none px-2 py-1 text-xs shadow-sm">
              স্টকে আছে
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            toggleWishlist(book.id)
          }}
          className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm rounded-full shadow-sm hover:scale-110 transition-transform duration-200"
        >
          <Heart 
            size={18} 
            className={`transition-colors duration-200 ${
              isWishlisted 
                ? 'fill-red-500 text-red-500' 
                : 'text-gray-400 hover:text-red-500'
            }`} 
          />
        </button>
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="text-xs text-primary-600 dark:text-primary-400 font-medium mb-1 truncate">
          {book.category}
        </div>
        
        <Link to={`/book/${book.id}`} className="group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-2 mb-1 leading-snug">
            {book.title}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 truncate">
          {book.author}
        </p>

        <div className="mt-auto pt-3 border-t border-gray-100 dark:border-dark-border flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {book.rating || '4.5'}
            </span>
            <span className="text-xs text-gray-400">
              ({book.reviewCount || 0})
            </span>
          </div>
          
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <BookOpen size={14} />
            <span className="text-xs font-medium">{book.pageCount || 200} পৃষ্ঠা</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BookCard
