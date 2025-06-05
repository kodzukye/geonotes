import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

import HomeView from '@/views/HomeView.vue'
import InteractiveMapView from '@/views/InteractiveMapView.vue'
import NotesView from '@/views/NotesView.vue'
import ContactsView from '@/views/ContactsView.vue'
import AccountView from '@/views/AccountView.vue'
import NewNoteView from '@/views/NewNoteView.vue'
import NewContactView from '@/views/NewContactView.vue'
import EditContactView from '@/views/EditContactView.vue'
import EditNoteView from '@/views/EditNoteView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { requiresAuth: false },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/explore',
    name: 'explore',
    component: InteractiveMapView,
    meta: { requiresAuth: true },
  },
  {
    path: '/notes',
    name: 'notes',
    component: NotesView,
    meta: { requiresAuth: true },
  },
  {
    path: '/notes/new/',
    name: 'new-note',
    component: NewNoteView,
    meta: { requiresAuth: true },
  },
  {
    path: '/notes/edit/:id',
    name: 'edit-note',
    component: EditNoteView,
    meta: { requiresAuth: true },
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: ContactsView,
    meta: { requiresAuth: true },
  },
  {
    path: '/contacts/new/',
    name: 'new-contact',
    component: NewContactView,
    meta: { requiresAuth: true },
  },
  {
    path: '/contacts/edit/:id',
    name: 'edit-contact',
    component: EditContactView,
    meta: { requiresAuth: true },
  },
  {
    path: '/account',
    name: 'account',
    component: AccountView,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isLoggedIn()) {
    next('/login')
  } else {
    next()
  }
})

export default router
