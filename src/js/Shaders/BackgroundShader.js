export default {
  vertexShader: /* glsl */`
    varying vec3 vPos;
    varying vec2 vUv;

    void main() {
      vPos = position;
      vUv = uv;
      gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);
    }

  `,

  fragmentShader: /* glsl */`
    uniform vec3 colour;

    varying vec3 vPos;
    varying vec2 vUv;

    void main() {
      float strength = min(vUv.x*(2.0-vUv.y*2.0)*2.0+0.7, 1.0);
      gl_FragColor = vec4(colour*strength, 1.0);
    }
  `,
};