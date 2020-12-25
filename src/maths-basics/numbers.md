---
title: Maths basics
layout: layouts/content.html
tags:
  - maths
  - numbers
author: Lea Rosema
---

# Maths basics

[back to table of contents](../)

## Everything about numbers

In this chapter, we'll regard numbers as 1D vectors.
This way, we can reuse the knowledge to abstract things to the second and third dimension.

_(TODO: add a nice scale diagram with examples here)_

### The length of a number:

```glsl
abs(x)
```

Lengths are always positive, so the length of a number is the absolute value of the number.

- the number `1` has a length of `1`.
- the number `-2` has a length of `2`.

### The direction of a number:

```glsl
sign(x)
```

There are two directions when moving on a number scale. Left (`-1`) and right (`1`).
The formular for getting the direction of the number is `x / abs(x)`. In the world of
vectors, this would be called "normalized" vector.

- the direction of the number `5` is `1`
- the direction of the number `-2` is `-1`
- the direction of `0` is not defined

### The distance between two numbers:

```glsl
abs(b - a)
```

The distance between two numbers can be calculated by subtracting the numbers
and measuring the length between the two.

- The distance between `-1` and `1` is `2`

### Interpolation between numbers

#### Linear Interpolation

Linear interpolation is used to transition between 2 values.

The function for interpolating between 2 values looks like this, taking 2 values `a` and `b` and a third parameter `x = [0..1]`.

```glsl
mix(a, b, x) = a * x + b * (1 - x)
```
