---
title: About WebGL – Passing data
layout: layouts/content.html
author: Lea Rosema
tags:
  - webgl
---

# About WebGL

[back to table of contents](../)

## Textures and Image processing

### Preloading images

In order to use images in WebGL, we need to use WebGL textures.

We'll start with a basic image loader. This is the javascript [`Image`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image) object with the load event wrapped
into a [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).

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

Instead of an image, you can also use a `<video>` element or another `<canvas>` element, or `ImageData`.

### Loading images into WebGL

First, we'll create a texture and specify some parameters.

```js
const texture = gl.createTexture();

// Select the active texture
const texutreIndex = 0;
gl.activeTexture(gl.TEXTURE0 + textureIndex);
gl.bindTexture(gl.TEXTURE_2D, texture);

// Set texture parameters
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

#### Updating texture data

To update or partially update texture data, you can use [`texSubImage2D`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texSubImage2D).

### Texture coordinates

- Texture coordinates are in the range from `[0..1]`.
- `S` represents the pixel position from left to right
- `T` represents the pixel position from bottom to top

### Texture parameters

- `TEXTURE_WRAP_S` and `TEXTURE_WRAP_T`: this specifies what happens when you specify texture values outside the range `[0..1]`. The default is `REPEAT` (tiling). Another option is `MIRRORED_REPEAT`. `CLAMP_TO_EDGE` clamps the texture to the edges.
- `TEXTURE_MIN_FILTER` and `TEXTURE_MAG_FILTER`: options are `LINEAR` (blurry upscaling), and `NEAREST` (pixelated upscaling)

One limitation of textures is the need to have sizes which are powers of two (64,128,256,...) if you make use of mipmapping or repeated texture wrapping. Mipmapping means: the GPU saves smaller versions of your texture down to 2x2. Check out the [wikipedia mipmap article](https://en.wikipedia.org/wiki/Mipmap) for a detailed description.

For more details about texture minification and magnification filtering, see this [wikipedia article](https://en.wikipedia.org/wiki/Texture_filtering).

For all texture parameters, see the documentation about [`texParameter:fi`](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/texParameter)

### Accessing texture data from the shaders

To access the image data from inside the shaders, you can use [`texture2D`](https://thebookofshaders.com/glossary/?search=texture2D)

```glsl
uniform sampler2D myTexture;

void main() {
  vec2 coord = 1.0 - gl_FragCoord.xy / vec2(width, height);
  gl_FragColor = texture2D(myTexture, coord);
}
```

### Demos

- [Image Slider](https://terabaud.github.io/hello-webgl/image-slider/)
- [500 Internal Server Error Page](https://codepen.io/terabaud/pen/NLyLLG)
- [Mapping textures onto a cube](https://terabaud.github.io/hello-webgl/texture-mapping/)
- [Retro Style Dither Cam](https://codepen.io/terabaud/pen/WNvoOgK)
