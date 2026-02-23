import Tasks from './components/Tasks'
import TasksInput from './components/TasksInput';

function App() {
  return <>
    <div className='min-h-fit min-w-78.5 w-full max-w-7xl px-3 space-y-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3 md:gap-5 mt-10 fixed left-1/2 -translate-x-1/2 top-0 bottom-0 '>
      <TasksInput />
      <Tasks />
    </div>
  </>
}

export default App
