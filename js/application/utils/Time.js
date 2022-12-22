import EventEmitter from './EventEmitter.js';

export default class Time extends EventEmitter {
  constructor() {
    super();

    // Setup
    this.start = Date.now();
    this.current = this.start;
    this.lastInteraction = Date.now();
    this.elapsed = 0;
    this.inactivity = 0;
    this.delta = 16;

    this.tick();
  }

  tick() {
    const currentTime = Date.now();
    this.delta = currentTime - this.current;
    this.current = currentTime;
    this.elapsed = this.current - this.start;
    this.inactivity = this.current - this.lastInteraction;

    console.log(this.inactivity);

    this.trigger('tick');

    window.requestAnimationFrame(() => {
        this.tick();
    });
  }
}
