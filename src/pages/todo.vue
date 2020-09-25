<template>
  <q-page class="q-px-lg">
    <ToDoList ref="todos" />

    <ToDoAddDialog />

    <q-btn @click="AddToDo" fab-mini icon="add" color="secondary" class="fab-add-todo absolute-center" />
  </q-page>
</template>

<script>
import ToDoList from 'components/to_do/todo_list'
import ToDoAddDialog from 'components/to_do/dialog_add_todo'

export default {
  components: { ToDoList, ToDoAddDialog },
  methods: {
    // Open the "Add ToDo" dialog
    AddToDo () {
      this.$root.$emit('AddToDoDialog')
    }
  }
}
</script>

<style lang="scss">
  .fab-add-todo {
    position: absolute;
    top: 0; left: 35px;
    z-index: 2001;
  }
</style>
