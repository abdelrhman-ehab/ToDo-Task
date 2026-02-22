import React, { useEffect, useRef, useState } from 'react'
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
    const completedTask = useToDoStore(obj => obj.completedTodo)
    const workAsUpdating = useToDoStore(obj => obj.workAsUpdating)
    const setWorkAsUpdating = useToDoStore(obj => obj.setWorkAsUpdating)
    const updatingTitleValue = useRef(null)
    const updatingBodyValue = useRef(null)

    // handle updating process
    const handleUpdateProcess = (todo) => {
        setWorkAsUpdating(!workAsUpdating)
        setTimeout(() => {
            if (updatingTitleValue.current && updatingBodyValue.current) {
                updatingTitleValue.current.value = todo.title
                updatingBodyValue.current.value = todo.body
            }
        })
    }

    useEffect(() => { console.log(workAsUpdating) }, [workAsUpdating])
    return <>
        {todos.length > 0 &&
            <div className=" col-span-1 xl:col-span-3 space-y-4 overflow-auto no-scrollbar">
                {[...todos].reverse().map(todo =>
                    <Card key={todo.id} className='px-3'>
                        <div className="flex justify-between gap-4">
                            <div className="task w-full space-y-3">
                                <h2 className={`text-2xl font-bold ${todo.completed === true && 'line-through text-black/70'}`}><input type='checkbox' onClick={() => { completedTask(todo.id) }} /> {todo.title}</h2>
                                {workAsUpdating === true && <Input ref={updatingTitleValue} type="text" placeholder='Update Your Task Title' className='w-full px-2 py-1' />}
                                <p className={`ms-3 line-clamp-1 ${todo.completed === true && 'line-through text-black/70'}`}>{todo.body}</p>
                                {workAsUpdating === true && <Textarea ref={updatingBodyValue} type="text" placeholder='Update Your Task Body' className='w-full px-2 py-1 resize-none' />}
                                {workAsUpdating === true && <Button>Update</Button>}
                            </div>
                            <div className="flex items-center gap-3 text-xl">
                                
                                <CiEdit onClick={() => { handleUpdateProcess(todo) }} />
                                <MdDeleteOutline onClick={() => { removeTask(todo.id) }} className='text-red-800' />
                            </div>
                        </div>
                    </Card>
                )}
            </div>
        }
    </>

}
