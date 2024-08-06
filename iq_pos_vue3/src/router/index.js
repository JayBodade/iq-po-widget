import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ContactView from '../views/ContactView.vue'
import LoginView from '@/views/LoginView.vue'
import SignupView from '@/views/SignupView.vue'
import AppRegistration from '@/views/AppRegistration.vue'
import CustomerOnboarding from '@/views/CustomerOnboarding.vue';
import ProductOnboarding from '@/views/ProductOnboarding.vue';
import OrderOnboarding from '@/views/OrderOnboarding.vue';
import CustomerOnboardingNew from '@/views/CustomerOnboardingNew.vue'
import ProductOnboardingNew from '@/views/ProductOnboardingNew.vue'
import OrderOnboardingNew from '@/views/OrderOnboardingNew.vue'
import SettingsView from '@/views/SettingsView.vue'
import AllOrders from '@/views/AllOrders.vue'


const routes = [
  {
    path: '/dashboard',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/contact',
    name:'contact',
    component:ContactView
  },
  {
    path:'/login',
    name:'login',
    component:LoginView,
  },
  {
    path:'/signup',
    component:SignupView
  },
  {
    path:'/appregistration',
    component:AppRegistration,
  },
  {
    path:'/customeronboarding',
    component:CustomerOnboarding,
  },
  {
    path:'/productonboarding',
    component:ProductOnboarding,
  },
  {
    path:'/orderonboarding',
    component:OrderOnboarding,
  },
  {
    path:'/customeronboardingnew',
    component:CustomerOnboardingNew,

  },
  {
    path:'/productonboardingnew',
    component:ProductOnboardingNew
  },
  {
    path:'/orderonboardingnew',
    component:OrderOnboardingNew
  },
  {
    path:'/settings',
    component:SettingsView
  },
    {
      path:'/allorders',
      component:AllOrders,
    }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
