<template>
  <div>
    <q-list v-if="todos.length" class="q-ml-xl q-pt-lg" separator>
      <!-- Slidable item on the left (to delete) -->
      <q-slide-item v-for="(todo, indexToDo) in todos" :key="'todo-' + indexToDo" @left="deleteItem(indexToDo)" left-color="red">
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

export default {
  components: { ToDoItem },
  data: () => ({
    todos: [
      {
        done: true,
        title: 'Développeer système d\'auth',
        content: ''
      },
      {
        done: false,
        title: 'Tester système d\'auth',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      },
      {
        done: false,
        title: 'Mettre à jour les dépendances',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
      }
    ]
  }),
  methods: {
    deleteItem (index) {
      alert('Supprimer l\'élément : ' + index)
    }
  }
}
</script>
