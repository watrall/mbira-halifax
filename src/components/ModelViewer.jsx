// src/components/ModelViewer.jsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { Suspense } from 'react';

function Model({ src }) {
  const { scene } = useGLTF(src);
  // Adjust scale/position if needed based on the model
  return <primitive object={scene} scale={0.5} />;
}

export default function ModelViewer({ src }) {
  return (
    <div className="h-80 w-full rounded-xl overflow-hidden mb-6 border bg-white p-4 shadow-card">
      <h2 className="text-xl font-semibold mb-2">3D Model</h2>
      <Suspense fallback={<div className="h-full flex items-center justify-center">Loading 3D model...</div>}>
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Model src={src} />
          <OrbitControls enableZoom={true} enablePan={true} />
        </Canvas>
      </Suspense>
    </div>
  );
}