<template>
  <div class="q-pa-md column items-start">
    <h6 class="q-ma-none">Me connecter</h6>
    <p class="text-weight-light text-grey-7">Entrez vos identifiants pour vous connecter</p>

    <q-input v-model="email" filled label="Email" class="q-my-sm self-stretch" />
    <q-input v-model="password" :type="showPassword ? 'text' : 'password'" filled label="Mot de passe" class="q-my-sm self-stretch">
      <template v-slot:append>
          <q-icon
            :name="showPassword ? 'visibility' : 'visibility_off'"
            class="cursor-pointer"
            @mousedown.native="toggleShowPassword(true)"
            @mouseup.native="toggleShowPassword(false)"
          />
        </template>
    </q-input>

    <q-btn @click="signInWithEmailAndPassword" :loading="loading" color="secondary" label="Me connecter" class="q-my-sm" />
    <q-btn @click="signUpWithEmailAndPassword" :loading="loading" color="primary" padding="none" flat label="Créer un compte" class="q-mt-md" />
  </div>
</template>

<script>
import { Notify } from 'quasar'

export default {
  data: () => ({
    email: '',
    password: '',
    showPassword: false,
    loading: false
  }),
  methods: {
    // Toggle the display of the password
    toggleShowPassword (show) {
      this.showPassword = show
    },

    // Call the action in the store (user) to sign in the user
    signInWithEmailAndPassword () {
      this.loading = true
      const data = { email: this.email, password: this.password }
      this.$store.dispatch('user/signIn', data).then(() => {
        this.resetEmailAndPassword()
      }).catch((error) => {
        Notify.create({
          position: 'top',
          icon: 'warning',
          color: 'negative',
          message: error.message,
          actions: [
            { icon: 'close', color: 'white' }
          ]
        })
        console.log('error', error)
      }).finally(() => {
        this.loading = false
      })
    },

    // Call the action in the store (user) to sign up with Firebase (email and password)
    signUpWithEmailAndPassword () {
      this.loading = true
      const data = { email: this.email, password: this.password }
      this.$store.dispatch('user/signUp', data).then(() => {
        Notify.create({
          position: 'top',
          icon: 'thumb_up_alt',
          color: 'positive',
          message: 'Bravo, vous avez créer votre compte !',
          actions: [
            { icon: 'close', color: 'white' }
          ]
        })
        this.resetEmailAndPassword()
      }).catch((error) => {
        Notify.create({
          position: 'top',
          icon: 'warning',
          color: 'negative',
          message: error.message,
          actions: [
            { icon: 'close', color: 'white' }
          ]
        })
        console.log('error', error)
      }).finally(() => {
        this.loading = false
      })
    },

    // Reset email and password
    resetEmailAndPassword () {
      this.email = ''
      this.password = ''
    }
  }
}
</script>
