---
title: Hello Three.js
description: Working with Vectors in Three.js
layout: layouts/content.html
tags:
  - three
  - hello-world
author: Lea Rosema
---

# Three.js

[back to table of contents](../)

## Working with vectors

```js
// Initialization:
const a = new THREE.Vector2(1, 2);
const b = new THREE.Vector3(2, 2);
const c = new THREE.Vector2(); // default constructor arguments are (0, 0)

// d = a + b;
const d = new THREE.Vector2();
d.copy(a); // copy the values of a into d
d.add(b); // add b to d

const cd = c.distanceTo(d);

// Important to note:
// add mutates the values of the current vector
```

### See documentation

- [Vector2](https://threejs.org/docs/index.html#api/en/math/Vector2)
- [Vector3](https://threejs.org/docs/index.html#api/en/math/Vector3)
