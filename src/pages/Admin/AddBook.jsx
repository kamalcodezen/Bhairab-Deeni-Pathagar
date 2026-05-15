import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useLibrary } from '../../context/LibraryContext'
import { categoriesData } from '../../data/categories'
import { Upload, Book, Save, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'

/* =============================================
   Add Book Page
   অ্যাডমিনের নতুন বই যুক্ত করার ফর্ম
   ============================================= */
const AddBook = () => {
  const { addBook } = useLibrary()
  const navigate = useNavigate()
  const [imagePreview, setImagePreview] = useState(null)
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm()

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit = async (data) => {
    try {
      const newBook = {
        title: data.title,
        author: data.author,
        category: data.category,
        categoryId: data.category.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        availableCopies: parseInt(data.copies, 10),
        totalCopies: parseInt(data.copies, 10),
        pageCount: parseInt(data.pages, 10) || 0,
        description: data.description,
        cover: imagePreview || `https://source.unsplash.com/400x600/?book,${data.category.toLowerCase().split(' ')[0]}`,
        isNew: true
      }
      
      await addBook(newBook)
      navigate('/admin/books')
    } catch (error) {
      toast.error('বই যোগ করতে সমস্যা হয়েছে')
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg text-gray-600 hover:text-primary-600 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">নতুন বই যুক্ত করুন</h1>
          <p className="text-gray-600 dark:text-gray-400">পাঠাগারের ক্যাটালগে নতুন বইয়ের তথ্য দিন</p>
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="p-4 bg-primary-50 dark:bg-primary-900/10 border-b border-primary-100 dark:border-primary-900/30 flex items-center gap-2 text-primary-700 dark:text-primary-400 font-bold">
          <Book size={20} />
          বইয়ের বিস্তারিত তথ্য
        </div>
        
        <div className="p-6 md:p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            
            <div className="grid md:grid-cols-12 gap-8">
              {/* Left Column - Image Upload */}
              <div className="md:col-span-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">বইয়ের কভার ছবি</label>
                <div className="border-2 border-dashed border-gray-300 dark:border-dark-border rounded-xl p-4 text-center hover:bg-gray-50 dark:hover:bg-dark-border transition-colors h-64 flex flex-col items-center justify-center relative overflow-hidden group">
                  <input 
                    type="file" 
                    id="bookImage" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="absolute inset-0 w-full h-full object-cover" />
                  ) : (
                    <div className="flex flex-col items-center pointer-events-none">
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/30 text-primary-600 rounded-full flex items-center justify-center mb-3">
                        <Upload size={20} />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">ছবি আপলোড করুন</span>
                      <span className="text-xs text-gray-500">অথবা ড্র্যাগ করে এখানে আনুন</span>
                    </div>
                  )}
                  {imagePreview && (
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity text-white text-sm font-medium">
                      ছবি পরিবর্তন করুন
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">সর্বোচ্চ ২ মেগাবাইট। JPG অথবা PNG ফরম্যাট।</p>
              </div>

              {/* Right Column - Form Fields */}
              <div className="md:col-span-8 space-y-5">
                
                <div className="grid sm:grid-cols-2 gap-5">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">বইয়ের নাম *</label>
                    <input
                      type="text"
                      {...register('title', { required: 'বইয়ের নাম দেওয়া আবশ্যক' })}
                      className={`input-field ${errors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="বইয়ের পূর্ণ নাম লিখুন"
                    />
                    {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">লেখকের নাম *</label>
                    <input
                      type="text"
                      {...register('author', { required: 'লেখকের নাম দেওয়া আবশ্যক' })}
                      className={`input-field ${errors.author ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="লেখকের নাম লিখুন"
                    />
                    {errors.author && <p className="mt-1 text-sm text-red-500">{errors.author.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ক্যাটাগরি *</label>
                    <select
                      {...register('category', { required: 'ক্যাটাগরি নির্বাচন করুন' })}
                      className={`input-field ${errors.category ? 'border-red-500 focus:ring-red-500' : ''}`}
                    >
                      <option value="">নির্বাচন করুন...</option>
                      {categoriesData.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name}</option>
                      ))}
                    </select>
                    {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">কপির পরিমাণ *</label>
                    <input
                      type="number"
                      min="1"
                      {...register('copies', { 
                        required: 'কপির পরিমাণ আবশ্যক',
                        min: { value: 1, message: 'অন্তত ১ কপি হতে হবে' }
                      })}
                      className={`input-field ${errors.copies ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="কয়টি কপি আছে?"
                    />
                    {errors.copies && <p className="mt-1 text-sm text-red-500">{errors.copies.message}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">মোট পৃষ্ঠা</label>
                    <input
                      type="number"
                      min="1"
                      {...register('pages')}
                      className="input-field"
                      placeholder="পৃষ্ঠা সংখ্যা"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">বইয়ের সারসংক্ষেপ</label>
                    <textarea
                      {...register('description')}
                      className="input-field min-h-[120px]"
                      placeholder="বইটি সম্পর্কে সংক্ষিপ্ত বিবরণ লিখুন..."
                    ></textarea>
                  </div>
                </div>

              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 dark:border-dark-border flex justify-end gap-4">
              <button 
                type="button" 
                onClick={() => navigate(-1)}
                className="btn-secondary"
              >
                বাতিল করুন
              </button>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="btn-primary"
              >
                {isSubmitting ? 'সেভ হচ্ছে...' : (
                  <>
                    <Save size={18} />
                    সংরক্ষণ করুন
                  </>
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

export default AddBook
