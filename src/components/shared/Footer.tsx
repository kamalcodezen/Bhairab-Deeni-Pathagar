/* =============================================
   Footer Component
   মাল্টি-কলাম ফুটার
   ============================================= */

import React from 'react'
import { Link } from 'react-router-dom'
import { BookOpen, Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="bg-primary-600 text-white p-2 rounded-lg">
                <BookOpen size={24} />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white leading-tight">
                  ভৈরব দ্বীনি<br/><span className="text-primary-500 text-sm">পাঠাগার</span>
                </h2>
              </div>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mt-4">
              ভৈরব দ্বীনি পাঠাগার একটি অলাভজনক প্রতিষ্ঠান যা ইসলামী জ্ঞান ও সাধারণ শিক্ষার প্রসারে কাজ করে যাচ্ছে। আমাদের লক্ষ্য একটি জ্ঞানভিত্তিক সমাজ গঠন করা।
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-primary-600 hover:text-white transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">গুরুত্বপূর্ণ লিংক</h3>
            <ul className="space-y-3">
              <li><Link to="/books" className="text-gray-400 hover:text-white transition-colors text-sm">সকল বই</Link></li>
              <li><Link to="/categories" className="text-gray-400 hover:text-white transition-colors text-sm">ক্যাটাগরি সমূহ</Link></li>
              <li><Link to="/leaderboard" className="text-gray-400 hover:text-white transition-colors text-sm">ডোনার লিডারবোর্ড</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-white transition-colors text-sm">আমাদের সম্পর্কে</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">যোগাযোগ</Link></li>
            </ul>
          </div>

          {/* User Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">ব্যবহারকারী</h3>
            <ul className="space-y-3">
              <li><Link to="/login" className="text-gray-400 hover:text-white transition-colors text-sm">লগইন</Link></li>
              <li><Link to="/register" className="text-gray-400 hover:text-white transition-colors text-sm">রেজিস্ট্রেশন</Link></li>
              <li><Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors text-sm">ড্যাশবোর্ড</Link></li>
              <li><Link to="/faq" className="text-gray-400 hover:text-white transition-colors text-sm">সাধারণ জিজ্ঞাসা (FAQ)</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-6">যোগাযোগের ঠিকানা</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-primary-500 mt-1 flex-shrink-0" />
                <span className="text-sm text-gray-400">ভৈরব বাজার, কিশোরগঞ্জ,<br/>ঢাকা, বাংলাদেশ - ২৩৫০</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-primary-500 flex-shrink-0" />
                <span className="text-sm text-gray-400">+৮৮০ ১৭০০-০০০০০০</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-primary-500 flex-shrink-0" />
                <span className="text-sm text-gray-400">info@pathagar.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} ভৈরব দ্বীনি পাঠাগার। সর্বস্বত্ব সংরক্ষিত।
          </p>
          <div className="flex gap-4 text-sm text-gray-500">
            <Link to="#" className="hover:text-white transition-colors">প্রাইভেসি পলিসি</Link>
            <Link to="#" className="hover:text-white transition-colors">শর্তাবলী</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
