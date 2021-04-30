---
title: WebGL core concepts
layout: layouts/content.html
author: Lea Rosema
tags:
  - webgl
---

# About WebGL

[back to table of contents](../)

## WebGL Core Concepts

WebGL is a JavaScript API for rendering interactive 2D and 3D graphics within the web browser.
It can be mixed with other HTML elements and composited with other parts of the page or page background.

### Common misconceptions

People often think WebGL is a 3D engine, but it is a rasterization engine that provides a low level API.
It draws points, lines and triangles based on code you supply.

This can be used for building a 3D engine, but it is also good for image processing.
Also, there are 3D engines that are implemented on top of WebGL.
Popular choices are:

- [https://threejs.org](https://threejs.org)
- [https://www.babylonjs.com](https://www.babylonjs.com)

### It runs on the GPU

WebGL runs little programs that are run on the GPU on your computer.

- These little programs consist of a pair of functions, called shaders.
- Shaders are written in a C-like programming language, GLSL
- There's a vertex shader and a fragment shader

### Vertex and Fragment shaders

The job of the Vertex shader is to calculate vertex positions.
Based on the positions it returns, WebGL can then rasterize certain primitives, like points,
lines or triangles.

When rasterizing these shapes, the fragment shader is run.
This is done in a highly parallelized manner for each fragment(=pixel) of the shape.

### What is the WebGL API about?

Most of the WebGL API is about setting up the state for the shaders and passing data from
JavaScript to the WebGL context.

#### Common things done from the JavaScript side

- initializing a `WebGLRenderingContext` from a `<canvas>` element
- compile shader code
- specify buffer data for the vertex shader
- uploading images to the GPU which can be used as textures
- calling drawArrays for drawing shapes on screen (using the GL buffers and the shader code)
