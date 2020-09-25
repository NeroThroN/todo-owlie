<template>
  <div class="q-pa-md column items-start">
     <p class="q-ma-none text-subtitle1 text-weight-bold">Bonjour {{ $store.getters['user/getEmail'] }} !</p>
     <q-btn color="secondary" label="Me déconnecter" @click="signOut" class="q-mt-md" />
  </div>
</template>

<script>
export default {
  methods: {
    signOut () {
      this.$store.dispatch('user/signOut').catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>
