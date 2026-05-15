import { useState } from 'react'
import { useLibrary } from '../../context/LibraryContext'
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react'
import { Link } from 'react-router-dom'
import { format } from 'date-fns'

/* =============================================
   Manage Books Page
   অ্যাডমিনের বই পরিচালনা পেজ (Table UI)
   ============================================= */
const ManageBooks = () => {
  const { books, deleteBook } = useLibrary()
  const [searchQuery, setSearchQuery] = useState('')

  // Filter books based on search
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
    book.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDelete = (id) => {
    if (window.confirm('আপনি কি নিশ্চিত যে এই বইটি মুছে ফেলতে চান?')) {
      deleteBook(id)
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">বই ম্যানেজমেন্ট</h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">মোট {books.length} টি বই আছে</p>
        </div>
        <Link to="/admin/books/add" className="btn-primary">
          <Plus size={18} />
          নতুন বই যোগ করুন
        </Link>
      </div>

      <div className="card overflow-hidden">
        {/* Search Header */}
        <div className="p-4 border-b border-gray-100 dark:border-dark-border flex items-center justify-between bg-gray-50 dark:bg-dark-border/30">
          <div className="relative w-full max-w-md">
            <input 
              type="text" 
              placeholder="বই, লেখক বা ক্যাটাগরি দিয়ে খুঁজুন..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 dark:border-dark-border rounded-lg bg-white dark:bg-dark-bg focus:ring-2 focus:ring-primary-500 text-sm"
            />
            <Search size={16} className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>বইয়ের নাম</th>
                <th>ক্যাটাগরি</th>
                <th>স্ট্যাটাস</th>
                <th>সংযোজন তারিখ</th>
                <th className="text-right">অ্যাকশন</th>
              </tr>
            </thead>
            <tbody>
              {filteredBooks.map((book) => (
                <tr key={book.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      <img src={book.cover} alt={book.title} className="w-10 h-14 object-cover rounded bg-gray-100" />
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">{book.title}</div>
                        <div className="text-xs text-gray-500">{book.author}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="badge bg-gray-100 text-gray-700 dark:bg-dark-border dark:text-gray-300">
                      {book.category}
                    </span>
                  </td>
                  <td>
                    {book.availableCopies > 0 ? (
                      <span className="badge badge-success">{book.availableCopies} কপি আছে</span>
                    ) : (
                      <span className="badge badge-error">স্টক আউট</span>
                    )}
                  </td>
                  <td className="text-sm">
                    {book.createdAt ? format(new Date(book.createdAt), 'dd MMM yyyy') : 'N/A'}
                  </td>
                  <td>
                    <div className="flex justify-end gap-2">
                      <Link to={`/book/${book.id}`} className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors" title="দেখুন">
                        <Eye size={18} />
                      </Link>
                      <Link to={`/admin/books/edit/${book.id}`} className="p-1.5 text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded transition-colors" title="এডিট">
                        <Edit size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(book.id)}
                        className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors" 
                        title="মুছে ফেলুন"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              
              {filteredBooks.length === 0 && (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-gray-500">
                    কোনো বই পাওয়া যায়নি
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

export default ManageBooks
