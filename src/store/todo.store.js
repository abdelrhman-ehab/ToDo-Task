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

    // set todo completed
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

    // get all todos
    getAllTodos: () => set(obj => {
        return { todos: JSON.parse(localStorage.getItem('todos')) }
    }),

    // get completed todos
    getCompletedTodos: () => set(obj => {
        const todos = JSON.parse(localStorage.getItem('todos')) || []
        const completedTodos = todos?.filter(todo => todo.completed === true)
        return { todos: completedTodos }
    }),

    // get uncompleted todos
    getUncompletedTodos: () => set(obj => {
        const todos = JSON.parse(localStorage.getItem('todos')) || []
        const uncompletedTodos = todos?.filter(todo => todo.completed === false)
        return { todos: uncompletedTodos }
    }),

    // use create todo button to update
    updatedTodo: null,

    // toggle create button job
    setUpdatedTodo: (value) => set(() => ({
        updatedTodo: value
    }))

}))
