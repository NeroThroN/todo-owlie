<template>
    <q-drawer v-model="drawerOpen">
      Drawer Content
    </q-drawer>
</template>

<script>
export default {
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
