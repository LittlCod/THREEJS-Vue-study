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
camera.position.z = 5;
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
}
animate();

// 自适应
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// 创建几个长方体
const boxGeometry = new THREE.BoxGeometry(1, 1, 100);
const boxMaterial = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    color: 0xff00ff,
});
const box = new THREE.Mesh(boxGeometry, boxMaterial);
const boxGeometry2 = new THREE.BoxGeometry(1, 1, 100);
const boxMaterial2 = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    color: 0xff0,
});
const box2 = new THREE.Mesh(boxGeometry2, boxMaterial2);
box2.position.x = 3;
box2.position.y = -3;
box2.rotation.y = 0.2;
const box3 = new THREE.Mesh(boxGeometry2, boxMaterial2);
box3.position.x = 1;
box3.position.y = 3;
box3.position.z = -3;
box3.rotation.x = 0.2;
scene.add(box);
scene.add(box2);
scene.add(box3);

// 创建雾
// 背景颜色和雾的颜色一致，才会有雾的效果
scene.background = new THREE.Color('#ccc');
// Fog( color : Integer, near : Float, far : Float )
const fog = new THREE.Fog('#ccc', 0.1, 20);
const fogExp2 = new THREE.FogExp2('#ccc', 0.1);
scene.fog = fogExp2;

// gui辅助操作
const gui = new GUI();
gui.add(scene, 'fog', { '线性雾': fog, '指数雾': fogExp2 }).name('雾气类型');

const fogFolder = gui.addFolder('线性雾');
fogFolder.add(fog, 'near').name('开始应用雾的最小距离').min(0).max(30);
fogFolder.add(fog, 'far').name('应用雾的最远距离').min(30).max(50);

const fogExp2Folder = gui.addFolder('指数雾');
fogExp2Folder.add(fogExp2, 'density').name('雾的密度指数').min(0).max(0.5);
</script>

<style scoped></style>
