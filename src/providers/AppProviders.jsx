import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from '../context/ThemeContext'
import { AuthProvider } from '../context/AuthContext'
import { LibraryProvider } from '../context/LibraryContext'

/* =============================================
   App Providers
   এখানে সমস্ত Context Provider গুলো wrap করা হয়েছে
   যাতে App.jsx clean থাকে।
   ============================================= */

export const AppProviders = ({ children }) => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <LibraryProvider>
            {children}
            {/* React Hot Toast setup */}
            <Toaster
              position="top-right"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#333',
                  color: '#fff',
                  fontFamily: 'Inter, sans-serif', // Changed to standard sans if bangla missing
                },
                success: {
                  style: { background: '#10B981' },
                },
                error: {
                  style: { background: '#EF4444' },
                },
              }}
            />
          </LibraryProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
