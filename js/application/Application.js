import * as THREE from 'three';

import Debug from './utils/Debug.js';
import Time from './utils/Time.js';
import Viewport from './utils/Viewport.js';
import Resources from './utils/Resources.js';
import Pathways from './scenes/Pathways.js';
import Renderer from './Renderer.js';
import Camera from './Camera.js';
import Controls from './ui/Controls.js';
import ProgressBar from './ui/ProgressBar.js';

import sources from './data/sources.js';

let instance = null;

export default class Application {
  constructor(canvas) {
    // Singleton
    if (instance) {
      return instance;
    }
    instance = this;

    // Global access
    window.application = this;

    // Options
    this.canvas = canvas;

    // Setup
    THREE.ColorManagement.legacyMode = false;
    this.debug = new Debug();
    this.time = new Time();
    this.scene = new THREE.Scene();
    this.progressBar = new ProgressBar();
    this.resources = new Resources(sources);
    this.viewport = new Viewport();
    this.camera = new Camera();
    this.renderer = new Renderer();
    this.controls = new Controls();

    this.pathways = new Pathways();

    this.viewport.on('resize', () => {
      this.resize();
    });

    this.time.on('tick', () => {
      this.update();
    });

    this.controls.on('focus', (objectId) => {
      this.changeFocus(objectId); 
    });
  }

  resize() {
    this.camera.resize();
    this.renderer.resize();
  }

  update() {
    this.pathways.update();
    this.renderer.update();
  }
}
