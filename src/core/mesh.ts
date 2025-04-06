// src/core/mesh.ts

import { Shader } from "./shader";

export class Mesh {
  private gl: WebGLRenderingContext;
  private vertexBuffer: WebGLBuffer;
  private vertices: Float32Array;

  constructor(gl: WebGLRenderingContext, vertices: Float32Array) {
    this.gl = gl;
    this.vertices = vertices;

    this.vertexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.vertexBuffer);
    this.gl.bufferData(
      this.gl.ARRAY_BUFFER,
      this.vertices,
      this.gl.STATIC_DRAW
    );
  }

  public draw(gl: WebGLRenderingContext, shader: Shader) {
    gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
    const coordinates = shader.getAttribLocation("coordinates");
    gl.vertexAttribPointer(coordinates, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(coordinates);

    gl.drawArrays(gl.TRIANGLES, 0, this.vertices.length / 2); // 2 vertices per point
  }
}
