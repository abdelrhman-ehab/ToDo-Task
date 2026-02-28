import Layout from './components/Layout';
import TasksInput from './components/TasksInput';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
const getAya = async () => {
  const res = await fetch(`https://api.alquran.cloud/v1/ayah/${(Math.random() * 6236) + 1}`, {
    cache: 'no-cache'
  })
  const response = await res.json()
  toast.dismiss()
  toast(response?.data?.text, { position: 'top-center', duration: 15000 })
}


getAya()

setInterval(() => {
  getAya()
}, 60000)

function App() {
  return <>
    <div className='min-h-screen min-w-78.5 w-full max-w-4xl px-3 pt-3 space-y-3 grid grid-cols-1 fixed left-1/2 -translate-x-1/2 top-0 bottom-0 '>
      <TasksInput />
      <Layout />
      <Toaster />
    </div>
  </>
}

export default App
