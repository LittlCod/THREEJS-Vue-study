const asyncRoutes = [
    {
        path: '/home',
        name: 'home',
        meta: { title: '首页', icon: 'House' },
        component: () => import("@/views/0-menu.vue"),
    },
    {
        path: '/1',
        name: '1',
        meta: { title: '1.创建第一个three.js页面'},
        component: () => import("@/views/1-first.vue"),
    },
    {
        path: '/2',
        name: '2',
        meta: { title: '2.物体移动和旋转等'},
        component: () => import("@/views/2-move.vue"),
    },
    {
        path: '/3',
        name: '3',
        meta: { title: '3.自适应窗口大小'},
        component: () => import("@/views/3-adaptive.vue"),
    },
    {
        path: '/4',
        name: '4',
        meta: { title: '4.使用GUI控制物体'},
        component: () => import("@/views/4-gui.vue"),
    },
    {
        path: '/5',
        name: '5',
        meta: { title: '5.创建几何体'},
        component: () => import("@/views/5-几何体.vue"),
    },
    {
        path: '/6',
        name: '6',
        meta: { title: '6.材质分组'},
        component: () => import("@/views/6-材质分组.vue"),
    },
    {
        path: '/7',
        name: '7',
        meta: { title: '7.材质贴图'},
        component: () => import("@/views/7-材质贴图.vue"),
    },
    {
        path: '/8',
        name: '8',
        meta: { title: '8.雾'},
        component: () => import("@/views/8-fog.vue"),
    },
    {
        path: '/9',
        name: '9',
        meta: { title: '9.加载模型'},
        component: () => import("@/views/9-gltf模型.vue"),
    },
    {
        path: '/10',
        name: '10',
        meta: { title: '10.光线投射'},
        component: () => import("@/views/10-光线投射.vue"),
    },
    {
        path: '/11',
        name: '11',
        meta: { title: '11.Tween补间动画'},
        component: () => import("@/views/11-Tween.vue"),
    },
    {
        path: '/12',
        name: '12',
        meta: { title: '12.阴影'},
        component: () => import("@/views/12-阴影.vue"),
    },
];

export default asyncRoutes;
