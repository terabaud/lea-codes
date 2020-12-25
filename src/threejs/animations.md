---
title: Animations
description: several ways to add animations in Three.js
layout: layouts/content.html
tags:
  - three
  - animations
author: Lea Rosema
---

# Three.js

[back to table of contents](../)

_Work in progress_

## Animation system

There are several ways to animate things in Three.js. Since 2015, the built-in animation system of Three.js
has had a complete relaunch now having a similar architecture like Unreal Engine/Unity.

- [Three.js Animation system](https://threejs.org/docs/index.html#manual/en/introduction/Animation-system)

### Additional animation libraries

- [Greensock GSAP 3](https://greensock.com)
- [Tween.js](https://github.com/tweenjs/tween.js/)

### Vertex-shader based animation

The standard way of animating objects in THREE.js is to change the values of position, rotation and scale on the CPU and upload the results to the GPU as a transformation matrix. This may become slow; an alternative approach is to use a vertex-shader based animation:

- [three.bas](https://github.com/zadvorsky/three.bas)
