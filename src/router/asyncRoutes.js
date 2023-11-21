const asyncRoutes = [
    // {
    //     path: '/home',
    //     name: 'home',
    //     meta: { title: '首页', icon: 'House' },
    //     component: () => import("@/views/home/IndexView.vue")
    // },
    {
        path: '/1',
        name: '1',
        meta: { title: '创建第一个three.js页面'},
        component: () => import("@/views/1-first.vue"),
    },
    {
        path: '/2',
        name: '2',
        meta: { title: '物体移动和旋转等'},
        component: () => import("@/views/2-move.vue"),
    },
    {
        path: '/3',
        name: '3',
        meta: { title: '自适应窗口大小'},
        component: () => import("@/views/3-adaptive.vue"),
    },
    {
        path: '/4',
        name: '4',
        meta: { title: '使用GUI控制物体'},
        component: () => import("@/views/4-gui.vue"),
    },
];

export default asyncRoutes;
