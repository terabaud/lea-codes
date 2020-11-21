---
title: 'About WebGL – Passing data'
layout: 'layouts/content.html'
---

# About WebGL

[back to table of contents](../)

## Image loader

In order to use images in WebGL, we need to use WebGL textures.
We'll start with a basic image loader.

```js
function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = url;
    img.onload = () => {
      resolve(img);
    };
    img.onerror = () => {
      reject(img);
    };
  });
}
```

## Loading images into WebGL

First, we'll create a texture and specify some parameters.

```js
const texutreIndex = 0;
const texture = gl.createTexture();
gl.activeTexture(gl.TEXTURE0 + textureIndex);
gl.bindTexture(gl.TEXTURE_2D, texture);

// Set the parameters so we can render any size image.
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

// Upload the image into the texture.
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

// Set a uniform variable containing the texture index
const locMyTexture = gl.getUniformLocation(program, 'myTexture');
gl.uniform1i('myTexture', 0);
```

## Accessing texture data from the shaders

To access the image data from inside the shaders, you can use [`texture2D()`](https://thebookofshaders.com/glossary/?search=texture2D)

```glsl
uniform sampler2D myTexture;

void main() {
  vec2 coord = 1.0 - gl_FragCoord.xy / vec2(width, height);
  gl_FragColor = texture2D(myTexture, coord);
}
```

## DEMO

- [Image Slider](https://terabaud.github.io/hello-webgl/image-slider/)
