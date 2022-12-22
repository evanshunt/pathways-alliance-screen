import * as THREE from 'three';
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";
import Application from '../Application.js';

export default class Pathways {
  constructor() {
    this.application = new Application();
    this.scene = this.application.scene;
    this.time = this.application.time;
    this.resources = this.application.resources;

    this.resources.on('ready', () => {
      this.create();
    });
  }

  create() {
    const text1Geometry = new TextGeometry( "There is no single path", {
      font: this.resources.items['helvetiker'],
      size: 40,
      height: 20,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 5
    });
    const text2Geometry = new TextGeometry( "to net zero.", {
      font: this.resources.items['helvetiker'],
      size: 40,
      height: 20,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: 1,
      bevelSize: 1,
      bevelOffset: 0,
      bevelSegments: 5
    });
    text1Geometry.center();
    text2Geometry.center();
    const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, shininess: 1 });
    this.text1 = new THREE.Mesh(text1Geometry, textMaterial);
    this.text2 = new THREE.Mesh(text2Geometry, textMaterial);
    this.text1.position.y = 25;
    this.text2.position.y = -25;
    this.light = new THREE.PointLight();
    this.light.position.z = 80;
    this.scene.add(this.text1, this.text2, this.light);
  }

  update() {
    if (this.light) {
      this.light.position.x = Math.sin(this.time.elapsed*0.001) * 50 - 30;
      this.light.position.y = Math.cos(this.time.elapsed*0.001) * 50 - 30;
    }
  }

  destroy() {
   
  }
}
