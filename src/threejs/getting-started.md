---
title: Hello Three.js
description: Getting started with three.js
layout: layouts/content.html
tags:
  - three
  - hello-world
author: Lea Rosema
---

# Three.js

[back to table of contents](../)

## Getting started

### What's Three.js at all?

Three.js is a 3D engine for the browser that can use WebGL for graphics rendering. Next to WebGL, there are other renderers such as a `SVGRenderer` or `CSS3DRenderer`.

Three.js comes with geometries and rendering techniques and provides several cameras, materials, lighting techniques and more. It also provides a scene graph for organizing all your 3D data in scenes.

The [official site](https://threejs.org) features a lot of examples you can explore there.

In this chapter I will show a basic example of a three.js Hello World application.

### First steps

#### Import three.js dependencies

This demo uses ES module imports, using the [skypack cdn](https://skypack.dev/). In bigger products, you may want to use some kind of [Parcel](https://parceljs.org/) or [Webpack](https://webpack.js.org/) toolchain for that. [createapp.dev](https://createapp.dev/) can help you with that.

I'm importing the core three js library and the OrbitControls.

The OrbitControls class is a helper class that adds the possibility to navigate through your scene.

```js
import * as THREE from 'https://cdn.skypack.dev/three/build/three.module.js';
import { OrbitControls } from 'https://cdn.skypack.dev/three/examples/jsm/controls/OrbitControls.js';
```

#### Set up the renderer

To initialize Three.js, you will have to choose a renderer. Usually, you will choose the WebGL renderer. Another popular choice is the SVGRenderer.

```js
// Create WebGL renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```

#### Init the camera

Initialize a camera with a perspective view. The parameters are

- field of view
- the aspect ratio
- the near clipping plane
- the far clipping plane

For more details on cameras, visit [ThreeJS fundamentals](https://threejsfundamentals.org/threejs/lessons/threejs-cameras.html)

```js
// Init perspective camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;
```

#### Create scene and add meshes

Three.js organizes every kind of 3d objects in a scene graph.
Every mesh takes a material and a geometry.
In the following example, I will create 50 spheres with a `SphereGeometry`
and a `MeshLambertMaterial` using different colors.

```js
const scene = new THREE.Scene();
const geometry = new THREE.SphereGeometry(0.2, 16, 16);

for (let i = 0; i < 50; i++) {
  const material = new THREE.MeshLambertMaterial({
    color: (Math.random() * 0x1000000) | 0,
  });
  const bubble = new THREE.Mesh(geometry, material);
  bubble.position.x = (-0.5 + Math.random()) * 5;
  bubble.position.y = (-0.5 + Math.random()) * 5;
  bubble.position.z = (-0.5 + Math.random()) * 5;
  scene.add(bubble);
}
```

#### Setup lights

The following section sets up a directional light and an ambient light.

- ambient light: light with no direction, fixed-intensity and fixed-color light source that affects all objects in the scene equally
- directional light: A directional light source illuminates all objects equally from a given direction. Comparable to the sun.

```js
// Setup lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(0, 10, 10);
dirLight.target.position.set(-5, 0, 0);
scene.add(dirLight);
```

#### Setup the OrbitControls

The OrbitControls is a control to navigate through the scene using the mouse or finger on touch devices.

```js
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();
```

#### Init event handlers

```js
window.addEventListener('resize', this.onResize, false);

// rerender as soon as the camera position is updated
controls.addEventListener('change', this.render, false);
```

#### Resize the canvas

On resize, you will need to adjust the renderer viewport with the `renderer.setSize` method.
Also, you will need to update the aspect property in the camera to the screen's aspect ratio.

```js
renderer.setSize(window.innerWidth, window.innerHeight);
const canvas = renderer.domElement;
camera.aspect = canvas.clientWidth / canvas.clientHeight;
camera.updateProjectionMatrix();
```

#### Rendering the scene

```js
renderer.render(scene, camera);
```

#### Dispose all the things

In the demo, dispose is never called, but if you're using some kind of client side navigation where the Three.js element is destroyed and re-initialized (this also happens a lot with dev servers using hot reload), you will need to clean up all aquired three.js resources. Also, you will need to take care of disposal as soon as you remove meshes from the scene:

- Geometries need to be disposed
- Materials need to be disposed
- Textures need to be disposed
- See the three.js manual for details: [How to dispose of objects](https://threejs.org/docs/index.html#manual/en/introduction/How-to-dispose-of-objects)

### CodePen Demo

<p class="codepen" data-height="265" data-theme-id="dark" data-default-tab="js,result" data-user="terabaud" data-slug-hash="abNZjWm" style="height: 265px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="THREE.js Template with OrbitControls">
  <span>See the Pen <a href="https://codepen.io/terabaud/pen/abNZjWm">
  THREE.js Template with OrbitControls</a> by Lea Rosema (<a href="https://codepen.io/terabaud">@terabaud</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>
