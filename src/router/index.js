import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
import AdminWohnung from '@/components/AdminWohnung.vue'
import UserWohnung from '@/components/UserWohnung.vue'

/**
 *
 */

Vue.use(Router)

export default new Router({
  routes:[
    {
      path:'/',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path:'/user/:token?',
      name: 'User',
      component: UserWohnung
    },
    {
      path:'/admin',
      name: 'admin',
      component: AdminWohnung
    }
  ]
})
