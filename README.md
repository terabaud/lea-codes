# Lea codes

Welcome to Lea's WebGL and Three.js world. On this page I will share various demos using WebGL technology.

I also provide some information about how WebGL works and rush through the documentation of
Three.js to give you an overview.

This is a personal project documenting my learnings on WebGL and Three.js, so my future me doesn't forget about it.
My journey has just begun. Hopefully, this will end up as a valuable resource in the future.

https://lea.codes/

## Tech stack

This site uses Eleventy as a static site generator and SASS as a CSS preprocessor.
To get it running, use

```sh
npm install
npm start
```

This will open a dev server running on localhost:8080, watching for changes.

## The JS tooling

This site uses no JS bundling and tooling and just uses JavaScript ES modules via `<script type="module">`.

Legacy browsers like IE11 ignore this tag and JavaScript will not be executed.
This way, we won't need to use polyfills and keep the amount of JavaScript small.

As the site is also functional without JS, IE11 users can still read the content.
