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
import About from '../pages/Public/About'
import Contact from '../pages/Public/Contact'
import FAQ from '../pages/Public/FAQ'
import DonorLeaderboard from '../pages/Public/DonorLeaderboard'

// Auth Pages
import Login from '../pages/Auth/Login'
import Register from '../pages/Auth/Register'
import ForgotPassword from '../pages/Auth/ForgotPassword'

// User Dashboard Pages
import UserDashboard from '../pages/User/UserDashboard'
import MyBorrowedBooks from '../pages/User/MyBorrowedBooks'
import BorrowHistory from '../pages/User/BorrowHistory'
import Wishlist from '../pages/User/Wishlist'
import Notifications from '../pages/User/Notifications'
import Profile from '../pages/User/Profile'
import Settings from '../pages/User/Settings'
import DonateBook from '../pages/User/DonateBook'
import MyDonations from '../pages/User/MyDonations'

// Admin Dashboard Pages
import AdminDashboard from '../pages/Admin/AdminDashboard'
import ManageBooks from '../pages/Admin/ManageBooks'
import AddBook from '../pages/Admin/AddBook'
import EditBook from '../pages/Admin/EditBook'
import ManageUsers from '../pages/Admin/ManageUsers'
import BorrowManagement from '../pages/Admin/BorrowManagement'
import DonationManagement from '../pages/Admin/DonationManagement'
import ReportsAnalytics from '../pages/Admin/ReportsAnalytics'
import AdminSettings from '../pages/Admin/AdminSettings'

import NotFound from '../pages/NotFound'

/* =============================================
   Protected Route Component
   শুধুমাত্র লগইন করা ইউজারদের জন্য
   ============================================= */
const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { user, loading, isAdmin } = useAuth()

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  
  if (!user) return <Navigate to="/login" replace />
  
  if (requireAdmin && !isAdmin) return <Navigate to="/dashboard" replace />
  
  return children
}

/* =============================================
   AppRoutes Component
   সমস্ত রাউটিং এখানে ম্যানেজ করা হচ্ছে
   ============================================= */
export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes - Root Layout */}
      <Route path="/" element={<RootLayout />}>
        <Route index element={<Home />} />
        <Route path="books" element={<BooksCatalog />} />
        <Route path="book/:id" element={<BookDetails />} />
        <Route path="categories" element={<Categories />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="faq" element={<FAQ />} />
        <Route path="leaderboard" element={<DonorLeaderboard />} />
        
        {/* Auth Routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
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
        <Route path="history" element={<BorrowHistory />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="profile" element={<Profile />} />
        <Route path="settings" element={<Settings />} />
        <Route path="donate" element={<DonateBook />} />
        <Route path="donations" element={<MyDonations />} />
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
        <Route path="books/edit/:id" element={<EditBook />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="borrows" element={<BorrowManagement />} />
        <Route path="donations" element={<DonationManagement />} />
        <Route path="reports" element={<ReportsAnalytics />} />
        <Route path="settings" element={<AdminSettings />} />
      </Route>

      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
