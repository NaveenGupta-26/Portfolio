import * as THREE from "three";
import { useRef, useMemo, useState, useEffect, Component, ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import {
  BallCollider,
  Physics,
  RigidBody,
  CylinderCollider,
  RapierRigidBody,
} from "@react-three/rapier";

// ── WebGL check (Memoized) ──
let _isWebGLAvailable: boolean | null = null;
function isWebGLAvailable(): boolean {
  if (_isWebGLAvailable !== null) return _isWebGLAvailable;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    _isWebGLAvailable = !!gl;
    return _isWebGLAvailable;
  } catch {
    _isWebGLAvailable = false;
    return false;
  }
}

// ── Error Boundary ──
class CanvasErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.warn("TechStack Canvas error:", error.message);
  }
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

const textureLoader = new THREE.TextureLoader();
const imageUrls = [
  "/images/jira.png",
  "/images/notion.png",
  "/images/msoffice.png",
  "/images/chatgpt.png",
  "/images/claude.png",
  "/images/antigravity.png",
  "/images/gemini.png",
  "/images/figma.png",
  "/images/python.png",
  "/images/mysql.webp",
  "/images/slack.png",
  "/images/github.png",
];
const textures = imageUrls.map((url) => textureLoader.load(url));

const sphereGeometry = new THREE.SphereGeometry(1, 16, 16);

const spheres = [...Array(20)].map(() => ({
  scale: [1.8, 2.6, 2.1, 2.4, 2.0][Math.floor(Math.random() * 5)],
}));

type SphereProps = {
  vec?: THREE.Vector3;
  scale: number;
  r?: typeof THREE.MathUtils.randFloatSpread;
  material: THREE.MeshPhysicalMaterial;
  isActive: boolean;
};

function SphereGeo({
  vec = new THREE.Vector3(),
  scale,
  r = THREE.MathUtils.randFloatSpread,
  material,
  isActive,
}: SphereProps) {
  const api = useRef<RapierRigidBody | null>(null);
  const impulseVec = useMemo(() => new THREE.Vector3(), []);

  useFrame((_state, delta) => {
    if (!isActive) return;
    delta = Math.min(0.1, delta);
    const force = -100 * delta * scale;
    const impulse = vec
      .copy(api.current!.translation())
      .normalize()
      .multiply(impulseVec.set(force, force, force));
    api.current?.applyImpulse(impulse, true);
  });

  return (
    <RigidBody
      linearDamping={0.9}
      angularDamping={0.5}
      friction={0.2}
      position={[r(40), r(15), r(10)]}
      ref={api}
      colliders={false}
    >
      <BallCollider args={[scale]} />
      <CylinderCollider
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1.2 * scale]}
        args={[0.15 * scale, 0.275 * scale]}
      />
      <mesh
        castShadow
        receiveShadow
        scale={scale}
        geometry={sphereGeometry}
        material={material}
        rotation={[0.3, 1, 1]}
      />
    </RigidBody>
  );
}

type PointerProps = {
  vec?: THREE.Vector3;
  isActive: boolean;
};

function Pointer({ vec = new THREE.Vector3(), isActive }: PointerProps) {
  const ref = useRef<RapierRigidBody>(null);

  useFrame(({ pointer, viewport }) => {
    if (!isActive) return;
    const targetVec = vec.lerp(
      new THREE.Vector3(
        (pointer.x * viewport.width) / 2,
        (pointer.y * viewport.height) / 2,
        0
      ),
      0.2
    );
    ref.current?.setNextKinematicTranslation(targetVec);
  });

  return (
    <RigidBody
      position={[100, 100, 100]}
      type="kinematicPosition"
      colliders={false}
      ref={ref}
    >
      <BallCollider args={[4.5]} />
    </RigidBody>
  );
}

const TechStack = () => {
  const [isActive, setIsActive] = useState(false);
  const [webglOk] = useState(() => isWebGLAvailable());

  useEffect(() => {
    let isActiveLocal = false;
    const handleScroll = () => {
      const workEl = document.getElementById("work");
      if (!workEl) return;
      const threshold = workEl.getBoundingClientRect().top;
      const shouldBeActive = threshold < 0;
      if (shouldBeActive !== isActiveLocal) {
        isActiveLocal = shouldBeActive;
        setIsActive(shouldBeActive);
      }
    };
    document.querySelectorAll(".header a").forEach((elem) => {
      const element = elem as HTMLAnchorElement;
      element.addEventListener("click", () => {
        setTimeout(handleScroll, 500);
        setTimeout(handleScroll, 1000);
      });
    });
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const materials = useMemo(() => {
    return textures.map(
      (texture) =>
        new THREE.MeshPhysicalMaterial({
          map: texture,
          emissive: "#ffffff",
          emissiveMap: texture,
          emissiveIntensity: 1.2,
          metalness: 0.0,
          roughness: 0.1,
          clearcoat: 0.5,
        })
    );
  }, []);

  useEffect(() => {
    return () => {
      materials.forEach((material) => material.dispose());
    };
  }, [materials]);

  return (
    <div className="techstack" id="skills">
      <h2> Capabilities</h2>

      {webglOk && (
        <CanvasErrorBoundary>
          <Canvas
            gl={{ alpha: true, stencil: false, depth: false, antialias: false, powerPreference: "high-performance" }}
            camera={{ position: [0, 0, 25], fov: 50, near: 1, far: 100 }}
            dpr={[1, 1.5]}
            onCreated={(state) => {
              state.gl.toneMappingExposure = 1.5;
            }}
            className="tech-canvas"
          >
            <ambientLight intensity={1} />
            <spotLight
              position={[20, 20, 25]}
              penumbra={1}
              angle={0.2}
              color="white"
            />
            <directionalLight position={[0, 5, -4]} intensity={2} />
            <Physics gravity={[0, 0, 0]}>
              <Pointer isActive={isActive} />
              {spheres.map((props, i) => (
                <SphereGeo
                  key={i}
                  {...props}
                  material={materials[i % materials.length]}
                  isActive={isActive}
                />
              ))}
            </Physics>
            <Environment
              files="/models/char_enviorment.hdr"
              environmentIntensity={0.5}
              environmentRotation={[0, 4, 2]}
            />
          </Canvas>
        </CanvasErrorBoundary>
      )}

      <div className="skill-system-map" style={{
        marginTop: "40px",
        width: "100%",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "20px",
        padding: "0 20px"
      }}>
        <div className="skill-category" style={{ background: "rgba(255,255,255,0.02)", padding: "25px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <h4 style={{ color: "var(--accentColor)", marginBottom: "15px", fontSize: "1.2rem", letterSpacing: "1px" }}>Product</h4>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "0.95rem", opacity: 0.7, lineHeight: "1.8" }}>
            <li>• Discovery & Strategy</li>
            <li>• MVP Development</li>
            <li>• OKR Frameworks</li>
            <li>• Roadmap Planning</li>
          </ul>
        </div>
        <div className="skill-category" style={{ background: "rgba(255,255,255,0.02)", padding: "25px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <h4 style={{ color: "var(--accentColor)", marginBottom: "15px", fontSize: "1.2rem", letterSpacing: "1px" }}>Research</h4>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "0.95rem", opacity: 0.7, lineHeight: "1.8" }}>
            <li>• User Interviews</li>
            <li>• Market Analysis</li>
            <li>• Competitive Intel</li>
            <li>• Insight Synthesis</li>
          </ul>
        </div>
        <div className="skill-category" style={{ background: "rgba(255,255,255,0.02)", padding: "25px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <h4 style={{ color: "var(--accentColor)", marginBottom: "15px", fontSize: "1.2rem", letterSpacing: "1px" }}>AI & Tech</h4>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "0.95rem", opacity: 0.7, lineHeight: "1.8" }}>
            <li>• LLMs & Prompting</li>
            <li>• RAG Architectures</li>
            <li>• Python & SQL</li>
            <li>• API Integrations</li>
          </ul>
        </div>
        <div className="skill-category" style={{ background: "rgba(255,255,255,0.02)", padding: "25px", borderRadius: "16px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <h4 style={{ color: "var(--accentColor)", marginBottom: "15px", fontSize: "1.2rem", letterSpacing: "1px" }}>Tools</h4>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "0.95rem", opacity: 0.7, lineHeight: "1.8" }}>
            <li>• Jira & Notion</li>
            <li>• Figma & Miro</li>
            <li>• Power BI / Tableau</li>
            <li>• Linear</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TechStack;
