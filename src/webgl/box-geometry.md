---
title: Box Geometry
layout: layouts/content.html
author: Lea Rosema
tags:
  - webgl
---

# About WebGL

[back to table of contents](../)

## 3D Objects

### Box geometry

To define a geometry for a box, you split up the cube into triangles and provide the coordinates of these triangles in the GL buffer.
First, I defined all 8 vertices that are used for the box geometry.

Then, I defined the vertices by providing the vertex indices which I then mapped to the vertex data.

```js
/**
 * Create a box with the sizes a * b * c,
 * centered at (0, 0, 0), 2 triangles per side.
 *
 * @name box
 * @param {number} sizeA
 * @param {number} sizeB
 * @param {number} sizeC
 */
export function box(sizeA = 1.0, sizeB = 1.0, sizeC = 1.0) {
  const a = sizeA * 0.5;
  const b = sizeB * 0.5;
  const c = sizeC * 0.5;
  const vertices = [
    [-a, -b, -c],
    [a, -b, -c],
    [-a, b, -c],
    [a, b, -c],
    [-a, -b, c],
    [a, -b, c],
    [-a, b, c],
    [a, b, c],
  ];
  //     0______1
  //   4/|____5/|
  //   |2|____|_|3
  //   |/ ____|/
  //  6       7

  const faces = [
    // back
    [0, 1, 2],
    [2, 1, 3],
    // front
    [5, 4, 7],
    [7, 4, 6],
    // left
    [4, 0, 6],
    [6, 0, 2],
    // right
    [7, 5, 1],
    [1, 7, 3],
    // top
    [1, 0, 5],
    [5, 0, 4],
    // bottom
    [2, 3, 6],
    [6, 3, 7],
  ];
  const result = faces
    .flat()
    .map((vertexIndex) => vertices[vertexIndex])
    .flat();
  return result;
}
```

#### Demo

- Demo: [https://terabaud.github.io/hello-webgl/cube/](https://terabaud.github.io/hello-webgl/cube/)

The abouve demo is written in modular JavaScript without bundling/transpiling toolchain, so you can check the sources via the
browser dev tools. The box geometry is provided in the `geometry.mjs`.
The motion of the cube is handled in the shader code via translation and rotation matrices, see the `shaders.mjs` for details.

I provided the box geometry in the `position` buffer. To provide different colors for each side of the box, I provided colors for
each vertex in a `color` buffer. Each side consists of 2 triangles, made up from 2\*3=6 vertices.

```js
const glea = new GLea({
  shaders: [GLea.vertexShader(vert), GLea.fragmentShader(frag)],
  buffers: {
    position: GLea.buffer(3, cube(0.25)),
    color: GLea.buffer(
      3, // use vec3 data type
      [
        ...Array(6).fill(red),
        ...Array(6).fill(green),
        ...Array(6).fill(blue),
        ...Array(6).fill(pink),
        ...Array(6).fill(cyan),
        ...Array(6).fill(yellow),
      ].flat()
    ),
  },
}).create();
```

I used an early prototype of the [GLea](https://github.com/terabaud/glea/) library here.
The implementation of the box geometry landed into an npm package [`ella-math`](https://npmjs.com/package/ella-math) I've published recently.

### Sphere geometry

Creating a sphere geometry from triangles basically works similar to the box geometry, but

- it contains much more vertices
- the calculation of the vertex positions are not as straightforward as with the box geometry.

#### Calculating vertex positions

You can calculate the vertex position by providing a radius and two angles:

```js
const evalPos = (radius, theta, phi) => {
  const deg = Math.PI / 180.0;
  var pos = new Vec(
    radius * Math.sin(theta * deg) * Math.sin(phi * deg),
    radius * Math.cos(theta * deg),
    radius * Math.sin(theta * deg) * Math.cos(phi * deg)
  );
  return pos;
};
```

To get all vertexes for the sphere geometry, you specify:

- the number of sides around sphere
- the number of segments from top to bottom of the spere.
- the radius

Then, iterate through the sides and segments to calculate the vertex positions.

After that, you will need to build faces by connecting the vertices, like we did in the box geometry above.
The full implementation of the sphere geometry is also provided in the package [`ella-math`](https://npmjs.com/package/ella-math).

Implementation: [https://github.com/terabaud/ella-math/blob/main/src/geometry.ts#L171](https://github.com/terabaud/ella-math/blob/main/src/geometry.ts#L171)

- Demo: [https://codepen.io/terabaud/pen/MWazXyd](https://codepen.io/terabaud/pen/MWazXyd)
- WebGL-based demo: [https://codepen.io/terabaud/pen/wvMQQyr](https://codepen.io/terabaud/pen/wvMQQyr)
