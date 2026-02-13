
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

const Snowfall: React.FC = () => {
  // We use useMemo to generate random properties once, avoiding recalculation on re-renders
  const particles = useMemo(() => {
    return [...Array(85)].map((_, i) => ({
      id: i,
      startX: Math.random() * 100, // Starting horizontal position (0-100%)
      drift: (Math.random() - 0.5) * 15, // Horizontal drift amount during fall
      duration: 12 + Math.random() * 18, // Varied fall speeds (12s to 30s)
      delay: Math.random() * -30, // Negative delay so particles are already falling when the page loads
      size: Math.random() * 20 + 10, // Varied sizes for depth perception
      type: Math.random() > 0.4 ? 'heart' : 'snow', // 60% hearts, 40% snowflakes
      rotateDir: Math.random() > 0.5 ? 1 : -1, // Randomize rotation direction
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ 
            top: "-10%", 
            left: `${p.startX}%`, 
            opacity: 0,
            rotate: 0 
          }}
          animate={{ 
            top: "110%", 
            left: `${p.startX + p.drift}%`,
            opacity: [0, 0.7, 0.7, 0],
            rotate: 360 * p.rotateDir
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
          className="absolute flex items-center justify-center"
        >
          {p.type === 'heart' ? (
            <span 
              className="text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.3)] select-none"
              style={{ fontSize: p.size }}
            >
              ❤
            </span>
          ) : (
            <span 
              className="text-red-100 opacity-40 select-none"
              style={{ fontSize: p.size }}
            >
              ❄
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default Snowfall;
