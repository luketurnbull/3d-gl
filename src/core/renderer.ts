// src/core/renderer.ts

import { Shader } from "./shader";
import { Mesh } from "./mesh";
import { Color } from "./color";

type RendererOptions = {
  backgroundColor: Color;
};

export class Renderer {
  public canvas: HTMLCanvasElement;
  public gl: WebGL2RenderingContext;
  private shader: Shader;
  private backgroundColor: Color;
  private meshes: Mesh[] = [];

  constructor(canvas: HTMLCanvasElement, options?: RendererOptions) {
    this.canvas = canvas;
    const gl = this.canvas.getContext("webgl2");

    if (!gl) {
      alert("Your browser does not support WebGL");
      throw new Error("Browser doesn't support WebGL");
    }

    this.gl = gl;

    if (options?.backgroundColor) {
      this.backgroundColor = options.backgroundColor;
    } else {
      this.backgroundColor = new Color(1, 1, 1, 0);
    }

    this.shader = new Shader(this.gl);
    this.init();
  }

  private init() {
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.clearColor(
      this.backgroundColor.r,
      this.backgroundColor.g,
      this.backgroundColor.b,
      this.backgroundColor.a
    );
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
  }

  public addMesh(mesh: Mesh) {
    this.meshes.push(mesh);
  }

  public render() {
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.shader.use();

    this.meshes.forEach((mesh: Mesh) => {
      mesh.draw(this.gl, this.shader);
    });
  }
}
