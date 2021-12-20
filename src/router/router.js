import Vue from 'vue'
import Router from 'vue-router'

import auth from './middleware/auth'
import loggedIn from './middleware/loggedIn'
import middlewarePipeline from './middlewarePipeline'

import Login from '../components/Login'
import BuySubscription from '../components/BuySubscription'
import Checkout from '../components/Checkout'
import OtpVerification from '../components/OtpVerification'
import OrderList from '../components/OrderList'

Vue.use(Router)

const router = new Router({
    base: 'http://localhost:3000',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: Login,
            alias: '/',
            meta: {
                middleware: [
                    loggedIn
                ]
            }
        },
        {
            path: '/otp-verification',
            name: 'otp-verification',
            component: OtpVerification,
            meta: {
                middleware: [
                    loggedIn
                ]
            }
        },
        {
            path: '/buy-subscription',
            name: 'buy-subscription',
            component: BuySubscription,
            meta: {
                middleware: [
                    auth
                ]
            }
        },
        {
            path: '/order-list',
            name: 'order-list',
            component: OrderList,
            meta: {
                middleware: [
                    auth
                ]
            }
        },
        {
            path: '/checkout',
            name: 'checkout',
            component: Checkout,
            meta: {
                middleware: [
                    auth
                ]
            }            
        }
    ],
    linkActiveClass: "active"
})

router.beforeEach((to, from, next) => {
    if (!to.meta.middleware) {
        return next()
    }
    const middleware = to.meta.middleware

    const context = {
        to,
        from,
        next
    }

    return middleware[0]({
        ...context,
        next: middlewarePipeline(context, middleware, 1)
    })

})

export default router
