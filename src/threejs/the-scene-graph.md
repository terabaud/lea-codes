---
title: 'The scene graph'
layout: 'layouts/content.html'
---

# Three.js

[back to table of contents](../)

## The scene graph

Three.js uses a scene graph data structure. A scene graph is commonly used by vector-based graphics editing applications and modern computer games, which arranges the logical and often spatial representation of a graphical scene.

It is a collection of nodes in a graph or tree structure.

A scene contains lights, meshes and groups of these.

### Adding objects to the scene

Let's create a sphere:

```js
const geometry = new THREE.SphereBufferGeometry(1, 16, 16);
const material = new THREE.MeshLambertMaterial({ color: 0x663399 });
const sphere = new THREE.Mesh(geometry, material);
```

To add this mesh to the scene, call:

```js
scene.add(sphere);
```

### Transformations

_Work in progress, girlfriend sends me to bed_

```js
sphere.position.set(1, 2, 3);
```

### Iterating through the scene

```js
function traverseScene(sceneOrGroup) {
  for (let item of sceneOrGroup.children) {
    console.log(item);
    if (item.children && item.children.length > 0) {
      traverseScene(item);
    }
  }
}
```
