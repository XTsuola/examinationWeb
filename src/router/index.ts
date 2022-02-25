import { createRouter, createWebHistory } from 'vue-router'

const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,  // history
    routes: [
        {
            path: "/",
            redirect: "/login"
        }, {
            path: "/kaoshi",
            name: "kaoshi",
            component: () => import("../views/kaoshi/kaoshi.vue")
        }, {
            path: "/result",
            name: "result",
            component: () => import("../views/kaoshi/result.vue")
        }, {
            path: "/login",
            name: "login",
            component: () => import("../views/login.vue")
        }, {
            path: "/tiku",
            name: "tiku",
            component: () => import("../views/tiku.vue")
        },
        {
            path: "/userInfo",
            name: "userInfo",
            component: () => import("../views/userInfo.vue")
        },
        {
            path: "/students",
            name: "students",
            component: () => import("../views/students.vue")
        },
        {
            path: "/test",
            name: "test",
            component: () => import("../views/test.vue")
        }
    ]
})

// 路由拦截
router.beforeEach((to, from, next) => {
    //console.log(to, from)
    if (to.fullPath === "/userInfo") {
        const userInfo = window.sessionStorage.getItem('userInfo')
        if (userInfo) {
            next()
        } else {
            next({
                path: '/login'
            })
        }
    } else if (to.fullPath === "/login") {
        const userInfo = window.sessionStorage.getItem('userInfo')
        if (userInfo) {
            next({
                path: '/userInfo'
            })
        } else {
            next()
        }
    } else {
        next()
    }
})

export default router
