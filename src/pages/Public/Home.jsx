import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { BookOpen, Users, BookMarked, ArrowRight, Library as LibraryIcon } from 'lucide-react'
import { useLibrary } from '../../context/LibraryContext'
import BookCard from '../../components/shared/BookCard'
import { categoriesData } from '../../data/categories'

/* =============================================
   Home Page
   হোমপেজে সমস্ত সেকশন থাকবে
   ============================================= */
const Home = () => {
  const { books } = useLibrary()

  // Featured Books (Top rated / newest)
  const featuredBooks = books.slice(0, 4)
  const popularBooks = books.slice(4, 8)

  return (
    <div className="page-wrapper">
      
      {/* =========================
         হোমপেজের হিরো সেকশন
         এখানে main banner এবং call-to-action বাটন দেখানো হচ্ছে
      ========================= */}
      <section className="relative bg-gradient-to-br from-primary-900 via-primary-800 to-accent-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:20px_20px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-white space-y-6 text-center lg:text-left"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                জ্ঞান অর্জনের <br className="hidden lg:block"/>
                <span className="text-accent-400">নতুন দিগন্ত</span> উন্মোচন করুন
              </h1>
              <p className="text-lg md:text-xl text-primary-100 max-w-2xl mx-auto lg:mx-0">
                ভৈরব দ্বীনি পাঠাগারে আপনাকে স্বাগতম। এখানে আপনি পাবেন হাজারো ইসলামিক বই, প্রবন্ধ এবং গবেষণাপত্র সম্পূর্ণ বিনামূল্যে।
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <Link to="/books" className="btn-primary bg-white text-primary-900 hover:bg-gray-100 text-lg px-8 py-3">
                  বই খুঁজুন
                </Link>
                <Link to="/register" className="btn-secondary border-white/30 text-white hover:bg-white/10 dark:hover:bg-white/10 text-lg px-8 py-3">
                  সদস্য হোন
                </Link>
              </div>
            </motion.div>

            {/* Hero Image/Cards Animation */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block h-[500px]"
            >
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
                <img src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" alt="Library" className="rounded-2xl shadow-2xl rotate-[-5deg] hover:rotate-0 transition-transform duration-500 border-4 border-white/20" />
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Curved Divider */}
        <div className="absolute bottom-0 w-full overflow-hidden leading-none rotate-180">
          <svg className="relative block w-full h-[50px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" className="fill-gray-50 dark:fill-dark-bg transition-colors duration-300"></path>
          </svg>
        </div>
      </section>

      {/* =========================
         লাইব্রেরির পরিসংখ্যান সেকশন
         মোট বই, সদস্য এবং অন্যান্য স্ট্যাটিস্টিকস দেখানো হচ্ছে
      ========================= */}
      <section className="py-12 bg-gray-50 dark:bg-dark-bg transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, count: '৫,০০০+', label: 'মোট বই', color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
              { icon: Users, count: '২,৫০০+', label: 'সক্রিয় সদস্য', color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
              { icon: BookMarked, count: '১২,০০০+', label: 'বই ধার দেওয়া হয়েছে', color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
              { icon: LibraryIcon, count: '১৫+', label: 'ক্যাটাগরি', color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
            ].map((stat, idx) => {
              const Icon = stat.icon
              return (
                <div key={idx} className="card p-6 text-center group hover:-translate-y-2 transition-transform duration-300">
                  <div className={`w-14 h-14 mx-auto rounded-full ${stat.bg} ${stat.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon size={28} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.count}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">{stat.label}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* =========================
         জনপ্রিয় বইগুলোর গ্রিড সেকশন
         সবচেয়ে বেশি পঠিত বইগুলো এখানে রেন্ডার করা হচ্ছে
      ========================= */}
      <section className="py-16 bg-white dark:bg-dark-card transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="section-title mb-2">জনপ্রিয় ও নির্বাচিত বই</h2>
              <p className="text-gray-600 dark:text-gray-400">পাঠকদের সবচেয়ে পছন্দের কিছু বই</p>
            </div>
            <Link to="/books" className="hidden sm:flex items-center gap-2 text-primary-600 font-medium hover:text-primary-700 transition-colors">
              সব দেখুন <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
          
          <div className="mt-8 text-center sm:hidden">
            <Link to="/books" className="btn-secondary w-full">সব বই দেখুন</Link>
          </div>
        </div>
      </section>

      {/* =========================
         বইয়ের ক্যাটাগরি সেকশন
         এখানে Mock Data থেকে আসা ক্যাটাগরিগুলো দেখানো হচ্ছে
      ========================= */}
      <section className="py-16 bg-gray-50 dark:bg-dark-bg transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title mb-3">বইয়ের ক্যাটাগরি</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              আপনার পছন্দের বিষয় অনুযায়ী বই খুঁজে বের করুন। আমাদের বিশাল সংগ্রহ থেকে আপনার প্রয়োজনীয় বইটি বেছে নিন।
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categoriesData.slice(0, 10).map((cat, idx) => (
              <Link 
                key={idx} 
                to={`/books?category=${encodeURIComponent(cat.name)}`}
                className="group card p-5 flex flex-col items-center justify-center text-center hover:border-primary-500 hover:shadow-md transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 flex items-center justify-center mb-3 group-hover:scale-110 group-hover:bg-primary-600 group-hover:text-white transition-all">
                  <BookOpen size={24} />
                </div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary-600 transition-colors">{cat.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{cat.count || Math.floor(Math.random() * 100) + 20} টি বই</p>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link to="/categories" className="btn-secondary">সব ক্যাটাগরি দেখুন</Link>
          </div>
        </div>
      </section>

      {/* =========================
         বই দান করার জন্য CTA (Call to Action) ব্যানার
         এখানে ক্লিক করলে ইউজারকে ডোনেশন পেজে নিয়ে যাবে
      ========================= */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-primary rounded-2xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">আমাদের সংগ্রহে বই দান করুন</h2>
              <p className="text-primary-100 mb-8 text-lg">
                আপনার অব্যবহৃত ইসলামিক বইগুলো আমাদের পাঠাগারে দান করে সদাকায়ে জারিয়ার সওয়াব অর্জন করুন। আপনার একটি বই অন্য একজনের জীবন বদলে দিতে পারে।
              </p>
              <Link to="/dashboard/donate" className="btn-primary bg-white text-primary-900 hover:bg-gray-100 text-lg px-8 py-3">
                বই দান করুন
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
         নতুন যুক্ত হওয়া বইয়ের সেকশন
         পাঠাগারে আসা নতুন বইগুলো এখানে দেখা যাবে
      ========================= */}
      <section className="py-16 bg-white dark:bg-dark-card transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="section-title mb-2">নতুন সংযোজন</h2>
              <p className="text-gray-600 dark:text-gray-400">পাঠাগারে নতুন যুক্ত হওয়া বইসমূহ</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {popularBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}

export default Home
