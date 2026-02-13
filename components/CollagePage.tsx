
import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Heart, Sparkles, ChevronRight } from 'lucide-react';
import Snowfall from './Snowfall';

interface CollagePageProps {
  onNext?: () => void;
}

const CollagePage: React.FC<CollagePageProps> = ({ onNext }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
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
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full max-w-[550px] rounded-[2rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.9)] border border-white/10 group bg-black/40 p-1 md:p-2"
          >
            <motion.div 
              initial={false}
              animate={{
                boxShadow: isHovered 
                  ? ["inset 0 0 20px rgba(220,38,38,0.2), 0 0 10px rgba(220,38,38,0.2)", "inset 0 0 50px rgba(220,38,38,0.5), 0 0 30px rgba(220,38,38,0.5)"]
                  : "none",
                borderColor: isHovered ? "rgba(220,38,38,0.6)" : "rgba(255,255,255,0.15)"
              }}
              className="absolute inset-0 rounded-[2rem] border-2 pointer-events-none z-50 transition-colors"
            />
            <img src={collageUrl} alt="Kaju and Kismis" className="w-full h-auto block relative z-10 rounded-[1.8rem]" />
          </motion.div>
        </div>

        <motion.div className="text-center space-y-12">
          <motion.h1 className="font-romantic text-6xl md:text-8xl text-white px-4 leading-[1.3]">
            "Every moment with you is a cherished one"
          </motion.h1>
          
          <div className="flex flex-col items-center gap-8 mt-12 pb-20">
             <motion.p className="font-romantic text-6xl md:text-7xl text-red-400">From Kaju ❤️</motion.p>
             
             {onNext && (
                <motion.button
                  onClick={onNext}
                  whileHover={{ scale: 1.05 }}
                  className="mt-8 flex items-center gap-3 px-10 py-4 bg-red-600/20 border border-red-500/40 text-red-100 rounded-full font-cinzel tracking-widest text-xs uppercase"
                >
                  Keep Exploring
                  <ChevronRight size={18} />
                </motion.button>
             )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CollagePage;
