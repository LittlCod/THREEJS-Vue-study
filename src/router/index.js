import { createRouter, createWebHashHistory } from 'vue-router';
// import VueRouter from 'vue-router';
import routes from './routes';

const router = createRouter({
    // 指定路由模式
    history: createWebHashHistory(),
    // 路由地址
    routes: routes
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
    next();
});

// 全局后置钩子
router.afterEach((to, from) => {
    const _title = to.meta.title
    if (_title) {
        window.document.title = _title
    }
});

export default router;
