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
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { Water } from "three/examples/jsm/objects/Water2";

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
const renderer = new THREE.WebGLRenderer({
    // 设置抗锯齿
    antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio( window.devicePixelRatio );
// 设置色调映射
renderer.toneMapping = THREE.CustomToneMapping;
renderer.toneMappingExposure = 0.5;
renderer.shadowMap.enable = true;
document.body.appendChild(renderer.domElement);

// 设置相机位置
camera.lookAt(0, 0, 0);
camera.position.set(-3.23, 2.98, 4.06);
camera.updateProjectionMatrix();

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// 渲染动画
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}
animate();

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// 加载压缩模型
// 初始化loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("./draco/");
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

// 加载模型
gltfLoader.load("./Christmas/model/scene.glb", gltf => {
    console.log(gltf);
    const model = gltf.scene;

    // 不使用原本的平面，自己创建水面，所以隐藏原本的水面
    model.traverse(child => {
        if(child.name === 'Plane'){
            child.visible = false;
        }
        if(child.isMesh){
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });

    scene.add(model);
});
// 创建水面
const waterGeometry = new THREE.PlaneGeometry(200, 200);
const water = new Water(waterGeometry, {
    textureWidth: 1024,
	textureHeight: 1024,
    color: '#fff',
    flowDirection: new THREE.Vector2( 1, 1 ),
    scale: 3
});
water.rotation.x = -Math.PI / 2;
water.position.y = -1;
scene.add(water);

// 添加光源
const light = new THREE.DirectionalLight('#fff', 1);
light.position.set(0, 50, 0);
scene.add(light);

// 添加点光源
const pointLight = new THREE.PointLight( 0xff0000, 1, 100 );
pointLight.position.set(1.1, 1.4, 0);
pointLight.castShadow = true;
scene.add(pointLight);

// 加载环境纹理
const rgbeLoader = new RGBELoader();
// 载入天空
rgbeLoader.load("./Christmas/textures/sky.hdr", textrue => {
    textrue.mapping = THREE.EquirectangularRefractionMapping;
    scene.background = textrue;
    scene.environment = textrue;
});

</script>

<style scoped></style>
