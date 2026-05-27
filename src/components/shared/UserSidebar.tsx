/* =============================================
   User Sidebar
   সাধারণ ইউজারদের ড্যাশবোর্ডের সাইডবার
   ============================================= */

import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  BookMarked, 
  History, 
  Heart, 
  Bell, 
  User, 
  Settings,
  Gift,
  Library,
  LucideIcon
} from 'lucide-react'

interface UserSidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

interface SidebarLink {
  name: string
  path: string
  icon: LucideIcon
  exact?: boolean
}

const UserSidebar: React.FC<UserSidebarProps> = ({ isOpen, setIsOpen }) => {
  const links: SidebarLink[] = [
    { name: 'ওভারভিউ', path: '/dashboard', icon: LayoutDashboard, exact: true },
    { name: 'আমার বইসমূহ', path: '/dashboard/borrowed', icon: BookMarked },
    { name: 'ধার নেওয়ার ইতিহাস', path: '/dashboard/history', icon: History },
    { name: 'উইশলিস্ট', path: '/dashboard/wishlist', icon: Heart },
    { name: 'বই দান করুন', path: '/dashboard/donate', icon: Gift },
    { name: 'আমার অনুদান', path: '/dashboard/donations', icon: Library },
    { name: 'নোটিফিকেশন', path: '/dashboard/notifications', icon: Bell },
    { name: 'প্রোফাইল', path: '/dashboard/profile', icon: User },
    { name: 'সেটিংস', path: '/dashboard/settings', icon: Settings },
  ]

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside 
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white dark:bg-dark-card border-r border-gray-200 dark:border-dark-border transform transition-transform duration-300 ease-in-out lg:transform-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 pt-[72px] lg:pt-0 h-screen overflow-y-auto`}
      >
        <div className="p-4 space-y-1">
          {links.map((link) => {
            const Icon = link.icon
            return (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.exact}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-border'
                  }`
                }
              >
                <Icon size={20} />
                {link.name}
              </NavLink>
            )
          })}
        </div>
      </aside>
    </>
  )
}

export default UserSidebar
