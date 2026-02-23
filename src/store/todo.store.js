import { create } from 'zustand'

// helper read todos from localstorage
export const useToDoStore = create((set) => ({
    // todos
    todos: JSON.parse(localStorage.getItem('todos')) || [],

    // add todo
    addTodo: (todoTitle, todoBody) => set(obj => {
        const newTodos = [...obj.todos, { id: Date.now(), title: todoTitle, body: todoBody, completed: false }]
        localStorage.setItem('todos', JSON.stringify(newTodos))
        return { todos: newTodos }
    }),

    // remove todo
    removeTodo: (todoId) => set(obj => {
        const newTodos = obj.todos.filter(todo => todo.id !== todoId)
        localStorage.setItem('todos', JSON.stringify(newTodos))
        return { todos: newTodos }
    }),

    // completed todo
    completedTodo: (todoId) => set(obj => {
        const newTodos = obj.todos.map(todo => todoId === todo.id ? { ...todo, completed: !todo.completed } : todo)
        localStorage.setItem('todos', JSON.stringify(newTodos))
        return { todos: newTodos }
    }),

    // update todo
    updateTodo: (todoId, todoTittle, todoBody) => set(obj => {
        const newTodos = obj.todos.map(todo =>
            todo.id === todoId ? { ...todo, title: todoTittle, body: todoBody } : todo)
        localStorage.setItem('todos', JSON.stringify(newTodos))
        return { todos: newTodos }
    }),

    // use create todo button to update
    updatedTask: null,

    // toggle create button job
    setUpdatedTask: (value) => set(() => ({
        updatedTask: value
    }))

}))
