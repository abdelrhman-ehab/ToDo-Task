import { useToDoStore } from '@/store/todo.store'
import React, { useState } from 'react'
import { CiEdit } from 'react-icons/ci'
import { MdDeleteOutline } from 'react-icons/md'


export default function SubTodos({ todo }) {
    const direction = useToDoStore(state => state.direction)

    const completedSubTodo = useToDoStore(state => state.completedSubTodo)
    const UpdateSubTodo = useToDoStore(state => state.UpdateSubTodo)
    const deleteSubTodo = useToDoStore(state => state.deleteSubTodo)

    const [updatingSubTask, setUpdatingSubTask] = useState(false)
    const [updatingSubTitleValue, setUpdatingSubTitleValue] = useState(null)
    const [updatingSubBodyValue, setUpdatingSubBodyValue] = useState(null)
    const [subMultiLines, setSubMultilines] = useState(null)

    const handleUpdatingSubTasks = (sub) => {
        setUpdatingSubTask(true)
        setUpdatingSubTitleValue(sub.title)
        setUpdatingSubBodyValue(sub.body)
    }
    return <>
        <div className={` mt-5 space-y-2 border-black ${direction === 'ltr' ? 'ml-3 pl-2 sm:pl-4 border-l' : 'mr-3 pr-2 sm:pr-4 border-r'}`}>
            {todo.subTodos.map((sub) => (
                <div>
                    {
                        updatingSubTask ?
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const formData = new FormData(e.target)
                                UpdateSubTodo(todo.id, sub.id, { title: formData.get('title'), body: formData.get('desc') })
                                setUpdatingSubTask(false)
                            }}
                                className="space-y-3">
                                <Input name='title' value={updatingSubTitleValue} onChange={(e) => { setUpdatingSubTitleValue(e.target.value) }} type='text' placeholder={`${direction === 'ltr' ? 'Update SubTask Title...' : '...عدل عنوان التاسك الفرعي'}`} className='bg-white' />
                                <Textarea name='desc' value={updatingSubBodyValue} onChange={(e) => { setUpdatingSubBodyValue(e.target.value) }} placeholder={`${direction === 'ltr' ? 'Update SubTask Details...' : '...عدل تفاصيل التاسك الفرعي'}`} className='bg-white resize-none' />
                                <div className="space-x-2">
                                    <Button type='submit' className='buttonTheme'>{`${direction === 'ltr' ? 'Save' : 'حفظ'}`}</Button>
                                    <Button variant='secondary' onClick={() => { setUpdatingSubTask(false) }}>{`${direction === 'ltr' ? 'Cancle' : 'الغاء'}`}</Button>
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
                                    <CiEdit onClick={() => { handleUpdatingSubTasks(sub) }} className='cursor-pointer text-indigo-800' />
                                    <MdDeleteOutline
                                        className="text-red-900 cursor-pointer"
                                        onClick={() => { deleteSubTodo(todo.id, sub.id) }}
                                    />
                                </div>
                            </div>
                    }

                </div>
            ))
            }
        </div>
    </>
}
