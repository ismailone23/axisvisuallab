"use client";

import { useEffect, useRef } from "react";

const vertexShader = `attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

// Adapted from the Stitch "Shader" screen (ANIMATION_19).
const fragmentShader = `precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,
                        0.366025403784439,
                       -0.577350269189626,
                        0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
        + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 mouse = u_mouse / u_resolution.xy;

    float t = u_time * 0.4;
    vec2 p = uv * 3.0;

    float mDist = distance(uv, mouse);
    p += (uv - mouse) * 0.15 * smoothstep(0.5, 0.0, mDist);

    float wave1 = sin(p.x * 2.5 + t + snoise(p * 0.8)) * 0.5 + 0.5;
    float wave2 = sin(p.y * 3.2 - t * 0.7 + wave1 * 2.0) * 0.5 + 0.5;
    float wave3 = cos((p.x + p.y) * 2.0 + t * 0.5) * 0.5 + 0.5;

    float waveBand = smoothstep(0.02, 0.45, abs(sin(uv.y * 8.0 + wave1 * 1.5 - t * 0.6)));
    float waveHighlight = pow(1.0 - abs(sin(uv.y * 6.0 + wave2 * 2.0 + t * 0.3)), 8.0);

    vec3 bgObsidian = vec3(0.055, 0.055, 0.065);
    vec3 darkGraphite = vec3(0.09, 0.09, 0.11);
    vec3 coralColor = vec3(1.0, 0.282, 0.125);
    vec3 deepCyan = vec3(0.04, 0.16, 0.22);

    vec3 col = mix(bgObsidian, darkGraphite, wave1 * 0.5 + wave3 * 0.3);
    col += deepCyan * (1.0 - waveBand) * 0.35;
    col += coralColor * waveHighlight * 0.25;

    float grain = fract(sin(dot(gl_FragCoord.xy + u_time * 10.0, vec2(12.9898, 78.233))) * 43758.5453) * 0.018;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
}`;

export default function ShaderBackground({
  className,
}: {
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", { alpha: false });
    if (!gl) return;
    const element = canvas;
    const context = gl;

    function compile(type: number, source: string) {
      const shader = context.createShader(type);
      if (!shader) return null;
      context.shaderSource(shader, source);
      context.compileShader(shader);
      if (context.getShaderParameter(shader, context.COMPILE_STATUS))
        return shader;
      context.deleteShader(shader);
      return null;
    }

    const vertex = compile(gl.VERTEX_SHADER, vertexShader);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) {
      if (vertex) gl.deleteShader(vertex);
      if (fragment) gl.deleteShader(fragment);
      return;
    }

    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      return;
    }
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    const buffer = gl.createBuffer();
    if (!buffer) {
      gl.deleteProgram(program);
      return;
    }
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const time = gl.getUniformLocation(program, "u_time");
    const resolution = gl.getUniformLocation(program, "u_resolution");
    const mouseUniform = gl.getUniformLocation(program, "u_mouse");
    const mouse = { x: 0, y: 0 };
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let visible = true;

    function resize() {
      const { width, height } = element.getBoundingClientRect();
      const scale = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.round(width * scale));
      const h = Math.max(1, Math.round(height * scale));
      if (element.width !== w || element.height !== h) {
        element.width = w;
        element.height = h;
        mouse.x = w / 2;
        mouse.y = h / 2;
      }
      draw(performance.now());
    }

    function draw(timestamp: number) {
      if (context.isContextLost()) return;
      context.viewport(0, 0, element.width, element.height);
      context.uniform1f(time, motion.matches ? 0 : timestamp * 0.001);
      context.uniform2f(resolution, element.width, element.height);
      context.uniform2f(mouseUniform, mouse.x, mouse.y);
      context.drawArrays(context.TRIANGLE_STRIP, 0, 4);
    }

    function animate(timestamp: number) {
      draw(timestamp);
      frame = requestAnimationFrame(animate);
    }

    function updateAnimation() {
      cancelAnimationFrame(frame);
      frame = 0;
      if (document.hidden || !visible || motion.matches) {
        if (!document.hidden && visible) draw(0);
      } else {
        frame = requestAnimationFrame(animate);
      }
    }

    function handlePointerMove(event: PointerEvent) {
      const rect = element.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      mouse.x = ((event.clientX - rect.left) / rect.width) * element.width;
      mouse.y = (1 - (event.clientY - rect.top) / rect.height) * element.height;
    }

    const observer = new ResizeObserver(resize);
    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? false;
      updateAnimation();
    });
    observer.observe(canvas);
    intersection.observe(canvas);
    resize();
    updateAnimation();
    window.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("visibilitychange", updateAnimation);
    motion.addEventListener("change", updateAnimation);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", updateAnimation);
      motion.removeEventListener("change", updateAnimation);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
