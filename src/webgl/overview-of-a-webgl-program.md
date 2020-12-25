---
title: About WebGL – Overview of a webgl program
layout: layouts/content.html
author: Lea Rosema
---

# About WebGL

[back to table of contents](../)

## A WebGL program overview

### Initialization

Create a `<canvas>` element in your HTML and initialize a WebGL context from the JS side

### Provide buffers

Create a buffer containing vertex data for the kind of shape you want to display (eg two triangles forming a rectangle)

### Bind buffers to vertex attributes

Buffer data can be accessed by the vertex shader via attribute variables.

When a WebGL program is executed, the buffer is split into records (using a record size).
These records are iterated through and passed to the vertex shader. The vertex shader is run multiple times, depending on
how many records specified inside the buffer.

The record size depends on the data type of the attribute variable.
A number uses a record size of 1, a 2D vector (`vec2`) has a record size of 2.

If you provide data for 3 coordinates making up a triangle, the vertex shader
is executed 3 times and the attribute variable contains the coordinate
of the _nth_ record inside the buffer.

### Set uniform variables

Set additional uniform variables, like the elapsed time.
Another use case for uniform variables are for accessing texture data.

### Setting the viewport size

Initially and after resizing the WebGL canvas, you need to set the viewport size of the WebGL context.

### Drawing elements

Finally, you can draw all the things onto your canvas element via the `drawArrays` or `drawElements` methods.
I'm using `drawArrays` in most cases.

These methods provide different draw modes:

- `POINTS`: draw points on screen
- `LINES`: draw lines on screen
- `TRIANGLES`: draw filled triangles on screen
- `TRIANGLE_STRIP`: like triangles, but the 4th record in the buffer reuses the 2nd and 3rd record in the buffer and so on.

When `drawArrays` is called, the vertex and fragment shaders come into play.
