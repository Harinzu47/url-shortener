import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Suspense, lazy } from 'react'
import AppLayout from './layouts/app.layouts'
import Error from './components/error'
import UrlProvider from './context'
import RequireAuth from './components/require-auth'
import { BarLoader } from 'react-spinners'

// Lazy load pages for better performance
const LandingPage = lazy(() => import('./pages/landing'))
const Dashboard = lazy(() => import('./pages/dashboard'))
const Auth = lazy(() => import('./pages/auth'))
const Link = lazy(() => import('./pages/link'))
const RedirectLink = lazy(() => import('./pages/redirect-link'))
const NotFoundPage = lazy(() => import('./pages/notfound'))

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children:[
      {
        path: '/',
        element: <LandingPage />
      },
      {
        path: '/dashboard',
        element: 
        <RequireAuth>
          <Dashboard />
        </RequireAuth>
      },
      {
        path: '/auth',
        element: <Auth />
      },
      {
        path: '/link/:id',
        element: 
        <RequireAuth>
          <Link />
        </RequireAuth>
      },
      {
        path: '/:id',
        element: <RedirectLink />
      },
      {
        path: '*',
        element: <NotFoundPage />
      }
    ]
  }
])

function App() {
  return (
    <UrlProvider>
      <Suspense fallback={<BarLoader width={"100%"} color="#36d7b7" />}>
        <RouterProvider router={router} />
      </Suspense>
    </UrlProvider>
  )
}

export default App;
