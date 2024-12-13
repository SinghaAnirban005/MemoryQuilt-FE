import './App.css'
import { Outlet } from 'react-router-dom'

function App() {
  
  return (
    <div className='flex items-center'>
      <Outlet />
    </div>
  )
}

export default App
