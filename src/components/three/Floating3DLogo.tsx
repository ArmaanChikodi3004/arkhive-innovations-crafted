import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

// Abstract geometric logo representation
const AbstractLogo = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Main pyramid/A shape */}
        <mesh position={[0, 0, 0]}>
          <coneGeometry args={[1.2, 2, 4]} />
          <MeshTransmissionMaterial
            color="#00a8e8"
            transmission={0.9}
            thickness={0.5}
            roughness={0.1}
            chromaticAberration={0.03}
            anisotropy={0.3}
          />
        </mesh>

        {/* Inner core */}
        <mesh position={[0, 0, 0]} scale={0.5}>
          <octahedronGeometry args={[0.8]} />
          <meshStandardMaterial
            color="#1565c0"
            emissive="#00a8e8"
            emissiveIntensity={0.5}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>

        {/* Orbiting ring */}
        <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.8, 0.05, 16, 100]} />
          <meshStandardMaterial
            color="#00d4ff"
            emissive="#00d4ff"
            emissiveIntensity={0.3}
            metalness={1}
            roughness={0}
          />
        </mesh>
      </group>
    </Float>
  );
};

const Floating3DLogo = () => {
  return (
    <div className="w-full h-[400px] md:h-[500px]">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[5, 5, 5]} intensity={1} color="#00a8e8" />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#1565c0" />
        <spotLight position={[0, 10, 0]} intensity={0.8} angle={0.5} penumbra={1} color="#ffffff" />

        <AbstractLogo />
        
        <ContactShadows
          position={[0, -2, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4}
        />

        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default Floating3DLogo;
