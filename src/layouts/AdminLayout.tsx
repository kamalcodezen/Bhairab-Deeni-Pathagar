/* =============================================
   Admin Layout
   অ্যাডমিন প্যানেলের লেআউট
   ============================================= */

import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/shared/Navbar'
import AdminSidebar from '../components/shared/AdminSidebar'

const AdminLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      {/* Admin Navbar could be different, but we'll reuse the main Navbar for now */}
      <Navbar />
      
      <div className="flex pt-[72px] lg:pt-[80px]">
        <AdminSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        {/* Main Admin Content */}
        <main className="flex-1 w-full p-4 md:p-6 lg:p-8 min-h-[calc(100vh-80px)] overflow-x-hidden">
          {/* Mobile Sidebar Toggle - Visible only on mobile/tablet */}
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden mb-4 p-2 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg text-gray-700 dark:text-gray-300 flex items-center gap-2 shadow-sm"
          >
            <span className="font-medium">অ্যাডমিন মেনু খুলুন</span>
          </button>
          
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout
