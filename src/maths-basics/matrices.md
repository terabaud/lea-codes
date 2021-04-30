---
title: Maths basics
layout: layouts/content.html
author: Lea Rosema
tags:
  - math
---

# Maths basics

[back to table of contents](../)

## Matrices

[Matrices](<https://en.wikipedia.org/wiki/Matrix_(mathematics)>) are rectangular arrays of numbers. In computer graphics, matrices are helpful for performing transformations in 2D or 3D space, like translation, rotation and scaling.

These transformations are done via [matrix multiplication](https://en.wikipedia.org/wiki/Matrix_multiplication). The GLSL shader language has matrix multiplication built-in, in JavaScript you have to use an additional matrix library (or implement that yourself).

### Defining Matrices in GLSL

One mindtwisting detail when working with matrices in GLSL is, you don't write matrices in GLSL as you would write them down on paper, but in a transposed form:

```glsl
mat3 identity() {
  return mat3(
    vec3(  1.,  0., 0.), // column 1
    vec3(  0.,  1., 0.), // column 2
    vec3(  0,   0 , 1.)  // column 3
  );
}
```

Above, you can see an example of the identity matrix, this behaves like the number `1`, when multiplying a matrix with the identity matrix, you will get the same matrix as the result (`A*I = A`).

### 2D transformation matrices

#### Rotation matrix

```glsl
mat3 rotate2D(float a) {
  float C = cos(a);
  float S = sin(a);
  return mat3(
    vec3( C, S, 0.),
    vec3(-S, C, 0.),
    vec3( 0, 0, 1.)
  );
}
```

#### Translation matrix

```glsl
mat3 translate2D(vec2 t) {
  return mat3(
    vec3(  1.,  0., 0.),
    vec3(  0.,  1., 0.),
    vec3( t.x, t.y, 1.)
  );
}
```

#### Scale matrix

```glsl
mat3 scale2D(vec2 s) {
  return mat3(
    vec3( s.x,  0., 0.),
    vec3(  0., s.y, 0.),
    vec3(  0.,  0., 1.)
  );
}
```

#### Usage

```glsl
const float PI = 3.141592654;
const float DEG = PI / 180.;

void main() {
  mat3 mRotate = rotate2D(rotate * DEG);
  mat3 mTranslate = translate2D(vec2(translateX, translateY));
  mat3 mScale = scale2D(vec2(scaleX, scaleY));

  // try changing the order of the multiplications :)
  mat3 mTransform = mTranslate * mRotate * mScale;
  vec3 pos = mTransform * vec3(position.xy, 1.);
  vPos = pos.xy;
  gl_Position = vec4(pos.xy,0.,1.);
}
```

[Try on CodePen](https://codepen.io/terabaud/pen/jOymzJN?editors=1000)

### 3D transformation matrices

#### Rotation matrices

In 3D space, you can rotate around the X, Y and Z axis:

```glsl
mat4 rotX(float angle) {
  float S = sin(angle);
  float C = cos(angle);
  return mat4(
    vec4(1.0, 0, 0, 0),
    vec4(0  , C, S, 0),
    vec4(0  ,-S, C, 0),
    vec4(0  , 0, 0, 1.0)
  );
}

mat4 rotY(float angle) {
  float S = sin(angle);
  float C = cos(angle);
  return mat4(
    vec4(C, 0  ,-S, 0),
    vec4(0, 1.0, 0, 0),
    vec4(S, 0  , C, 0),
    vec4(0, 0  , 0, 1.0)
  );
}

mat4 rotZ(float angle) {
  float S = sin(angle);
  float C = cos(angle);
  return mat4(
    vec4( C, S, 0  , 0),
    vec4(-S, C, 0  , 0),
    vec4( 0, 0, 1.0, 0),
    vec4( 0, 0, 0  , 1.0)
  );
}
```

#### Scale matrix

```glsl
mat4 scale(vec3 s) {
  return mat4(
    vec4(s.x, 0.0, 0.0, 0.0),
    vec4(0.0, s.y, 0.0, 0.0),
    vec4(0.0, 0.0, s.z, 0.0),
    vec4(0.0, 0.0, 0.0, 1.0)
  );
}
```

#### Translation matrix

```glsl
mat4 translate(vec3 p) {
  return mat4(
    vec4(1.0, 0.0, 0.0, 0.0),
    vec4(0.0, 1.0, 0.0, 0.0),
    vec4(0.0, 0.0, 1.0, 0.0),
    vec4(p.x, p.y, p.z, 1.0)
  );
}
```

#### Usage

[Try on CodePen](https://codepen.io/terabaud/pen/LYxeYGX?editors=1000)
