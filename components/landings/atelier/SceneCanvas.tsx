"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type ExplodedPart = THREE.Object3D & {
  userData: {
    home?: THREE.Vector3;
    explode?: THREE.Vector3;
  };
};

const PAPER = new THREE.Color(0xeee4cf);
const NIGHT = new THREE.Color(0x111922);
const INK = new THREE.Color(0x23364a);
const BRASS = new THREE.Color(0xa87842);
const WARM = new THREE.Color(0xffc36c);
const BULB_OFF = new THREE.Color(0x888477);
const BULB_ON = new THREE.Color(0xffd27a);

function smoothstep(edge0: number, edge1: number, value: number) {
  const x = THREE.MathUtils.clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return x * x * (3 - 2 * x);
}

function pulse(start: number, peak: number, end: number, value: number) {
  if (value <= peak) return smoothstep(start, peak, value);
  return 1 - smoothstep(peak, end, value);
}

function createTube(points: THREE.Vector3[], radius: number, material: THREE.Material) {
  const curve = new THREE.CatmullRomCurve3(points);
  return new THREE.Mesh(new THREE.TubeGeometry(curve, 64, radius, 12, false), material);
}

function setOpacity(group: THREE.Object3D, opacity: number) {
  group.traverse((object) => {
    if (!(object instanceof THREE.Mesh || object instanceof THREE.LineSegments)) return;
    const materials = Array.isArray(object.material) ? object.material : [object.material];
    materials.forEach((material) => {
      material.transparent = true;
      material.opacity = opacity;
      material.depthWrite = opacity > 0.85;
    });
  });
}

function rememberExplosion(part: ExplodedPart, explode: THREE.Vector3) {
  part.userData.home = part.position.clone();
  part.userData.explode = explode;
}

function createGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (!context) return null;

  const glow = context.createRadialGradient(64, 64, 0, 64, 64, 64);
  glow.addColorStop(0, "rgba(255, 246, 215, 1)");
  glow.addColorStop(0.18, "rgba(255, 203, 117, 0.86)");
  glow.addColorStop(0.52, "rgba(231, 157, 73, 0.26)");
  glow.addColorStop(1, "rgba(231, 157, 73, 0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function SceneCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let renderer: THREE.WebGLRenderer;

    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
    } catch {
      canvas.hidden = true;
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.65));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.setClearColor(PAPER, 0);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(0xeee4cf, 8, 24);

    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 60);
    camera.position.set(4.7, 2.5, 8.4);

    scene.add(new THREE.HemisphereLight(0xfff5df, 0x24384b, 2.5));
    const keyLight = new THREE.DirectionalLight(0xffead0, 3.2);
    keyLight.position.set(5, 7, 6);
    scene.add(keyLight);

    const drafting = new THREE.Group();
    drafting.rotation.x = -Math.PI / 2;
    drafting.position.y = -2.2;
    scene.add(drafting);

    const grid = new THREE.GridHelper(18, 36, 0x8da0b4, 0xb6a98e);
    const gridMaterials = Array.isArray(grid.material) ? grid.material : [grid.material];
    gridMaterials.forEach((material) => {
      material.transparent = true;
      material.opacity = 0.22;
    });
    drafting.add(grid);

    const axisMaterial = new THREE.LineBasicMaterial({
      color: INK,
      transparent: true,
      opacity: 0.42,
    });
    const axisGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-4.5, 0.02, 0),
      new THREE.Vector3(4.5, 0.02, 0),
      new THREE.Vector3(0, 0.02, 0),
      new THREE.Vector3(0, 0.02, -7),
    ]);
    drafting.add(new THREE.LineSegments(axisGeometry, axisMaterial));

    const brassMaterial = new THREE.MeshStandardMaterial({
      color: BRASS,
      metalness: 0.82,
      roughness: 0.31,
    });
    const darkMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x25313b,
      metalness: 0.7,
      roughness: 0.42,
    });
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xfff3d7,
      roughness: 0.25,
      metalness: 0,
      transmission: 0.38,
      thickness: 0.4,
      transparent: true,
      opacity: 0.82,
    });
    const bulbMaterial = new THREE.MeshBasicMaterial({
      color: BULB_OFF,
      toneMapped: false,
      transparent: true,
      opacity: 0,
      depthWrite: false,
    });
    const sketchMaterial = new THREE.LineBasicMaterial({
      color: INK,
      transparent: true,
      opacity: 0.85,
    });

    const fixture = new THREE.Group();
    fixture.position.set(0.7, 0.2, 0);
    fixture.rotation.set(-0.08, -0.24, -0.04);
    scene.add(fixture);

    const solidGroup = new THREE.Group();
    const sketchGroup = new THREE.Group();
    fixture.add(solidGroup, sketchGroup);

    const explodedParts: ExplodedPart[] = [];
    const lights: THREE.PointLight[] = [];
    const glowSprites: THREE.Sprite[] = [];
    const glowShells: THREE.Mesh[] = [];
    const glowTexture = createGlowTexture();

    const spinePoints = [
      new THREE.Vector3(-2.5, 0.45, 0),
      new THREE.Vector3(-1.35, 0.68, 0.12),
      new THREE.Vector3(-0.1, 0.38, -0.08),
      new THREE.Vector3(1.25, 0.64, 0.1),
      new THREE.Vector3(2.55, 0.42, 0),
    ];
    const spine = createTube(spinePoints, 0.075, brassMaterial);
    rememberExplosion(spine, new THREE.Vector3(0, 0.7, 0));
    solidGroup.add(spine);
    explodedParts.push(spine);

    const spineEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(spine.geometry, 24),
      sketchMaterial,
    );
    sketchGroup.add(spineEdges);

    const anchors = [
      { x: -2.05, cable: 1.05, z: 0.02, size: 0.34 },
      { x: -0.72, cable: 1.48, z: -0.02, size: 0.45 },
      { x: 0.72, cable: 0.92, z: 0.04, size: 0.3 },
      { x: 2.02, cable: 1.34, z: 0, size: 0.4 },
    ];

    anchors.forEach((anchor, index) => {
      const lightModule = new THREE.Group() as ExplodedPart;
      lightModule.position.set(anchor.x, 0.5, anchor.z);
      rememberExplosion(
        lightModule,
        new THREE.Vector3((index - 1.5) * 0.72, (index % 2 ? -1 : 1) * 0.75, index * 0.1),
      );

      const cable = new THREE.Mesh(
        new THREE.CylinderGeometry(0.018, 0.018, anchor.cable, 8),
        darkMetalMaterial,
      );
      cable.position.y = -anchor.cable / 2;

      const collar = new THREE.Mesh(
        new THREE.CylinderGeometry(0.11, 0.13, 0.16, 18),
        brassMaterial,
      );
      collar.position.y = -anchor.cable;

      const globe = new THREE.Mesh(
        new THREE.SphereGeometry(anchor.size, 28, 20),
        glassMaterial,
      );
      globe.position.y = -anchor.cable - anchor.size * 0.78;

      const bulb = new THREE.Mesh(
        new THREE.CapsuleGeometry(anchor.size * 0.12, anchor.size * 0.24, 6, 16),
        bulbMaterial,
      );
      bulb.position.copy(globe.position);
      bulb.position.y += anchor.size * 0.02;

      const light = new THREE.PointLight(WARM, 0, 5.5, 1.8);
      light.position.copy(globe.position);
      lights.push(light);

      const glowMaterial = new THREE.SpriteMaterial({
        map: glowTexture,
        color: WARM,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
      });
      const glow = new THREE.Sprite(glowMaterial);
      glow.position.copy(globe.position);
      glow.scale.setScalar(anchor.size * 5.4);
      glow.renderOrder = 10;
      glowSprites.push(glow);

      const shellMaterial = new THREE.MeshBasicMaterial({
        color: WARM,
        transparent: true,
        opacity: 0,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
        toneMapped: false,
      });
      const glowShell = new THREE.Mesh(
        new THREE.SphereGeometry(anchor.size * 1.65, 24, 18),
        shellMaterial,
      );
      glowShell.position.copy(globe.position);
      glowShell.renderOrder = 9;
      glowShells.push(glowShell);

      lightModule.add(cable, collar, globe, bulb, light, glowShell, glow);
      solidGroup.add(lightModule);
      explodedParts.push(lightModule);

      const moduleSketch = new THREE.Group();
      moduleSketch.position.copy(lightModule.position);
      [cable, collar, globe].forEach((mesh) => {
        moduleSketch.add(
          new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry, 22), sketchMaterial),
        );
      });
      moduleSketch.children[0].position.copy(cable.position);
      moduleSketch.children[1].position.copy(collar.position);
      moduleSketch.children[2].position.copy(globe.position);
      sketchGroup.add(moduleSketch);
    });

    const dimensionMaterial = new THREE.LineDashedMaterial({
      color: INK,
      transparent: true,
      opacity: 0.5,
      dashSize: 0.12,
      gapSize: 0.08,
    });
    const dimensionGeometry = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-2.6, -1.45, 0),
      new THREE.Vector3(2.6, -1.45, 0),
      new THREE.Vector3(-2.6, -1.32, 0),
      new THREE.Vector3(-2.6, -1.58, 0),
      new THREE.Vector3(2.6, -1.32, 0),
      new THREE.Vector3(2.6, -1.58, 0),
    ]);
    const dimensions = new THREE.LineSegments(dimensionGeometry, dimensionMaterial);
    dimensions.computeLineDistances();
    sketchGroup.add(dimensions);

    setOpacity(solidGroup, 0.08);

    let targetProgress = 0;
    let currentProgress = 0;
    let isMobile = false;
    let raf = 0;
    let visible = !document.hidden;
    const lookAt = new THREE.Vector3();
    const cameraTarget = new THREE.Vector3();
    const background = PAPER.clone();

    const onProgress = (event: Event) => {
      const detail = (event as CustomEvent<{ progress: number }>).detail;
      targetProgress = THREE.MathUtils.clamp(detail?.progress ?? 0, 0, 1);
    };
    const onVisibility = () => {
      visible = !document.hidden;
      if (visible && !reduceMotion) raf = requestAnimationFrame(render);
    };
    const onContextLost = (event: Event) => {
      event.preventDefault();
      canvas.hidden = true;
    };
    const resize = () => {
      const width = canvas.clientWidth || window.innerWidth;
      const height = canvas.clientHeight || window.innerHeight;
      isMobile = width < 700;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.fov = isMobile ? 48 : 36;
      camera.updateProjectionMatrix();
      fixture.scale.setScalar(isMobile ? 1.02 : 1);
      fixture.position.set(isMobile ? 0 : 0.7, isMobile ? 0.35 : 0.2, 0);
    };

    const render = () => {
      if (!visible) return;

      currentProgress += (targetProgress - currentProgress) * (reduceMotion ? 1 : 0.055);
      const p = currentProgress;
      const night = smoothstep(0.63, 0.82, p);
      const sketch = 1 - smoothstep(0.24, 0.43, p);
      const materialReveal = smoothstep(0.18, 0.4, p);
      const explosion = pulse(0.43, 0.58, 0.72, p);
      const extinguish = 1 - smoothstep(0.91, 0.97, p);
      const ignition = smoothstep(0.72, 0.79, p) * extinguish;

      background.copy(PAPER).lerp(NIGHT, night);
      renderer.setClearColor(background, 0);
      if (scene.fog instanceof THREE.Fog) {
        scene.fog.color.copy(background);
        scene.fog.near = THREE.MathUtils.lerp(8, 10, night);
        scene.fog.far = THREE.MathUtils.lerp(24, 18, night);
      }

      setOpacity(sketchGroup, THREE.MathUtils.lerp(0.9, 0.08, 1 - sketch));
      setOpacity(solidGroup, THREE.MathUtils.lerp(0.08, 1, materialReveal));

      explodedParts.forEach((part) => {
        const home = part.userData.home;
        const offset = part.userData.explode;
        if (!home || !offset) return;
        part.position.set(
          home.x + offset.x * explosion,
          home.y + offset.y * explosion,
          home.z + offset.z * explosion,
        );
      });

      bulbMaterial.color.copy(BULB_OFF).lerp(BULB_ON, ignition);
      bulbMaterial.opacity = ignition;
      glassMaterial.emissive.copy(WARM);
      glassMaterial.emissiveIntensity = ignition * 2.4;
      glassMaterial.opacity = THREE.MathUtils.lerp(0.82, 0.38, ignition);
      glassMaterial.transmission = THREE.MathUtils.lerp(0.38, 0.94, ignition);
      glassMaterial.roughness = THREE.MathUtils.lerp(0.25, 0.08, ignition);
      glassMaterial.depthWrite = false;
      lights.forEach((light, index) => {
        light.intensity = ignition * (9.5 + index * 0.45);
      });
      glowSprites.forEach((glow, index) => {
        const material = glow.material as THREE.SpriteMaterial;
        material.opacity = ignition * (0.92 + index * 0.02);
      });
      glowShells.forEach((shell, index) => {
        const material = shell.material as THREE.MeshBasicMaterial;
        material.opacity = ignition * (0.18 + index * 0.012);
      });

      const orbit = smoothstep(0.08, 0.72, p);
      cameraTarget.set(
        THREE.MathUtils.lerp(isMobile ? 1.55 : 4.7, isMobile ? -1.3 : -3.8, orbit),
        THREE.MathUtils.lerp(isMobile ? 2.2 : 2.5, isMobile ? 1.45 : 1.2, orbit),
        THREE.MathUtils.lerp(isMobile ? 8.8 : 8.4, isMobile ? 7.8 : 7.1, orbit),
      );
      if (p > 0.72) {
        cameraTarget.lerp(
          new THREE.Vector3(isMobile ? 0 : 0.6, isMobile ? 0.8 : 0.6, isMobile ? 7.4 : 6.2),
          smoothstep(0.72, 0.94, p),
        );
      }
      camera.position.lerp(cameraTarget, reduceMotion ? 1 : 0.06);
      lookAt.set(isMobile ? 0 : 0.55, -0.15 + explosion * 0.2, 0);
      camera.lookAt(lookAt);

      fixture.rotation.y = -0.24 + p * 0.48;
      fixture.rotation.z = -0.04 + Math.sin(p * Math.PI * 2) * 0.035;
      sketchGroup.visible = p < 0.56;
      drafting.visible = p < 0.74;

      renderer.render(scene, camera);
      if (!reduceMotion) raf = requestAnimationFrame(render);
    };

    window.addEventListener("atelier:progress", onProgress);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);
    canvas.addEventListener("webglcontextlost", onContextLost);
    resize();

    if (reduceMotion) {
      targetProgress = 0.82;
      render();
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("atelier:progress", onProgress);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.LineSegments) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => material.dispose());
        }
        if (object instanceof THREE.Sprite) {
          object.material.dispose();
        }
      });
      glowTexture?.dispose();
      renderer.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} className="atelier-gl" aria-hidden="true" />;
}
