---
title: About WebGL – Passing data
layout: layouts/content.html
author: Lea Rosema
---

# About WebGL

[back to table of contents](../)

## Passing Data to WebGL

There are several ways to pass data from JavaScript to WebGL.

### Attributes and Buffers

Vertex Data like 3D model data are pushed to WebGL via GL Buffers. These can be accessed from the vertext shader via an attribute variable. In the most common case, buffers contain vertex coordinates. Further data can be passed alongside these vertices. Further data could be passing colors or texture coordinate alongside with vertex coordinates, for example.

### Varyings

In the vertex shader, you can set a varying variable. These will be passed from the vertex shader to the fragment shader and are interpolated. When your vertex shader specifies a triangle with a red egde and a blue side, the varying variable containing the color is interpolated from red to blue, creating a gradient.

### Uniforms

Uniform variables are like global variables you can set from the JavaScript side before executing your shader.

#### Example

A common use case of uniform variables is to pass the screen resolution as a `vec2` to your shader.

```js
const locResolution = gl.getUniformLocation(program, 'resolution');
gl.uniform2fv(locResolution, [innerWidth, innerHeight]);
```

You can then access the `resolution` variable in the shader like this:

```glsl
uniform vec2 resolution;

void main() {
  float aspectRatio = resolution.x / resolution.y;
  // ...
}
```

### Texture data

You can put data into a texture and then use it like a random access buffer in your shader code
