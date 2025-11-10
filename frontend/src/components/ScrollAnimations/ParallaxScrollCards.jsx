import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

/**
 * Parallax Scroll Cards Component
 * Creates cards that move at different speeds as you scroll
 */
const ParallaxScrollCards = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Different scroll speeds for parallax effect
  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -50]);
  const y3 = useTransform(scrollYProgress, [0, 1], [50, -150]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const cards = [
    {
      title: 'ATS Optimization',
      description: 'Optimize your resume for ATS systems',
      color: 'from-yellow-500 to-orange-500',
      icon: '⚡',
    },
    {
      title: 'AI-Powered Resume',
      description: 'Generate professional resumes instantly',
      color: 'from-purple-500 to-blue-500',
      icon: '🚀',
    },
    {
      title: 'Career Coaching',
      description: 'Get personalized career guidance',
      color: 'from-pink-500 to-red-500',
      icon: '💡',
    },
  ];

  return (
    <div ref={ref} className="relative w-full min-h-screen py-20 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <motion.div
        style={{ opacity, scale }}
        className="h-screen flex items-center justify-center"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
          {/* Card 1 */}
          <motion.div style={{ y: y1 }} className="h-full">
            <div className={`bg-gradient-to-br ${cards[0].color} p-1 rounded-2xl h-80 shadow-2xl`}>
              <div className="bg-slate-900 rounded-2xl p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="text-5xl mb-4">{cards[0].icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{cards[0].title}</h3>
                  <p className="text-slate-300">{cards[0].description}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg hover:shadow-lg transition"
                >
                  Learn More
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Card 2 - Featured */}
          <motion.div style={{ y: y2 }} className="h-full">
            <div className={`bg-gradient-to-br ${cards[1].color} p-1 rounded-2xl h-80 shadow-2xl relative`}>
              <div className="absolute -top-4 -right-4 px-4 py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white text-sm font-bold rounded-full">
                ⭐ Featured
              </div>
              <div className="bg-slate-900 rounded-2xl p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="text-5xl mb-4">{cards[1].icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{cards[1].title}</h3>
                  <p className="text-slate-300">{cards[1].description}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition"
                >
                  Learn More
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div style={{ y: y3 }} className="h-full">
            <div className={`bg-gradient-to-br ${cards[2].color} p-1 rounded-2xl h-80 shadow-2xl`}>
              <div className="bg-slate-900 rounded-2xl p-8 h-full flex flex-col justify-between">
                <div>
                  <div className="text-5xl mb-4">{cards[2].icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-3">{cards[2].title}</h3>
                  <p className="text-slate-300">{cards[2].description}</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-2 bg-gradient-to-r from-pink-500 to-red-500 text-white font-semibold rounded-lg hover:shadow-lg transition"
                >
                  Learn More
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default ParallaxScrollCards;
