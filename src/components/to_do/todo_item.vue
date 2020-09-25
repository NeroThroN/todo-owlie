<template>
  <q-expansion-item :group="group" itemscope expand-icon="none" header-class="todo-header">
    <template v-slot:header>
      <q-item-section>
        <q-item-label class="q-mx-md text-grey-9">{{ todo.title }}</q-item-label>
      </q-item-section>
      <q-item-section side class="q-mr-xs">
        <q-checkbox :value="todo.done" />
      </q-item-section>
    </template>

    <q-card>
      <q-card-section>
        <div v-if="haveContent">{{ todo.content }}</div>
        <div v-else class="text-italic text-grey">Aucune description</div>

        <q-popup-edit ref="editPopUp" v-model="todo.content" title="Changer la description" @show="fixEditPopUp">
          <q-input ref="editInput" v-model="todo.content" type="textarea" autofocus autogrow />
        </q-popup-edit>
      </q-card-section>
    </q-card>
   </q-expansion-item>
</template>

<script>
export default {
  props: {
    todo: { required: true, type: Object },
    group: { type: String, default: 'todoGroup' }
  },
  data: () => ({
    open: false
  }),
  computed: {
    haveContent () {
      return this.todo.content !== null && this.todo.content !== ''
    }
  },
  methods: {
    // Solve the problem of over height textArea
    fixEditPopUp () {
      this.$refs.editInput.__adjustHeight()
      this.$refs.editInput.__emitValue(this.$refs.editInput.value + ' ')
      this.$refs.editInput.__emitValue(this.$refs.editInput.value.slice(0, -1))
    }
  }
}
</script>

<style lang="scss">
  .todo-header {
    background-color: rgba(128, 128, 128, 0.089);
  }
  .q-expansion-item__toggle-icon {
    display: none;
  }
  .q-expansion-item__container > .todo-header {
    padding: 0;
  }
  .q-expansion-item__container > .todo-header > .q-item__section--side:last-of-type {
    display: none;
  }
  .q-expansion-item__container > .todo-header > .row {
    min-width: inherit;
  }
</style>
