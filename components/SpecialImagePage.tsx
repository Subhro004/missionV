
import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { ChevronRight, Heart, Sparkles } from 'lucide-react';
import Snowfall from './Snowfall';

interface SpecialImagePageProps {
  onNext: () => void;
}

const SpecialImagePage: React.FC<SpecialImagePageProps> = ({ onNext }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 25 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  // Increased tilt for more dramatic 3D effect
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

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

  const imageUrl = "https://drive.google.com/thumbnail?id=1Ujddz11GjaH6q7N4TX0nCDwRcT6NT8xn&sz=w1600";

  return (
    <div className="relative min-h-screen w-full bg-[#0a0202] flex flex-col items-center justify-center p-6 overflow-hidden">
      <Snowfall />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.15)_0%,_transparent_70%)] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5 }}
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
          {/* Subtle Side Glow - Behind the image */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1.05 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
              >
                {/* Left side glow */}
                <div className="absolute left-0 w-1/4 h-full bg-red-600/20 blur-[80px] rounded-full transform -translate-x-1/4" />
                {/* Right side glow */}
                <div className="absolute right-0 w-1/4 h-full bg-red-600/20 blur-[80px] rounded-full transform translate-x-1/4" />
                {/* Center soft glow */}
                <div className="absolute inset-20 bg-red-500/5 blur-[100px] rounded-full" />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: 1.02 }}
            className="relative w-full max-w-[650px] rounded-[2.5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.8)] border border-white/10 bg-red-950/20 z-10"
          >
            {/* Background depth layer */}
            <div className="absolute inset-0 bg-red-900/10 z-0"></div>
            
            {/* Dynamic Glare Overlay */}
            <motion.div
              style={{
                background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.3) 0%, transparent 60%)`,
                transform: "translateZ(150px)",
              }}
              className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />

            {/* Floating Border Frame - High translateZ */}
            <motion.div 
              style={{ transform: "translateZ(80px)" }}
              animate={isHovered ? {
                borderColor: ["rgba(255,255,255,0.2)", "rgba(220,38,38,0.6)", "rgba(255,255,255,0.2)"],
                boxShadow: [
                  "0 0 0px rgba(220,38,38,0)",
                  "0 0 30px rgba(220,38,38,0.4)",
                  "0 0 0px rgba(220,38,38,0)"
                ]
              } : {}}
              transition={{ repeat: Infinity, duration: 2.5 }}
              className="absolute inset-6 rounded-[2rem] border-2 border-white/20 z-20 pointer-events-none"
            />

            <motion.img 
              src={imageUrl} 
              alt="A moment together" 
              style={{ transform: "translateZ(40px)" }}
              className="w-full h-auto object-contain relative z-10 block rounded-[2.5rem] shadow-inner"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/800/1000?romantic=1";
              }}
            />

            {/* Gloss / Depth reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-white/5 z-20 pointer-events-none"></div>

            {/* 3D Floating Hearts when hovered */}
            {isHovered && (
              <motion.div 
                style={{ transform: "translateZ(120px)" }}
                className="absolute inset-0 pointer-events-none z-40"
              >
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: [0, 1, 0], scale: [0, 1.2, 0], y: -20 }}
                    transition={{ 
                      repeat: Infinity, 
                      duration: 3, 
                      delay: i * 0.6,
                      ease: "easeOut"
                    }}
                    className="absolute text-red-500"
                    style={{
                      left: `${15 + Math.random() * 70}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                  >
                    <Heart size={24} fill="currentColor" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1 }}
          className="flex flex-col items-center gap-8"
        >
          <div className="flex items-center gap-3">
            <Sparkles className="text-red-400" size={20} />
            <h3 className="font-romantic text-4xl md:text-5xl text-red-100 text-center">
              I love the quiet peaceful us moments
            </h3>
            <Sparkles className="text-red-400" size={20} />
          </div>

          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(220, 38, 38, 0.9)" }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-4 px-12 py-5 bg-red-600/30 border border-red-500/40 text-red-100 rounded-full font-cinzel tracking-widest text-xs uppercase transition-all duration-300 shadow-xl"
          >
            Continue our story
            <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Decorative corner heart */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 6 }}
        className="fixed bottom-10 left-10 opacity-10"
      >
        <Heart size={150} fill="currentColor" className="text-red-600" />
      </motion.div>
    </div>
  );
};

export default SpecialImagePage;
