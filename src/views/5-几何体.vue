<template>
    <!-- 
        使用BufferGeometry创建几何体
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

// 创建几何体
const geometry = new THREE.BufferGeometry();
// 创建顶点数据，顶点是有序的，每三个为一个顶点，三点确定一个平面，逆时针为正面
const vertices = new Float32Array([
    0, 0, 1, 
    1, 0, 0, 
    0, 1, 0,
    0, 0, 0,
]);
// 创建顶点属性
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));

// 如果有共用顶点，可以创建索引
const indices = new Uint16Array([
    0, 1, 2,
    0, 1, 3,
    0, 2, 3,
    1, 2, 3,
]);
// 创建索引属性
geometry.setIndex(new THREE.BufferAttribute(indices, 1));

// 创建材质
const material = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide,
    wireframe: true
});
const plane = new THREE.Mesh(geometry, material)
scene.add(plane);
</script>

<style scoped></style>
