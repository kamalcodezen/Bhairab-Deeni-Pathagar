/* =============================================
   Books Catalog Page
   সব বইয়ের তালিকা, ফিল্টার ও সার্চ অপশন
   ============================================= */

import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, Filter, SlidersHorizontal, ChevronDown, Check } from 'lucide-react'
import { useLibrary } from '../../context/LibraryContext'
import { categoriesData } from '../../data/categories'
import BookCard from '../../components/shared/BookCard'

const BooksCatalog: React.FC = () => {
  const { books } = useLibrary()
  const [searchParams, setSearchParams] = useSearchParams()
  
  // URL params
  const initialSearch = searchParams.get('search') || ''
  const initialCategory = searchParams.get('category') || ''

  // States
  const [searchQuery, setSearchQuery] = useState<string>(initialSearch)
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory)
  const [sortBy, setSortBy] = useState<string>('newest')
  const [showFilters, setShowFilters] = useState<boolean>(false)

  // Filter & Sort Logic
  const filteredBooks = useMemo(() => {
    let result = [...books]

    // Search filter
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      result = result.filter(book => 
        book.title.toLowerCase().includes(q) || 
        book.author.toLowerCase().includes(q) ||
        book.category.toLowerCase().includes(q)
      )
    }

    // Category filter
    if (selectedCategory) {
      result = result.filter(book => book.category === selectedCategory)
    }

    // Sort
    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime())
        break
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt || 0).getTime() - new Date(b.createdAt || 0).getTime())
        break
      case 'title-asc':
        result.sort((a, b) => a.title.localeCompare(b.title))
        break
      case 'title-desc':
        result.sort((a, b) => b.title.localeCompare(a.title))
        break
      case 'popular':
        result.sort((a, b) => (b.borrowCount || 0) - (a.borrowCount || 0))
        break
      default:
        break
    }

    return result
  }, [books, searchQuery, selectedCategory, sortBy])

  // Handlers
  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    updateURLParams({ search: searchQuery })
  }

  const handleCategoryChange = (category: string) => {
    const newCategory = selectedCategory === category ? '' : category
    setSelectedCategory(newCategory)
    updateURLParams({ category: newCategory })
  }

  const updateURLParams = (newParams: Record<string, string>) => {
    const params = new URLSearchParams(searchParams)
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) params.set(key, value)
      else params.delete(key)
    })
    setSearchParams(params)
  }

  return (
    <div className="bg-gray-50 dark:bg-dark-bg min-h-screen py-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">পাঠাগারের বইসমূহ</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              আমাদের বিশাল সংগ্রহ থেকে আপনার পছন্দের বইটি খুঁজে নিন। মোট {filteredBooks.length} টি বই পাওয়া গেছে।
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300 py-2.5 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer text-sm"
              >
                <option value="newest">নতুন সংযোজন</option>
                <option value="popular">জনপ্রিয়</option>
                <option value="title-asc">নাম (অ-ক্ষ)</option>
                <option value="title-desc">নাম (ক্ষ-অ)</option>
                <option value="oldest">পুরাতন</option>
              </select>
              <ChevronDown size={16} className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" />
            </div>

            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden p-2.5 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg text-gray-700 dark:text-gray-300"
            >
              <Filter size={20} />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar / Filters */}
          <aside className={`lg:w-1/4 flex-shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="card p-5 sticky top-24">
              <div className="flex items-center gap-2 mb-6 text-gray-900 dark:text-white font-bold text-lg">
                <SlidersHorizontal size={20} />
                ফিল্টার করুন
              </div>

              {/* Search filter */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">সার্চ</h3>
                <form onSubmit={handleSearchSubmit} className="relative">
                  <input
                    type="text"
                    placeholder="বই, লেখক..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-dark-border rounded-lg bg-gray-50 dark:bg-dark-bg focus:ring-2 focus:ring-primary-500 text-sm"
                  />
                  <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
                </form>
              </div>

              {/* Category filter */}
              <div>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3 uppercase tracking-wider">ক্যাটাগরি</h3>
                <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                  {categoriesData.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category.name
                          ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 font-medium'
                          : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-dark-border'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{category.icon}</span>
                        <span>{category.name}</span>
                      </div>
                      {selectedCategory === category.name && <Check size={14} className="text-primary-600" />}
                    </button>
                  ))}
                </div>
                
                {selectedCategory && (
                  <button 
                    onClick={() => handleCategoryChange(selectedCategory)}
                    className="w-full mt-4 text-xs text-red-500 hover:text-red-600 font-medium text-center py-2"
                  >
                    ফিল্টার মুছুন
                  </button>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content / Book Grid */}
          <main className="flex-1">
            {filteredBooks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredBooks.map(book => (
                  <BookCard key={book.id} book={book} />
                ))}
              </div>
            ) : (
              <div className="card p-12 text-center h-full flex flex-col items-center justify-center">
                <div className="w-20 h-20 bg-gray-100 dark:bg-dark-border rounded-full flex items-center justify-center mb-4">
                  <Search size={32} className="text-gray-400" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">কোনো বই পাওয়া যায়নি</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                  আপনার সার্চ বা ফিল্টার অনুযায়ী কোনো বই আমাদের সংগ্রহে নেই। দয়া করে অন্য কোনো নামে বা ক্যাটাগরিতে চেষ্টা করুন।
                </p>
                <button 
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('')
                    setSearchParams({})
                  }}
                  className="mt-6 btn-primary"
                >
                  সব ফিল্টার মুছুন
                </button>
              </div>
            )}
          </main>

        </div>
      </div>
    </div>
  )
}

export default BooksCatalog
