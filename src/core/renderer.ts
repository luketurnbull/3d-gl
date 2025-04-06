// src/core/renderer.ts

import { Shader } from "./shader";
import { Mesh } from "./mesh";

export class Renderer {
  public canvas: HTMLCanvasElement;
  public gl: WebGL2RenderingContext;
  private shader: Shader;

  constructor(canvasId: string) {
    this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    const gl = this.canvas.getContext("webgl2");

    if (!gl) {
      alert("Your browser does not support WebGL");
      throw new Error("Browser doesn't support WebGL");
    }

    this.gl = gl;

    this.shader = new Shader(this.gl);
    this.init();
  }

  private init() {
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.clearColor(0.0, 0.0, 0.0, 1.0); // Clear to black
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  public render(mesh: Mesh) {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.shader.use();
    mesh.draw(this.gl, this.shader);
  }
}
