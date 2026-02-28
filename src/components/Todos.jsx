import React, { useState } from 'react'
import { HiXMark } from "react-icons/hi2";
import { Card } from './ui/card'
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import toast from 'react-hot-toast';
import { useToDoStore } from '@/store/todo.store';
import SubTodos from './SubTodos';

export default function Todos({ todos }) {

    const direction = useToDoStore(state => state.direction)
    const timeLocation = direction === 'ltr' ? 'en-US' : 'ar-EG'

    const removeTask = useToDoStore(state => state.removeTodo)
    const updateTodo = useToDoStore(state => state.updateTodo)
    const completedTodo = useToDoStore(state => state.completedTodo)
    const updatedTodo = useToDoStore(state => state.updatedTodo)
    const setUpdatedTodo = useToDoStore(state => state.setUpdatedTodo)

    const [updatingTitleValue, setUpdatingTitleValue] = useState(null)
    const [updatingBodyValue, setUpdatingBodyValue] = useState(null)
    const [multiLines, setMultilines] = useState(null)

    const addSubTodos = useToDoStore(state => state.addSubTodos)

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

    return <>
        {todos.map(todo =>
            <Card key={todo.id} className='px-3'>
                <div className="flex justify-between items-start gap-2">
                    <div className="task w-full space-y-3">
                        {updatedTodo !== todo.id &&
                            <>
                                {/* todos layout */}
                                <div className="flex gap-2 items-start">
                                    <input
                                        type='checkbox'
                                        checked={todo.completed}
                                        onChange={() => completedTodo(todo.id)}
                                        className="mt-3.5 checked:text-blue-800"
                                    />

                                    <ul className="w-full">
                                        <h2 className={`text-xl font-bold ${todo.completed && 'line-through text-red-900/70 italic'}`}>
                                            {todo.title}
                                        </h2>
                                        <div className="mt-0.5 text-[clamp(10px,2vw,12px)] text-gray-500 space-x-1">
                                            <span>{new Date(todo.id).toLocaleDateString(timeLocation)}</span>
                                            <span>-</span>
                                            <span>{new Date(todo.id).toLocaleTimeString(timeLocation)}</span>
                                        </div>

                                        <li
                                            onClick={() => setMultilines(multiLines === todo.id ? null : todo.id)}
                                            className={`${todo.completed && 'line-through text-red-900/70 italic'} ${multiLines === todo.id ? '' : 'line-clamp-1'}`}
                                        >
                                            {todo.body}
                                        </li>

                                        {/* ✅ SUBTASKS UI */}
                                        {todo.subTodos?.length > 0 && (
                                            <SubTodos todo={todo} />
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
                                            direction === 'ltr' ? setAddSubTaskError('Title is required') : setAddSubTaskError('عنوان المهمة مطلوب')

                                            return
                                        }

                                        addSubTodos(todo.id, { title, body })
                                        { `${direction === 'ltr' ? toast.success('SubTask Added') : toast.success('تمت أضافة المهمة الفرعيه بنجاح')}` }

                                        setAddSubTaskError(null)
                                        setShowSubTasksFilds(null)
                                        e.target.reset()
                                    }}
                                        className="space-y-2"
                                    >
                                        <Input name='subTaskTitle' placeholder={`${direction === 'ltr' ? 'SubTask Title...' : '...عنوان المهمة الفرعيه'}`} className='bg-gray-50' />
                                        <Textarea name='subTaskDesc' placeholder={`${direction === 'ltr' ? 'SubTask Details... (optional)' : 'تفاصيل المهمة الفرعيه...(أختياري) '}`} className='bg-gray-50 resize-none' />

                                        {addSubTaskError && (
                                            <p className="text-sm text-red-800 italic">{addSubTaskError}</p>
                                        )}

                                        <div className="flex gap-2">
                                            <Button type='submit'>{`${direction === 'ltr' ? 'Add' : 'أضافة'}`}</Button>
                                            <Button type='button' variant='secondary' onClick={() => setShowSubTasksFilds(null)}>
                                                {`${direction === 'ltr' ? 'Cancle' : 'الغاء'}`}
                                            </Button>
                                        </div>
                                    </form>
                                ) : (
                                    <p
                                        onClick={() => handleAddingSubTasks(todo.id)}
                                        className="text-sm text-blue-500 hover:underline cursor-pointer w-fit"
                                    >
                                        {`${direction === 'ltr' ? '+ Add Subtask' : '+ أضافة مهمة فرعية'}`}
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
                                    <Button type='submit' className='buttonTheme'>{`${direction === 'ltr' ? 'Save' : 'حفظ'}`}</Button>
                                    <Button variant='secondary' onClick={() => setUpdatedTodo(null)}>{`${direction === 'ltr' ? 'Cancle' : 'الغاء'}`}</Button>
                                </div>
                            </form>
                        }
                    </div>

                    {/* ACTIONS */}
                    <div className="flex items-center gap-3 text-xl mt-3">
                        {updatedTodo !== todo.id &&
                            <CiEdit className='text-indigo-700' onClick={() => handleUpdateProcess(todo)} />
                        }
                        <MdDeleteOutline
                            onClick={() => removeTask(todo.id)}
                            className='text-red-800 cursor-pointer'
                        />
                    </div>

                </div>
            </Card>
        )}
    </>
}
