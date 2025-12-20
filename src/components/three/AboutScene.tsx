import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, MeshDistortMaterial, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Morphing sphere
const MorphingSphere = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1.5, 64, 64]}>
        <MeshDistortMaterial
          color="#00a8e8"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
    </Float>
  );
};

// Orbiting cubes
const OrbitingCubes = ({ count = 6 }: { count?: number }) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
    }
  });

  const cubes = useMemo(() => {
    const items = [];
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      items.push({
        x: Math.cos(angle) * 2.5,
        y: Math.sin(angle * 2) * 0.5,
        z: Math.sin(angle) * 2.5,
        scale: 0.2 + Math.random() * 0.2,
      });
    }
    return items;
  }, [count]);

  return (
    <group ref={groupRef}>
      {cubes.map((cube, i) => (
        <Float key={i} speed={2} rotationIntensity={2} floatIntensity={0.5}>
          <mesh position={[cube.x, cube.y, cube.z]} scale={cube.scale}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#00a8e8' : '#1565c0'}
              emissive={i % 2 === 0 ? '#00a8e8' : '#1565c0'}
              emissiveIntensity={0.3}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
};

// DNA-like helix
const HelixStructure = () => {
  const groupRef = useRef<THREE.Group>(null);

  const spheres = useMemo(() => {
    const items = [];
    const count = 30;
    for (let i = 0; i < count; i++) {
      const t = i / count;
      const angle = t * Math.PI * 4;
      const y = (t - 0.5) * 5;
      items.push(
        { x: Math.cos(angle) * 0.8, y, z: Math.sin(angle) * 0.8, color: '#00a8e8' },
        { x: Math.cos(angle + Math.PI) * 0.8, y, z: Math.sin(angle + Math.PI) * 0.8, color: '#1565c0' }
      );
    }
    return items;
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={[3, 0, 0]}>
      {spheres.map((sphere, i) => (
        <mesh key={i} position={[sphere.x, sphere.y, sphere.z]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color={sphere.color}
            emissive={sphere.color}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

const AboutScene = () => {
  return (
    <div className="w-full h-[400px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00a8e8" />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#1565c0" />
        <spotLight position={[0, 10, 0]} intensity={0.5} angle={0.5} penumbra={1} />

        <MorphingSphere />
        <OrbitingCubes count={8} />
        <HelixStructure />

        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default AboutScene;
