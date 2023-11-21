import asyncRoutes from './asyncRoutes';

const routes = [
    // {
    //     path: '/',
    //     redirect: '/home'
    // },
    // {
    //     path: '/home',
    //     name: 'home',
    //     meta: { title: '首页', icon: 'House' },
    //     component: () => import("@/views/home/IndexView.vue")
    // },

    ...asyncRoutes,

];

export default routes;
