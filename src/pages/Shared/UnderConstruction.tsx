/* =============================================
   UnderConstruction Component
   বর্তমানে ডেভলপমেন্টাধীন পেইজগুলোর জন্য প্লেসহোল্ডার
   ============================================= */

import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Construction } from 'lucide-react'

interface UnderConstructionProps {
  title: string
}

const UnderConstruction: React.FC<UnderConstructionProps> = ({ title }) => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 via-primary-50/20 to-gray-100 dark:from-dark-bg dark:via-primary-950/5 dark:to-dark-bg">
      <div className="max-w-md w-full text-center space-y-8 p-8 bg-white/80 dark:bg-dark-card/80 backdrop-blur-xl border border-gray-200/50 dark:border-dark-border/50 rounded-3xl shadow-xl transition-all duration-300">
        
        {/* Animated Construction Icon Wrapper */}
        <div className="relative mx-auto w-24 h-24 flex items-center justify-center bg-primary-50 dark:bg-primary-950/30 text-primary-600 dark:text-primary-450 rounded-2xl shadow-inner overflow-hidden group">
          <div className="absolute inset-0 bg-primary-100/50 dark:bg-primary-900/10 scale-0 group-hover:scale-100 transition-transform duration-500 rounded-2xl"></div>
          <Construction size={48} className="relative z-10 animate-bounce" />
        </div>

        {/* Text Details */}
        <div className="space-y-3">
          <span className="inline-block px-3 py-1 bg-amber-50 dark:bg-amber-950/20 border border-amber-250/20 text-amber-700 dark:text-amber-400 rounded-full text-xs font-bold uppercase tracking-wider">
            নির্মাণাধীন
          </span>
          
          <h2 className="text-2xl font-extrabold text-gray-900 dark:text-white tracking-tight">
            {title}
          </h2>
          
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed max-w-sm mx-auto">
            প্রিয় পাঠক, এই সেকশনটি বর্তমানে ডেভলপমেন্টাধীন রয়েছে। একটি আধুনিক এবং চমৎকার অভিজ্ঞতা উপহার দিতে আমরা কাজ করছি। শীঘ্রই এটি সবার জন্য উন্মুক্ত করা হবে।
          </p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 w-full bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-bold text-sm shadow-md hover:shadow-primary-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 cursor-pointer"
          >
            <ArrowLeft size={16} />
            ড্যাশবোর্ডে ফিরে যান
          </Link>
        </div>
        
      </div>
    </div>
  )
}

export default UnderConstruction
