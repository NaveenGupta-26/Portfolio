import { useEffect, useRef, useState, Component, ReactNode } from "react";
import * as THREE from "three";
import setCharacter from "./utils/character";
import setLighting from "./utils/lighting";
import { useLoading } from "../../context/LoadingProvider";
import handleResize from "./utils/resizeUtils";
import {
  handleMouseMove,
  handleTouchEnd,
  handleHeadRotation,
  handleTouchMove,
} from "./utils/mouseUtils";
import setAnimations from "./utils/animationUtils";
import { setProgress } from "../Loading";

// ── WebGL availability check (Memoized) ──
let _isWebGLAvailable: boolean | null = null;
function isWebGLAvailable(): boolean {
  if (_isWebGLAvailable !== null) return _isWebGLAvailable;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") || canvas.getContext("webgl");
    _isWebGLAvailable = !!gl;
    // Just discard the reference, don't force lose context unless strictly necessary
    return _isWebGLAvailable;
  } catch {
    _isWebGLAvailable = false;
    return false;
  }
}

// ── Error Boundary ──
class WebGLErrorBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.warn("WebGL Error Boundary caught:", error.message);
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

// ── Scene ──
const SceneInner = () => {
  const canvasDiv = useRef<HTMLDivElement | null>(null);
  const hoverDivRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef(new THREE.Scene());
  const { setLoading } = useLoading();

  const [, setChar] = useState<THREE.Object3D | null>(null);

  useEffect(() => {
    if (!canvasDiv.current) return;

    // Bail out early if WebGL is unavailable
    if (!isWebGLAvailable()) {
      console.warn("WebGL is not available on this device — skipping 3D character.");
      setLoading(100);
      return;
    }

    let renderer: THREE.WebGLRenderer | null = null;
    let animationId = 0;
    let isDisposed = false;

    try {
      const rect = canvasDiv.current.getBoundingClientRect();
      const container = { width: rect.width, height: rect.height };
      const aspect = container.width / container.height;
      const scene = sceneRef.current;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
        stencil: false,
        depth: true,
      });

      renderer.setSize(container.width, container.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1;
      renderer.shadowMap.enabled = false;
      canvasDiv.current.appendChild(renderer.domElement);

      const camera = new THREE.PerspectiveCamera(14.5, aspect, 0.1, 1000);
      camera.position.set(0, 13.1, 24.7);
      camera.zoom = 1.1;
      camera.updateProjectionMatrix();

      let headBone: THREE.Object3D | null = null;
      let screenLight: any | null = null;
      let mixer: THREE.AnimationMixer;

      const clock = new THREE.Clock();

      const light = setLighting(scene);
      const progress = setProgress((value) => setLoading(value));
      const { loadCharacter } = setCharacter(renderer, scene, camera);

      let resizeHandler: (() => void) | null = null;

      loadCharacter()
        .then((gltf) => {
          if (gltf && !isDisposed) {
            const animations = setAnimations(gltf);
            hoverDivRef.current && animations.hover(gltf, hoverDivRef.current);
            mixer = animations.mixer;
            const character = gltf.scene;
            setChar(character);
            scene.add(character);
            headBone = character.getObjectByName("spine006") || null;
            screenLight = character.getObjectByName("screenlight") || null;

            progress.loaded().then(() => {
              if (!isDisposed) {
                setTimeout(() => {
                  if (!isDisposed) {
                    light.turnOnLights();
                    animations.startIntro();
                  }
                }, 2500);
              }
            });

            resizeHandler = () => {
              if (renderer && canvasDiv.current) {
                handleResize(renderer, camera, canvasDiv, character);
              }
            };
            window.addEventListener("resize", resizeHandler);
          }
        })
        .catch((err) => {
          console.error("Failed to load character:", err);
        });

      let mouse = { x: 0, y: 0 };
      let interpolation = { x: 0.1, y: 0.2 };

      const onMouseMove = (event: MouseEvent) => {
        handleMouseMove(event, (x, y) => (mouse = { x, y }));
      };

      let debounce: number | undefined;
      const onTouchStart = (event: TouchEvent) => {
        const element = event.target as HTMLElement;
        debounce = window.setTimeout(() => {
          element?.addEventListener("touchmove", (e: TouchEvent) =>
            handleTouchMove(e, (x, y) => (mouse = { x, y }))
          );
        }, 200);
      };

      const onTouchEnd = () => {
        handleTouchEnd((x, y, interpolationX, interpolationY) => {
          mouse = { x, y };
          interpolation = { x: interpolationX, y: interpolationY };
        });
      };

      document.addEventListener("mousemove", onMouseMove);
      const landingDiv = document.getElementById("landingDiv");
      if (landingDiv) {
        landingDiv.addEventListener("touchstart", onTouchStart);
        landingDiv.addEventListener("touchend", onTouchEnd);
      }

      const animate = () => {
        if (isDisposed) return;
        animationId = requestAnimationFrame(animate);

        if (headBone) {
          handleHeadRotation(
            headBone,
            mouse.x,
            mouse.y,
            interpolation.x,
            interpolation.y,
            THREE.MathUtils.lerp
          );
          light.setPointLight(screenLight);
        }

        const delta = clock.getDelta();
        if (mixer) mixer.update(delta);
        if (renderer) renderer.render(scene, camera);
      };
      animate();

      // ── Cleanup ──
      return () => {
        isDisposed = true;
        cancelAnimationFrame(animationId);
        clearTimeout(debounce);

        if (resizeHandler) window.removeEventListener("resize", resizeHandler);
        document.removeEventListener("mousemove", onMouseMove);
        if (landingDiv) {
          landingDiv.removeEventListener("touchstart", onTouchStart);
          landingDiv.removeEventListener("touchend", onTouchEnd);
        }

        // Dispose Three.js resources
        sceneRef.current.traverse((obj: any) => {
          if (obj.geometry) obj.geometry.dispose();
          if (obj.material) {
            if (Array.isArray(obj.material)) {
              obj.material.forEach((m: any) => m.dispose());
            } else {
              obj.material.dispose();
            }
          }
        });
        sceneRef.current.clear();

        if (renderer) {
          renderer.dispose();
          renderer.forceContextLoss();
          if (
            canvasDiv.current &&
            renderer.domElement.parentElement === canvasDiv.current
          ) {
            canvasDiv.current.removeChild(renderer.domElement);
          }
          renderer = null;
        }
      };
    } catch (e) {
      console.error("WebGL Initialization failed:", e);
      setLoading(100);
    }
  }, []);

  return (
    <>
      <div className="character-container">
        <div className="character-model" ref={canvasDiv}>
          <div className="character-rim"></div>
          <div className="character-hover" ref={hoverDivRef}></div>
        </div>
      </div>
    </>
  );
};

const Scene = () => (
  <WebGLErrorBoundary fallback={<div className="character-container" />}>
    <SceneInner />
  </WebGLErrorBoundary>
);

export default Scene;
