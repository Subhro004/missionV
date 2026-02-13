
import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface InteractivePhotoProps {
  imageUrl: string;
  label?: string;
}

const InteractivePhoto: React.FC<InteractivePhotoProps> = ({ imageUrl, label = "My Beautiful Rai" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Refined spring configuration for smoother, more organic movement
  const springConfig = { damping: 25, stiffness: 120 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

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

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }} 
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-[300px] h-[400px] md:w-[400px] md:h-[530px] rounded-2xl bg-white shadow-[0_30px_60px_rgba(0,0,0,0.12)] cursor-pointer overflow-hidden group"
    >
      {/* Dynamic Glare Overlay */}
      <motion.div
        style={{
          background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.4) 0%, transparent 60%)`,
          transform: "translateZ(100px)",
        }}
        className="absolute inset-0 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Floating Animated Border Frame - Pulsing Glow */}
      <motion.div 
        style={{ transform: "translateZ(80px)" }}
        animate={isHovered ? {
          borderColor: ["rgba(255,255,255,0.4)", "rgba(239,68,68,0.8)", "rgba(255,255,255,0.4)"],
          scale: [1, 1.03, 1],
          boxShadow: [
            "0 0 0px rgba(220,38,38,0)",
            "0 0 25px rgba(220,38,38,0.5), inset 0 0 10px rgba(220,38,38,0.2)",
            "0 0 0px rgba(220,38,38,0)"
          ]
        } : {
          borderColor: "rgba(255,255,255,0.3)",
          scale: 1,
          boxShadow: "0 0 0px rgba(220,38,38,0)"
        }}
        transition={{ 
          borderColor: { repeat: Infinity, duration: 2.5, ease: "easeInOut" },
          scale: { repeat: Infinity, duration: 3, ease: "easeInOut" },
          boxShadow: { repeat: Infinity, duration: 2.5, ease: "easeInOut" }
        }}
        className="absolute inset-4 rounded-xl border-2 z-20 pointer-events-none transition-colors duration-700"
      />
      
      {/* Main Image Layer with Color Shift Animation */}
      <motion.img
        src={imageUrl}
        alt="Subhangee"
        animate={{
          filter: isHovered 
            ? "grayscale(0%) saturate(120%) contrast(110%) brightness(105%)" 
            : "grayscale(15%) saturate(100%) contrast(100%) brightness(100%)"
        }}
        className="w-full h-full object-cover rounded-2xl transition-all duration-1000"
        style={{ transform: "translateZ(40px)" }}
        onError={(e) => {
            (e.target as HTMLImageElement).src = "https://picsum.photos/800/1060?romantic=1";
        }}
      />
      
      {/* Depth-aware Text */}
      <div 
        style={{ transform: "translateZ(120px)" }}
        className="absolute bottom-10 left-0 right-0 text-center z-40"
      >
        <motion.p 
          animate={isHovered ? { 
            letterSpacing: ["0.1em", "0.2em", "0.1em"],
            textShadow: ["0 4px 8px rgba(0,0,0,0.5)", "0 4px 15px rgba(220,38,38,0.8)", "0 4px 8px rgba(0,0,0,0.5)"]
          } : {}}
          transition={{ repeat: Infinity, duration: 3 }}
          className="font-cinzel text-white text-base md:text-xl font-bold tracking-[0.1em] opacity-0 group-hover:opacity-100 transition-all duration-700 uppercase translate-y-4 group-hover:translate-y-0 px-4"
        >
          {label}
        </motion.p>
      </div>

      {/* Soft Bottom Shadow/Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-red-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"></div>
      
      {/* Subtle Inner Glow on Hover */}
      <div className="absolute inset-0 ring-1 ring-inset ring-white/10 group-hover:ring-red-500/40 transition-all duration-700 z-50 pointer-events-none rounded-2xl"></div>
    </motion.div>
  );
};

export default InteractivePhoto;
