import { Outlet } from 'react-router-dom'
import Navbar from '../components/shared/Navbar'
import Footer from '../components/shared/Footer'

/* =============================================
   Root Layout
   Public পেজগুলোর জন্য Layout (Home, Books, etc.)
   ============================================= */
const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-dark-bg text-gray-900 dark:text-gray-100 transition-colors duration-300">
      <Navbar />
      
      {/* Main content area */}
      <main className="flex-grow pt-[72px] lg:pt-[80px]">
        <Outlet />
      </main>

      <Footer />
    </div>
  )
}

export default RootLayout
