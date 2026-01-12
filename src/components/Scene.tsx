import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import Flower from './Flower';
import useVisibilityPause from '../hooks/useVisibilityPause';

interface SceneProps {
  presetIndex: number;
  isTransitioning: boolean;
  onTransitionStart: () => void;
  onAdvancePreset: () => void;
  onTransitionEnd: () => void;
}

function Scene({
  presetIndex,
  isTransitioning,
  onTransitionStart,
  onAdvancePreset,
  onTransitionEnd,
}: SceneProps) {
  const isPaused = useVisibilityPause();

  return (
    <Canvas
      dpr={[1, 2]}
      frameloop={isPaused ? 'never' : 'always'}
      camera={{ position: [0, 0, 6], fov: 45 }}
    >
      <color attach="background" args={['#0b0d14']} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[4, 6, 3]} intensity={1.2} />
      <Environment preset="city" />
      <Flower
        presetIndex={presetIndex}
        isTransitioning={isTransitioning}
        onTransitionStart={onTransitionStart}
        onAdvancePreset={onAdvancePreset}
        onTransitionEnd={onTransitionEnd}
      />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={!isTransitioning} />
    </Canvas>
  );
}

export default Scene;
