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

// 创建物体
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
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
controls.enableDamping = true;
controls.dampingFactor = 0.05;

let r = 1, s = 1, p = 1;

// 渲染动画
function animate() {
    controls.update();
    requestAnimationFrame(animate);
    // 旋转
    cube.rotation.x += 0.01 * r;
    cube.rotation.y += 0.01 * r;
    cube.rotation.z += 0.02 * r;
    // 缩放
    cube.scale.x += 0.02 * s;
    cube.scale.y += 0.01 * s;
    cube.scale.z += 0.03 * s;
    // 位置
    cube.position.x += 0.02 * p;
    cube.position.y += 0.01 * p;
    cube.position.z += 0.03 * p;

    if(cube.scale.x > 5 || cube.scale.x < 0) s = -s;
    if(cube.position.x > 3 || cube.position.x < 0) p = -p;
    // 渲染
    renderer.render(scene, camera);
}

animate();
</script>

<style scoped>
</style>
