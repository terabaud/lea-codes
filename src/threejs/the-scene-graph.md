---
title: 'The scene graph'
layout: 'layouts/content.html'
---

# Three.js

[back to table of contents](../)

## The scene graph

Three.js uses a scene graph data structure. A scene graph is commonly used by vector-based graphics editing applications and modern computer games, which arranges the logical and often spatial representation of a graphical scene.

It is a collection of nodes in a graph or tree structure.

A scene contains lights, meshes and groups of these.

### Iterating through the scene

```js
function traverseScene(sceneOrGroup) {
  for (let item of sceneOrGroup.children) {
    console.log(item);
    if (item.children && item.children.length > 0) {
      this.traverseScene(item);
    }
  }
}
```

### Example using groups

TBD
