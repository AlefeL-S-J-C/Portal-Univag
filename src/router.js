import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './pages/LoginPage.vue'
import FirstAccessPage from './pages/FirstAccessPage.vue'
import PasswordRecoveryPage from './pages/PasswordRecoveryPage.vue'
import CoursesPage from './pages/CoursesPage.vue'
import LimitedAccessPage from './pages/LimitedAccessPage.vue'
import DashboardPage from './pages/DashboardPage.vue'

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage
  },
  {
    path: '/primeiro-acesso',
    name: 'FirstAccess',
    component: FirstAccessPage
  },
  {
    path: '/recuperacao-senha',
    name: 'PasswordRecovery',
    component: PasswordRecoveryPage
  },
  {
    path: '/cursos',
    name: 'Courses',
    component: CoursesPage
  },
  {
    path: '/acesso-limitado',
    name: 'LimitedAccess',
    component: LimitedAccessPage
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: DashboardPage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
