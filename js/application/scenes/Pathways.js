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
    this.textGroup = new THREE.Group();
    const text1Geometry = new TextGeometry( "There is no single path", {
      font: this.resources.items['helvetiker'],
      size: 40,
      height: 20,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0,
      bevelOffset: 0,
      bevelSegments: 5
    });
    const text2Geometry = new TextGeometry( "to net zero.", {
      font: this.resources.items['helvetiker'],
      size: 40,
      height: 20,
      curveSegments: 8,
      bevelEnabled: true,
      bevelThickness: 0.1,
      bevelSize: 0,
      bevelOffset: 0,
      bevelSegments: 5
    });
    text1Geometry.center();
    text2Geometry.center();
    const textMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, metalness: 0.5 });
    this.text1 = new THREE.Mesh(text1Geometry, textMaterial);
    this.text2 = new THREE.Mesh(text2Geometry, textMaterial);
    this.textGroup.add(this.text1, this.text2);
    this.textGroup.position.z = 40;
    this.text1.position.y = 25;
    this.text2.position.y = -25;
    this.light = new THREE.PointLight();
    this.light.position.z = 160;
    this.scene.add(this.textGroup, this.light);
  }

  update() {
    if (this.light) {
      this.light.position.x = Math.sin(this.time.elapsed*0.001) * 120 - 30;
      this.light.position.y = Math.cos(this.time.elapsed*0.001) * 120 - 30;
    }
    if (this.textGroup) {
      this.textGroup.rotation.y = Math.cos(this.time.elapsed*0.002) * 0.08;
      this.textGroup.rotation.z = Math.cos(this.time.elapsed*0.001) * 0.02;
    }
  }

  destroy() {
   
  }
}
