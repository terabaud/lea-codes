---
title: About WebGL – GLSL Overview
layout: layouts/content.html
author: Lea Rosema
---

# About WebGL

[back to table of contents](../)

## GLSL Overview

- semicolons are required
- float numbers must contain a `.` (valid floats are `1.0`, `.5`, `5.`)
- no implicit conversion between `float` and `int`
- built-in vector/matrix arithmetics

### Built-in data types

- primitives (`bool`, `int`, `float`, `double`)
- vectors (`vec2`, `vec3`, `vec4`)
- matrices (`mat2`, `mat3`, `mat4`)
- texture data (`sampler2D`)

### Vector components

- Vectors can be accessed by its properties, named `x`, `y`, `z`, `w`.
- Because the vector data type is also used for colors, the components can also be accessed via `r`, `g`, `b`, `a`.
- For accessing texture coordinates, there are also the aliases `s`, `t`, `p`, `q`

### Vector swizzling

You create a new vector by "swizzling" the vector's components. Any combination of `x`, `y`, `z`, `w` is allowed.

```glsl
vec3 a = vec3(1., 2., 3.);
vec2 b = a.yx; // vec2(2., 1.);
vec4 c = a.zxyx; // vec4(3., 1., 2., 1.);
```

## Type conversion

```glsl
// int to float and back
int i = 3;
float f = float(i);
int j = int(f);

// vector initialization

vec3 v1 = vec3(1.);     // vec3(1., 1., 1.)
vec4 v2 = vec4(v1, 2.); // vec4(1., 1., 1., 2.)

// vec2 to vec4

vec2 a = vec2(1.,2.);
vec4 b = vec4(a, 3., 4.); // vec4(1., 2., 3., 4.)
```

### Special variable types

- [`attribute`](https://thebookofshaders.com/glossary/?search=attribute) – vertex data from WebGL buffers, only accessible in the vertex shader.
- [`uniform`](https://thebookofshaders.com/glossary/?search=uniform) – like global variables you pass in from the JavaScript side before executing the program
- [`varying`](https://thebookofshaders.com/glossary/?search=varying) – passing attributes from the vertex shader to the fragment shader and interpolate in between coordinates

### Built-in inputs and outputs

#### Vertex Shader

- `vec4 gl_Position` – output: transformed vertex position (unit: clip coordinates)
- `float gl_PointSize` – output: transformed point size; only with drawMode POINTS (unit: pixels)

#### Fragment shader

- `vec4 gl_FragCoord` – input: current pixel coordinate, available in the pixel shader.
- `vec2 gl_PointCoord` contains the 2D coordinate from within a point from 0.0 to 1.0 (drawMode POINTS only)
- `vec4 gl_FragColor` – output: current pixel color (unit: RGBA color)
- `vec4 gl_FragData[n]` – output: fragment color for color attachment _n_, used with [WEBGL_draw_buffers](https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_draw_buffers)

### Layout of a WebGL program

#### Vertex shader

```glsl
precision highp float;
attribute vec4 position;
varying vec4 vPos;

void main() {
  vPos = position;
  gl_Position = position;
}
```

#### Fragment shader

```glsl
precision highp float;
varying vec4 vPos;

void main() {
  float red = 1.0 - length(vPos);
  float green = 0.0;
  float blue = 0.0;
  float alpha = 1.0;
  gl_FragColor = vec4(red, green, blue, alpha);
}

```

### Useful built-in functions

- [`length(x)`](https://thebookofshaders.com/glossary/?search=length) – return length of a `float`, `vec2`, `vec3` or `vec4`
- [`distance(a, b)`](https://thebookofshaders.com/glossary/?search=distance) – return distance between two `float`, `vec2`, `vec3` or `vec4` values
- [`step(edge, x)`](https://thebookofshaders.com/glossary/?search=step) – return 0 if `x < edge`, otherwise 1
- [`smoothstep(edge0, edge1, x)`](https://thebookofshaders.com/glossary/?search=smoothstep) – like `step` but with smooth hermite interpolation between `edge0` and `edge1`.
- [`mix(x, y, a)`](https://thebookofshaders.com/glossary/?search=mix) - linear interpolation between `x` and `y` with `a = 0 .. 1`
- [`min(x, y)`](https://thebookofshaders.com/glossary/?search=min) – return the lesser value
- [`max(x, y)`](https://thebookofshaders.com/glossary/?search=max) – return the greater value
- [`clamp(x, a, b)`](https://thebookofshaders.com/glossary/?search=clamp) – clamp the value between `[a .. b]`
- Trigonometric functions, eg. [`sin(x)`](https://thebookofshaders.com/glossary/?search=sin), [`cos(x)`](https://thebookofshaders.com/glossary/?search=cos), [`atan(x)`](https://thebookofshaders.com/glossary/?search=atan)
