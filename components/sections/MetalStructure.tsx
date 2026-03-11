'use client'

import { Canvas } from "@react-three/fiber"
import { OrbitControls, Environment } from "@react-three/drei"

export default function MetalStructure() {
  return (
    <section className="h-[600px] bg-gray-100">
      <Canvas
        camera={{ position: [3, 3, 5], fov: 50 }}
      >
        {/* Lumières */}
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />

        {/* Objet 3D */}
        <mesh rotation={[0.4, 0.4, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial
            color="#2563eb"
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>

        {/* Contrôles utilisateur */}
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.5} />

        {/* HDRI local */}
        <Environment
          files="/hdr/potsdamer_platz_1k.hdr"
          background
        />
      </Canvas>
    </section>
  )
}