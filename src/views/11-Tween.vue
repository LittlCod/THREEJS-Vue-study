<template>
    <!-- 
        使用addGroup给材质分组
     -->
    <div></div>
</template>

<script setup>
// 导入three.js
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
// 导入Tween
import TWEEN from "three/examples/jsm/libs/tween.module.js";

// 创建场景
const scene = new THREE.Scene();

// 创建相机
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// 创建渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 设置相机位置
camera.position.z = 10;
camera.position.x = 2;
camera.position.y = 2;
camera.lookAt(0, 0, 0);

// 添加世界坐标辅助器
const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// 渲染动画
function animate() {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // 更新tween
    TWEEN.update();
}
animate();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// 创建一个球
const sphere1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshBasicMaterial({
        color: '#0f0'
    })
);
scene.add(sphere1);

// 实例化Tween对象
const tween = new TWEEN.Tween(sphere1.position);
// 支持链式编程，也可以分开写
tween.to({ x: 4 }, 1000).delay(500).easing(TWEEN.Easing.Elastic.InOut);

// 创建多个动画
const tween2 = new TWEEN.Tween(sphere1.position);
tween2.to({ z: 4 }, 500).delay(500).easing(TWEEN.Easing.Quadratic.InOut);
const tween3 = new TWEEN.Tween(sphere1.position);
tween3.to({ x: 0, z: 0 }, 1000).delay(500).easing(TWEEN.Easing.Quadratic.InOut);

// 链接多个动画
tween.chain(tween2);
tween2.chain(tween3);
tween3.chain(tween);

// 回调函数，也可以链式的写
tween.onStart(() => {
    console.log('第一个动画开始啦！');
});

// 启动补间动画
tween.start();
</script>

<style scoped></style>
