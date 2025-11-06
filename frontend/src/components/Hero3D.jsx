import React, { useRef, Suspense, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Html } from '@react-three/drei';
import { Zap } from 'lucide-react';

// Simplified 3D Resume Card Component
const RotatingCard = ({ isHovered }) => {
    const meshRef = useRef();
    const speed = isHovered ? 0.005 : 0.002;
    
    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = clock.getElapsedTime() * speed;
            meshRef.current.rotation.y = clock.getElapsedTime() * speed * 0.5;
        }
    });

    return (
        <group ref={meshRef}>
            {/* Main Card Plane */}
            <mesh>
                <boxGeometry args={[3, 4, 0.1]} />
                <meshStandardMaterial 
                    color={isHovered ? '#3b82f6' : '#1e293b'} 
                    metalness={0.5} 
                    roughness={0.1}
                />
            </mesh>

            {/* Inner Content Placeholder */}
            <Html position={[0, 1.5, 0.06]} transform>
                <div className="text-white text-lg font-bold">SMART</div>
            </Html>
            <Html position={[0, 0.8, 0.06]} transform>
                <div className="text-orange-500 text-lg font-bold">CAREER</div>
            </Html>
            <Html position={[0, -1, 0.06]} transform>
                <div className="p-2 text-xs text-white bg-blue-500 rounded-full">
                    <Zap className='w-3 h-3 inline mr-1'/> ATS AI
                </div>
            </Html>
        </group>
    );
};

// Main Canvas Wrapper
const Hero3D = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [hasWebGL, setHasWebGL] = useState(true);

    useEffect(() => {
        // Simple check for WebGL support
        const canvas = document.createElement('canvas');
        if (!canvas.getContext('webgl') && !canvas.getContext('experimental-webgl')) {
            setHasWebGL(false);
        }
    }, []);

    if (!hasWebGL) {
        return (
            <div className="flex items-center justify-center h-full w-full bg-slate-800 rounded-xl">
                <p className="text-white">3D Visuals require WebGL. Showing fallback image...</p>
                {/*  */}
            </div>
        );
    }


    return (
        <Canvas 
            camera={{ position: [0, 0, 5], fov: 75 }}
            className="w-full h-full cursor-pointer"
            onPointerOver={() => setIsHovered(true)}
            onPointerOut={() => setIsHovered(false)}
        >
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            
            <Suspense fallback={<Html center><p className="text-white">Loading 3D...</p></Html>}>
                <RotatingCard isHovered={isHovered} />
            </Suspense>
            
            <Environment preset="city" />
            <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
        </Canvas>
    );
};

export default Hero3D;