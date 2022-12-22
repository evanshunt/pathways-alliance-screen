import * as THREE from 'three';
import Application from './Application.js';

export default class Camera {
  constructor() {
    this.application = new Application();
    this.scene = this.application.scene;
    this.viewport = this.application.viewport;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(20, this.viewport.width / this.viewport.height, 1, 2000);
    this.instance.position.set(0, 0, 2000);
    this.scene.add(this.instance);
  }

  resize() {
    this.instance.aspect = this.viewport.width / this.viewport.height;
    this.instance.updateProjectionMatrix();
  }
}