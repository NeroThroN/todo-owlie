<template>
  <q-expansion-item :group="group" itemscope header-class="todo-header">
    <template v-slot:header>
      <q-item-section>
        <q-item-label class="q-mx-md text-grey-9">{{ todo.title }}</q-item-label>
      </q-item-section>
      <q-item-section side class="q-mr-xs">
        <q-checkbox v-model="done" />
      </q-item-section>
    </template>

    <q-card>
      <q-card-section>
        <div v-if="haveContent">{{ todo.description }}</div>
        <div v-else class="text-italic text-grey">Aucune description</div>

        <q-popup-edit ref="editPopUp" v-model="todo.description" title="Changer la description" @show="fixEditPopUp" @save="updateDescription" auto-save buttons label-cancel="retour" label-set="Sauvegarder">
          <q-input ref="editInput" v-model="todo.description" type="textarea" autofocus autogrow />
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
      return this.todo.description !== null && this.todo.description !== ''
    },
    done: {
      get () {
        return this.todo.done
      },
      set (value) {
        this.todo.done = value
        this.updateDone(value)
      }
    }
  },
  methods: {
    // Solve the problem of over height textArea
    fixEditPopUp () {
      this.$refs.editInput.__adjustHeight()
      this.$refs.editInput.__emitValue(this.$refs.editInput.value)
    },

    // Update the done status
    updateDone (isDone) {
      this.$store.dispatch('user/updateToDoDoneByID', {
        id: this.todo.id,
        done: isDone
      }).catch((error) => {
        this.todo.done = !this.todo.done
        console.log(error)
      })
    },

    // Update the description field
    updateDescription (newDescription, oldDescription) {
      this.$store.dispatch('user/updateToDoDescriptionByID', {
        id: this.todo.id,
        description: newDescription
      }).catch((error) => {
        this.description = oldDescription
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss">
  .q-expansion-item__container > .todo-header {
    background-color: rgba(128, 128, 128, 0.089);
    padding: 0;
    .q-item__section--side:last-of-type {
      display: none;
    }
  }
  .q-popup-edit__buttons {
    justify-content: space-between;

    button:last-of-type {
      background-color: #01dbc5;

      span {
        color: white;
      }
    }
  }
</style>
