/* =============================================
   Donate Book Page
   বই দান করার জন্য মাল্টি-স্টেপ ফর্ম
   ============================================= */

import React, { useState } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { Upload, Book, MapPin, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

interface DonateBookFormInput {
  bookName: string
  author: string
  category: string
  condition: string
  pickupAddress: string
  phone: string
  notes?: string
}

const DonateBook: React.FC = () => {
  const [step, setStep] = useState<number>(1)
  const [isSuccess, setIsSuccess] = useState<boolean>(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  
  const { register, handleSubmit, formState: { errors }, trigger } = useForm<DonateBookFormInput>()

  // Handlers
  const handleNext = async () => {
    let isValid = false
    if (step === 1) isValid = await trigger(['bookName', 'author', 'category', 'condition'])
    if (step === 2) isValid = await trigger(['pickupAddress', 'phone'])
    
    if (isValid) setStep(step + 1)
  }

  const handlePrev = () => {
    setStep(step - 1)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const onSubmit: SubmitHandler<DonateBookFormInput> = (data) => {
    console.log('Donation Data:', data)
    // Here we would normally upload to backend
    setIsSuccess(true)
    toast.success('আপনার অনুদানের আবেদনটি সফলভাবে জমা হয়েছে!')
  }

  if (isSuccess) {
    return (
      <div className="card p-10 md:p-16 text-center max-w-2xl mx-auto">
        <div className="w-24 h-24 bg-green-100 dark:bg-green-900/30 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">আলহামদুলিল্লাহ!</h2>
        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          আপনার অনুদানের আবেদনটি সফলভাবে জমা হয়েছে। আমাদের একজন প্রতিনিধি খুব শীঘ্রই আপনার সাথে যোগাযোগ করে বইটি সংগ্রহ করবেন।
        </p>
        <div className="flex justify-center gap-4">
          <button 
            onClick={() => {
              setIsSuccess(false)
              setStep(1)
              setImagePreview(null)
            }} 
            className="btn-secondary"
          >
            আরেকটি বই দান করুন
          </button>
          <Link to="/dashboard" className="btn-primary">
            ড্যাশবোর্ডে ফিরে যান
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">বই দান করুন</h1>
        <p className="text-gray-600 dark:text-gray-400">আপনার অব্যবহৃত বই দান করে অন্যকে পড়ার সুযোগ করে দিন।</p>
      </div>

      {/* Progress Steps */}
      <div className="mb-8 relative">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded-full bg-gray-200 dark:bg-dark-border">
          <div style={{ width: `${(step / 3) * 100}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500 transition-all duration-500"></div>
        </div>
        <div className="flex justify-between text-xs font-medium text-gray-500 dark:text-gray-400 px-1">
          <span className={step >= 1 ? 'text-primary-600' : ''}>বইয়ের তথ্য</span>
          <span className={step >= 2 ? 'text-primary-600' : ''}>যোগাযোগ ও ঠিকানা</span>
          <span className={step >= 3 ? 'text-primary-600' : ''}>ছবি ও কনফার্ম</span>
        </div>
      </div>

      <div className="card p-6 md:p-10">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* Step 1: Book Info */}
          <div className={step === 1 ? 'block' : 'hidden'}>
            <div className="flex items-center gap-2 mb-6 text-primary-600 dark:text-primary-400 font-bold text-lg border-b border-gray-100 dark:border-dark-border pb-4">
              <Book size={24} />
              বইয়ের প্রাথমিক তথ্য
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">বইয়ের নাম *</label>
                <input
                  type="text"
                  {...register('bookName', { required: 'বইয়ের নাম দেওয়া আবশ্যক' })}
                  className="input-field"
                  placeholder="যেমন: আর রাহীকুল মাখতূম"
                />
                {errors.bookName && <p className="mt-1 text-sm text-red-500">{errors.bookName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">লেখকের নাম *</label>
                <input
                  type="text"
                  {...register('author', { required: 'লেখকের নাম দেওয়া আবশ্যক' })}
                  className="input-field"
                  placeholder="যেমন: আল্লামা সফিউর রহমান মুবারকপুরী"
                />
                {errors.author && <p className="mt-1 text-sm text-red-500">{errors.author.message}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">ক্যাটাগরি *</label>
                  <select
                    {...register('category', { required: 'ক্যাটাগরি নির্বাচন করুন' })}
                    className="input-field"
                  >
                    <option value="">নির্বাচন করুন...</option>
                    <option value="কুরআন ও তাফসীর">কুরআন ও তাফসীর</option>
                    <option value="হাদীস শাস্ত্র">হাদীস শাস্ত্র</option>
                    <option value="সীরাত ও ইতিহাস">সীরাত ও ইতিহাস</option>
                    <option value="অন্যান্য">অন্যান্য</option>
                  </select>
                  {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">বইয়ের অবস্থা *</label>
                  <select
                    {...register('condition', { required: 'বইয়ের অবস্থা নির্বাচন করুন' })}
                    className="input-field"
                  >
                    <option value="">নির্বাচন করুন...</option>
                    <option value="নতুন">নতুন (নতুনের মতই)</option>
                    <option value="ভালো">ভালো (পড়ার যোগ্য)</option>
                    <option value="পুরানো">পুরানো (কিছুটা ছেঁড়া/দাগ আছে)</option>
                  </select>
                  {errors.condition && <p className="mt-1 text-sm text-red-500">{errors.condition.message}</p>}
                </div>
              </div>
            </div>
          </div>

          {/* Step 2: Contact Info */}
          <div className={step === 2 ? 'block' : 'hidden'}>
            <div className="flex items-center gap-2 mb-6 text-primary-600 dark:text-primary-400 font-bold text-lg border-b border-gray-100 dark:border-dark-border pb-4">
              <MapPin size={24} />
              যোগাযোগ ও ঠিকানা
            </div>
            
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">মোবাইল নম্বর *</label>
                <input
                  type="tel"
                  {...register('phone', { 
                    required: 'মোবাইল নম্বর আবশ্যক',
                    pattern: {
                      value: /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/,
                      message: 'সঠিক বাংলাদেশি মোবাইল নম্বর দিন'
                    }
                  })}
                  className="input-field"
                  placeholder="01XXXXXXXXX"
                />
                {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">বই সংগ্রহের পূর্ণ ঠিকানা *</label>
                <textarea
                  {...register('pickupAddress', { required: 'ঠিকানা দেওয়া আবশ্যক' })}
                  className="input-field min-h-[100px]"
                  placeholder="বাড়ি, রাস্তা, এলাকা..."
                ></textarea>
                {errors.pickupAddress && <p className="mt-1 text-sm text-red-500">{errors.pickupAddress.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">কোনো বিশেষ নোট (ঐচ্ছিক)</label>
                <textarea
                  {...register('notes')}
                  className="input-field min-h-[80px]"
                  placeholder="বই সংগ্রহের সময় বা অন্য কোনো বিষয়..."
                ></textarea>
              </div>
            </div>
          </div>

          {/* Step 3: Image & Confirm */}
          <div className={step === 3 ? 'block' : 'hidden'}>
            <div className="flex items-center gap-2 mb-6 text-primary-600 dark:text-primary-400 font-bold text-lg border-b border-gray-100 dark:border-dark-border pb-4">
              <Upload size={24} />
              বইয়ের ছবি (ঐচ্ছিক)
            </div>
            
            <div className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 dark:border-dark-border rounded-xl p-8 text-center hover:bg-gray-50 dark:hover:bg-dark-border transition-colors">
                <input 
                  type="file" 
                  id="bookImage" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageChange}
                />
                <label htmlFor="bookImage" className="cursor-pointer flex flex-col items-center">
                  {imagePreview ? (
                    <img src={imagePreview} alt="Preview" className="h-48 object-contain mb-4 rounded-lg shadow-sm" />
                  ) : (
                    <div className="w-16 h-16 bg-gray-100 dark:bg-dark-border rounded-full flex items-center justify-center mb-4 text-gray-400">
                      <Upload size={24} />
                    </div>
                  )}
                  <span className="text-primary-600 font-medium">{imagePreview ? 'ছবি পরিবর্তন করুন' : 'বইয়ের কভারের ছবি আপলোড করুন'}</span>
                  <span className="text-xs text-gray-500 mt-2">সর্বোচ্চ সাইজ: 5MB (JPEG, PNG)</span>
                </label>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-sm text-blue-800 dark:text-blue-300">
                <strong>শর্তাবলী:</strong> জমা দেওয়ার পর আমাদের প্রতিনিধি আপনার সাথে যোগাযোগ করে বইটি সংগ্রহ করবেন। বইটি পাঠাগারের জন্য উপযুক্ত হলে তা ক্যাটালগে যুক্ত করা হবে।
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-dark-border mt-8">
            {step > 1 ? (
              <button type="button" onClick={handlePrev} className="btn-secondary">
                <ArrowLeft size={18} />
                পেছনে
              </button>
            ) : <div></div>}

            {step < 3 ? (
              <button type="button" onClick={handleNext} className="btn-primary">
                পরবর্তী ধাপ
                <ArrowRight size={18} />
              </button>
            ) : (
              <button type="submit" className="btn-primary bg-green-600 hover:bg-green-700">
                <CheckCircle2 size={18} />
                জমা দিন
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default DonateBook
