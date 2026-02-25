import React, { useEffect, useState } from 'react'
import { HiXMark } from "react-icons/hi2";
import { Card } from './ui/card'
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { useToDoStore } from '@/store/todo.store';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import toast from 'react-hot-toast';

export default function Tasks() {
    const todos = useToDoStore(state => state.todos)
    const removeTask = useToDoStore(state => state.removeTodo)
    const updateTodo = useToDoStore(state => state.updateTodo)
    const completedTodo = useToDoStore(state => state.completedTodo)
    const updatedTodo = useToDoStore(state => state.updatedTodo)
    const setUpdatedTodo = useToDoStore(state => state.setUpdatedTodo)

    const [updatingTitleValue, setUpdatingTitleValue] = useState(null)
    const [updatingBodyValue, setUpdatingBodyValue] = useState(null)
    const [multiLines, setMultilines] = useState(null)

    const addSubTodos = useToDoStore(state => state.addSubTodos)
    const completedSubTodo = useToDoStore(state => state.completedSubTodo)
    const UpdateSubTodo = useToDoStore(state => state.UpdateSubTodo)
    const deleteSubTodo = useToDoStore(state => state.deleteSubTodo)

    const [updatingSubTask, setUpdatingSubTask] = useState(false)
    const [updatingSubTitleValue, setUpdatingSubTitleValue] = useState(null)
    const [updatingSubBodyValue, setUpdatingSubBodyValue] = useState(null)
    const [subMultiLines, setSubMultilines] = useState(null)
    const [showSubTasksFilds, setShowSubTasksFilds] = useState(null)
    const [addSubTaskError, setAddSubTaskError] = useState(null)



    const handleUpdateProcess = (todo) => {
        setUpdatedTodo(todo.id)
        setUpdatingTitleValue(todo.title)
        setUpdatingBodyValue(todo.body)
    }

    const handleAddingSubTasks = (todoId) => {
        setShowSubTasksFilds(prev => prev === todoId ? null : todoId)
    }

    const handleUpdatingSubTasks = (sub) => {
        setUpdatingSubTask(true)
        setUpdatingSubTitleValue(sub.title)
        setUpdatingSubBodyValue(sub.body)
    }

    return <>
        {todos.length > 0 &&
            <div className="col-span-1 xl:col-span-3 space-y-4 max-h-90 h-screen py-3 overflow-y-scroll no-scrollbar">
                {todos.map(todo =>
                    <Card key={todo.id} className='px-3 bg-green-900/15'>
                        <div className="flex justify-between items-start gap-2">

                            <div className="task w-full space-y-3">

                                {/* VIEW MODE */}
                                {updatedTodo !== todo.id &&
                                    <>
                                        <div className="flex gap-2 items-start">
                                            <input
                                                type='checkbox'
                                                checked={todo.completed}
                                                onChange={() => completedTodo(todo.id)}
                                                className="mt-3.5"
                                            />

                                            <ul className="space-y-1.5 w-full">
                                                <h2 className={`text-2xl font-bold ${todo.completed && 'line-through text-red-900/70 italic'}`}>
                                                    {todo.title}
                                                </h2>
                                                <div className="-mt-1.5 text-xs text-gray-600 space-x-2">
                                                    <span>{new Date(todo.id).toLocaleDateString()}</span>
                                                    <span>{new Date(todo.id).toLocaleTimeString()}</span>
                                                </div>

                                                <li
                                                    onClick={() => setMultilines(multiLines === todo.id ? null : todo.id)}
                                                    className={`${todo.completed && 'line-through text-red-900/70 italic'} ${multiLines === todo.id ? '' : 'line-clamp-1'}`}
                                                >
                                                    {todo.body}
                                                </li>

                                                {/* ✅ SUBTASKS UI */}
                                                {todo.subTodos?.length > 0 && (
                                                    <div className="ml-3 sm:ml-6 space-y-2 border-l-2 border-gray-300 pl-2 sm:pl-4">
                                                        {todo.subTodos.map((sub) => (
                                                            <>
                                                                {
                                                                    updatingSubTask ?
                                                                        <form onSubmit={(e) => {
                                                                            e.preventDefault();
                                                                            const formData = new FormData(e.target)
                                                                            UpdateSubTodo(todo.id, sub.id, { title: formData.get('title'), body: formData.get('desc') })
                                                                            setUpdatingSubTask(false)
                                                                        }}
                                                                            className="space-y-3">
                                                                            <Input name='title' value={updatingSubTitleValue} onChange={(e) => { setUpdatingSubTitleValue(e.target.value) }} type='text' placeholder='Update SubTask Title' className='bg-white' />
                                                                            <Textarea name='desc' value={updatingSubBodyValue} onChange={(e) => { setUpdatingSubBodyValue(e.target.value) }} placeholder='Update SubTask Descreption' className='bg-white resize-none' />
                                                                            <div className="space-x-2">
                                                                                <Button type='submit'>Save</Button>
                                                                                <Button variant='secondary' onClick={() => { setUpdatingSubTask(false) }}>Cancle</Button>
                                                                            </div>
                                                                        </form> :
                                                                        <div key={sub.id} className="flex items-start gap-2">
                                                                            <input
                                                                                type="checkbox"
                                                                                checked={sub.completed || todo.completed}
                                                                                onChange={() => { completedSubTodo(todo.id, sub.id) }}
                                                                                className="mt-1"
                                                                            />

                                                                            <div className={`flex-1 ${todo.completed && 'line-through text-red-900/70 italic'} ${sub.completed ? 'line-through text-gray-400' : ''}`}>
                                                                                <p className={`text-sm font-medium`}>
                                                                                    {sub.title || 'Subtask'}
                                                                                </p>

                                                                                {sub.body && (
                                                                                    <p onClick={() => { subMultiLines === sub.id ? setSubMultilines(null) : setSubMultilines(sub.id) }} className={`text-xs text-gray-600 ${subMultiLines === sub.id ? '' : 'line-clamp-1'}`}>
                                                                                        {sub.body}
                                                                                    </p>
                                                                                )}
                                                                            </div>

                                                                            {/* sub tasks actions */}
                                                                            <div className="flex gap-2">
                                                                                <CiEdit onClick={() => { handleUpdatingSubTasks(sub) }} className='cursor-pointer' />
                                                                                <MdDeleteOutline
                                                                                    className="text-red-900 cursor-pointer"
                                                                                    onClick={() => { deleteSubTodo(todo.id, sub.id) }}
                                                                                />
                                                                            </div>
                                                                        </div>

                                                                }

                                                            </>
                                                        ))}
                                                    </div>
                                                )}
                                            </ul>
                                        </div>

                                        {/* ADD SUBTASK */}
                                        {showSubTasksFilds === todo.id ? (
                                            <form onSubmit={(e) => {
                                                e.preventDefault()
                                                const formData = new FormData(e.target)
                                                const title = formData.get('subTaskTitle')
                                                const body = formData.get('subTaskDesc')

                                                if (!title) {
                                                    setAddSubTaskError('Title is required')
                                                    return
                                                }

                                                addSubTodos(todo.id, { title, body })
                                                toast.success('SubTask Added')

                                                setAddSubTaskError(null)
                                                setShowSubTasksFilds(null)
                                                e.target.reset()
                                            }}
                                                className="space-y-2"
                                            >
                                                <Input name='subTaskTitle' placeholder='Subtask title' className='bg-gray-50' />
                                                <Textarea name='subTaskDesc' placeholder='Description (optional)' className='bg-gray-50 resize-none' />

                                                {addSubTaskError && (
                                                    <p className="text-sm text-red-800 italic">{addSubTaskError}</p>
                                                )}

                                                <div className="flex gap-2">
                                                    <Button type='submit'>Add</Button>
                                                    <Button type='button' variant='secondary' onClick={() => setShowSubTasksFilds(null)}>
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </form>
                                        ) : (
                                            <p
                                                onClick={() => handleAddingSubTasks(todo.id)}
                                                className="text-sm text-blue-500 hover:underline cursor-pointer w-fit"
                                            >
                                                + Add Subtask
                                            </p>
                                        )}
                                    </>
                                }

                                {/* EDIT MODE */}
                                {updatedTodo === todo.id &&
                                    <form onSubmit={(e) => {
                                        e.preventDefault()
                                        const formData = new FormData(e.target)

                                        updateTodo(
                                            todo.id,
                                            formData.get('title'),
                                            formData.get('body')
                                        )

                                        setUpdatedTodo(null)
                                    }}
                                        className="space-y-3"
                                    >
                                        <Input
                                            name='title'
                                            value={updatingTitleValue}
                                            onChange={(e) => setUpdatingTitleValue(e.target.value)}
                                            className='bg-gray-50'
                                        />

                                        <Textarea
                                            name='body'
                                            value={updatingBodyValue}
                                            onChange={(e) => setUpdatingBodyValue(e.target.value)}
                                            className='bg-gray-50 resize-none'
                                        />

                                        <div className="flex gap-3">
                                            <Button type='submit'>Update</Button>
                                            <Button variant='secondary' onClick={() => setUpdatedTodo(null)}>Cancle</Button>
                                        </div>
                                    </form>
                                }
                            </div>

                            {/* ACTIONS */}
                            <div className="flex items-center gap-3 text-xl mt-3">
                                {updatedTodo !== todo.id &&
                                    <CiEdit onClick={() => handleUpdateProcess(todo)} />
                                }
                                <MdDeleteOutline
                                    onClick={() => removeTask(todo.id)}
                                    className='text-red-800 cursor-pointer'
                                />
                            </div>

                        </div>
                    </Card>
                )}
            </div>
        }
    </>
}