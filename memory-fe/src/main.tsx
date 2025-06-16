import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Home } from './components/ui/Home.tsx'
import { Login } from './components/ui/Login'
import { Signup } from './components/ui/Signup.tsx'
import { Provider } from 'react-redux'
import { Tweet } from './components/ui/Tweet.tsx'
import { Video } from './components/ui/Video.tsx'
import { Shared } from './components/ui/Shared.tsx'
import store from './store/Store.ts'

const router = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    children: [
      {
        index: true,
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
      {
        path: '/tweets',
        element: <Tweet />
      },
      {
        path: '/videos',
        element: <Video />
      },
      {
        path: '/memory/:shareLink',
        element: <Shared />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <RouterProvider router={router} />
    </Provider>
)
