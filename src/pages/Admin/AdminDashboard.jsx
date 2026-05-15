import { useLibrary } from '../../context/LibraryContext'
import { BookCopy, Users, ArrowRightLeft, Gift, TrendingUp } from 'lucide-react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line
} from 'recharts'

/* =============================================
   Admin Dashboard Overview
   অ্যাডমিনের মূল ড্যাশবোর্ড পেজ (Analytics + Overview)
   ============================================= */
const AdminDashboard = () => {
  const { books, borrows } = useLibrary()

  // Fake Data for Charts
  const borrowStats = [
    { name: 'শনি', count: 12 },
    { name: 'রবি', count: 19 },
    { name: 'সোম', count: 15 },
    { name: 'মঙ্গল', count: 22 },
    { name: 'বুধ', count: 18 },
    { name: 'বৃহঃ', count: 25 },
    { name: 'শুক্র', count: 30 },
  ]

  const categoryStats = [
    { name: 'কুরআন', count: 45 },
    { name: 'হাদীস', count: 38 },
    { name: 'ফিকহ', count: 52 },
    { name: 'সীরাত', count: 31 },
    { name: 'আকীদা', count: 28 },
  ]

  // Stats
  const pendingBorrows = borrows.filter(b => b.status === 'pending')
  const activeBorrows = borrows.filter(b => b.status === 'active')

  const stats = [
    { label: 'মোট বই', count: books.length, icon: BookCopy, color: 'text-blue-500', bg: 'bg-blue-100 dark:bg-blue-900/30' },
    { label: 'মোট ইউজার', count: '২,৫০০+', icon: Users, color: 'text-green-500', bg: 'bg-green-100 dark:bg-green-900/30' },
    { label: 'বর্তমান ধার', count: activeBorrows.length, icon: ArrowRightLeft, color: 'text-purple-500', bg: 'bg-purple-100 dark:bg-purple-900/30' },
    { label: 'অপেক্ষমান আবেদন', count: pendingBorrows.length, icon: TrendingUp, color: 'text-amber-500', bg: 'bg-amber-100 dark:bg-amber-900/30' },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">অ্যাডমিন ড্যাশবোর্ড</h1>
        <p className="text-gray-600 dark:text-gray-400">পাঠাগারের সার্বিক অবস্থার একনজর</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <div key={idx} className="card p-6 flex items-center gap-5">
              <div className={`w-14 h-14 rounded-full flex items-center justify-center ${stat.bg} ${stat.color} shrink-0`}>
                <Icon size={28} />
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900 dark:text-white leading-tight mb-1">{stat.count}</p>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.label}</p>
              </div>
            </div>
          )
        })}
      </div>

      <div className="grid xl:grid-cols-2 gap-8 mb-8">
        {/* Borrow Chart */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">গত ৭ দিনে বই ধারের পরিসংখ্যান</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={borrowStats} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <Line type="monotone" dataKey="count" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 8 }} />
                <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" tick={{ fill: '#6b7280' }} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" tick={{ fill: '#6b7280' }} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#374151' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Chart */}
        <div className="card p-6">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-6">টপ ৫ ক্যাটাগরির বই</h2>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryStats} margin={{ top: 5, right: 20, bottom: 5, left: 0 }} barSize={30}>
                <CartesianGrid stroke="#e5e7eb" strokeDasharray="5 5" vertical={false} />
                <XAxis dataKey="name" stroke="#6b7280" tick={{ fill: '#6b7280' }} tickLine={false} axisLine={false} />
                <YAxis stroke="#6b7280" tick={{ fill: '#6b7280' }} tickLine={false} axisLine={false} />
                <RechartsTooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Pending Borrows */}
      <div className="card overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-dark-border flex justify-between items-center bg-gray-50 dark:bg-dark-border/30">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">সাম্প্রতিক অপেক্ষমান আবেদন</h2>
          <Link to="/admin/borrows" className="btn-secondary text-sm py-1.5 px-4">সব দেখুন</Link>
        </div>
        
        <div className="overflow-x-auto">
          {pendingBorrows.length > 0 ? (
            <table className="data-table">
              <thead>
                <tr>
                  <th>বইয়ের নাম</th>
                  <th>ইউজারের নাম</th>
                  <th>আবেদনের তারিখ</th>
                  <th>স্ট্যাটাস</th>
                  <th>অ্যাকশন</th>
                </tr>
              </thead>
              <tbody>
                {pendingBorrows.slice(0, 5).map((borrow) => (
                  <tr key={borrow.id}>
                    <td>
                      <div className="flex items-center gap-3">
                        <img src={borrow.bookCover} alt="" className="w-10 h-14 object-cover rounded" />
                        <span className="font-medium text-gray-900 dark:text-white">{borrow.bookTitle}</span>
                      </div>
                    </td>
                    <td>{borrow.userName}</td>
                    <td>{format(new Date(borrow.borrowDate), 'dd MMM, yyyy')}</td>
                    <td>
                      <span className="badge badge-warning">অপেক্ষমান</span>
                    </td>
                    <td>
                      <Link to="/admin/borrows" className="text-primary-600 hover:text-primary-800 font-medium text-sm">
                        পর্যালোচনা করুন
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-gray-500">
              বর্তমানে কোনো অপেক্ষমান আবেদন নেই।
            </div>
          )}
        </div>
      </div>

    </div>
  )
}

export default AdminDashboard
