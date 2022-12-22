import * as THREE from 'three';
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
    
  }

  update() {

  }

  destroy() {
   
  }

  reset() {
    this.destroy();
    this.create();
  }
}
