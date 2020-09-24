<template>
  <q-layout>
    <Header />

    <Drawer />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import Header from 'components/layout/header'
import Drawer from 'components/layout/drawer'

export default {
  name: 'MainLayout',
  components: {
    Header,
    Drawer
  }
}
</script>
