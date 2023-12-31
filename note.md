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

### 7.材质贴图
#### 背景图
如果是单独的一张图片，直接设置`scene.background`即可。
如果是hdr文件，则需要使用RGBELoader加载。
```js
// 导入hdr加载器
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";

// 创建RGBE加载器，加载hdr贴图
const rgbeLoader = new RGBELoader();
rgbeLoader.load('./textures/hdr/012.hdr', envMap => {
    // 设置球形贴图
    envMap.mapping = THREE.EquirectangularReflectionMapping;
    // 设置背景贴图
    scene.background = envMap;
});
```
#### 常用的物体材质贴图
使用`textureLoader`载入图片文件。
```js
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
    alphaMap: alphaMap,
    // 设置光照贴图
    lightMap: lightMap
});
```
- #### map
  颜色贴图，可以选择包括一个alpha通道，可以加载图片。
- #### aoMap
  该纹理的红色通道用作环境遮挡贴图，可以选择图片。
- #### alphaMap
  alpha贴图是一张灰度纹理，用于控制整个表面的不透明度。（黑色：完全透明；白色：完全不透明）。 默认值为null。
- #### envMap
  环境贴图。默认值为null。
- #### lightMap
  光照贴图。默认值为null。
- #### specularMap
  材质使用的高光贴图。默认值为null。
- #### reflectivity
  环境贴图对表面的影响程度; 见.combine。默认值为1，有效范围介于0（无反射）和1（完全反射）之间。
#### 纹理的颜色空间
默认的颜色空间是`LinearSRGBColorSpace`，可能会比较白，可以更换为`SRGBColorSpace`，只需`texture.colorSpace = THREE.SRGBColorSpace;`即可。

### 8.雾化效果
threejs可以创造雾效果，包含线性雾和指数雾。
#### 线性雾
```js
const scene = new THREE.Scene();
scene.fog = new THREE.Fog( 0xcccccc, 10, 15 );
```
使用`Fog( color : Integer, near : Float, far : Float )`构造线性雾化效果。
> ##### .color : Color
>雾的颜色。比如说，如果将其设置为黑色，远处的物体将被渲染成黑色。
> ##### .near : Float
>开始应用雾的最小距离。距离小于活动摄像机“near”个单位的物体将不会被雾所影响。
>默认值是1。
> ##### .far : Float
>结束计算、应用雾的最大距离，距离大于活动摄像机“far”个单位的物体将不会被雾所影响。
>默认值是1000。

#### 指数雾
```js
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );
```
使用 `FogExp2( color : Integer, density : Float )` 构造线性雾化效果。
> ##### .color : Color
>雾的颜色。比如说，如果将其设置为黑色，远处的物体将被渲染成黑色。
> ##### .density : Float
>定义雾的密度将会增长多块。
>默认值是0.00025

### 9.加载gltf模型
导入gltf加载器 `import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";` 
#### 加载模型代码
```js
// 实例化gltf加载器
const gltfLoader = new GLTFLoader();

// 加载模型
gltfLoader.load("./modern_city_block.glb", gltf => {
    scene.add(gltf.scene);
});
```

### 10.Tween补间动画
#### 基本使用
1. 导入Tween `import TWEEN from "three/examples/jsm/libs/tween.module.js";`
2. 实例化Tween对象 `const tween = new TWEEN.Tween(sphere1.position);` 参数是需要动画的值。
3. 动画的目标状态 `tween.to({ x: 4 }, 1000);` 第一个参数是目标状态，第二个参数是所用时间。
4. 在渲染函数中实时更新 `TWEEN.update();` 写在每帧执行一次的函数中。
5. 补间动画开始 `tween.start();` 。
6. 补间动画暂停 `tween.start();` 。
7. 设置动画循环 `tween.repeat(Infinity);` 参数是次数，Infinity表示无限次。
8. 设置循环往复 `tween.yoyo(true)` 会在动画到达目标状态后再以同样的方式回到原点。
9. 设置动画延迟 `tween.delay(3000)` 会在一定时间的延迟后再开始动画，参数是毫秒。
10. 缓动动画 `tween.easing(TWEEN.Easing.Elastic.InOut)` 参数列表：[网址](https://tweenjs.github.io/tween.js/examples/03_graphs.html)。
11. 链接多个动画先后执行 `tween.chain(tween2);` 参数是执行完此动画后要执行的动画。
#### tween的回调函数
- 动画开始时的回调函数 `tween.onStart(() => {});`
- 动画更新的时候的回调函数 `tween.onUpdate(() => {});`
- 动画完成的时候的回调函数 `tween.onComplate(() => {});`
- 动画暂停的时候的回调函数 `tween.onStop(() => {});`
#### 代码示例
```js
// 渲染动画
function animate() {
    controls.update();
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    // 更新tween
    TWEEN.update();
}
animate();

// 创建一个球
const sphere1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 32, 32),
    new THREE.MeshBasicMaterial({
        color: '#0f0'
    })
);
scene.add(sphere1);

// 实例化Tween对象
const tween = new TWEEN.Tween(sphere1.position);
// 支持链式编程，也可以分开写
tween.to({ x: 4 }, 1000).delay(500).easing(TWEEN.Easing.Elastic.InOut);

// 创建多个动画
const tween2 = new TWEEN.Tween(sphere1.position);
tween2.to({ z: 4 }, 500).delay(500).easing(TWEEN.Easing.Quadratic.InOut);
const tween3 = new TWEEN.Tween(sphere1.position);
tween3.to({ x: 0, z: 0 }, 1000).delay(500).easing(TWEEN.Easing.Quadratic.InOut);

// 链接多个动画
tween.chain(tween2);
tween2.chain(tween3);
tween3.chain(tween);

// 回调函数，也可以链式的写
tween.onStart(() => {
    console.log('第一个动画开始啦！');
});

// 启动补间动画
tween.start();
```

### 11.光照与阴影
基础网格材质不会对光照产生效果，所以需要使用其他材质，比如标准网格材质。
#### 给物体开启阴影显示
1. 材质要满足能够对光照有反应
2. 设置渲染器开启阴影计算 `renderer.shadowMap.enabled = true;`
3. 设置光照投射阴影 `DirectionalLight.castShadow = true;` 将光源的castShadow属性设置为true，即可让被照射的物体产生阴影。
4. 设置物体投射阴影 `Object3D.castShadow = true;` 将物体的castShadow属性设为true，即可将物体的阴影投射到其他物体上。
5. 设置物体接收阴影 `Object3D.receiveShadow = true;` 将物体的receiveShadow属性设为true，即可接收其他物体的阴影投射。
#### 阴影的属性
- 设置贴图的阴影模糊度 `directionalLight.shadow.radius = 20;`
- 设置阴影贴图的分辨率 `directionalLight.shadow.mapSize.set(1024, 1024);`