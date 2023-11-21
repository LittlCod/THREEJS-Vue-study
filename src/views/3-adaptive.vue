<template>
    <!-- 
        使画布能够自适应页面窗口的变化
     -->
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
const Fgeometry = new THREE.BoxGeometry(1, 1, 1);
const Fmaterial = new THREE.MeshBasicMaterial({ color: 0x0000FF });
const Fcube = new THREE.Mesh(Fgeometry, Fmaterial);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);

// 将网格添加到场景中
Fcube.add(cube);
scene.add(Fcube);
Fcube.position.x = -3;
cube.position.x = 3;
Fcube.rotation.x = 180;
cube.rotation.x = -180;

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
    // 渲染
    renderer.render(scene, camera);
}

// 监听窗口变化的事件
window.addEventListener('resize', () => {
    // 重置渲染器宽高比
    renderer.setSize(window.innerWidth, window.innerHeight);
    // 重置相机的宽高比
    camera.aspect = window.innerWidth / window.innerHeight;
    // 更新相机投影矩阵
    camera.updateProjectionMatrix();
});

animate();
</script>

<style scoped>
</style>
