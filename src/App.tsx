import { useState } from 'react';
import Scene from './components/Scene';
import OverlayUI from './components/OverlayUI';

const presets = ['A', 'B', 'C'] as const;

function App() {
  const [presetIndex, setPresetIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleAdvance = () => {
    setPresetIndex((prev) => (prev + 1) % presets.length);
  };

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <Scene
        presetIndex={presetIndex}
        isTransitioning={isTransitioning}
        onTransitionStart={() => setIsTransitioning(true)}
        onAdvancePreset={handleAdvance}
        onTransitionEnd={() => setIsTransitioning(false)}
      />
      <OverlayUI isTransitioning={isTransitioning} />
    </div>
  );
}

export default App;
