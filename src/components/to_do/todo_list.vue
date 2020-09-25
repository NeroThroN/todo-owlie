<template>
  <div>
    <q-list v-if="todos.length" class="q-ml-xl q-pt-lg" separator>
      <!-- Slidable item on the left (to delete) -->
      <q-slide-item v-for="todo in todos" :key="'todo-' + todo.id" :ref="'todo-' + todo.id" @left="deleteItem(todo.id)" left-color="red">
        <template v-slot:left>
          <div class="row items-center">
            <q-icon left name="delete" /> Supprimer
          </div>
        </template>

        <ToDoItem :todo="todo" />
      </q-slide-item>
    </q-list>

    <p v-else class="q-pa-md text-subtitle2 text-center text-weight-light text-italic">Aucun élément</p>
  </div>
</template>

<script>
import ToDoItem from 'components/to_do/todo_item'
import { firestore } from 'firebase'

export default {
  components: { ToDoItem },
  data: () => ({
    todos: []
  }),
  mounted () {
    this.$store.dispatch('user/getUserDocumentPath').then((userPath) => {
      firestore().doc(userPath).collection('toDoList').onSnapshot((snapshot) => {
        this.todos = []
        snapshot.forEach((document) => {
          const docData = document.data()
          this.todos.push({
            id: document.id,
            done: docData.done,
            title: docData.title,
            description: docData.description
          })
        })
      })
    }).catch((error) => {
      console.log(error)
    })
  },
  methods: {
    deleteItem (id) {
      this.$store.dispatch('user/removeToDoByID', id).catch((error) => {
        const refs = this.$refs['todo-' + id]
        if (refs.length) {
          refs[0].reset()
        }
        console.log(error)
      })
    }
  }
}
</script>
