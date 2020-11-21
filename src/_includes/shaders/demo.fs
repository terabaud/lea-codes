precision highp float;
uniform vec2 resolution;
uniform float time;

vec2 coords() {
  vec2 p = gl_FragCoord.xy / resolution - .5;
  float aspect = resolution.x / resolution.y;
  p.x *= aspect;
  return p;
}

// function from https://www.shadertoy.com/view/3ll3zr
float sdHeart(in vec2 p, float s) {
  p /= s;
  vec2 q = p;
  q.x *= 0.5 + .5 * q.y;
  q.y -= abs(p.x) * .63;
  return (length(q) - .7) * s;
}

float distanceField(vec2 p) {
  return sdHeart(p, 9.0 + 2.5 * sin(time * 1e-3));
}

vec3 shade(in vec2 p) {
  float sdf = distanceField(p);
  vec3 fg = vec3(1., .0, .0) * .9 
              + .5 * sin(.25 * sdf - time * 1e-3);
  vec3 bg = vec3(.1, .0, .0);
  float x = smoothstep(0., .5, sdf);
  return mix(fg, bg, x);
}

void main () {
  vec3 col = shade(coords() * 27.);
  gl_FragColor = vec4(col, 1.0);
}