import { AppProviders } from './providers/AppProviders'
import { AppRoutes } from './routes'

/* =============================================
   App Component
   Project এর মূল component।
   সব Provider এবং Router এখানে wrap করা।
   ============================================= */

function App() {
  return (
    <AppProviders>
      <AppRoutes />
    </AppProviders>
  )
}

export default App
