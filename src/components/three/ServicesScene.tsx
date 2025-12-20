import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Icosahedron, Torus, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

// Rotating geometric ring
const GeometricRing = ({ radius = 3, count = 12 }: { radius?: number; count?: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  const shapes = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      items.push({ x, y, delay: i * 0.1 });
    }
    return items;
  }, [radius, count]);

  return (
    <group ref={groupRef}>
      {shapes.map((shape, i) => (
        <Float key={i} speed={1.5} rotationIntensity={0.5} floatIntensity={0.3}>
          <mesh position={[shape.x, shape.y, 0]}>
            <octahedronGeometry args={[0.15]} />
            <meshStandardMaterial
              color="#00a8e8"
              emissive="#00a8e8"
              emissiveIntensity={0.5}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </Float>
      ))}
      {/* Connecting ring */}
      <Torus args={[radius, 0.02, 16, 100]}>
        <meshBasicMaterial color="#00a8e8" transparent opacity={0.3} />
      </Torus>
    </group>
  );
};

// Floating geometric cluster
const GeometricCluster = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central icosahedron */}
      <Float speed={2} rotationIntensity={1} floatIntensity={0.5}>
        <Icosahedron args={[1, 1]}>
          <meshStandardMaterial
            color="#00a8e8"
            wireframe
            transparent
            opacity={0.8}
          />
        </Icosahedron>
      </Float>

      {/* Inner solid */}
      <Float speed={3} rotationIntensity={0.5} floatIntensity={0.3}>
        <Icosahedron args={[0.5, 0]}>
          <meshStandardMaterial
            color="#1565c0"
            emissive="#00a8e8"
            emissiveIntensity={0.3}
            metalness={0.9}
            roughness={0.2}
          />
        </Icosahedron>
      </Float>

      {/* Outer ring */}
      <GeometricRing radius={2} count={8} />
    </group>
  );
};

// Particle vortex
const ParticleVortex = ({ count = 500 }: { count?: number }) => {
  const pointsRef = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 10;
      const radius = 1 + (i / count) * 4;
      const height = (Math.random() - 0.5) * 4;
      
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = height;
      pos[i * 3 + 2] = Math.sin(angle) * radius;
      
      // Gradient colors from cyan to blue
      const t = i / count;
      col[i * 3] = 0 + t * 0.08; // R
      col[i * 3 + 1] = 0.66 - t * 0.26; // G
      col[i * 3 + 2] = 0.91; // B
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
};

const ServicesScene = () => {
  return (
    <div className="w-full h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00a8e8" />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#1565c0" />

        <GeometricCluster />
        <ParticleVortex count={400} />
      </Canvas>
    </div>
  );
};

export default ServicesScene;
