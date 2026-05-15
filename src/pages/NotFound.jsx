import { Link } from 'react-router-dom'
import { AlertCircle, ArrowLeft, Home } from 'lucide-react'

/* =============================================
   404 Not Found Page
   ============================================= */
const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-dark-bg p-4 transition-colors">
      <div className="text-center max-w-md">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-red-100 dark:bg-red-900/30 text-red-500 mb-6">
          <AlertCircle size={48} />
        </div>
        
        <h1 className="text-6xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">
          ৪০৪
        </h1>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          পেজটি পাওয়া যায়নি!
        </h2>
        
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          আপনি যে পেজটি খুঁজছেন তা হয়তো মুছে ফেলা হয়েছে, নাম পরিবর্তন করা হয়েছে অথবা সাময়িকভাবে অনুপলব্ধ আছে।
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => window.history.back()} 
            className="btn-secondary"
          >
            <ArrowLeft size={18} />
            আগের পেজে যান
          </button>
          <Link to="/" className="btn-primary">
            <Home size={18} />
            হোমপেজে ফিরে যান
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
