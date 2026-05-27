/* =============================================
   AppRoutes Component
   সমস্ত রাউটিং এখানে ম্যানেজ করা হচ্ছে
   ============================================= */

import React, { ReactNode } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Layouts
import RootLayout from '../layouts/RootLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import AdminLayout from '../layouts/AdminLayout'

// Public Pages
import Home from '../pages/Public/Home'
import BooksCatalog from '../pages/Public/BooksCatalog'
import BookDetails from '../pages/Public/BookDetails'
import Categories from '../pages/Public/Categories'
import Cart from '../pages/Public/Cart'

// Auth Pages
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'

// User Dashboard Pages
import UserDashboard from '../pages/User/UserDashboard'
import MyBorrowedBooks from '../pages/User/MyBorrowedBooks'
import Wishlist from '../pages/User/Wishlist'
import DonateBook from '../pages/User/DonateBook'

// Admin Dashboard Pages
import AdminDashboard from '../pages/Admin/AdminDashboard'
import ManageBooks from '../pages/Admin/ManageBooks'
import AddBook from '../pages/Admin/AddBook'
import BorrowManagement from '../pages/Admin/BorrowManagement'

import NotFound from '../pages/NotFound'

/* =============================================
   Protected Route Component
   শুধুমাত্র লগইন করা ইউজারদের জন্য
   ============================================= */
interface ProtectedRouteProps {
  children: ReactNode
  requireAdmin?: boolean
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
  const { user, loading, isAdmin } = useAuth()

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  
  if (!user) return <Navigate to="/login" replace />
  
  if (requireAdmin && !isAdmin) return <Navigate to="/dashboard" replace />
  
  return <>{children}</>
}

/* =============================================
   AppRoutes Component
   সমস্ত রাউটিং এখানে ম্যানেজ করা হচ্ছে
   ============================================= */
export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes - Root Layout */}
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="books" element={<BooksCatalog />} />
        <Route path="book/:id" element={<BookDetails />} />
        <Route path="categories" element={<Categories />} />
        <Route path="cart" element={<Cart />} />
        
        {/* Auth Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      {/* User Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<UserDashboard />} />
        <Route path="borrowed" element={<MyBorrowedBooks />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="donate" element={<DonateBook />} />
      </Route>

      {/* Admin Dashboard Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="books" element={<ManageBooks />} />
        <Route path="books/add" element={<AddBook />} />
        <Route path="borrows" element={<BorrowManagement />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
