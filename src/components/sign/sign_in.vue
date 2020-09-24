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

    <q-btn color="secondary" label="Me connecter" class="q-my-sm" />
    <q-btn color="primary" padding="none" flat label="Créer un compte" class="q-mt-md" />
  </div>
</template>

<script>
export default {
  data: () => ({
    email: '',
    password: '',
    showPassword: false
  }),
  methods: {
    toggleShowPassword (show) {
      this.showPassword = show
    }
  }
}
</script>
