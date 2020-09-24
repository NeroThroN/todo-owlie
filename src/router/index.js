import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

export default function ({ store }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    const connected = store.getters['user/isConnected']

    // If my route have some metaData
    if (to.meta) {
      // If this page is restricted and there is no user
      if (to.meta.restricted && !connected) {
        next('')

      // If this page is restricted to connected user and there is a user
      } else if (to.meta.logInRestricted && connected) {
        next('/ToDo')

      // Else, juste go to the next page
      } else {
        next(true)
      }
    // Just go in this route
    } else {
      next(true)
    }
  })

  return Router
}
