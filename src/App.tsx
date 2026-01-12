import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import Scene from "./Scene";

export default function App() {
  return (
    <div style={{ width: "100vw", height: "100vh", background: "#07070a" }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 1, 3.2], fov: 42 }}
        gl={{ antialias: true }}
      >
        <color attach="background" args={["#07070a"]} />
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
