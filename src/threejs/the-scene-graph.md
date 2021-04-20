---
title: The scene graph
description: The scene graph in Three.js
layout: layouts/content.html
author: Lea Rosema
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

### Positioning objects

```js
sphere.position.set(1, 2, 3);

const DEG = Math.PI / 180;

// set rotation of the object
sphere.rotation.x = 45 * DEG;
sphere.rotation.y = 45 * DEG;
```

### Organizing in groups

You can organize your objects in groups and then set the position and orientation of the group.

```js
const group = new THREE.Group();
group.add(sphere);

group.position.set(1, 1, 1);
```

### Iterating through the scene

You can traverse through a scene or group via `scene.traverse()` or `scene.traverseVisible()`.
