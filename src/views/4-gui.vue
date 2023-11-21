<template>
    <!-- 
        使用GUI工具实现各种操作
     -->
    <div></div>
</template>

<script setup>
// 导入three.js
import * as THREE from "three";
// 导入轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 导入GUI
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
Fcube.rotation.x = 5;
cube.rotation.x = -5;

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

// 监听窗口变化的事件
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// 要加入GUI的函数
const eventObj = {
    fullscreen: function () {
        // 全屏
        document.body.requestFullscreen();
    },
    exitFullscreen: function () {
        document.exitFullscreen();
    }
}

// 添加GUI工具
const gui = new GUI();
gui.add(eventObj, 'fullscreen').name('全屏');
gui.add(eventObj, 'exitFullscreen').name('退出全屏');
// 控制Fcube的X轴旋转，可以使用链式编程
// min是数值的最小值，max最大值，name是显示的label，step是滑块每次移动的间隔
gui.add(Fcube.rotation, 'x').min(0).max(5).name('父元素的x旋转').step(0.1);
// 创建文件夹
const cubeFolder = gui.addFolder('cube的操作');

// 可以添加onChange事件，改变的时候会触发
cubeFolder.add(cube.position, 'x').min(0).max(10).name('子元素的x平移').step(0.1).onChange(val => { console.log('x平移了', val); });

// 可以添加onFinishChange事件，改变结束的时候才会触发
cubeFolder.add(cube.position, 'y').min(0).max(10).name('子元素的y平移').step(0.1).onFinishChange(val => { console.log('y平移了', val); });

cubeFolder.add(cube.position, 'z').min(0).max(10).name('子元素的z平移').step(0.1);

// 添加布尔值操作
gui.add(material, 'wireframe').name('线框模式');

// 颜色操作
const colorParams = {
    cubeColor: '#ff0000'
}
gui.addColor(colorParams, 'cubeColor').name('cube的颜色').onChange(val => {
    cube.material.color.set(val);
});

animate();
</script>

<style scoped></style>
