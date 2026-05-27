/* =============================================
   App Component
   Project এর মূল component।
   সব Provider এবং Router এখানে wrap করা।
   ============================================= */

import React from 'react'
import { AppProviders } from './providers/AppProviders'
import { AppRoutes } from './routes'

const App: React.FC = () => {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  )
}

export default App
