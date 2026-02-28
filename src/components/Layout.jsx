import React from 'react'
import { useToDoStore } from '@/store/todo.store';
import Todos from './todos';


export default function Layout() {

    const todos = useToDoStore(state => state.todos)
    return <>
        {todos.length > 0 &&
            <div className="col-span-1 xl:col-span-3 space-y-4 max-h-90 h-screen py-3 overflow-y-scroll no-scrollbar">
                <Todos todos={todos} />
            </div>
        }
    </>
}
