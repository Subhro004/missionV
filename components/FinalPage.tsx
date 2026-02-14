
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import Snowfall from './Snowfall';

interface FinalPageProps {
  onNext?: () => void;
}

const FinalPage: React.FC<FinalPageProps> = ({ onNext }) => {
  return (
    <div className="relative min-h-screen w-full bg-[#2a0505] flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Dynamic Background Effects */}
      <Snowfall />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.15)_0%,_transparent_70%)]"></div>
      
      {/* The Pulsing Core Heart */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.3, 0.5, 0.3],
          filter: ["blur(40px)", "blur(60px)", "blur(40px)"]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <Heart size={600} fill="currentColor" className="text-red-600" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
        className="z-20 text-center relative"
      >
        {/* Decorative Sparkles */}
        <motion.div
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, delay: 0 }}
          className="absolute -top-12 -left-12 text-yellow-200"
        >
          <Sparkles size={40} />
        </motion.div>
        
        <motion.div
          animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
          className="absolute -bottom-12 -right-12 text-yellow-200"
        >
          <Sparkles size={40} />
        </motion.div>

        {/* The Main Declaration transformed into a transparent button */}
        <div className="space-y-6">
          <motion.button
            onClick={onNext}
            initial={{ opacity: 0, scale: 0.9, filter: "blur(15px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 3.5, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-transparent border-none p-0 m-0 cursor-pointer block w-full focus:outline-none group"
          >
            <h1 className="font-romantic text-7xl md:text-9xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] px-4 leading-[1.2] transition-all duration-700 group-hover:text-red-50">
              I love you
            </h1>
            <motion.h2 
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 3.5, duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
              className="font-romantic text-5xl md:text-7xl text-red-300 mt-2 tracking-wide"
            >
              Subhangee Mukherjee
            </motion.h2>
          </motion.button>

          {/* Decorative Divider */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 5.5, duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            className="h-[1px] bg-gradient-to-r from-transparent via-red-400 to-transparent mx-auto mt-12"
          />
        </div>
      </motion.div>

      {/* Floating Hearts in corners */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="fixed bottom-12 left-12 opacity-20"
      >
        <Heart size={100} className="text-red-400" fill="currentColor" />
      </motion.div>
      
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
        className="fixed top-12 right-12 opacity-20"
      >
        <Heart size={80} className="text-red-400" fill="currentColor" />
      </motion.div>
    </div>
  );
};

export default FinalPage;
