import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { BookOpen, User, Mail, Lock, Phone, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

/* =============================================
   Register Page
   নতুন ইউজার রেজিস্ট্রেশন পেজ
   ============================================= */
const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const { register: registerUser } = useAuth()
  const navigate = useNavigate()

  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const password = watch('password', '')

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      await registerUser(data)
      toast.success('সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে!')
      navigate('/dashboard', { replace: true })
    } catch (error) {
      toast.error(error.message || 'অ্যাকাউন্ট তৈরি ব্যর্থ হয়েছে।')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-dark-bg transition-colors">
      <div className="w-full max-w-lg space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center justify-center p-3 bg-primary-600 text-white rounded-2xl mb-4 shadow-lg">
            <BookOpen size={32} />
          </Link>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            নতুন অ্যাকাউন্ট খুলুন
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            ইতিমধ্যে অ্যাকাউন্ট আছে? <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">লগইন করুন</Link>
          </p>
        </div>

        {/* Form */}
        <div className="card p-8">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                পুরো নাম
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-400" />
                </div>
                <input
                  type="text"
                  {...register('name', { required: 'নাম দেওয়া আবশ্যক' })}
                  className={`input-field pl-10 ${errors.name ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="আপনার নাম"
                />
              </div>
              {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                মোবাইল নম্বর
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone size={18} className="text-gray-400" />
                </div>
                <input
                  type="tel"
                  {...register('phone', { 
                    required: 'মোবাইল নম্বর আবশ্যক',
                    pattern: {
                      value: /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/,
                      message: 'সঠিক বাংলাদেশি মোবাইল নম্বর দিন'
                    }
                  })}
                  className={`input-field pl-10 ${errors.phone ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="01XXXXXXXXX"
                />
              </div>
              {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                ইমেইল অ্যাড্রেস
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  type="email"
                  {...register('email', { 
                    required: 'ইমেইল দেওয়া আবশ্যক',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'সঠিক ইমেইল দিন'
                    }
                  })}
                  className={`input-field pl-10 ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="আপনার ইমেইল"
                />
              </div>
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                পাসওয়ার্ড
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', { 
                    required: 'পাসওয়ার্ড দেওয়া আবশ্যক',
                    minLength: { value: 6, message: 'পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে' }
                  })}
                  className={`input-field pl-10 pr-10 ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                পাসওয়ার্ড নিশ্চিত করুন
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  {...register('confirmPassword', { 
                    required: 'পাসওয়ার্ড নিশ্চিত করা আবশ্যক',
                    validate: value => value === password || 'পাসওয়ার্ড মিলছে না'
                  })}
                  className={`input-field pl-10 pr-10 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary py-3 text-lg relative overflow-hidden"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  অপেক্ষা করুন...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  অ্যাকাউন্ট তৈরি করুন <ArrowRight size={20} />
                </span>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Register
