
import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ChevronRight } from 'lucide-react';
import Snowfall from './Snowfall';

interface CollagePageProps {
  onNext?: () => void;
}

const CollagePage: React.FC<CollagePageProps> = ({ onNext }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  // Refined spring configuration for smoother movement
  const springConfig = { stiffness: 100, damping: 30 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  // 3D Rotation based on mouse
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  
  // Parallax translation effect
  const translateX = useTransform(mouseXSpring, [-0.5, 0.5], ["15px", "-15px"]);
  const translateY = useTransform(mouseYSpring, [-0.5, 0.5], ["15px", "-15px"]);

  // Glare effect coordinates
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const collageUrl = "https://drive.google.com/thumbnail?id=1W_lb5aSAXnYSgeUx6woHu9OHnVEhLbul&sz=w1600";

  return (
    <div className="relative min-h-[200vh] w-full bg-[#080101] flex flex-col items-center pt-20 pb-60 px-4 md:px-10 overflow-y-auto overflow-x-hidden">
      <Snowfall />

      <motion.div 
        animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
        transition={{ duration: 8, repeat: Infinity }}
        className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.15)_0%,_transparent_70%)] pointer-events-none"
      />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="z-20 w-full max-w-4xl flex flex-col items-center gap-16"
      >
        <div 
          className="perspective-2000 w-full flex justify-center items-center"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { setIsHovered(false); x.set(0); y.set(0); }}
        >
          <motion.div
            style={{ 
              rotateX, 
              rotateY, 
              transformStyle: "preserve-3d" 
            }}
            className="relative w-full max-w-[600px] rounded-[2.5rem] overflow-visible group bg-black/40 p-1 md:p-2 transition-shadow duration-500"
          >
            {/* Romantic Outer Bloom Glow - Intensifies on hover */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ 
                    opacity: [0.4, 0.7, 0.4], 
                    scale: [1, 1.05, 1],
                    boxShadow: [
                      "0 0 40px rgba(220, 38, 38, 0.3), 0 0 80px rgba(220, 38, 38, 0.2)",
                      "0 0 60px rgba(220, 38, 38, 0.5), 0 0 120px rgba(220, 38, 38, 0.3)",
                      "0 0 40px rgba(220, 38, 38, 0.3), 0 0 80px rgba(220, 38, 38, 0.2)"
                    ]
                  }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 rounded-[2.5rem] bg-red-600/10 blur-2xl z-0"
                />
              )}
            </AnimatePresence>

            {/* Dynamic Interactive Border & Inner Glow */}
            <motion.div 
              initial={false}
              animate={{
                boxShadow: isHovered 
                  ? [
                      "inset 0 0 20px rgba(220,38,38,0.4), 0 0 30px rgba(220,38,38,0.6)", 
                      "inset 0 0 60px rgba(244,63,94,0.5), 0 0 50px rgba(244,63,94,0.7)",
                      "inset 0 0 20px rgba(220,38,38,0.4), 0 0 30px rgba(220,38,38,0.6)"
                    ]
                  : "0 10px 40px rgba(0,0,0,0.5)",
                borderColor: isHovered ? "rgba(251,113,133,0.8)" : "rgba(255,255,255,0.15)"
              }}
              transition={isHovered ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" } : { duration: 0.5 }}
              className="absolute inset-0 rounded-[2.5rem] border-2 pointer-events-none z-50 transition-colors"
            />

            {/* Dynamic Glare Overlay */}
            <motion.div
              style={{
                background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,192,203,0.3) 0%, transparent 60%)`,
                transform: "translateZ(100px)",
              }}
              className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />

            {/* Parallax Image Content */}
            <motion.div
              style={{
                x: translateX,
                y: translateY,
                transform: "translateZ(40px)"
              }}
              className="relative z-10 rounded-[2.3rem] overflow-hidden"
            >
              <img 
                src={collageUrl} 
                alt="Kaju and Kismis" 
                className="w-full h-auto block rounded-[2.3rem] transition-all duration-1000 grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600/5 via-transparent to-rose-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>

            {/* Floating Sparkle */}
            <motion.div
              style={{ transform: "translateZ(120px)" }}
              animate={{ 
                opacity: isHovered ? [0, 1, 0] : 0,
                scale: isHovered ? [0.5, 1.4, 0.5] : 0,
                rotate: isHovered ? [0, 90, 180] : 0
              }}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="absolute top-8 right-8 text-rose-200 z-40 pointer-events-none"
            >
              <Sparkles size={36} />
            </motion.div>
          </motion.div>
        </div>

        <motion.div className="text-center space-y-12">
          <motion.h1 
            animate={isHovered ? { color: ["#ffffff", "#fecaca", "#ffffff"] } : {}}
            transition={{ duration: 4, repeat: Infinity }}
            className="font-romantic text-6xl md:text-8xl text-white px-4 leading-[1.3] drop-shadow-[0_0_20px_rgba(220,38,38,0.3)]"
          >
            "Every moment with you is a cherished one"
          </motion.h1>
          
          <div className="flex flex-col items-center gap-8 mt-12 pb-20">
             <motion.p 
               animate={{ 
                 scale: isHovered ? [1, 1.08, 1] : 1,
                 textShadow: isHovered ? "0 0 20px rgba(220,38,38,0.6)" : "none"
               }}
               transition={{ duration: 2, repeat: Infinity }}
               className="font-romantic text-6xl md:text-7xl text-red-400 transition-all"
             >
               From Subhranil ❤️
             </motion.p>
             
             {onNext && (
                <motion.button
                  onClick={onNext}
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: "0 0 35px rgba(220, 38, 38, 0.5)",
                    backgroundColor: "rgba(220, 38, 38, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 flex items-center gap-3 px-10 py-4 bg-red-600/20 border border-red-500/40 text-red-100 rounded-full font-cinzel tracking-widest text-xs uppercase transition-all duration-300"
                >
                  Keep Exploring
                  <ChevronRight size={18} />
                </motion.button>
             )}
          </div>
        </motion.div>
      </motion.div>

      {/* Large decorative heart - Pulses with the collage */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0], 
          rotate: [0, 10, 0],
          scale: isHovered ? [1, 1.2, 1] : 1
        }}
        transition={{ duration: 6, repeat: Infinity }}
        className="fixed bottom-20 left-10 opacity-[0.05] pointer-events-none"
      >
        <Heart size={200} fill="currentColor" className="text-red-800" />
      </motion.div>
    </div>
  );
};

export default CollagePage;
