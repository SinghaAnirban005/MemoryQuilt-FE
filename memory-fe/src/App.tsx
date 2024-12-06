import './App.css'
import { Button } from './components/ui/Button'
import { AddIcon } from './icons/AddIcon'
import { ShareIcon } from './icons/ShareIcon'

function App() {
  
  return (
    <div className='bg-red-300'>
        <Button title="Click here" size="lg" startIcon={<AddIcon size='lg' />} variant='primary'  />
        <Button title={"Share"} size='lg' startIcon={<ShareIcon size='lg'/>} variant='secondary' />
    </div>
  )
}

export default App
