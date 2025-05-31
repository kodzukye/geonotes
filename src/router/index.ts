import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import InteractiveMapView from '@/views/InteractiveMapView.vue'
import NotesView from '@/views/NotesView.vue'
import ContactsView from '@/views/ContactsView.vue'
import AccountView from '@/views/AccountView.vue'
import NewNoteView from '@/views/NewNoteView.vue'
import NewContactView from '@/views/NewContactView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/explore',
      name: 'explore',
      component: InteractiveMapView,
    },
    {
      path: '/notes',
      name: 'notes',
      component: NotesView,
    },
    {
      path: '/contacts',
      name: 'contacts',
      component: ContactsView,
    },
    {
      path: '/account',
      name: 'account',
      component: AccountView,
    },
    {
      path: '/notes/new/',
      name: 'new-note',
      component: NewNoteView,
    },
    {
      path: '/contacts/new/',
      name: 'new-contact',
      component: NewContactView,
    },
  ],
})

export default router
