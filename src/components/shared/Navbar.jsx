import { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useLibrary } from '../../context/LibraryContext'
import { 
  BookOpen, Search, Menu, X, Sun, Moon, 
  LogOut, Heart, BookMarked, LayoutDashboard 
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

/* =============================================
   Navbar Component
   Amazon/Flipkart স্টাইলের Sticky Navbar
   ============================================= */
const Navbar = () => {
  const { user, logout, isAdmin } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const { wishlist } = useLibrary()
  const navigate = useNavigate()
  const location = useLocation()

  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Scroll detect করা হচ্ছে sticky styling এর জন্য
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Route change হলে mobile menu close করা
  useEffect(() => {
    setMobileMenuOpen(false)
    setUserMenuOpen(false)
  }, [location.pathname])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery)}`)
      setSearchQuery('')
    }
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/90 dark:bg-dark-card/90 backdrop-blur-md shadow-md py-3' 
            : 'bg-white dark:bg-dark-card py-4 border-b border-gray-100 dark:border-dark-border'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
              <div className="bg-primary-600 text-white p-2 rounded-lg group-hover:bg-primary-700 transition-colors">
                <BookOpen size={24} />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                  ভৈরব দ্বীনি<br/><span className="text-primary-600 text-sm">পাঠাগার</span>
                </h1>
              </div>
            </Link>

            {/* Desktop Search */}
            <div className="hidden md:block flex-1 max-w-2xl mx-4">
              <form onSubmit={handleSearch} className="relative group">
                <input
                  type="text"
                  placeholder="বইয়ের নাম, লেখকের নাম অথবা ক্যাটাগরি দিয়ে খুঁজুন..."
                  className="w-full pl-4 pr-12 py-2.5 rounded-full border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="submit"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-primary-600 hover:bg-primary-700 text-white rounded-full transition-colors flex items-center justify-center"
                >
                  <Search size={18} />
                </button>
              </form>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border rounded-full transition-colors"
                title={isDark ? 'লাইট মোড' : 'ডার্ক মোড'}
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>

              {user ? (
                <>
                  <Link to="/dashboard/wishlist" className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-dark-border rounded-full transition-colors relative">
                    <Heart size={20} />
                    {wishlist.length > 0 && (
                      <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {wishlist.length}
                      </span>
                    )}
                  </Link>

                  {/* User Dropdown */}
                  <div className="relative">
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 p-1 pl-2 pr-3 border border-gray-200 dark:border-dark-border rounded-full hover:bg-gray-50 dark:hover:bg-dark-border transition-colors"
                    >
                      <img src={user.avatar} alt="User" className="w-8 h-8 rounded-full border border-gray-200" />
                      <span className="text-sm font-medium hidden lg:block">{user.name.split(' ')[0]}</span>
                    </button>

                    <AnimatePresence>
                      {userMenuOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute right-0 mt-2 w-56 bg-white dark:bg-dark-card rounded-xl shadow-xl border border-gray-100 dark:border-dark-border overflow-hidden"
                        >
                          <div className="p-4 border-b border-gray-100 dark:border-dark-border">
                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{user.name}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
                          </div>
                          <div className="p-2">
                            <Link to={isAdmin ? "/admin" : "/dashboard"} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-border transition-colors">
                              <LayoutDashboard size={18} />
                              ড্যাশবোর্ড
                            </Link>
                            {!isAdmin && (
                              <Link to="/dashboard/borrowed" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-dark-border transition-colors">
                                <BookMarked size={18} />
                                আমার বইসমূহ
                              </Link>
                            )}
                            <button
                              onClick={handleLogout}
                              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                            >
                              <LogOut size={18} />
                              লগআউট
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </>
              ) : (
                <div className="flex items-center gap-3">
                  <Link to="/login" className="text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400 transition-colors px-3 py-2">
                    লগইন
                  </Link>
                  <Link to="/register" className="btn-primary py-2 text-sm">
                    রেজিস্টার
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <button onClick={toggleTheme} className="p-2 text-gray-600 dark:text-gray-300">
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-gray-600 dark:text-gray-300"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Search - Visible only on mobile */}
          <div className="md:hidden mt-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="বই খুঁজুন..."
                className="w-full pl-4 pr-10 py-2 rounded-full border border-gray-200 dark:border-dark-border bg-gray-50 dark:bg-dark-bg text-sm focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-400">
                <Search size={16} />
              </button>
            </form>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-[110px] left-0 w-full bg-white dark:bg-dark-card shadow-xl z-40 border-b border-gray-100 dark:border-dark-border overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-dark-border">হোম</Link>
              <Link to="/books" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-dark-border">বইসমূহ</Link>
              <Link to="/categories" className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-dark-border">ক্যাটাগরি</Link>
              
              {user ? (
                <>
                  <div className="border-t border-gray-200 dark:border-dark-border pt-3 mt-3">
                    <div className="flex items-center px-3 py-2">
                      <img src={user.avatar} alt="User" className="w-10 h-10 rounded-full" />
                      <div className="ml-3">
                        <p className="text-base font-medium text-gray-900 dark:text-white">{user.name}</p>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{user.email}</p>
                      </div>
                    </div>
                    <Link to={isAdmin ? "/admin" : "/dashboard"} className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-dark-border mt-2">
                      ড্যাশবোর্ড
                    </Link>
                    <button onClick={handleLogout} className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                      লগআউট
                    </button>
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <Link to="/login" className="btn-secondary w-full">লগইন</Link>
                  <Link to="/register" className="btn-primary w-full">রেজিস্টার</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
