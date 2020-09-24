<template>
    <q-drawer v-model="drawerOpen">
      <SignIN />
    </q-drawer>
</template>

<script>
import SignIN from 'components/sign/sign_in'

export default {
  components: {
    SignIN
  },
  data: () => ({
    drawerOpen: false
  }),
  created () {
    this.$root.$on('openCloseDrawer', (open) => {
      this.drawerOpen = open
    })
  }
}
</script>
