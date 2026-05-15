import { useAuth } from '../../context/AuthContext'
import { useLibrary } from '../../context/LibraryContext'
import { BookMarked, History, Heart, Bell } from 'lucide-react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

/* =============================================
   User Dashboard Overview
   সাধারণ ইউজারের মূল ড্যাশবোর্ড পেজ
   ============================================= */
const UserDashboard = () => {
  const { user } = useAuth()
  const { userBorrows, wishlistBooks } = useLibrary()

  // Statistics
  const activeBorrows = userBorrows.filter(b => b.status === 'active' || b.status === 'pending')
  const returnedBooks = userBorrows.filter(b => b.status === 'returned')

  const stats = [
    { label: 'বর্তমান ধার', count: activeBorrows.length, icon: BookMarked, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { label: 'মোট পঠিত', count: returnedBooks.length, icon: History, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
    { label: 'উইশলিস্ট', count: wishlistBooks.length, icon: Heart, color: 'text-red-600', bg: 'bg-red-100 dark:bg-red-900/30' },
    { label: 'দানকৃত বই', count: user?.donatedCount || 0, icon: BookMarked, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  ]

  return (
    <div>
      {/* Welcome Section */}
      <div className="bg-white dark:bg-dark-card rounded-2xl p-6 md:p-8 mb-8 border border-gray-100 dark:border-dark-border shadow-sm flex flex-col md:flex-row items-center gap-6 justify-between">
        <div className="flex items-center gap-5">
          <img 
            src={user?.avatar} 
            alt={user?.name} 
            className="w-20 h-20 rounded-full border-4 border-primary-100 dark:border-primary-900/30 object-cover"
          />
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
              আসসালামু আলাইকুম, {user?.name?.split(' ')[0]}!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              আপনার পাঠাগার ড্যাশবোর্ডে স্বাগতম। আপনার সকল কার্যক্রম এখান থেকে পরিচালনা করতে পারবেন।
            </p>
          </div>
        </div>
        <Link to="/books" className="btn-primary whitespace-nowrap hidden md:flex">
          নতুন বই খুঁজুন
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="card p-5 flex items-center gap-4 hover:-translate-y-1 transition-transform">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg} ${stat.color} shrink-0`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900 dark:text-white leading-none mb-1">{stat.count}</p>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Borrows */}
        <div className="lg:col-span-2 space-y-6">
          <div className="card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">সাম্প্রতিক ধার নেওয়া বই</h2>
              <Link to="/dashboard/borrowed" className="text-sm font-medium text-primary-600 hover:text-primary-700">সব দেখুন</Link>
            </div>

            {activeBorrows.length > 0 ? (
              <div className="space-y-4">
                {activeBorrows.slice(0, 3).map(borrow => (
                  <div key={borrow.id} className="flex gap-4 p-4 rounded-xl border border-gray-100 dark:border-dark-border bg-gray-50 dark:bg-dark-bg">
                    <img src={borrow.bookCover} alt={borrow.bookTitle} className="w-16 h-24 object-cover rounded shadow-sm" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 dark:text-white truncate mb-1">{borrow.bookTitle}</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 truncate">{borrow.bookAuthor}</p>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className={`badge ${
                          borrow.status === 'active' ? 'badge-primary' : 'badge-warning'
                        }`}>
                          {borrow.status === 'active' ? 'অনুমোদিত' : 'অপেক্ষমান'}
                        </span>
                        <span className="text-xs text-gray-500">
                          ধার: {format(new Date(borrow.borrowDate), 'dd MMM, yyyy')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <BookMarked size={48} className="mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500 mb-4">আপনার বর্তমানে কোনো ধার নেওয়া বই নেই</p>
                <Link to="/books" className="btn-secondary text-sm">বই খুঁজুন</Link>
              </div>
            )}
          </div>
        </div>

        {/* Notifications or Activity */}
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <Bell size={18} /> নোটিফিকেশন
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded-r-lg">
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  আপনার <strong>"কুরআনুল কারীম"</strong> বইটির ধারের মেয়াদ আর ২ দিন বাকি আছে।
                </p>
                <span className="text-xs text-gray-500 mt-1 block">২ ঘন্টা আগে</span>
              </div>
              <div className="p-3 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-r-lg">
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  আপনার ধারের আবেদনটি অনুমোদিত হয়েছে। লাইব্রেরি থেকে বইটি সংগ্রহ করুন।
                </p>
                <span className="text-xs text-gray-500 mt-1 block">গতকাল</span>
              </div>
              <div className="p-3 bg-gray-50 dark:bg-dark-border/50 border-l-4 border-gray-400 rounded-r-lg">
                <p className="text-sm text-gray-800 dark:text-gray-200">
                  স্বাগতম! ভৈরব দ্বীনি পাঠাগারে আপনার অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে।
                </p>
                <span className="text-xs text-gray-500 mt-1 block">৩ দিন আগে</span>
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <Link to="/dashboard/notifications" className="text-sm font-medium text-primary-600 hover:text-primary-700">সব নোটিফিকেশন দেখুন</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
