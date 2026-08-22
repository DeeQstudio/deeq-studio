"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { MutableRefObject } from "react";
import * as THREE from "three";

type SceneProps = { progress: MutableRefObject<number> };

function Instrument({ progress }: SceneProps) {
  const assembly = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const materials = useMemo(() => ({
    glass: new THREE.MeshPhysicalMaterial({ color: "#9adffd", transmission: 0.72, roughness: 0.12, metalness: 0.05, thickness: 1.2, transparent: true, opacity: 0.55 }),
    metal: new THREE.MeshStandardMaterial({ color: "#b8c2c9", roughness: 0.24, metalness: 0.92 }),
    dark: new THREE.MeshStandardMaterial({ color: "#080a0b", roughness: 0.18, metalness: 0.72 }),
    light: new THREE.MeshStandardMaterial({ color: "#a6defa", emissive: "#61c9ff", emissiveIntensity: 2.2, toneMapped: false }),
  }), []);

  useFrame((state, delta) => {
    const p = progress.current;
    if (assembly.current) {
      assembly.current.rotation.y = THREE.MathUtils.damp(assembly.current.rotation.y, -0.48 + p * 1.08, 4, delta);
      assembly.current.rotation.x = THREE.MathUtils.damp(assembly.current.rotation.x, 0.12 - p * 0.28, 4, delta);
      assembly.current.position.z = THREE.MathUtils.damp(assembly.current.position.z, -0.5 + p * 1.05, 4, delta);
      assembly.current.position.x = THREE.MathUtils.damp(assembly.current.position.x, p > 0.58 ? -1.35 : 0.4, 3, delta);
    }
    if (core.current) core.current.rotation.z = p * Math.PI * 0.55;
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, -0.25 + p * 0.5, 3, delta);
    state.camera.lookAt(0, 0, 0);
  });

  const layers = [-0.82, -0.42, 0, 0.42, 0.82];
  return (
    <group ref={assembly} position={[0.4, 0, -0.5]}>
      {layers.map((x, index) => (
        <mesh key={x} position={[x, 0, (index - 2) * 0.16]} rotation={[0, 0, index % 2 ? 0.04 : -0.035]} material={index === 2 ? materials.dark : materials.glass}>
          <boxGeometry args={[0.7, 3.45, index === 2 ? 0.22 : 0.08]} />
        </mesh>
      ))}
      <mesh ref={core} position={[0, 0, 0.55]} material={materials.metal}>
        <torusGeometry args={[1.22, 0.12, 18, 96, Math.PI * 1.72]} />
      </mesh>
      <mesh position={[0.74, -1.15, 0.68]} material={materials.light}>
        <capsuleGeometry args={[0.075, 1.5, 8, 16]} />
      </mesh>
    </group>
  );
}

export default function DeeQScene({ progress }: SceneProps) {
  return (
    <div className="spatialCanvas" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 6.3], fov: 32 }} dpr={[1, 1.6]} gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}>
        <ambientLight intensity={0.32} />
        <spotLight position={[4, 5, 6]} intensity={55} angle={0.32} penumbra={0.9} color="#d9f3ff" />
        <pointLight position={[-4, -1, 3]} intensity={18} color="#2a8fbf" />
        <Instrument progress={progress} />
      </Canvas>
    </div>
  );
}
