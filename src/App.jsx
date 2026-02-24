import Tasks from './components/Tasks'
import TasksInput from './components/TasksInput';
import { Toaster } from 'react-hot-toast';
const getAya = async () => {
const res = await fetch(`https://api.alquran.cloud/v1/ayah/${(Math.random() * 6236) + 1}`, {
        cache: 'no-cache'
    })
    const response = await res.json()
    toast.dismiss()
    toast(response?.data?.text, { position: 'top-center', duration: 10000 })
    console.log(response.data.number)
}

getAya()

setInterval(() => {
    getAya()
}, 30000)

function App() {
  return <>
    <div className='min-h-fit min-w-78.5 w-full max-w-4xl px-3 space-y-3 grid grid-cols-1 mt-10 fixed left-1/2 -translate-x-1/2 top-0 bottom-0 '>
      <TasksInput />
      <Tasks />
      <Toaster/>
    </div>
  </>
}

export default App
