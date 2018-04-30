import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Offers from '@/components/Offers'
import OffersMatch from '@/components/OffersMatch'
import Offer from '@/components/Offer'
import User from '@/components/User'
import Users from '@/components/Users'
import Employers from '@/components/Employers'
import CandidatesMatch from '@/components/CandidatesMatch'
import UserOffers from '@/components/UserOffers'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/offres',
      name: 'Offers',
      component: Offers
    },
    {
      path: '/offres-match',
      name: 'OffersMatch',
      component: OffersMatch
    },
    {
      path: '/offre',
      name: 'AddOffer',
      component: Offer
    },
    {
      path: '/offre/:offerId',
      name: 'EditOffer',
      component: Offer
    },
    {
      path: '/usagers',
      name: 'Users',
      component: Users
    },
    {
      path: '/usager/:userId',
      name: 'EditUser',
      component: User
    },
    {
      path: '/employeurs',
      name: 'Employers',
      component: Employers
    },
    {
      path: '/candidats-match',
      name: 'CandidatesMatch',
      component: CandidatesMatch
    },
    {
      path: '/vos-offres',
      name: 'UserOffers',
      component: UserOffers
    }
  ]
})
