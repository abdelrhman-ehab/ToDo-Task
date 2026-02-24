import React, { useEffect, useRef, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card } from './ui/card'
import { useToDoStore } from '@/store/todo.store'
import { Textarea } from './ui/textarea'
import toast from 'react-hot-toast'

const getAya = async () => {
    const res = await fetch(`https://api.alquran.cloud/v1/ayah/${(Math.random() * 6236) + 1}`, {
        cache: 'no-cache'
    })
    const response = await res.json()
    toast.dismiss()
    toast(response?.data?.text, { position: 'bottom-right', duration: 10000 })
    console.log(response.data.number)
}

getAya()

setInterval(() => {
    getAya()
}, 30000)


export default function TasksInput() {

    const getAllTodos = useToDoStore(obj => obj.getAllTodos)
    const getCompletedTodos = useToDoStore(obj => obj.getCompletedTodos)
    const getUncompletedTodos = useToDoStore(obj => obj.getUncompletedTodos)
    const todoTitle = useRef()
    const todoDescreption = useRef()
    const addTodo = useToDoStore(state => state.addTodo)
    const [error, setError] = useState(null)
    const [category, setCategory] = useState('all')
    const addTodoProcess = () => {
        if (todoTitle.current.value !== '' && todoDescreption.current.value !== '') {
            addTodo(todoTitle.current.value, todoDescreption.current.value)
            todoTitle.current.value = ''
            todoDescreption.current.value = ''
            setError(null)
        }
        else {
            setError(`please fill ${todoTitle.current.value === '' && todoDescreption.current.value === '' ? 'Task Title and Task Body' : todoTitle.current.value == '' ? 'Task Title' : 'Task Body'}`)
        }
    }

    return <>
        <div className={`bg-white rounded-xl sticky top-0 space-y-4 h-fit z-50`}>
            <Card className="px-3 w-full">
                <h1 className="text-center text-4xl font-bold">Todo Tasks</h1>
                <form onSubmit={(e) => { e.preventDefault(); addTodoProcess() }} className=" space-y-3">
                    {error && <p className="text-red-900 text-md italic">{error}</p>}
                    <Input ref={todoTitle} type="text" placeholder='Enter Your Task Title' className='w-full px-2 py-1' />
                    <Textarea ref={todoDescreption} type="text" placeholder='Enter Your Task Details' className='w-full px-2 py-1 resize-none' />
                    <Button type='submit'>Add Task</Button>
                </form>
            </Card>
            <div className="space-x-2 flex">
                <Button onClick={() => { getAllTodos(); setCategory('all') }} className={`${category === 'all' ? 'bg-black' : 'bg-black/40'}`}>All</Button>
                <Button onClick={() => { getUncompletedTodos(); setCategory('uncompleted') }} className={`${category === 'uncompleted' ? 'bg-black' : 'bg-black/40'}`}>Uncompleted</Button>
                <Button onClick={() => { getCompletedTodos(); setCategory('completed') }} className={`${category === 'completed' ? 'bg-black' : 'bg-black/40'}`}>Completed</Button>
            </div>
        </div>
    </>
}
