<template>
  <div class="container">
    <h1>Tambah Kegiatan</h1>
    <div class="input-group">
      <input type="text" v-model="newTodo" placeholder="Tambah kegiatan baru..." />
      <button @click="addTodo">Tambah</button>
    </div>
    <p>Total Kegiatan: {{ todoCount }}</p>
    <div
      v-for="(todo, index) in todos"
      :key="index"
      class="todo-item"
      :class="{ completed: todo.completed }"
    >
      <input type="checkbox" v-model="todo.completed" @change="toggleTodoCompletion(index)" />
      <input
        type="text"
        v-model="todo.text"
        @keyup.enter="saveTodo(index)"
        @blur="saveTodo(index)"
        :class="{ completed: todo.completed }"
      />
      <button @click="deleteTodoItem(index)" class="delete-btn">Hapus</button>
    </div>
    <button @click="filterTodos">Filter Belum Selesai</button>
  </div>
</template>

<script>
import { useTodoStore } from '@/stores/store.js'
import { mapState, mapActions, mapGetters } from 'pinia'

export default {
  data() {
    return {
      newTodo: ''
    }
  },
  computed: {
    ...mapState(useTodoStore, ['todos']),
    ...mapGetters(useTodoStore, ['todoCount'])
  },
  methods: {
    ...mapActions(useTodoStore, [
      'addTodoItem',
      'deleteTodoItem',
      'filterTodos',
      'editTodoItem',
      'toggleTodoCompletion'
    ]),
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.addTodoItem(this.newTodo)
        this.newTodo = ''
      }
    },
    saveTodo(index) {
      const newText = this.todos[index].text.trim()
      if (newText !== '') {
        this.editTodoItem({ index, newText })
      }
    },
    toggleTodoCompletion(index) {
      // Tambahkan aksi yang sesuai jika diperlukan
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 20px auto;
  background-color: #f4f4f4;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.input-group {
  display: flex;
  align-items: center;
}

input[type='text'] {
  flex: 1;
  padding: 12px;
  margin-right: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: #5cb85c;
  padding: 12px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #449d44;
}

button.delete-btn {
  background-color: #d9534f;
  color: white;
}

button.delete-btn:hover {
  background-color: #c9302c;
}

.todo-item {
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.completed {
  text-decoration: line-through;
  color: #aaa;
}

@media only screen and (max-width: 600px) {
  .container {
    max-width: 100%;
    padding: 10px;
  }

  input[type='text'] {
    width: calc(100% - 70px);
  }

  button {
    padding: 10px 15px;
  }
}
</style>
