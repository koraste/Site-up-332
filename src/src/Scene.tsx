import {
  Environment,
  OrbitControls,
  AccumulativeShadows,
  RandomizedLight,
  Float,
} from "@react-three/drei";

// ⚠️ ajuste o import abaixo se sua flor tiver outro nome
import Flower from "./Flower";

export default function Scene() {
  return (
    <>
      {/* Controles suaves, sem zoom (premium) */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.4}
        maxPolarAngle={Math.PI / 2.1}
        minPolarAngle={Math.PI / 3}
      />

      {/* Luz ambiente base */}
      <ambientLight intensity={0.25} />

      {/* Key Light */}
      <directionalLight
        castShadow
        position={[4, 6, 2]}
        intensity={2.2}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Fill Light */}
      <directionalLight position={[-4, 3, -2]} intensity={0.9} />

      {/* Rim Light */}
      <directionalLight position={[0, 3, -4]} intensity={0.8} />

      {/* Iluminação global */}
      <Environment preset="studio" />

      {/* Sombra premium */}
      <AccumulativeShadows
        temporal
        frames={80}
        opacity={0.65}
        scale={10}
        position={[0, -1.1, 0]}
      >
        <RandomizedLight
          amount={8}
          radius={4}
          ambient={0.35}
          intensity={1.2}
          position={[5, 6, 2]}
        />
      </AccumulativeShadows>

      {/* Flor com leve movimento orgânico */}
      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.35}>
        <group position={[0, -0.2, 0]}>
          <Flower />
        </group>
      </Float>
    </>
  );
}
