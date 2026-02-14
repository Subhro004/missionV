
import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronRight, Heart, Sparkles } from 'lucide-react';
import Snowfall from './Snowfall';

interface SpecialImagePageProps {
  onNext: () => void;
}

const SpecialImagePage: React.FC<SpecialImagePageProps> = ({ onNext }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isTextHovered, setIsTextHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Softer, more "viscous" spring for a premium, hassle-free feel
  const springConfig = { stiffness: 80, damping: 35 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  // Reduced angles (from 15 to 10) for a more controlled 3D effect
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  // Subtle glare coordinates
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Normalizing values
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const imageUrl = "https://drive.google.com/thumbnail?id=1Ujddz11GjaH6q7N4TX0nCDwRcT6NT8xn&sz=w1600";

  const textGlowEffect = {
    scale: 1.05,
    color: "#ffffff",
    textShadow: "0 0 25px rgba(255, 255, 255, 0.7), 0 0 10px rgba(220, 38, 38, 0.4)",
    transition: { type: "spring", stiffness: 300, damping: 20 }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0a0202] flex flex-col items-center justify-center p-6 overflow-hidden">
      <Snowfall />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.12)_0%,_transparent_75%)] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        className="z-20 w-full max-w-4xl flex flex-col items-center gap-12"
      >
        <div 
          className="perspective-2000 w-full flex justify-center items-center relative"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { 
            setIsHovered(false);
            x.set(0); 
            y.set(0); 
          }}
        >
          {/* Soft Atmospheric Glows */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-0 pointer-events-none"
              >
                <motion.div 
                  animate={{ 
                    opacity: [0.2, 0.4, 0.2],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-red-600/10 blur-[120px] rounded-full" 
                />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            animate={{
              boxShadow: isHovered 
                ? "0 60px 100px rgba(0,0,0,0.9), 0 0 40px rgba(220, 38, 38, 0.2)" 
                : "0 40px 80px rgba(0,0,0,0.7)"
            }}
            className="relative w-full max-w-[600px] rounded-[3rem] overflow-hidden border border-white/5 bg-red-950/10 z-10 transition-shadow duration-700"
          >
            {/* Glossy Reflection Overlay */}
            <motion.div
              style={{
                background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.15) 0%, transparent 65%)`,
                transform: "translateZ(100px)",
              }}
              className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />

            {/* Subtle Inner Frame */}
            <motion.div 
              style={{ transform: "translateZ(60px)" }}
              className="absolute inset-6 rounded-[2.5rem] border border-white/10 z-20 pointer-events-none"
            />

            <motion.img 
              src={imageUrl} 
              alt="Peaceful Us" 
              style={{ transform: "translateZ(30px)" }}
              className="w-full h-auto object-contain relative z-10 block rounded-[3rem] transition-transform duration-1000"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/800/1000?romantic=1";
              }}
            />

            {/* Depth vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-20 pointer-events-none"></div>

            {/* Gentle 3D Floating Hearts */}
            <AnimatePresence>
              {isHovered && (
                <motion.div 
                  style={{ transform: "translateZ(140px)" }}
                  className="absolute inset-0 pointer-events-none z-40"
                >
                  {[...Array(4)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, y: 0 }}
                      animate={{ opacity: [0, 0.6, 0], scale: [0.5, 1, 0.5], y: -40 }}
                      transition={{ 
                        repeat: Infinity, 
                        duration: 4, 
                        delay: i * 1,
                        ease: "easeOut"
                      }}
                      className="absolute text-red-500/60"
                      style={{
                        left: `${20 + (i * 20)}%`,
                        bottom: `20%`,
                      }}
                    >
                      <Heart size={20} fill="currentColor" />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="flex flex-col items-center gap-10"
        >
          <div className="flex items-center gap-4 cursor-default">
            <motion.div 
              animate={isTextHovered ? { rotate: 180, scale: 1.2, color: "#fff" } : { rotate: 0, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Sparkles className="text-red-400" size={24} />
            </motion.div>
            
            <motion.h3 
              onMouseEnter={() => setIsTextHovered(true)}
              onMouseLeave={() => setIsTextHovered(false)}
              whileHover={textGlowEffect}
              className="font-romantic text-4xl md:text-5xl text-red-100 text-center select-none cursor-pointer tracking-wide transition-all duration-500"
            >
              I love the quiet peaceful us moments
            </motion.h3>
            
            <motion.div 
              animate={isTextHovered ? { rotate: -180, scale: 1.2, color: "#fff" } : { rotate: 0, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <Sparkles className="text-red-400" size={24} />
            </motion.div>
          </div>

          <motion.button
            onClick={onNext}
            whileHover={{ 
              scale: 1.05, 
              y: -4,
              backgroundColor: "rgba(220, 38, 38, 0.9)",
              boxShadow: "0 0 40px rgba(220, 38, 38, 0.5)",
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
            className="group relative flex items-center gap-5 px-12 py-5 bg-red-600/20 border border-red-500/30 text-red-100 rounded-full font-cinzel tracking-widest text-xs uppercase transition-all duration-500 shadow-lg overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-5">
              Continue our story
              <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform duration-500" />
            </span>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Static Background Decoration */}
      <div className="fixed bottom-12 left-12 opacity-5 pointer-events-none">
        <Heart size={200} fill="currentColor" className="text-red-600" />
      </div>
    </div>
  );
};

export default SpecialImagePage;
