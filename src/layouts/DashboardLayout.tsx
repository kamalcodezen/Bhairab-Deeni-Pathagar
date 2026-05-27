/* =============================================
   Dashboard Layout
   সাধারণ ইউজারদের ড্যাশবোর্ডের লেআউট
   ============================================= */

import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/shared/Navbar'
import UserSidebar from '../components/shared/UserSidebar'

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false)

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
      <Navbar />
      
      <div className="flex pt-[72px] lg:pt-[80px]">
        <UserSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        {/* Main Dashboard Content */}
        <main className="flex-1 w-full p-4 md:p-6 lg:p-8 min-h-[calc(100vh-80px)] overflow-x-hidden">
          {/* Mobile Sidebar Toggle - Visible only on mobile/tablet */}
          <button 
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden mb-4 p-2 bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg text-gray-700 dark:text-gray-300 flex items-center gap-2"
          >
            <span className="font-medium">মেনু খুলুন</span>
          </button>
          
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default DashboardLayout
