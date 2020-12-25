---
title: About WebGL – WebGL pipeline
layout: layouts/content.html
author: Lea Rosema
---

# About WebGL

[back to table of contents](../)

## WebGL pipeline

![diagram of the WebGL pipeline]({{ site.url }}/svg/webgl-pipeline.svg)

### Description

- An array of vertices (or any data) is uploaded into a buffer which is split into data records
- the vertex shader is executed once per data record
- for each data record, the vertex shader program gets the data value into an attribute variable and writes it into an output position variable
- the made up shape gets rasterized into fragments (pixels)
- the fragment shader calculates the color for each pixel

### See also

- [Detailed description on WebGL fundamentals](https://webglfundamentals.org/webgl/lessons/webgl-how-it-works.html)
