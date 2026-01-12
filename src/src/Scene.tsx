import {
  Environment,
  OrbitControls,
  AccumulativeShadows,
  RandomizedLight,
  Float,
} from "@react-three/drei";

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

      {/* Key Light (sem castShadow -> evita sombra dupla) */}
      <directionalLight
        position={[4, 6, 2]}
        intensity={2.2}
      />

      {/* Fill Light */}
      <directionalLight position={[-3, 2, 3]} intensity={0.6} />

      {/* Rim Light */}
      <directionalLight position={[0, 6, -4]} intensity={0.9} />

      {/* Ambiente */}
      <Environment preset="city" />

      {/* Sombras suaves (premium) */}
      <AccumulativeShadows
        temporal
        frames={60}
        alphaTest={0.9}
        scale={12}
        position={[0, -1.45, 0]}
      >
        <RandomizedLight
          amount={8}
          radius={6}
          ambient={0.5}
          intensity={1.2}
          position={[5, 8, 2]}
        />
      </AccumulativeShadows>

      {/* Flor */}
      <Float
        speed={1.1}
        rotationIntensity={0.25}
        floatIntensity={0.35}
      >
        <Flower />
      </Float>
    </>
  );
}
