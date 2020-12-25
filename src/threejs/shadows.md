---
title: Shadows
description: Casting shadows with Three.js
layout: layouts/content.html
tags:
  - three
  - lights
  - shadows
author: Lea Rosema
---

# Three.js

[back to table of contents](../)

## Shadows

As mentioned in the chapter about lights, some light sources are able to cast shadows.

To enable shadows in your Three.js scene, setup the renderer to use shadow maps:

```js
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // default THREE.PCFShadowMap
```

Lights that have a direction are able to cast shadows. To enable shadow casting for a light source, set:

```js
light.castShadow = true;
```

Additionally, for the meshes that should receive shadows, set:

```js
plane.receiveShadow = true;
```

For best performance, a common practice is to use only one lights with shadow-casting enabled.
An alternative approach is to use fake shadows, as described in the ThreeJS fundamentals article on shadows (see below).

### Demo

Check out this [demo on CodePen](https://codepen.io/terabaud/pen/LYZKZNV?editors=1010)

### See also

- [Chapter on ThreeJS fundamentals](https://threejsfundamentals.org/threejs/lessons/threejs-shadows.html)
- [`DirectionalLightShadow`](https://threejs.org/docs/index.html#api/en/lights/shadows/DirectionalLightShadow)
- [`PointLightShadow`](https://threejs.org/docs/index.html#api/en/lights/shadows/PointLightShadow)
