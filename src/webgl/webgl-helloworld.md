---
title: About WebGL – Passing data
layout: layouts/content.html
author: Lea Rosema
---

# About WebGL

[back to table of contents](../)

## WebGL Helloworld

That's quite a lot of stuff, let's go through this together.

### Vertex shader

The vertex shader receives vertex positions from the position buffer. In this minimal example, the position is passed directly to
the global `gl_Position` variable.

```glsl
precision highp float;
attribute vec4 position;

void main() {
  gl_Position = position;
}
```

### Fragment shader

The fragment shader processes each pixel inside the specified shape formed by the vertex shader. It has a global input variable `gl_FragCoord` which contains the pixel position. To normalize the coordinates, the position is divided by the screen resolution vector.
Additional, the vector is substracted by `-.5`, so 0 is at the center of the screen.

The global output variable `gl_FragCoord` sets the color of the pixel and takes a `vec4` vector, containing red,
green, blue and alpha values from 0..1 each.

```glsl
precision highp float;
uniform float time;
uniform vec2 resolution;

void main() {
  vec2 p = gl_FragCoord.xy / resolution - .5;
  float x = length(p);
  gl_FragColor = vec4(x, 0., 0., 1.);
}
```

### The JavaScript stuff

#### Initialize the WebGL context

This part is quite similar to working with the canvas 2D API:

```js
const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');
```

For legacy browsers (IE11), the webgl context is provided via

```js
canvas.getContext('experimental-webgl');
```

#### Compile the shaders

GLSL is a compiled language. WebGL provides APIs to compile and link the shader code:

```js
/**
 * Compile Shader
 * @param {number} type gl.FRAGMENT_SHADER | gl.VERTEX_SHADER
 * @param {string} code shader code
 */
function shader = (type, code) => {
  const sh = gl.createShader(type, code);
  gl.shaderSource(sh, code);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    throw gl.getShaderInfoLog(sh);
  }
  return sh;
};
```

#### Link the WebGL program

```js
const program = gl.createProgram();
gl.attachShader(program, shader(g.FRAGMENT_SHADER, vert));
gl.attachShader(program, shader(g.FRAGMENT_SHADER, frag));
gl.linkProgram(program);

if (!gl.getProgramParameter(p, g.LINK_STATUS)) {
  throw gl.getProgramInfoLog(p);
}

gl.useProgram(program);
```

#### Setting up buffers and attributes

We'll create a buffer that will hold 6 coordinates for 2 triangles:

![Two triangles in the WebGL coordinate system]({{ site.url }}/svg/two-triangles.svg)

```js
const positionAttrib = g.getAttribLocation(p, 'position');
const positionBuffer = g.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(
  gl.ARRAY_BUFFER,
  // 2D vertex data for two triangles filling up the whole screen
  new Float32Array([-1, -1, -1, 1, 1, -1, 1, -1, 1, 1, -1, 1]),
  gl.STATIC_DRAW
);
```

Then we assign an attribute variable to the buffer.
The [`vertexAttribPointer`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/vertexAttribPointer) call specifies that we are passing two float
values per coordinate to the vertex shader, starting at offset 0.

```js
// bind position buffer to position attribute.
// Specify that the variable is a vec2 of floats.
gl.enableVertexAttribArray(positionAttrib);
gl.bindBuffer(g.ARRAY_BUFFER, positionBuffer);
gl.vertexAttribPointer(positionAttrib, 2, gl.FLOAT, false, 0, 0);
```

#### Setting up the viewport and add resize handler

```js
function setSize() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  gl.viewport(0, 0, innerWidth, innerHeight);
  const locResolution = gl.getUniformLocation(program, 'resolution');
  gl.uniform2fv(locResolution, [innerWidth, innerHeight]);
}

setSize();
window.addEventListener('resize', setSize, false);
```

#### Render loop

```js
/**
 * Render loop
 */
function loop(time = 0) {
  const locTime = g.getUniformLocation(program, 'time');
  gl.uniform1f(locTime, time * 1e-3);

  // draw 6 vertices (=two triangles)
  gl.drawArrays(g.TRIANGLES, 0, 6);
  requestAnimationFrame(loop);
}
```

#### Putting it all together

In the following Codepen demo, I put all the things into a web component via the [`customElements`](https://developer.mozilla.org/en-US/docs/Web/API/Window/customElements) API.

The buffer that is passed to the vertex shader contains 2D coordinates for two triangles.
The code for the shaders are specified in the html via custom `<script type="vert|frag">` tags.
These `<script>` tags are not executed as JavaScript, but instead compiled and linked to a
WebGL program, as explained above.

Each rendered frame, the `time` uniform variable is set, containing the elapsed time.

[CodePen Demo](https://codepen.io/terabaud/pen/vYKKPew)
