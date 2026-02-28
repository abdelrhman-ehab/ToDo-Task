import { create } from 'zustand'

// helper read todos from localstorage
export const useToDoStore = create((set) => ({
    // todos
    todos: JSON.parse(localStorage.getItem('todos')) || [],

    // add todo
    addTodo: (todoTitle, tododescreption) => set(state => {
        const newTodos = [...state.todos, {
            id: Date.now(),
            title: todoTitle,
            body: tododescreption,
            completed: false,
            subTodos: []
        }]
        localStorage.setItem('todos', JSON.stringify(newTodos))
        return { todos: newTodos }
    }),

    // remove todo
    removeTodo: (todoId) => set(state => {
        const newTodos = state.todos.filter(todo => todo.id !== todoId)
        localStorage.setItem('todos', JSON.stringify(newTodos))
        return { todos: newTodos }
    }),

    // set todo completed
    completedTodo: (todoId) => set(state => {
        const newTodos = state.todos.map(todo => todoId === todo.id ? { ...todo, completed: !todo.completed } : todo)
        localStorage.setItem('todos', JSON.stringify(newTodos))
        return { todos: newTodos }
    }),

    // update todo
    updateTodo: (todoId, todoTittle, todoBody) => set(state => {
        const newTodos = state.todos.map(todo =>
            todo.id === todoId ? { ...todo, title: todoTittle, body: todoBody } : todo)
        localStorage.setItem('todos', JSON.stringify(newTodos))
        return { todos: newTodos }
    }),

    // add sub todos
    addSubTodos: (todoId, subTodoData) => set((state) => {
        const newTodos = state.todos.map((todo) => {
            if (todoId === todo.id) {
                return {
                    ...todo,
                    subTodos: [
                        ...(todo.subTodos || []),
                        {
                            id: Date.now(),
                            ...subTodoData,
                            completed: false
                        }
                    ]
                }
            }
            return todo
        })
        localStorage.setItem('todos', JSON.stringify(newTodos))
        return { todos: newTodos }
    }),

    // edit sub todos
    UpdateSubTodo: (todoId, subTodoId, updatedData) => set((state) => {
        const newTodos = state.todos.map((todo) => {
            if (todo.id === todoId) {
                return {
                    ...todo,
                    subTodos: todo.subTodos.map((sub) => {
                        if (subTodoId === sub.id) {
                            return {
                                ...sub,
                                ...updatedData
                            }
                        }
                        return sub
                    })
                }
            }
            return todo
        })
        localStorage.setItem('todos', JSON.stringify(newTodos))
        return { todos: newTodos }
    }),

    // chicked sub todo
    completedSubTodo: (todoId, subTodoId) => set((state) => {
        const newTodos = state.todos.map((todo) => {
            if (todoId === todo.id) {
                return {
                    ...todo,
                    subTodos: [
                        ...todo.subTodos.map((sub) => {
                            if (subTodoId === sub.id) {
                                return {
                                    ...sub,
                                    completed: !sub.completed
                                }
                            }
                            return sub
                        })
                    ]
                }
            }
            return todo
        })
        localStorage.setItem('todos', JSON.stringify(newTodos))
        return { todos: newTodos }
    }),

    // delete sub todos
    deleteSubTodo: (todoId, subTodoId) => set((state) => {
        const newTodos = state.todos.map((todo) => {
            if (todoId === todo.id) {
                return {
                    ...todo,
                    subTodos: todo.subTodos.filter((sub) => sub.id !== subTodoId)
                }
            }
            return todo
        })
        localStorage.setItem('todos', JSON.stringify(newTodos))
        return { todos: newTodos }
    }),

    // get all todos
    getAllTodos: () => set(state => {
        return { todos: JSON.parse(localStorage.getItem('todos')) }
    }),

    // get completed todos
    getCompletedTodos: () => set(state => {
        const todos = JSON.parse(localStorage.getItem('todos')) || []
        const completedTodos = todos?.filter(todo => todo.completed === true)
        return { todos: completedTodos }
    }),

    // get uncompleted todos
    getUncompletedTodos: () => set(state => {
        const todos = JSON.parse(localStorage.getItem('todos')) || []
        const uncompletedTodos = todos?.filter(todo => todo.completed === false)
        return { todos: uncompletedTodos }
    }),

    // use create todo button to update
    updatedTodo: null,

    // toggle create button job
    setUpdatedTodo: (value) => set(() => ({
        updatedTodo: value
    })),

    // app direction
    direction: getComputedStyle(document.body).direction,

    toggleDirection: () => set((state) => {
        if (state.direction === 'ltr') {
            return { direction: 'rtl' }
        }
        else {
            return { direction: 'ltr' }
        }
    })

}))

