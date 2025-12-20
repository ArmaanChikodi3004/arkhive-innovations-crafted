import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const HeroScene = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create geometric shapes
    const geometry1 = new THREE.IcosahedronGeometry(2, 1);
    const geometry2 = new THREE.OctahedronGeometry(1.5, 0);
    const geometry3 = new THREE.TetrahedronGeometry(1, 0);

    const material = new THREE.MeshPhongMaterial({
      color: 0x00a8e8,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });

    const mesh1 = new THREE.Mesh(geometry1, material);
    mesh1.position.set(4, 0, -5);
    scene.add(mesh1);

    const mesh2 = new THREE.Mesh(geometry2, material.clone());
    mesh2.position.set(-3, 2, -8);
    scene.add(mesh2);

    const mesh3 = new THREE.Mesh(geometry3, material.clone());
    mesh3.position.set(-5, -2, -6);
    scene.add(mesh3);

    // Particles
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 30;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    
    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.03,
      color: 0x00a8e8,
      transparent: true,
      opacity: 0.8,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00a8e8, 2, 100);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    const pointLight2 = new THREE.PointLight(0x1565c0, 1.5, 100);
    pointLight2.position.set(-5, -5, 5);
    scene.add(pointLight2);

    camera.position.z = 5;

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      mesh1.rotation.x += 0.003;
      mesh1.rotation.y += 0.005;
      mesh1.position.x = 4 + mouseX * 0.5;
      mesh1.position.y = mouseY * 0.5;

      mesh2.rotation.x -= 0.004;
      mesh2.rotation.y += 0.003;
      mesh2.position.x = -3 + mouseX * 0.3;
      mesh2.position.y = 2 + mouseY * 0.3;

      mesh3.rotation.x += 0.005;
      mesh3.rotation.y -= 0.004;
      mesh3.position.x = -5 + mouseX * 0.2;
      mesh3.position.y = -2 + mouseY * 0.2;

      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 z-0 pointer-events-none"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default HeroScene;
