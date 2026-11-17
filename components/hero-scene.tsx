"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Mesh } from "three";
function Shape() {
  const ref = useRef<Mesh>(null);
  useFrame(({ clock, pointer }) => {
    if (ref.current) {
      ref.current.rotation.x = clock.elapsedTime * 0.13 + pointer.y * 0.2;
      ref.current.rotation.y = clock.elapsedTime * 0.2 + pointer.x * 0.2;
    }
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1, 0.28, 80, 12]} />
      <meshStandardMaterial color="#d6ff3f" metalness={0.7} roughness={0.22} />
    </mesh>
  );
}
export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.4]}
      camera={{ position: [0, 0, 4.5] }}
      gl={{ alpha: true, antialias: false }}
      aria-hidden="true"
    >
      <ambientLight intensity={2} />
      <directionalLight position={[3, 4, 5]} intensity={4} />
      <Shape />
    </Canvas>
  );
}
