import React, { useRef, useState } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card } from './ui/card'
import { useToDoStore } from '@/store/todo.store'
import { Textarea } from './ui/textarea'
import { HiMiniGlobeAlt } from "react-icons/hi2";
import toast from 'react-hot-toast'

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
            { `${direction === 'ltr' ? toast.success('Task Added') : toast.success('تمت أضافة المهمة بنجاح')}` }
            todoTitle.current.value = ''
            todoDescreption.current.value = ''
            setError(null)
        }
        else {
            setError(`please fill ${todoTitle.current.value === '' && todoDescreption.current.value === '' ? 'Task Title and Task Body' : todoTitle.current.value == '' ? 'Task Title' : 'Task Body'}`)
        }
    }

    const direction = useToDoStore(state => state.direction)
    const toggleDirection = useToDoStore(state => state.toggleDirection)


    return <>

        <div className={`bg-white rounded-xl sticky top-0 space-y-4 h-fit z-50`}>
            <Card className="px-3 w-full">
                <div>
                    <span onClick={() => {
                        toggleDirection()
                        direction === 'ltr' ? document.documentElement.dir = 'rtl' : document.documentElement.dir = 'ltr'
                    }} className='absolute top-8.5 right-5 text-xl font-bold cursor-pointer'>{direction === 'ltr' ? 'ar' : 'en'}</span>
                    <h1 className="text-center text-4xl font-bold">My Todos</h1>
                </div>
                <form onSubmit={(e) => { e.preventDefault(); addTodoProcess() }} className=" space-y-3">
                    {error && <p className="text-red-900 text-md italic">{error}</p>}
                    <Input ref={todoTitle} type="text" placeholder={`${direction === 'ltr' ? 'Task Title...' : 'عنوان المهمة...'}`} className='w-full px-2 py-1' />
                    <Textarea ref={todoDescreption} type="text" placeholder={`${direction === 'ltr' ? 'Task Details...' : 'تفاصيل المهمة...'}`} className='w-full px-2 py-1 resize-none' />
                    <Button type='submit' className='buttonTheme'>{direction === 'ltr' ? 'Add Task' : 'أضافة مهمة'}</Button>
                </form>
            </Card>
            <div className="space-x-2 flex">
                <Button onClick={() => { getAllTodos(); setCategory('all') }} className={`${category === 'all' ? 'buttonTheme' : 'unChoosenButtonTheme'}`}>{`${direction === 'ltr' ? 'All' : 'الجميع'}`}</Button>
                <Button onClick={() => { getUncompletedTodos(); setCategory('uncompleted') }} className={`${category === 'uncompleted' ? 'buttonTheme' : 'unChoosenButtonTheme'}`}>{`${direction === 'ltr' ? 'UnCompleted' : 'غير مكتملة'}`}</Button>
                <Button onClick={() => { getCompletedTodos(); setCategory('completed') }} className={`${category === 'completed' ? 'buttonTheme' : 'unChoosenButtonTheme'}`}>{`${direction === 'ltr' ? 'Completed' : 'مكتملة'}`}</Button>
            </div>
        </div >
    </>
}
