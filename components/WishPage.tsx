
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Stars, ChevronRight } from 'lucide-react';
import InteractivePhoto from './InteractivePhoto';
import Snowfall from './Snowfall';

interface WishPageProps {
  onNext: () => void;
}

const WishPage: React.FC<WishPageProps> = ({ onNext }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const glowHover = {
    scale: 1.05,
    textShadow: "0 0 20px rgba(220, 38, 38, 0.6)",
    transition: { duration: 0.3 }
  };

  return (
    <div className="relative min-h-screen w-full bg-red-50 flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Background Heart Watermarks */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none grid grid-cols-4 md:grid-cols-6 gap-20 p-10">
        {[...Array(24)].map((_, i) => (
          <Heart key={i} size={80} className="text-red-900 fill-current" />
        ))}
      </div>

      <Snowfall />
      
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="z-20 w-full max-w-4xl flex flex-col items-center text-center space-y-8 md:space-y-12"
          >
            {/* Header */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center"
            >
              <motion.h2 
                whileHover={glowHover}
                className="font-romantic text-6xl md:text-8xl text-red-600 drop-shadow-sm cursor-default select-none"
              >
                Happy Valentine's Day
              </motion.h2>
              
              <div className="flex items-center justify-center gap-4 mt-2">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  className="h-[2px] bg-red-300"
                ></motion.div>
                <motion.h3 
                  whileHover={{ 
                    scale: 1.1, 
                    letterSpacing: "0.4em", 
                    color: "#7f1d1d",
                    textShadow: "0 0 10px rgba(127, 29, 29, 0.3)" 
                  }}
                  className="font-cinzel text-xl md:text-2xl text-red-900 tracking-[0.3em] font-semibold uppercase cursor-default select-none transition-all duration-300"
                >
                  My Dearest Subhangee
                </motion.h3>
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: 64 }}
                  className="h-[2px] bg-red-300"
                ></motion.div>
              </div>
            </motion.div>

            {/* Photo Container */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-red-200 via-rose-100 to-red-300 rounded-2xl blur-2xl opacity-60 group-hover:opacity-100 transition duration-1000"></div>
              <InteractivePhoto 
                imageUrl="https://drive.google.com/thumbnail?id=1bn9P8a6SVpJ7qEw8b1hfBjitqFhrf3Ko&sz=w1000" 
                label="My Clumpsy Cutie-Pie"
              />
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1], 
                  rotate: [0, 10, -10, 0],
                  filter: [
                    "drop-shadow(0 0 5px rgba(220, 38, 38, 0.4))", 
                    "drop-shadow(0 0 20px rgba(220, 38, 38, 0.8))", 
                    "drop-shadow(0 0 5px rgba(220, 38, 38, 0.4))"
                  ]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 2.5,
                  ease: "easeInOut"
                }}
                className="absolute -top-8 -right-8 text-red-600"
              >
                <Heart fill="currentColor" size={64} />
              </motion.div>
            </div>

            {/* Romantic Line & Next Button */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1.5 }}
              className="max-w-2xl px-4 flex flex-col items-center gap-10"
            >
              <motion.p 
                whileHover={{ 
                  scale: 1.03, 
                  color: "#991b1b",
                  textShadow: "0 0 15px rgba(220, 38, 38, 0.2)"
                }}
                className="font-playfair italic text-2xl md:text-3xl text-red-900 leading-relaxed drop-shadow-sm cursor-default select-none transition-colors duration-300"
              >
                "You are my coincidence that felt like destiny"
              </motion.p>
              
              <motion.div 
                className="flex flex-col items-center gap-6"
                animate={{ y: [0, -5, 0] }}
                transition={{ repeat: Infinity, duration: 4 }}
              >
                <motion.div 
                  className="flex justify-center gap-4 items-center"
                  animate={{ 
                    opacity: [0.5, 1, 0.5],
                    scale: [1, 1.05, 1]
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 4.5, 
                    ease: "easeInOut" 
                  }}
                >
                  <Stars className="text-red-400" />
                  <motion.span 
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: [-1, 1, -1],
                      textShadow: "0 0 25px rgba(220, 38, 38, 0.8)"
                    }}
                    className="font-romantic text-4xl md:text-5xl text-red-600 drop-shadow-sm px-2 cursor-default select-none"
                  >
                    Only yours
                  </motion.span>
                  <Stars className="text-red-400" />
                </motion.div>

                <motion.button 
                  onClick={onNext}
                  whileHover={{ 
                    scale: 1.08,
                    boxShadow: "0 12px 24px rgba(220, 38, 38, 0.3)"
                  }}
                  whileTap={{ scale: 0.96 }}
                  className="group flex items-center gap-3 px-8 py-3 bg-red-600 text-white rounded-full font-cinzel tracking-widest text-sm transition-all shadow-lg"
                >
                  <motion.span
                    className="flex items-center gap-3"
                  >
                    Explore More
                    <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </motion.span>
                </motion.button>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Bottom Elements */}
      <div className="fixed bottom-0 left-0 w-full h-40 bg-gradient-to-t from-red-100/50 to-transparent pointer-events-none z-10"></div>
    </div>
  );
};

export default WishPage;
