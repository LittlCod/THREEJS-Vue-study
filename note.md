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

### 2.使用轨道控制器（OrbitControls）进行相机的拖动旋转和缩放
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

### 3.控制对象的Object3D基类的属性
- 控制物体旋转:`Object3D.rotation.x | y | z`。
- 控制物体平移:`Object3D.position.x | y | z`。
- 控制物体缩放:`Object3D.scale.x | y | z`。
这几个属性都是相对父元素的属性。
```js
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
```

### 4.重新刷新画布的方法（可用于适应窗口大小变化）
```js
// 重置渲染器宽高比
renderer.setSize(window.innerWidth, window.innerHeight);
// 重置相机的宽高比
camera.aspect = window.innerWidth / window.innerHeight;
// 更新相机投影矩阵
camera.updateProjectionMatrix();
```

### 5.使用GUI操作物体
引入GUI的代码
`import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';`
可以通过GUI使用按钮触发事件、修改数值、修改颜色、修改布尔值等等，支持链式编程，可以将多个操作项归入一个文件夹中。
```js
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
```

### 6.几何体
#### 使用BufferGeometry创建几何体
```js
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
```
#### 材质分组
可以将一个几何体不同的面进行分组，来匹配不同的材质
`geometry.addGroup(start: Integer, count: Integer, materialIndex: Integer);`
>start 表明当前 draw call 中的没有索引的几何体的几何体的第一个顶点；或者第一个三角面片的索引。 count 指明当前分割包含多少顶点（或 indices）。 materialIndex 指出当前用到的材质队列的索引。
```js
// 设置两个顶点组，形成两个材质
geometry.addGroup(0, 3, 0);
geometry.addGroup(3, 3, 1);
geometry.addGroup(6, 3, 2);
geometry.addGroup(9, 3, 3);

// 创建材质
const material0 = new THREE.MeshBasicMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide,
});
const material1 = new THREE.MeshBasicMaterial({
    color: 0xff00ff,
    side: THREE.DoubleSide,
});
const material2 = new THREE.MeshBasicMaterial({
    color: 0x00ffff,
    side: THREE.DoubleSide,
});
const material3 = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(geometry, [material0, material1, material2, material3]);
scene.add(plane);
```
#### 各种内置几何体
[见官方文档](https://threejs.org/docs/index.html#api/zh/geometries/BoxGeometry)