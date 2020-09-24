
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/not_logged.vue'), meta: { logInRestricted: 'ToDo' } },
      { path: 'ToDo', component: () => import('pages/todo.vue'), meta: { restricted: true } }
    ]
  },
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
