"use client";

import { Canvas } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere } from "@react-three/drei";

export default function AuroraBackground() {
  return (
    <div className="absolute inset-0 -z-10 opacity-40">
      <Canvas>
        <ambientLight intensity={0.5} />

        <Sphere args={[2, 64, 64]} scale={4}>
          <MeshDistortMaterial color="#3b82f6" distort={0.6} speed={2} />
        </Sphere>
      </Canvas>
    </div>
  );
}
