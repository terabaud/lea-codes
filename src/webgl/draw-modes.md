---
title: Draw modes
layout: layouts/content.html
author: Lea Rosema
tags:
  - webgl
---

# Draw modes

WebGL supports several draw modes.

- `gl.POINTS` - draw points (processes the buffer point-by-point)
- `gl.LINES` - draw lines (proccesses pairs of buffer data to draw lines)
- `gl.LINE_STRIP` - draws a line to the next vertex
- `gl.LINE_LOOP`- draws a line to the next vertex and connects the last vertex back to the first
- `gl.TRIANGLES` - draw triangles (processes triples of buffer data)
- [`gl.TRIANGLE_STRIP`](https://en.wikipedia.org/wiki/Triangle_strip) - draw triangle strips (like triangles but reuses two coordinates of the last triangle)
- [`gl.TRIANGLE_FAN`](https://en.wikipedia.org/wiki/Triangle_fan) - reuses a central vertex

## `drawArrays` vs `drawElements`

- [`gl.drawArrays`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawArrays) directly processes the data in the buffer
- [`gl.drawElements`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements) allows you use indexed geometries, this way you can reuse certain coordinates in the buffer by referencing indices multiple times.

### Limitation for indexed geometries

When using WebGL 1, the index buffer for the vertexes are specified as an unsigned short value, limiting the total number of vertices to `65536`. If you use WebGL 2, this limitation is removed. You can also load the [`OES_element_index_uint`](https://developer.mozilla.org/en-US/docs/Web/API/OES_element_index_uint) extension for webgl 1 which is widely supported accross all browsers:
