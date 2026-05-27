/* =============================================
   Admin Sidebar
   অ্যাডমিন ড্যাশবোর্ডের সাইডবার
   ============================================= */

import React from 'react'
import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  BookCopy, 
  Users, 
  ArrowRightLeft, 
  Gift, 
  BarChart3, 
  Settings,
  PlusCircle,
  LucideIcon
} from 'lucide-react'

interface AdminSidebarProps {
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
}

interface SidebarLink {
  name: string
  path: string
  icon: LucideIcon
  exact?: boolean
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, setIsOpen }) => {
  const links: SidebarLink[] = [
    { name: 'ড্যাশবোর্ড', path: '/admin', icon: LayoutDashboard, exact: true },
    { name: 'বই ম্যানেজমেন্ট', path: '/admin/books', icon: BookCopy },
    { name: 'নতুন বই যোগ', path: '/admin/books/add', icon: PlusCircle },
    { name: 'ইউজার ম্যানেজমেন্ট', path: '/admin/users', icon: Users },
    { name: 'ধার ম্যানেজমেন্ট', path: '/admin/borrows', icon: ArrowRightLeft },
    { name: 'অনুদান ম্যানেজমেন্ট', path: '/admin/donations', icon: Gift },
    { name: 'রিপোর্টস ও অ্যানালিটিক্স', path: '/admin/reports', icon: BarChart3 },
    { name: 'সেটিংস', path: '/admin/settings', icon: Settings },
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
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gray-900 text-gray-300 border-r border-gray-800 transform transition-transform duration-300 ease-in-out lg:transform-none ${
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
                      ? 'bg-primary-600 text-white'
                      : 'hover:bg-gray-800 hover:text-white'
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

export default AdminSidebar
