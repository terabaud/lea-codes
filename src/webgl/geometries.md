---
title: Geometries
layout: layouts/content.html
author: Lea Rosema
tags:
  - webgl
---

# Geometries

To draw something in WebGL, you have to provide a geometry. A geometry consists of vertices, which coordinates are usually pulled from a `WebGLBuffer`.
The vertex shader can further process the data, like projecting the vertex via orthographic or perspective projection in 3D space.

## Define buffer data

These buffers can be accessed from the vertex shader by defining an attribute. I usually keep track of the buffers and attributes by defining an object like this:

```js
const buffers = {
  position: {
    //prettier-ignore
    data: new Float32Array([
      -1,  1, // left bottom edge
       1, -1, // right top edge
      -1, -1, // left top edge
    ]),
    size: 2,
  },
  color: {
    data: new Float32Array([1, 0, 0, 0, 1, 0, 0, 0, 1]),
    size: 3,
  },
};
```

The above data describes a 2-dimensional triangle geometry with 3 position entries with 2 values per entry. Additionally, we have 3 color entries with 3 values each for red, green and blue values.

## Upload to WebGL

To upload the buffers to WebGL and bind them to the attributes, we can iterate through the buffers object with a `for-of` loop:

```js
let count = 0;

function setBuffers() {
  count = 0;
  for (const [key, buffer] of Object.entries(buffers)) {
    count = Math.max(count, (buffer.data.length / buffer.size) | 0);
    if (!buffer.id) {
      buffer.id = gl.createBuffer();
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer.id);
    gl.bufferData(gl.ARRAY_BUFFER, buffer.data, gl.DYNAMIC_DRAW);
    const attrib = gl.getAttribLocation(program, key);
    gl.enableVertexAttribArray(attrib);
    gl.vertexAttribPointer(attrib, buffer.size, gl.FLOAT, false, 0, 0);
  }
}

setBuffers();
```

## Accessing data in the vertex shader

```glsl
precision highp float;
attribute vec4 position;
attribute vec4 color;

void main() {
  gl_Position = position;
}
```

We only specified two values for our position attribute, but we can use a 4-component vector for the value anyway. GLSL uses `vec4(0., 0., 0., 1.)` as defaults.

## Passing attributes to the fragment shader

Alongside with the position attribute, we are getting a color attribute. As it is not the vertex shader's task to handle colors, we have to pass it along to the
fragment shader. This can be done via a `varying` variable. Varyings are often prefixed with a `v`. I'm not a fan of the hungarian notation, but I got used to that, but only for varyings :).

```glsl
// ...
varying vec4 vColor;

void main() {
  vColor = color;
  gl_Position = position;
}
```

In the fragment shader, the value of the `varying` is interpolated. We are passing red at vertex 1, green at vertex 2 and blue at vertex 3.

As the fragment shader is operating in-between these 3 vertices, the varying is interpolated, creating a red-green gradient between vertex 1 and 2, a green-blue gradient between vertex 2 and 3 and a red-blue gradient between vertex 1 and 3.

In the fragment shader code, the varying is used like this:

```glsl
precision highp float
varying vec4 vColor;

void main() {
  gl_FragColor = vColor;
}
```

## Clean up

You can delete the buffer via `gl.deleteBuffer()`:

```js
function deleteBuffers() {
  for (const [key, buffer] of Object.entries(buffers)) {
    const attrib = gl.getAttribLocation(program, key);
    gl.disableVertexAttribArray(attrib);
    if (buffer.id) {
      gl.deleteBuffer(buffer.id);
      buffer.id = null;
    }
  }
}
```
