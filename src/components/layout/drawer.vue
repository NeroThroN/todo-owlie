<template>
    <q-drawer v-model="drawerOpen">
      <DrawerTop v-if="$store.getters['user/isConnected']" />
      <SignIN v-else />
    </q-drawer>
</template>

<script>
import SignIN from 'components/sign/sign_in'
import DrawerTop from 'components/layout/drawer_top'

export default {
  components: {
    SignIN,
    DrawerTop
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
