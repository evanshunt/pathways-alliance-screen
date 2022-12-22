import * as THREE from 'three';
import Application from '../Application.js';
import EventEmitter from '../utils/EventEmitter.js';

export default class Controls extends EventEmitter {
  constructor() {
    super();

    this.application = new Application();
    this.canvas = this.application.canvas;
    this.time = this.application.time;

    this.canvas.addEventListener('dblclick', (event) => this.dblClick(event));
    this.canvas.addEventListener('pointermove', (event) => this.pointerMove(event));
    this.canvas.addEventListener('pointerdown', (event) => this.pointerDown(event));
    this.canvas.addEventListener('pointerup', (event) => this.pointerEnd(event));
    this.canvas.addEventListener('pointerout', (event) => this.pointerEnd(event));
    this.canvas.addEventListener('pointercancel', (event) => this.pointerEnd(event));
  }

  dblClick(event) {

  }

  pointerMove(event) {
    
  }

  pointerDown(event) {
    this.time.lastInteraction = Date.now();
  }

  pointerEnd(event) {
    
  }

  normalizePointX(x) {
    return (x / this.viewport.width) * 2 - 1;
  }

  normalizePointY(y) {
    return - (y / this.viewport.height) * 2 + 1;
  }
}