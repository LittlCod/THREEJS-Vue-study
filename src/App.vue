<template>
    <div></div>
</template>

<script setup>
// 导入three.js
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

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

// 创建几何体
const geometry = new THREE.BoxGeometry(1, 1, 1);
// 创建材质
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
// 创建网格
const cube = new THREE.Mesh(geometry, material);

// 将网格添加到场景中
scene.add(cube);

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
// 开启带阻尼的惯性
controls.enableDamping = true;
// 设置阻尼系数
controls.dampingFactor = 0.05;
// 自动旋转
controls.autoRotate = true;

// 渲染动画
function animate() {
    controls.update();
    requestAnimationFrame(animate);
    // 旋转
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    // 渲染
    renderer.render(scene, camera);
}

// 按键控制
let xTimer, yTimer;
window.addEventListener('keydown', e => {
    let spd = 0.05;
    switch (e.key) {
        case 'ArrowRight':
            if(yTimer) return;
            yTimer = setInterval(() => {
                cube.rotation.y += spd;
            }, 50);
            break;
        case 'ArrowLeft':
            if(yTimer) return;
            yTimer = setInterval(() => {
                cube.rotation.y -= spd;
            }, 50);
            break;
        case 'ArrowUp':
            if(xTimer) return;
            xTimer = setInterval(() => {
                cube.rotation.x -= spd;
            }, 50);
            break;
        case 'ArrowDown':
            if(xTimer) return;
            xTimer = setInterval(() => {
                cube.rotation.x += spd;
            }, 50);
            break;
        default:
            break;
    }
});
window.addEventListener('keyup', e => {
    switch (e.key) {
        case 'ArrowRight':
            clearInterval(yTimer);
            yTimer = null;
            break;
        case 'ArrowLeft':
            clearInterval(yTimer);
            yTimer = null;
            break;
        case 'ArrowUp':
            clearInterval(xTimer);
            xTimer = null;
            break;
        case 'ArrowDown':
            clearInterval(xTimer);
            xTimer = null;
            break;
        default:
            break;
    }
});

animate();
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

canvas {
    display: block;
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
}
</style>
