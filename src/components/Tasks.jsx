import React, { useEffect, useRef, useState } from 'react'
import { HiXMark } from "react-icons/hi2";
import { Card } from './ui/card'
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useToDoStore } from '@/store/todo.store';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';

export default function Tasks() {
    const todos = useToDoStore(obj => obj.todos)
    const removeTask = useToDoStore(obj => obj.removeTodo)
    const updateTodo = useToDoStore(obj => obj.updateTodo)
    const completedTask = useToDoStore(obj => obj.completedTodo)
    const updatedTask = useToDoStore(obj => obj.updatedTask)
    const setUpdatedTask = useToDoStore(obj => obj.setUpdatedTask)
    const [updatingTitleValue, setUpdatingTitleValue] = useState(null)
    const [updatingBodyValue, setUpdatingBodyValue] = useState(null)
    const [multiLines, setMultilines] = useState(null)

    // handle updating process
    const handleUpdateProcess = (todo) => {
        setUpdatedTask(todo.id)
        setUpdatingTitleValue(todo.title)
        setUpdatingBodyValue(todo.body)
    }

    useEffect(() => { console.log(updatedTask) }, [updatedTask])
    return <>
        {todos.length > 0 &&
            <div className=" col-span-1 xl:col-span-3 space-y-4 overflow-auto no-scrollbar">
                {[...todos].reverse().map(todo =>
                    <Card key={todo.id} className='px-3 bg-green-900/15'>
                        <div className="flex justify-between items-start">
                            <div className="task w-full space-y-3">
                                {updatedTask !== todo.id &&
                                    <div className="flex gap-2 items-start">
                                        <input type='checkbox' onClick={() => { completedTask(todo.id) }} className="mt-3.5" />
                                        <div className="space-y-3">
                                            <h2 className={`text-2xl font-bold ${todo.completed === true && 'line-through text-black/70 italic'}`}> {todo.title}</h2>
                                            <p onClick={() => { multiLines === null ? setMultilines(todo.id) : setMultilines(null) }} className={`${todo.completed === true && 'line-through text-black/70 italic'} ${multiLines === todo.id ? '' : 'line-clamp-1'}`}>{todo.body}</p>
                                        </div>
                                    </div>
                                }

                                {updatedTask === todo.id &&
                                    <form onSubmit={(e) => {
                                        e.preventDefault()
                                        const formData = new FormData(e.target)
                                        const title = formData.get('title')
                                        const body = formData.get('body')
                                        updateTodo(todo.id, title, body)
                                        setUpdatedTask(null)
                                    }}
                                        className="space-y-3"
                                    >
                                        <Input name='title' value={updatingTitleValue} onChange={(e) => { setUpdatingTitleValue(e.target.value) }} placeholder='Update Your Task Title' className='w-full px-2 py-1 bg-gray-50' />
                                        <Textarea name='body' value={updatingBodyValue} onChange={(e) => { setUpdatingBodyValue(e.target.value) }} placeholder='Update Your Task Body' className='w-full px-2 py-1 resize-none bg-gray-50' />
                                        <div className="flex gap-3">
                                            <Button type='submit'>Update</Button>
                                            <Button onClick={() => { setUpdatedTask(null) }} >Close</Button>
                                        </div>
                                    </form>
                                }
                            </div>
                            <div className="flex items-center gap-3 text-xl mt-3">

                                {updatedTask === todo.id ? null : <CiEdit onClick={() => { handleUpdateProcess(todo) }} />}
                                <MdDeleteOutline onClick={() => { removeTask(todo.id) }} className='text-red-800' />
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        }
    </>

}
