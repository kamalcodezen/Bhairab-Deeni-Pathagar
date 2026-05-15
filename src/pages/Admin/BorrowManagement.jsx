import { useState } from 'react'
import { useLibrary } from '../../context/LibraryContext'
import { Search, CheckCircle, XCircle } from 'lucide-react'
import { format } from 'date-fns'

/* =============================================
   Borrow Management Page
   বই ধারের আবেদন ও অনুমোদন পরিচালনা
   ============================================= */
const BorrowManagement = () => {
  const { borrows, approveBorrow, rejectBorrow, returnBook } = useLibrary()
  const [filter, setFilter] = useState('all') // 'all', 'pending', 'active', 'returned'
  const [searchQuery, setSearchQuery] = useState('')

  // Filter Borrows
  const filteredBorrows = borrows.filter(borrow => {
    const matchesFilter = filter === 'all' || borrow.status === filter
    const matchesSearch = 
      borrow.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      borrow.userName.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending': return <span className="badge badge-warning">অপেক্ষমান</span>
      case 'active': return <span className="badge badge-primary">অনুমোদিত</span>
      case 'returned': return <span className="badge badge-success">ফেরত দেওয়া হয়েছে</span>
      case 'rejected': return <span className="badge badge-error">বাতিল</span>
      default: return null
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">ধার ম্যানেজমেন্ট</h1>
        <p className="text-gray-600 dark:text-gray-400">পাঠকদের বই ধারের আবেদন পর্যালোচনা ও পরিচালনা করুন</p>
      </div>

      <div className="card overflow-hidden">
        {/* Header Actions */}
        <div className="p-4 border-b border-gray-100 dark:border-dark-border flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-50 dark:bg-dark-border/30">
          
          <div className="flex gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
            <button 
              onClick={() => setFilter('all')} 
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === 'all' ? 'bg-primary-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              সকল
            </button>
            <button 
              onClick={() => setFilter('pending')} 
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === 'pending' ? 'bg-amber-500 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              অপেক্ষমান
            </button>
            <button 
              onClick={() => setFilter('active')} 
              className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === 'active' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              অনুমোদিত
            </button>
          </div>

          <div className="relative w-full md:w-64">
            <input 
              type="text" 
              placeholder="বই বা ইউজার খুঁজুন..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:ring-2 focus:ring-primary-500 text-sm"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="data-table min-w-[800px]">
            <thead>
              <tr>
                <th>বই ও পাঠক</th>
                <th>তারিখসমূহ</th>
                <th>স্ট্যাটাস</th>
                <th className="text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {filteredBorrows.map((borrow) => (
                <tr key={borrow.id}>
                  <td>
                    <div className="flex gap-3 items-center">
                      <img src={borrow.bookCover} alt="" className="w-12 h-16 object-cover rounded shadow-sm" />
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white leading-tight">{borrow.bookTitle}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">পাঠক: <span className="font-medium text-gray-800 dark:text-gray-200">{borrow.userName}</span></div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="text-sm">
                      <div><span className="text-gray-500">আবেদন:</span> {format(new Date(borrow.borrowDate), 'dd MMM yyyy')}</div>
                      <div><span className="text-gray-500">ফেরত:</span> <span className="font-medium text-gray-900 dark:text-white">{format(new Date(borrow.dueDate), 'dd MMM yyyy')}</span></div>
                    </div>
                  </td>
                  <td>
                    {getStatusBadge(borrow.status)}
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      {borrow.status === 'pending' && (
                        <>
                          <button 
                            onClick={() => approveBorrow(borrow.id)}
                            className="btn-primary text-xs py-1.5 px-3 bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle size={14} className="mr-1 inline" /> অনুমোদন
                          </button>
                          <button 
                            onClick={() => {
                              if(window.confirm('আবেদনটি বাতিল করতে চান?')) rejectBorrow(borrow.id)
                            }}
                            className="btn-secondary text-xs py-1.5 px-3 text-red-600 hover:bg-red-50"
                          >
                            <XCircle size={14} className="mr-1 inline" /> বাতিল
                          </button>
                        </>
                      )}
                      
                      {borrow.status === 'active' && (
                        <button 
                          onClick={() => {
                            if(window.confirm('বইটি ফেরত নেওয়া হয়েছে?')) returnBook(borrow.id)
                          }}
                          className="btn-primary text-xs py-1.5 px-3"
                        >
                          ফেরত গ্রহণ
                        </button>
                      )}
                      
                      {(borrow.status === 'returned' || borrow.status === 'rejected') && (
                        <span className="text-sm text-gray-400">কোনো অ্যাকশন নেই</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {filteredBorrows.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-gray-500">
                    কোনো তথ্য পাওয়া যায়নি
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default BorrowManagement
