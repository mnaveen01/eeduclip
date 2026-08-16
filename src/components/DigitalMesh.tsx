import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Terrain = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  // Create a plane geometry
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(100, 100, 60, 60);
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const positions = meshRef.current.geometry.attributes.position;
    
    // Animate vertices to create undulating effect
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);
      
      // Calculate z based on sine waves for an undulating landscape
      const z = Math.sin(x * 0.1 + time) * 2 + Math.cos(y * 0.1 + time) * 2;
      positions.setZ(i, z);
    }
    positions.needsUpdate = true;
  });

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      rotation={[-Math.PI / 2 + 0.2, 0, 0]}
      position={[0, -5, -10]}
    >
      <meshBasicMaterial
        color="#ffffff"
        wireframe={true}
        transparent={true}
        opacity={0.25}
      />
    </mesh>
  );
};

class MeshErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-black to-black opacity-50 pointer-events-none" />
      );
    }
    return this.props.children;
  }
}

export const DigitalMesh: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 bg-black pointer-events-none overflow-hidden">
      <MeshErrorBoundary>
        <Canvas camera={{ position: [0, 5, 20], fov: 60 }}>
          <fog attach="fog" args={['#000000', 10, 35]} />
          <Terrain />
        </Canvas>
      </MeshErrorBoundary>
    </div>
  );
};
