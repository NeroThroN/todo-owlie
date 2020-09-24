<template>
    <q-header class="bg-primary">
      <q-toolbar>
        <q-btn flat round icon="menu" aria-label="Menu" @click="openCloseDrawer" color="grey-4" />
        <q-space />

        <q-btn flat round icon="notifications" color="grey-5" />
        <q-btn flat round icon="share" color="grey-5" />
        <q-btn flat round icon="search" color="grey-5" />
      </q-toolbar>
      <div class="q-mt-md q-px-xl q-pb-sm">
        <q-toolbar-title>
          Owlie Todolist
        </q-toolbar-title>
      </div>
    </q-header>
</template>

<script>
export default {
  data: () => ({
    drawerOpen: false
  }),
  methods: {
    openCloseDrawer () {
      this.$root.$emit('openCloseDrawer', true)
    }
  }
}
</script>
