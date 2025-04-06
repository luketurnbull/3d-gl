// src/core/shader.ts

export class Shader {
  private gl: WebGLRenderingContext;
  private program: WebGLProgram;

  constructor(gl: WebGLRenderingContext) {
    this.gl = gl;
    this.program = this.createProgram();
  }

  private createShader(type: number, source: string): WebGLShader {
    const shader = this.gl.createShader(type);

    if (!shader) {
      throw new Error("Shader was no created");
    }

    this.gl.shaderSource(shader, source);
    this.gl.compileShader(shader);

    // Check for compilation errors
    if (this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
      return shader;
    } else {
      console.error(
        "Shader compilation error:",
        this.gl.getShaderInfoLog(shader)
      );
      this.gl.deleteShader(shader);
      throw new Error("Shader compilation failed");
    }
  }

  private createProgram(): WebGLProgram {
    const vertexShaderSource = `
           attribute vec2 coordinates;
           void main(void) {
               gl_Position = vec4(coordinates, 0.0, 1.0);
           }
       `;
    const fragmentShaderSource = `
           void main(void) {
               gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0); // Red color
           }
       `;

    const vertexShader = this.createShader(
      this.gl.VERTEX_SHADER,
      vertexShaderSource
    );
    const fragmentShader = this.createShader(
      this.gl.FRAGMENT_SHADER,
      fragmentShaderSource
    );

    const program = this.gl.createProgram();
    this.gl.attachShader(program, vertexShader);
    this.gl.attachShader(program, fragmentShader);
    this.gl.linkProgram(program);

    return program;
  }

  public use() {
    this.gl.useProgram(this.program);
  }

  public getAttribLocation(name: string): number {
    return this.gl.getAttribLocation(this.program, name);
  }

  public getUniformLocation(name: string): WebGLUniformLocation | null {
    return this.gl.getUniformLocation(this.program, name);
  }
}
