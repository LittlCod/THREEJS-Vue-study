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
}
animate();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// 使用标准网格材质创建一个球（基础网格材质不能对光照产生反应）
const sphereGeometry = new THREE.SphereGeometry(1, 36, 36);
const material = new THREE.MeshStandardMaterial();
const sphere = new THREE.Mesh(sphereGeometry, material);
scene.add(sphere);

// 在球下创建一个平面
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(10, 10),
    new THREE.MeshStandardMaterial({
        side: THREE.DoubleSide
    })
);
plane.position.set(0, -2, 0);
plane.rotation.x = -Math.PI / 2;
scene.add(plane);

// 灯光
// 环境光
const light = new THREE.AmbientLight('#fff', 0.5);
scene.add(light);
// 直线光源
const directionalLight = new THREE.DirectionalLight('#fff', 0.5);
directionalLight.position.set(5, 10, 5);
scene.add(directionalLight);

// 开启物体阴影
// 设置渲染器开启阴影计算
renderer.shadowMap.enabled = true;
// 设置光照投射产生阴影
directionalLight.castShadow = true;
// 设置物体投射阴影
sphere.castShadow = true;
// 设置物体接收阴影
plane.receiveShadow = true;

// 设置贴图的阴影模糊度
directionalLight.shadow.radius = 20;
// 设置阴影贴图的分辨率
directionalLight.shadow.mapSize.set(1024, 1024);
</script>

<style scoped></style>
