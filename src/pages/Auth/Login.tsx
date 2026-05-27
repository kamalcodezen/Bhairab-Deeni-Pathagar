/* =============================================
   Login Page
   ইউজার লগইন করার পেজ
   ============================================= */

import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useForm, SubmitHandler } from 'react-hook-form'
import { BookOpen, Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

interface LoginFormInput {
  email: string
  password: string
}

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  
  // From where the user came (to redirect back)
  const from = (location.state as any)?.from?.pathname || '/dashboard'

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormInput>()

  const onSubmit: SubmitHandler<LoginFormInput> = async (data) => {
    setIsLoading(true)
    try {
      await login(data)
      toast.success('সফলভাবে লগইন হয়েছে!')
      navigate(from, { replace: true })
    } catch (error: any) {
      toast.error(error.message || 'লগইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-dark-bg transition-colors">
      <div className="w-full max-w-md space-y-8">
        
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center justify-center p-3 bg-primary-600 text-white rounded-2xl mb-4 shadow-lg">
            <BookOpen size={32} />
          </Link>
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            স্বাগতম!
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            আপনার অ্যাকাউন্টে লগইন করুন অথবা <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">নতুন অ্যাকাউন্ট খুলুন</Link>
          </p>
        </div>

        {/* Demo Credentials Box */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-sm">
          <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">ডেমো লগইন:</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-blue-900 dark:text-blue-200">Admin</p>
              <p className="text-blue-700 dark:text-blue-400">admin@pathagar.com</p>
              <p className="text-blue-700 dark:text-blue-400">123456</p>
            </div>
            <div>
              <p className="font-semibold text-blue-900 dark:text-blue-200">User</p>
              <p className="text-blue-700 dark:text-blue-400">user@pathagar.com</p>
              <p className="text-blue-700 dark:text-blue-400">123456</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="card p-8">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            
            {/* Email Field */}
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

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  পাসওয়ার্ড
                </label>
                <Link to="/forgot-password" className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors">
                  পাসওয়ার্ড ভুলে গেছেন?
                </Link>
              </div>
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
                  লগইন করুন <ArrowRight size={20} />
                </span>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Login
