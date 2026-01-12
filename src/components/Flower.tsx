import { useFrame } from '@react-three/fiber';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

interface FlowerProps {
  presetIndex: number;
  isTransitioning: boolean;
  onTransitionStart: () => void;
  onAdvancePreset: () => void;
  onTransitionEnd: () => void;
}

const petalCount = 8;

const presets = [
  {
    name: 'A',
    petalColors: ['#ff8fab', '#ffb3c6', '#ff9ebb', '#ffc6d9', '#ff99ac', '#ffb3c1', '#ff8fab', '#ffb3c6'],
    centerColor: '#ffd166',
    radius: 1.2,
    tilt: 0.25,
  },
  {
    name: 'B',
    petalColors: ['#7bdff2', '#b2f7ef', '#7bdff2', '#eff7f6', '#b2f7ef', '#7bdff2', '#b2f7ef', '#7bdff2'],
    centerColor: '#f2b5d4',
    radius: 1,
    tilt: -0.2,
  },
  {
    name: 'C',
    petalColors: ['#cdb4db', '#ffc8dd', '#ffafcc', '#bde0fe', '#a2d2ff', '#ffc8dd', '#cdb4db', '#ffafcc'],
    centerColor: '#fef9ef',
    radius: 1.35,
    tilt: 0.15,
  },
];

const petalGeometry = new THREE.PlaneGeometry(0.7, 1.6, 8, 8);

function Flower({
  presetIndex,
  isTransitioning,
  onTransitionStart,
  onAdvancePreset,
  onTransitionEnd,
}: FlowerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const scaleRef = useRef(1);
  const [phase, setPhase] = useState<'idle' | 'vanish' | 'form'>('idle');
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const advancedRef = useRef(false);

  const preset = presets[presetIndex % presets.length];

  const petals = useMemo(() => {
    return Array.from({ length: petalCount }, (_, index) => {
      const angle = (index / petalCount) * Math.PI * 2;
      return {
        index,
        angle,
        position: new THREE.Vector3(
          Math.cos(angle) * preset.radius,
          Math.sin(angle) * preset.radius,
          0
        ),
      };
    });
  }, [preset.radius]);

  useEffect(() => {
    if (hoveredIndex !== null) {
      document.body.style.cursor = 'pointer';
      return;
    }

    document.body.style.cursor = 'default';
  }, [hoveredIndex]);

  useEffect(() => {
    return () => {
      document.body.style.cursor = 'default';
    };
  }, []);

  useFrame((_, delta) => {
    if (!groupRef.current) {
      return;
    }

    if (phase === 'idle') {
      return;
    }

    const target = phase === 'vanish' ? 0 : 1;
    scaleRef.current = THREE.MathUtils.damp(scaleRef.current, target, 6, delta);
    groupRef.current.scale.setScalar(scaleRef.current);

    if (phase === 'vanish' && scaleRef.current < 0.08 && !advancedRef.current) {
      advancedRef.current = true;
      onAdvancePreset();
      setPhase('form');
    }

    if (phase === 'form' && scaleRef.current > 0.98) {
      scaleRef.current = 1;
      groupRef.current.scale.setScalar(1);
      setPhase('idle');
      onTransitionEnd();
    }
  });

  const handlePetalClick = () => {
    if (isTransitioning || phase !== 'idle') {
      return;
    }

    advancedRef.current = false;
    onTransitionStart();
    setPhase('vanish');
  };

  return (
    <group ref={groupRef} rotation={[0, 0, 0]}>
      {petals.map(({ index, angle, position }) => {
        const baseColor = new THREE.Color(preset.petalColors[index % preset.petalColors.length]);
        const highlighted = hoveredIndex === index;
        const petalColor = highlighted ? baseColor.clone().lerp(new THREE.Color('#ffffff'), 0.35) : baseColor;

        return (
          <mesh
            key={index}
            geometry={petalGeometry}
            position={position}
            rotation={[preset.tilt, 0, angle]}
            onPointerOver={(event) => {
              event.stopPropagation();
              setHoveredIndex(index);
            }}
            onPointerOut={(event) => {
              event.stopPropagation();
              setHoveredIndex((current) => (current === index ? null : current));
            }}
            onClick={(event) => {
              event.stopPropagation();
              handlePetalClick();
            }}
          >
            <meshStandardMaterial
              color={petalColor}
              roughness={0.4}
              metalness={0.1}
              emissive={highlighted ? new THREE.Color('#ffffff') : new THREE.Color('#000000')}
              emissiveIntensity={highlighted ? 0.35 : 0}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
      <mesh>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial color={preset.centerColor} roughness={0.3} metalness={0.2} />
      </mesh>
    </group>
  );
}

export default Flower;
