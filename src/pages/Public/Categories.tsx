/* =============================================
   Categories Page
   সব ক্যাটাগরি তালিকা
   ============================================= */

import React from 'react'
import { Link } from 'react-router-dom'
import { Search, ArrowRight } from 'lucide-react'
import { categoriesData } from '../../data/categories'

const Categories: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-dark-bg min-h-screen py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">সকল ক্যাটাগরি</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            আমাদের পাঠাগারের সকল বিষয়ভিত্তিক ক্যাটাগরিগুলো ব্রাউজ করুন এবং আপনার প্রয়োজনীয় বইটি খুঁজে নিন।
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoriesData.map((category) => (
            <Link 
              key={category.id}
              to={`/books?category=${encodeURIComponent(category.name)}`}
              className="card group hover:-translate-y-2 transition-all duration-300 p-6 flex flex-col h-full"
            >
              <div className="flex items-start gap-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-3xl shrink-0 transition-transform group-hover:scale-110
                  ${category.color === 'teal' ? 'bg-teal-100 text-teal-600 dark:bg-teal-900/30 dark:text-teal-400' : ''}
                  ${category.color === 'emerald' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400' : ''}
                  ${category.color === 'blue' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : ''}
                  ${category.color === 'purple' ? 'bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400' : ''}
                  ${category.color === 'amber' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400' : ''}
                  ${category.color === 'rose' ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/30 dark:text-rose-400' : ''}
                  ${category.color === 'indigo' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400' : ''}
                  ${category.color === 'yellow' ? 'bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-400' : ''}
                  ${category.color === 'cyan' ? 'bg-cyan-100 text-cyan-600 dark:bg-cyan-900/30 dark:text-cyan-400' : ''}
                  ${category.color === 'pink' ? 'bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400' : ''}
                  ${category.color === 'lime' ? 'bg-lime-100 text-lime-600 dark:bg-lime-900/30 dark:text-lime-400' : ''}
                  ${category.color === 'orange' ? 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400' : ''}
                `}>
                  {category.icon}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {category.description}
                  </p>
                </div>
              </div>
              
              <div className="mt-auto pt-4 border-t border-gray-100 dark:border-dark-border flex items-center justify-between">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-dark-border px-3 py-1 rounded-full">
                  {category.count || Math.floor(Math.random() * 50) + 10} টি বই
                </span>
                <span className="text-primary-600 dark:text-primary-400 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1 font-medium text-sm">
                  ব্রাউজ করুন <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Search CTA */}
        <div className="mt-16 bg-primary-600 rounded-2xl p-8 md:p-12 text-center text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="text-left max-w-xl">
            <h2 className="text-2xl md:text-3xl font-bold mb-2">নির্দিষ্ট কোনো বই খুঁজছেন?</h2>
            <p className="text-primary-100">আমাদের উন্নত সার্চ ব্যবহার করে খুব সহজেই আপনার কাঙ্ক্ষিত বইটি খুঁজে বের করুন।</p>
          </div>
          <Link to="/books" className="btn-secondary whitespace-nowrap px-8 py-3 bg-white text-primary-900 hover:bg-gray-50 border-none shadow-lg w-full md:w-auto">
            <Search size={18} className="mr-2 inline" />
            বই সার্চ করুন
          </Link>
        </div>

      </div>
    </div>
  )
}

export default Categories
