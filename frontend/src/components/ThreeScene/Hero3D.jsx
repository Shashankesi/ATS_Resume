import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Rotating 3D Logo Component
 * Simple rotating cube that serves as SmartCareer logo placeholder
 */
const Logo3D = () => {
    const meshRef = useRef();

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.005;
            meshRef.current.rotation.y += 0.007;
        }
    });

    return (
        <mesh ref={meshRef}>
            {/* Cube geometry */}
            <boxGeometry args={[1, 1, 1]} />
            {/* Gradient material */}
            <meshPhongMaterial
                color="#3b82f6"
                emissive="#1e40af"
                shininess={100}
                wireframe={false}
            />
        </mesh>
    );
};

/**
 * Animated Background Particles
 * Creates a floating particle field effect
 */
const Particles = () => {
    const meshRef = useRef();
    const pointsRef = useRef();

    useEffect(() => {
        // Create particle geometry
        const count = 500;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count * 3; i += 3) {
            positions[i] = (Math.random() - 0.5) * 20;
            positions[i + 1] = (Math.random() - 0.5) * 20;
            positions[i + 2] = (Math.random() - 0.5) * 20;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        pointsRef.current = geometry;
    }, []);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += 0.0001;
            meshRef.current.rotation.y += 0.0002;
        }
    });

    return (
        <points ref={meshRef} geometry={pointsRef.current}>
            <pointsMaterial size={0.05} color="#60a5fa" sizeAttenuation={true} />
        </points>
    );
};

/**
 * Lighting setup
 */
const Lighting = () => (
    <>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#ff00ff" />
    </>
);

/**
 * Main Hero 3D Scene Component
 * Renders an interactive 3D canvas for the homepage
 */
export const Hero3D = () => {
    return (
        <div className="w-full h-screen relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* 3D Canvas */}
            <Canvas className="absolute inset-0">
                <PerspectiveCamera makeDefault position={[0, 0, 3]} />
                <Lighting />
                <Logo3D />
                <Particles />
                <OrbitControls
                    enableZoom={true}
                    enablePan={true}
                    autoRotate
                    autoRotateSpeed={2}
                />
            </Canvas>

            {/* Text Overlay */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center z-10">
                    <h1 className="text-6xl font-black gradient-text mb-4">SmartCareer</h1>
                    <p className="text-xl text-slate-300">AI-Powered Career Advancement</p>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce pointer-events-none">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </div>
    );
};

/**
 * Lightweight 3D Background Component
 * Can be used as page background
 */
export const ThreeBackground = ({ children }) => {
    return (
        <div className="relative w-full">
            {/* Small 3D background canvas */}
            <div className="absolute inset-0 h-96 opacity-30">
                <Canvas>
                    <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                    <Lighting />
                    <Particles />
                </Canvas>
            </div>
            {/* Content on top */}
            <div className="relative z-10">
                {children}
            </div>
        </div>
    );
};

export default Hero3D;
