<template>
  <q-dialog v-model="openDialog">
    <q-card class="add-toDo-dialog">
      <q-form @submit="submit">
        <q-card-section>
          <div class="text-h6">Ajouter un élément</div>
        </q-card-section>
        <q-separator />

        <q-card-section>
          <q-input v-model="title" :rules="[notEmptyRule]" filled label="Titre *"  />
          <q-input v-model="description" filled type="textarea" label="Description" />
        </q-card-section>

        <q-separator />
        <q-card-actions align="between">
          <q-btn v-close-popup flat label="Retour" />
          <q-btn label="Ajouter" color="secondary" type="submit" />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  data: () => ({
    openDialog: false,
    title: '',
    description: '',
    loading: false
  }),
  computed: {
    // Rule check if a field is empty
    notEmptyRule (val) {
      return val => (val !== null && val !== '') || 'Ce champ est requis'
    }
  },
  created () {
    // Open the dialog when this event occurs
    this.$root.$on('AddToDoDialog', () => {
      this.openDialog = true
    })
  },
  methods: {
    resetDialog () {
      this.title = ''
      this.description = ''
    },
    submit () {
      this.loading = true
      const data = { title: this.title, description: this.description }
      this.$store.dispatch('user/addToDo', data).then(() => {
        this.openDialog = false
        this.resetDialog()
      }).catch((error) => {
        console.log(error)
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="scss">
  .add-toDo-dialog {
    width: 90%;
  }
</style>
