# THREE.js 笔记 
[文档](https://threejs.org/docs/index.html#manual/zh/introduction/Creating-a-scene)
## 1.初始化基本代码
#### 相机

##### 透视相机（PerspectiveCamera）
这一摄像机使用perspective projection（透视投影）来进行投影。
这一投影模式被用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式。
`new THREE.PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )`
>fov — 摄像机视锥体垂直视野角度，视野角度就是无论在什么时候，你所能在显示器上看到的场景的范围，单位是角度。
>aspect — 摄像机视锥体长宽比
>near — 摄像机视锥体近端面
>far — 摄像机视锥体远端面，当物体某些部分比摄像机的远截面远或者比近截面近的时候，该这些部分将不会被渲染到场景中

##### 立方相机（CubeCamera）
构造一个包含6个PerspectiveCameras（透视摄像机）的立方摄像机， 并将其拍摄的场景渲染到一个WebGLCubeRenderTarget上。
`CubeCamera( near : Number, far : Number, renderTarget : WebGLCubeRenderTarget )`
>near -- 近剪切面的距离
>far -- 远剪切面的距离
>renderTarget -- The destination cube render target.
##### 正交相机（OrthographicCamera）
这一摄像机使用orthographic projection（正交投影）来进行投影。
在这种投影模式下，无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变。
`new THREE.OrthographicCamera( left : Number, right : Number, top : Number, bottom : Number, near : Number, far : Number )`
>left — 摄像机视锥体左侧面。
>right — 摄像机视锥体右侧面。
>top — 摄像机视锥体上侧面。
>bottom — 摄像机视锥体下侧面。
>near — 摄像机视锥体近端面。
>far — 摄像机视锥体远端面。
#### 主要代码
```JS
// 导入three.js
import * as THREE from "three";

// 创建场景
const scene = new THREE.Scene();

// 创建相机，这里使用透视相机
const camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

// 创建WebGLRenderer渲染器
const renderer = new THREE.WebGLRenderer();
// 设置渲染器的尺寸
renderer.setSize(window.innerWidth, window.innerHeight);
// 将 renderer(渲染器)的dom元素(renderer.domElement)添加到 HTML 文档中
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

// 使用requestAnimationFrame渲染动画，一般是60帧
function animate() {
    controls.update();
    requestAnimationFrame(animate);
    // 旋转动画
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    // 渲染
    renderer.render(scene, camera);
}

animate();
```

### 2.使用轨道控制器（OrbitControls）进行拖动旋转和缩放
Orbit controls（轨道控制器）可以使得相机围绕目标进行轨道运动。
#### 主要代码
```JS
// 导入轨道控制器
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 添加轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);
// 开启带阻尼的惯性
controls.enableDamping = true;
// 设置阻尼系数，阻尼系数越大惯性越大
controls.dampingFactor = 0.05;
// 自动旋转
controls.autoRotate = true;
```
