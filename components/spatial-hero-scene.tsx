"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";

type SceneProps = { progress: MutableRefObject<number> };

function Instrument({ progress }: SceneProps) {
  const assembly = useRef<THREE.Group>(null);
  const layerRefs = useRef<Array<THREE.Group | null>>([]);
  const shapes = useMemo(() => {
    const d = new THREE.Shape();
    d.moveTo(-1.55, -1.55); d.lineTo(-1.55, 1.55); d.lineTo(-0.55, 1.55);
    d.bezierCurveTo(1.05, 1.55, 1.15, -1.55, -0.55, -1.55); d.closePath();
    const dHole = new THREE.Path();
    dHole.moveTo(-0.72, -0.82); dHole.lineTo(-0.72, 0.82); dHole.lineTo(-0.42, 0.82);
    dHole.bezierCurveTo(0.38, 0.82, 0.42, -0.82, -0.42, -0.82); dHole.closePath();
    d.holes.push(dHole);
    const q = new THREE.Shape(); q.absarc(0, 0, 1.5, 0, Math.PI * 2, false);
    const qHole = new THREE.Path(); qHole.absarc(0, 0, 0.76, 0, Math.PI * 2, true); q.holes.push(qHole);
    return { d, q };
  }, []);
  const materials = useMemo(() => ({
    ink: new THREE.MeshStandardMaterial({ color: "#202426", roughness: 0.42, metalness: 0.5 }),
    paper: new THREE.MeshStandardMaterial({ color: "#eee9dc", roughness: 0.76, metalness: 0.02 }),
    blue: new THREE.MeshStandardMaterial({ color: "#9bdcf8", roughness: 0.28, metalness: 0.18 }),
  }), []);

  useFrame((state, delta) => {
    const p = progress.current;
    if (assembly.current) {
      assembly.current.rotation.y = THREE.MathUtils.damp(assembly.current.rotation.y, -0.26 + p * 0.52, 4, delta);
      assembly.current.rotation.x = THREE.MathUtils.damp(assembly.current.rotation.x, 0.09 - p * 0.16, 4, delta);
      assembly.current.position.x = THREE.MathUtils.damp(assembly.current.position.x, p > 0.6 ? -1.25 : 0.5, 3, delta);
    }
    layerRefs.current.forEach((layer, index) => {
      if (!layer) return;
      const spread = (index - 1) * p;
      layer.position.z = THREE.MathUtils.damp(layer.position.z, spread * 0.9, 4, delta);
      layer.position.y = THREE.MathUtils.damp(layer.position.y, Math.abs(spread) * -0.08, 4, delta);
    });
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, -0.18 + p * 0.32, 3, delta);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <group ref={assembly} position={[0.5, 0, 0]} scale={0.82}>
      {[materials.paper, materials.blue, materials.ink].map((material, index) => (
        <group key={index} ref={(node) => { layerRefs.current[index] = node; }} position={[0, 0, (index - 1) * 0.18]}>
          <mesh position={[-1.35, 0, 0]} material={material}><extrudeGeometry args={[shapes.d, { depth: 0.14, bevelEnabled: true, bevelSize: 0.035, bevelThickness: 0.035, bevelSegments: 3 }]} /></mesh>
          <mesh position={[1.35, 0, 0]} material={material}><extrudeGeometry args={[shapes.q, { depth: 0.14, bevelEnabled: true, bevelSize: 0.035, bevelThickness: 0.035, bevelSegments: 3 }]} /></mesh>
          <mesh position={[2.28, -1.03, 0.12]} rotation={[0, 0, -0.68]} material={material}><boxGeometry args={[0.28, 1.48, 0.18]} /></mesh>
        </group>
      ))}
    </group>
  );
}

export default function DeeQScene({ progress }: SceneProps) {
  return (
    <div className="spatialCanvas" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 7.4], fov: 34 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={0.82} />
        <spotLight position={[3, 5, 6]} intensity={58} angle={0.46} penumbra={0.9} color="#fff8e8" />
        <pointLight position={[-4, -2, 4]} intensity={15} color="#9bdcf8" />
        <Instrument progress={progress} />
      </Canvas>
    </div>
  );
}
