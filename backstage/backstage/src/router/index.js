import Vue from 'vue'
import Router from 'vue-router'
import Staff from '@/components/Staff'
import Diary from '@/components/Diary'
import Contact from '@/components/Contact'
import Account from '@/components/Account'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Staff',
      component: Staff
    },
    {
      path: '/Diary',
      name: 'Diary',
      component: Diary
    },
    {
      path: '/Contact',
      name: 'Contact',
      component: Contact
    },
    {
      path: '/Account',
      name: 'Account',
      component: Account
    }
  ]
})
