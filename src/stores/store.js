import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
    count: 0
  }),
  actions: {
    addTodoItem(text) {
      this.todos.push({ text, completed: false })
      this.count++
    },
    cancelTodoItem(index) {
      this.todos.splice(index, 1)
      this.count--
    },
    editTodoItem({ index, newText }) {
      if (newText !== null && newText.trim() !== '') {
        this.todos[index].text = newText
      }
    },
    deleteTodoItem(index) {
      if (index !== -1) {
        this.todos.splice(index, 1)
        this.count--
      }
    },
    filterTodos() {
      this.todos = this.todos.filter((todo) => !todo.completed)
    }
  },
  getters: {
    todoCount: (state) => state.count,
    incompleteTodos: (state) => state.todos.filter((todo) => !todo.completed)
  }
})
