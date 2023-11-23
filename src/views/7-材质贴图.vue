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
// 导入hdr加载器
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

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

// 创建纹理加载器
const textureLoader = new THREE.TextureLoader();
// 加载纹理
const texture = textureLoader.load('./textures/onineko.jpg');
// 加载ao贴图
const aoMap = textureLoader.load('./textures/matcaps/1.png');
// 加载alpha贴图
const alphaMap = textureLoader.load('./textures/door/alpha.jpg');
// 加载光照贴图
const lightMap = textureLoader.load('./textures/matcaps/5.png');

// 创建RGBE加载器，加载hdr贴图
const rgbeLoader = new RGBELoader();
rgbeLoader.load('./textures/hdr/012.hdr', envMap => {
    // 设置球形贴图
    envMap.mapping = THREE.EquirectangularReflectionMapping;
    // 设置背景贴图
    scene.background = envMap;
    // 设置环境贴图
    scene.environment = envMap;
    // 设置plane的环境贴图
    // planeMaterial.envMap = envMap;
});

// 创建一个平面放置材质
const planeGeometry = new THREE.PlaneGeometry(1, 1, 1);
const planeMaterial = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    color: 0xffffff,
    // map属性是纹理贴图
    map: texture,
    // 设置透明
    transparent: true,
    // 设置ao贴图（环境遮挡贴图）
    aoMap: aoMap,
    // 环境遮挡强度
    aoMapIntensity: 0,
    // 设置alpha贴图（灰度纹理贴图）
    // alphaMap: alphaMap,
    // 设置光照贴图
    lightMap: lightMap
});
// 也可以直接.map设置
// planeMaterial.map = texture;
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);

// gui辅助操作
const gui = new GUI();
gui.add(planeMaterial, 'aoMapIntensity').min(0).max(1).name('环境遮挡强度');
</script>

<style scoped></style>
