import Vue from 'vue'
import Router from 'vue-router'

import Login from '../components/Login'
import BuySubscription from '../components/BuySubscription'
import Checkout from '../components/Checkout'
import OtpVerification from '../components/OtpVerification'

Vue.use(Router)

const router = new Router({
    base: 'http://localhost:3000',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
            alias: '/'
        },
        {
            path: '/otp-verification',
            name: 'otp-verification',
            component: OtpVerification
        },
        {
            path: '/buy-subscription',
            name: 'buy-subscription',
            component: BuySubscription
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: Checkout
        }
    ],
    linkActiveClass: "active"
})

export default router
