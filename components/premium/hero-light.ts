/** Original BM parametric surfaces. No third-party shaders, textures or libraries. */

const vertex = `
precision highp float;
attribute vec2 aUV;
uniform float uTime, uLayer, uMobile;
varying mediump vec3 vNormal, vPosition;
varying mediump vec2 vUV;
vec3 surface(vec2 uv) {
  float u=uv.x, v=uv.y, t=uTime;
  float phase=u*5.6-t*.32+uLayer*.74;
  {
    float x=.51+.33*sin(phase-.55)+.075*sin(u*10.0+t*.24)+uLayer*.14;
    float y=1.55-u*3.25;
    float z=.23*cos(phase*.91)+.10*sin(u*9.0-t*.25);
    float twist=1.65*sin(phase*1.12+t*.20)+uLayer*.55;
    float w=.19+.085*sin(u*4.8+t*.22+uLayer);
    return vec3(x,y,z)+v*w*vec3(cos(twist),.24*sin(phase),sin(twist))
      +vec3(0.,0.,.17*(1.-v*v)*sin(phase+1.));
  }

}
void main(){
  vec3 p=surface(aUV);
  vec3 du=surface(aUV+vec2(.001,0.))-p;
  vec3 dv=surface(aUV+vec2(0.,.001))-p;
  vNormal=normalize(cross(du,dv));vPosition=p;vUV=aUV;
  p.x=mix(p.x,(p.x-.6)*1.5+.22,uMobile);
  float perspective=1./(1.-p.z*.38);
  gl_Position=vec4(p.x*perspective,p.y*perspective,p.z*.25,1.);
}`;
const fragment = `
precision highp float;
uniform float uLayer;
uniform vec4 uTextRect;
uniform vec2 uBufferSize,uFeather;
varying mediump vec3 vNormal,vPosition;
varying mediump vec2 vUV;
void main(){
  vec3 n=normalize(vNormal);if(!gl_FrontFacing)n=-n;
  vec3 l=normalize(vec3(-.6,.8,1.2));
  float diffuse=.25+.75*abs(dot(n,l));
  float spec=pow(max(0.,abs(dot(reflect(-l,n),vec3(0.,0.,1.)))),24.);
  float fresnel=pow(1.-abs(n.z),2.4);
  vec3 bronze=vec3(.68,.43,.23), champagne=vec3(.98,.84,.60);
  vec3 teal=vec3(.10,.48,.45), blue=vec3(.17,.38,.68);
  float sheen=.5+.5*sin(vUV.x*6.0+n.x*2.3+uLayer*.8);
  vec3 base=mix(bronze,champagne,sheen*.62);
  if(uLayer>.5)base=mix(teal,blue,sheen*.4);
  float softbox=pow(max(0.,1.-abs(n.x*.8+n.z*.4-.35)),6.);
  vec3 color=base*(.40+.60*diffuse)+champagne*(spec*.8+softbox*.28)+mix(teal,blue,sheen)*fresnel*.42;
  color=pow(color,vec3(.80));
  float satin=.985+.015*sin(vUV.y*340.0+vUV.x*90.0);
  float edge=1.-smoothstep(.94,1.,abs(vUV.y));
  float ends=smoothstep(0.,.07,vUV.x)*(1.-smoothstep(.93,1.,vUV.x));
  vec2 screenUV=vec2(gl_FragCoord.x/uBufferSize.x,1.-gl_FragCoord.y/uBufferSize.y);
  vec2 outside=max(max(uTextRect.xy-screenUV,screenUV-uTextRect.zw),vec2(0.));
  float textProtection=smoothstep(0.,1.,length(outside/uFeather));
  gl_FragColor=vec4(color*satin,edge*ends*(uLayer>.5?.54:.78)*textProtection);
}`;

export function mountHeroLight(canvas: HTMLCanvasElement) {
  const motion = matchMedia("(prefers-reduced-motion: reduce)");
  // Do not allocate a GPU context at all for reduced motion or data saving.
  const connection = (
    navigator as Navigator & { connection?: { saveData?: boolean } }
  ).connection;
  if (motion.matches || connection?.saveData) {
    canvas.dataset.motionState = "static";
    return () => {};
  }
  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: true,
    depth: false,
    stencil: false,
    powerPreference: "low-power",
    premultipliedAlpha: false,
  });
  if (!gl) {
    canvas.dataset.motionState = "no-webgl";
    return () => {};
  }
  const compile = (kind: number, source: string) => {
    const shader = gl.createShader(kind);
    if (!shader) throw Error("Hero shader unavailable");
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      throw Error("Hero shader unsupported");
    }
    return shader;
  };
  let vs: WebGLShader, fs: WebGLShader;
  try {
    vs = compile(gl.VERTEX_SHADER, vertex);
    fs = compile(gl.FRAGMENT_SHADER, fragment);
  } catch {
    canvas.dataset.motionState = "shader-unsupported";
    return () => {};
  }
  const program = gl.createProgram();
  if (!program) return () => {};
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    canvas.dataset.motionState = "program-unsupported";
    gl.deleteProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    return () => {};
  }
  const mobile = matchMedia("(max-width:760px)");
  const nx = 128,
    ny = 16,
    vertices = [],
    indices = [];
  for (let x = 0; x <= nx; x++)
    for (let y = 0; y <= ny; y++) vertices.push(x / nx, (y / ny) * 2 - 1);
  for (let x = 0; x < nx; x++)
    for (let y = 0; y < ny; y++) {
      const a = x * (ny + 1) + y,
        b = a + ny + 1;
      indices.push(a, b, a + 1, a + 1, b, b + 1);
    }
  const vb = gl.createBuffer(),
    ib = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vb);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW,
  );
  gl.useProgram(program);
  const position = gl.getAttribLocation(program, "aUV");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const time = gl.getUniformLocation(program, "uTime"),
    layer = gl.getUniformLocation(program, "uLayer"),
    textRect = gl.getUniformLocation(program, "uTextRect"),
    bufferSize = gl.getUniformLocation(program, "uBufferSize"),
    feather = gl.getUniformLocation(program, "uFeather");
  gl.uniform1f(
    gl.getUniformLocation(program, "uMobile"),
    mobile.matches ? 1 : 0,
  );
  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  let raf = 0,
    nextFrame = 0,
    lastDraw = 0,
    elapsed = 0,
    renderedFrames = 0,
    hiddenAt: number | undefined,
    hiddenStartFrames = 0,
    visible = false,
    manualPaused = false,
    disposed = false,
    lost = false;
  const resize = () => {
    const r = canvas.getBoundingClientRect(),
      cap = mobile.matches ? 300000 : 1000000;
    const scale = Math.min(
      mobile.matches ? 1 : 1.25,
      devicePixelRatio || 1,
      Math.sqrt(cap / (r.width * r.height)),
    );
    canvas.width = Math.max(1, Math.round(r.width * scale));
    canvas.height = Math.max(1, Math.round(r.height * scale));
    gl.viewport(0, 0, canvas.width, canvas.height);
    // Protect the actual bilingual text/actions at every animation time.
    const boxes = [
      ...(canvas
        .closest(".bm-hero")
        ?.querySelectorAll("h1,.bm-hero-description,.bm-label,.bm-actions a") ??
        []),
    ]
      .map((element) => {
        if (element.tagName === "A") return element.getBoundingClientRect();
        const range = document.createRange();
        range.selectNodeContents(element);
        return range.getBoundingClientRect();
      })
      .filter((box) => box.width > 0 && box.height > 0);
    if (boxes.length)
      gl.uniform4f(
        textRect,
        (Math.min(...boxes.map((box) => box.left)) - r.left - 18) / r.width,
        (Math.min(...boxes.map((box) => box.top)) - r.top - 18) / r.height,
        (Math.max(...boxes.map((box) => box.right)) - r.left + 18) / r.width,
        (Math.max(...boxes.map((box) => box.bottom)) - r.top + 18) / r.height,
      );
    gl.uniform2f(bufferSize, canvas.width, canvas.height);
    gl.uniform2f(feather, 32 / r.width, 32 / r.height);
    gl.uniform1f(
      gl.getUniformLocation(program, "uMobile"),
      mobile.matches ? 1 : 0,
    );
  };
  const allowed = () =>
    visible &&
    !manualPaused &&
    !document.hidden &&
    !motion.matches &&
    !disposed &&
    !lost;
  const draw = (now: number) => {
    raf = 0;
    if (!allowed()) return;
    const interval = 1000 / (mobile.matches ? 24 : 30);
    if (now >= nextFrame - 0.5) {
      elapsed += Math.min(now - lastDraw, 80) / 1000;
      lastDraw = now;
      nextFrame += interval;
      if (nextFrame < now) nextFrame = now + interval;
      renderedFrames++;
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform1f(time, elapsed);
      for (let i = 2; i >= 0; i--) {
        gl.uniform1f(layer, i);
        gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_SHORT, 0);
      }
      if (canvas.dataset.motionState !== "running") {
        canvas.dataset.motionState = "running";
        canvas.style.opacity = ".82";
      }
    }
    raf = requestAnimationFrame(draw);
  };
  const sync = () => {
    if (raf) cancelAnimationFrame(raf);
    raf = 0;
    lastDraw = nextFrame = performance.now();
    canvas.dataset.motionPauseReason = document.hidden
      ? "hidden"
      : !visible
        ? "offscreen"
        : manualPaused
          ? "manual"
          : motion.matches
            ? "reduced"
            : lost
              ? "context-lost"
              : "none";
    if (allowed()) raf = requestAnimationFrame(draw);
    else canvas.dataset.motionState = "paused";
    if (motion.matches) {
      canvas.style.opacity = "0";
      canvas.dataset.motionState = "static";
    }
  };
  const observer = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting;
      sync();
    },
    { threshold: 0 },
  );
  observer.observe(canvas);
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  const heading = canvas.closest(".bm-hero")?.querySelector("h1");
  if (heading) ro.observe(heading);
  const fontsChanged = () => {
    if (!disposed) resize();
  };
  document.fonts.addEventListener("loadingdone", fontsChanged);
  resize();
  const contextLost = (e: Event) => {
    e.preventDefault();
    lost = true;
    canvas.style.opacity = "0";
    sync();
    canvas.dataset.motionState = "static";
  };
  const manualPause = (event: Event) => {
    manualPaused = (event as CustomEvent<boolean>).detail;
    sync();
  };
  canvas.addEventListener("bm:hero-pause", manualPause);
  canvas.addEventListener("webglcontextlost", contextLost);
  // DOM-only lifecycle evidence: no telemetry, timers or per-frame DOM writes.
  const visibilityChanged = () => {
    if (document.hidden) {
      hiddenAt = performance.now();
      hiddenStartFrames = renderedFrames;
      canvas.dataset.hiddenPauses = String(
        Number(canvas.dataset.hiddenPauses ?? 0) + 1,
      );
    } else if (hiddenAt !== undefined) {
      canvas.dataset.lastHiddenMs = String(
        Math.round(performance.now() - hiddenAt),
      );
      canvas.dataset.hiddenFrames = String(renderedFrames - hiddenStartFrames);
      hiddenAt = undefined;
    }
    sync();
  };
  document.addEventListener("visibilitychange", visibilityChanged);
  motion.addEventListener("change", sync);
  return () => {
    disposed = true;
    if (raf) cancelAnimationFrame(raf);
    observer.disconnect();
    ro.disconnect();
    document.fonts.removeEventListener("loadingdone", fontsChanged);
    document.removeEventListener("visibilitychange", visibilityChanged);
    motion.removeEventListener("change", sync);
    canvas.removeEventListener("webglcontextlost", contextLost);
    canvas.removeEventListener("bm:hero-pause", manualPause);
    gl.deleteBuffer(vb);
    gl.deleteBuffer(ib);
    gl.deleteProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
  };
}
