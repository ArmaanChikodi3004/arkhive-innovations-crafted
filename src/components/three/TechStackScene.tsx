import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Box, Octahedron, Icosahedron, Dodecahedron } from '@react-three/drei';
import * as THREE from 'three';

interface TechIconProps {
  position: [number, number, number];
  color: string;
  shape: 'sphere' | 'box' | 'octahedron' | 'icosahedron' | 'dodecahedron';
  speed?: number;
}

const TechIcon = ({ position, color, shape, speed = 1 }: TechIconProps) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2 * speed;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3 * speed;
    }
  });

  const ShapeComponent = {
    sphere: Sphere,
    box: Box,
    octahedron: Octahedron,
    icosahedron: Icosahedron,
    dodecahedron: Dodecahedron,
  }[shape];

  return (
    <Float speed={2 * speed} rotationIntensity={0.3} floatIntensity={1}>
      <ShapeComponent ref={meshRef} args={[0.4]} position={position}>
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
          wireframe
        />
      </ShapeComponent>
    </Float>
  );
};

const ConnectingLines = () => {
  const linesRef = useRef<THREE.LineSegments>(null);

  const linePositions = useMemo(() => {
    const positions = [];
    const icons = [
      [-2, 1, 0], [2, 1, 0], [0, -1, 1], [-1.5, -0.5, -1], [1.5, 0.5, 0.5],
      [0, 1.5, -0.5], [-0.5, 0, 1.5], [1, -1, -0.5], [-1, 0.5, 0.8]
    ];

    // Create connections between nearby icons
    for (let i = 0; i < icons.length; i++) {
      for (let j = i + 1; j < icons.length; j++) {
        const dist = Math.sqrt(
          Math.pow(icons[i][0] - icons[j][0], 2) +
          Math.pow(icons[i][1] - icons[j][1], 2) +
          Math.pow(icons[i][2] - icons[j][2], 2)
        );
        if (dist < 2.5) {
          positions.push(...icons[i], ...icons[j]);
        }
      }
    }
    return new Float32Array(positions);
  }, []);

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <lineSegments ref={linesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={linePositions.length / 3}
          array={linePositions}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial color="#00a8e8" transparent opacity={0.2} />
    </lineSegments>
  );
};

const TechStackScene = () => {
  const icons: TechIconProps[] = [
    { position: [-2, 1, 0], color: '#00a8e8', shape: 'icosahedron', speed: 1 },
    { position: [2, 1, 0], color: '#1565c0', shape: 'octahedron', speed: 1.2 },
    { position: [0, -1, 1], color: '#00d4ff', shape: 'dodecahedron', speed: 0.8 },
    { position: [-1.5, -0.5, -1], color: '#4fc3f7', shape: 'box', speed: 1.1 },
    { position: [1.5, 0.5, 0.5], color: '#0288d1', shape: 'sphere', speed: 0.9 },
    { position: [0, 1.5, -0.5], color: '#00bcd4', shape: 'icosahedron', speed: 1.3 },
    { position: [-0.5, 0, 1.5], color: '#26c6da', shape: 'octahedron', speed: 0.7 },
    { position: [1, -1, -0.5], color: '#00acc1', shape: 'dodecahedron', speed: 1 },
    { position: [-1, 0.5, 0.8], color: '#0097a7', shape: 'box', speed: 1.2 },
  ];

  return (
    <div className="w-full h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#00a8e8" />
        <pointLight position={[-10, -10, 5]} intensity={0.5} color="#1565c0" />

        {icons.map((icon, index) => (
          <TechIcon key={index} {...icon} />
        ))}

        <ConnectingLines />
      </Canvas>
    </div>
  );
};

export default TechStackScene;
