<template>
  <q-page class="flex column items-center">
    <p class="q-pa-md text-subtitle2 text-center text-weight-light" v-html="text" />
    <q-btn color="secondary" label="M'authentifier" @click="signButton" />
  </q-page>
</template>

<script>
export default {
  data: () => ({
    text: 'Afin d\'accéder à votre Todolist<br>merci de bien vouloir vous authentifier.'
  }),
  methods: {
    signButton () {
      this.$root.$emit('openCloseDrawer', true)
    }
  }
}
</script>
