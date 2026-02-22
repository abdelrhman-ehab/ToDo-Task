import React, { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card } from './ui/card'
import { useToDoStore } from '@/store/todo.store'
import { Textarea } from './ui/textarea'

export default function TasksInput() {
    const taskTitle = useRef()
    const taskBody = useRef()
    const addTask = useToDoStore(state => state.addTodo)
    const [error, setError] = useState(null)

    const tasks = useToDoStore(e => e.todos)

    const addTaskFn = () => {
        if (taskTitle.current.value !== '' && taskBody.current.value !== '') {

            addTask(taskTitle.current.value, taskBody.current.value)
            taskTitle.current.value = ''
            taskBody.current.value = ''
            setError(null)
        }
        else {
            setError(`please fill ${taskTitle.current.value === '' && taskBody.current.value === '' ? 'Task Title and Task Body' : taskTitle.current.value == '' ? 'Task Title' : 'Task Body'}`)
        }
    }


    return <>
        <div className={`bg-white rounded-xl sticky top-0 space-y-4 h-fit z-50 ${tasks.length === 0 ? 'col-span-1 md:col-span-2 xl:col-span-5 md:mx-20 xl:mx-40' : 'col-span-1 xl:col-span-2'}`}>
            <Card className="px-3">
                <h1 className="text-center text-4xl font-bold">Todo Tasks</h1>
                <form onSubmit={(e)=>{e.preventDefault(); addTaskFn()}} className=" space-y-3">
                    {error && <p className="text-red-900 text-md italic">{error}</p>}
                    <Input ref={taskTitle} type="text" placeholder='Enter Your Task Title' className='w-full px-2 py-1' />
                    <Textarea ref={taskBody} type="text" placeholder='Enter Your Task Details' className='w-full px-2 py-1 resize-none' />
                    <Button type='submit'>Add Task</Button>
                </form>
            </Card>
        </div>
    </>
}
