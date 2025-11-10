import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * 3D Floating Cube Component
 * Displays a rotating 3D cube that responds to scroll
 */
const FloatingCube = () => {
  const containerRef = useRef(null);

  // Cube faces with different colors
  const faces = [
    { id: 'front', transform: 'rotateY(0deg) translateZ(100px)', color: 'bg-gradient-to-br from-blue-500 to-blue-600', label: 'AI' },
    { id: 'back', transform: 'rotateY(180deg) translateZ(100px)', color: 'bg-gradient-to-br from-purple-500 to-purple-600', label: 'ML' },
    { id: 'right', transform: 'rotateY(90deg) translateZ(100px)', color: 'bg-gradient-to-br from-pink-500 to-pink-600', label: 'Tech' },
    { id: 'left', transform: 'rotateY(-90deg) translateZ(100px)', color: 'bg-gradient-to-br from-orange-500 to-orange-600', label: 'Code' },
    { id: 'top', transform: 'rotateX(90deg) translateZ(100px)', color: 'bg-gradient-to-br from-green-500 to-green-600', label: 'Future' },
    { id: 'bottom', transform: 'rotateX(-90deg) translateZ(100px)', color: 'bg-gradient-to-br from-red-500 to-red-600', label: 'Build' },
  ];

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rotateX = ((y - rect.height / 2) / rect.height) * 20;
      const rotateY = ((x - rect.width / 2) / rect.width) * 20;

      containerRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="w-full h-96 flex items-center justify-center bg-gradient-to-br from-slate-900 to-purple-900 rounded-3xl overflow-hidden relative">
      {/* Background animation */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* 3D Cube Container */}
      <div className="relative w-64 h-64 perspective" ref={containerRef} style={{ perspective: '1000px' }}>
        <motion.div
          className="relative w-full h-full"
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(0)',
          }}
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {/* Cube faces */}
          {faces.map((face, idx) => (
            <motion.div
              key={face.id}
              className={`absolute w-32 h-32 ${face.color} flex items-center justify-center text-white font-bold text-2xl shadow-2xl opacity-90 border-2 border-white/20`}
              style={{
                transform: face.transform,
                left: '50%',
                top: '50%',
                marginLeft: '-64px',
                marginTop: '-64px',
                transformStyle: 'preserve-3d',
              }}
              whileHover={{ scale: 1.1 }}
            >
              {face.label}
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Info text */}
      <div className="absolute bottom-6 left-6 right-6 text-center">
        <p className="text-slate-300 text-sm">Move your mouse to interact with the cube</p>
      </div>
    </div>
  );
};

export default FloatingCube;
