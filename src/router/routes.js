
const routes = [
  {
    path: '/',
    redirect: '/admin/handle-users',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: 'admin/handle-users', component: () => import('pages/admin/handle-users/UsersPage.vue') },
      { path: 'admin/handle-bookings', component: () => import('pages/admin/handle-bookings/BookingsPage.vue') },
      { path: 'admin/handle-trainers', component: () => import('pages/admin/handle-trainers/TrainersPage.vue') }
    ]
  },
  {
    path: '/login',
    component: () => import('pages/LoginPage.vue'),
    name: 'login'
  },

  {
    path: '/register',
    component: () => import('pages/register-user/RegisterPage.vue'),
    name: 'register'
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
