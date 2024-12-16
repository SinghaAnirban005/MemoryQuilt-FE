import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './components/ui/Home.tsx'
import { Login } from './components/ui/Login'
import { Signup } from './components/ui/Signup.tsx'
import { Provider } from 'react-redux'
import { ContentModal } from './components/ui/ContentModal.tsx'
import store from './store/Store.ts'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Signup />
      },
      {
        path: '/home',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
    ]
  }
])

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)
