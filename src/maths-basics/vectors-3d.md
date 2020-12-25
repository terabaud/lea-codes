---
title: Maths basics
layout: layouts/content.html
tags:
  - maths
  - vectors
author: Lea Rosema
---

# Maths basics

[back to table of contents](../)

## 3D Vectors

3D vectors have an `x` component, a `y` component and a `z` component

### The length of a vector:

```glsl
length(v) = sqrt(v.x^2 + v.y^2 + v.z^2)
```

The length of a vector can be obtained with the help of the
pythagorean theorem.

### The direction of a vector

```glsl
normalize(v) = v / length(v)
```

Like with numbers (aka 1D vectors) the direction of a vector can be calculated
by dividing the vector by the length of the vector.

### The distance between two numbers

```glsl
distance(a, b) = length(b - a)
```

### Dot product

The dot product of two vectors `a = [ax, ay, az]` and `b = [bx, by, bz]` is defined as

```glsl
dot(a, b) = ax * bx + ay * by + az * bz
```
