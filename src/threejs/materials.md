---
title: 'Materials'
layout: 'layouts/content.html'
tags: ['three', 'materials']
---

# Three.js

[back to table of contents](../)

## Material

A [`Material`](https://threejs.org/docs/index.html#api/en/materials/Material) is basically what you layer on top of a 3D object, to control the way the object is perceived when rendered. Three.js provides several materials.

### Line-based materials

[`LineBasicMaterial`](https://threejs.org/docs/index.html#api/en/materials/LineBasicMaterial) and [`LineDashedMaterial`](https://threejs.org/docs/index.html#api/en/materials/LineDashedMaterial) used for dashed wireframe materials. This material is not affected by lights.

### MeshBasicMaterial

[`MeshBasicMaterial`](https://threejs.org/docs/index.html#api/en/materials/MeshBasicMaterial) is for drawing geometries in a flat or wireframe model.
Not affected by lights.

### MeshLambertMaterial

[`MeshLambertMaterial`](https://threejs.org/docs/index.html#api/en/materials/MeshLambertMaterial) is a material for non-shiny surfaces without specular highlights.

- uses the [Lambertian model](https://en.wikipedia.org/wiki/Lambertian_reflectance) for calculating reflectance
- uses [Goraud shading](https://en.wikipedia.org/wiki/Gouraud_shading). Shading is calculated per vertex and interpolates the results over the faces.

### MeshPhongMaterial

[`MeshPhongMaterial`](https://threejs.org/docs/index.html#api/en/materials/MeshPhongMaterial) is a material for shiny surfaces with specular highlights.

- uses the [Blinn-Phong model](https://en.wikipedia.org/wiki/Blinn-Phong_shading_model) model for calculating reflectance.
- uses [Phong shading](https://en.wikipedia.org/wiki/Phong_shading). Calculating is done per pixel, thus more accurate than goraud shading.

### MeshStandardMaterial

[`MeshStandardMaterial`](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial) is a standard physically based material.

Physically based rendering (PBR) has become standard in many 3D applications. More accurate and realistic result than `MeshPhongMaterial` or `MeshLambertMaterial` but somewhat more computationally expensive.

Best results with an [environment map](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial.envMap). See [this example](https://threejs.org/examples/webgl_materials_envmaps_exr.html).

### MeshPhysicalMaterial

[`MeshPhysicalMaterial`](https://threejs.org/docs/index.html#api/en/materials/MeshPhysicalMaterial) is an extension to [`MeshStandardMaterial`](https://threejs.org/docs/index.html#api/en/materials/MeshStandardMaterial) providing more advanced PBR properties. Higher performance cost.

- Clearcoat
- Physically-based transparency
- Advanced reflectivity

### ShaderMaterial

[`ShaderMaterial`](https://threejs.org/docs/index.html#api/en/materials/ShaderMaterial) is a material rendered with custom shaders. Shaders are small functions writtn in GLSL that run on the GPU. Theres also a [GLSL language overview](../../webgl/glsl-overview/) in the WebGL section of this site.

Check out the following [Codepen demo](https://codepen.io/terabaud/pen/ZEWvWdZ) for an example using custom shaders as material.
There are two planes in the scene using the [`ShaderMaterial`](https://threejs.org/docs/index.html#api/en/materials/ShaderMaterial).
The coordinates of the ground plane are shifted by the vertex shader (`landscapeShader.vert`) the black/white colorization is done in the fragment shader
(`landscapeShader.frag`).
