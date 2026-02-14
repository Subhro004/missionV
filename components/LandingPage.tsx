
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Snowfall from './Snowfall';

interface LandingPageProps {
  onNext: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNext }) => {
  return (
    <div className="relative min-h-screen h-screen w-full bg-red-50 overflow-hidden flex items-center justify-center">
      {/* Background Snowfall - Same as Nickname page */}
      <Snowfall />

      {/* Deep Red Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(239,68,68,0.1),transparent_100%)]"></div>

      {/* Large Decorative background heart from NicknamePage */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
        className="fixed bottom-10 left-10 opacity-[0.08] pointer-events-none"
      >
        <Heart size={300} fill="currentColor" className="text-red-900" />
      </motion.div>

      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, -5, 5, 0]
        }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 1 }}
        className="fixed top-10 right-10 opacity-[0.05] pointer-events-none"
      >
        <Heart size={200} fill="currentColor" className="text-red-900" />
      </motion.div>

      {/* Top Left Message: Enhanced visibility and interactivity */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute top-4 left-4 md:top-16 md:left-16 z-30"
      >
        <motion.div 
          whileHover={{ scale: 1.1, x: 10 }}
          className="relative group cursor-default"
        >
          <h2 className="font-romantic text-3xl md:text-6xl text-red-800 tracking-tight leading-tight group-hover:text-red-600 transition-colors duration-500 drop-shadow-sm">
            From <span className="italic">"Coat of Justice"</span>...
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.2, duration: 1 }}
            className="h-[2px] bg-red-300 mt-2 group-hover:bg-red-500 transition-colors duration-500"
          />
        </motion.div>
      </motion.div>

      {/* Center Button: Refined Focal Point */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="z-40 px-6"
      >
        <motion.button
          onClick={onNext}
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 20px 40px rgba(239, 68, 68, 0.2)"
          }}
          whileTap={{ scale: 0.98 }}
          className="group relative flex flex-col items-center gap-4 md:gap-6 transition-all"
        >
          <div className="relative px-6 md:px-14 py-4 md:py-6 bg-white/80 backdrop-blur-md border border-red-100 rounded-full overflow-hidden transition-all duration-700">
            <span className="relative z-10 font-cinzel text-red-950 text-xs md:text-lg tracking-[0.2em] md:tracking-[0.4em] uppercase font-bold text-center block max-w-xs md:max-w-none">
              Let's embark on this dreamy journey together
            </span>
            <div className="absolute inset-0 translate-y-full group-hover:translate-y-0 bg-red-50 transition-transform duration-500 ease-in-out"></div>
          </div>
          <motion.div
            animate={{ 
              scale: [1, 1.3, 1],
              y: [0, -5, 0],
              filter: ["drop-shadow(0 0 2px rgba(220,38,38,0.2))", "drop-shadow(0 0 15px rgba(220,38,38,0.6))", "drop-shadow(0 0 2px rgba(220,38,38,0.2))"]
            }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <Heart size={28} md-size={32} className="text-red-600 fill-current" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Bottom Right Message: Enhanced visibility and interactivity */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
        className="absolute bottom-4 right-4 md:bottom-16 md:right-16 z-30 text-right"
      >
        <motion.div 
          whileHover={{ scale: 1.1, x: -10 }}
          className="relative group cursor-default"
        >
          <h2 className="font-romantic text-3xl md:text-6xl text-red-800 tracking-tight leading-tight italic group-hover:text-red-600 transition-colors duration-500 drop-shadow-sm">
            ...to <span className="not-italic font-bold">"You are mine"</span>
          </h2>
          <div className="flex justify-end">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 1.8, duration: 1 }}
              className="h-[2px] bg-red-300 mt-2 group-hover:bg-red-500 transition-colors duration-500"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative Gradient vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(254,226,226,0.15)_100%)]"></div>
    </div>
  );
};

export default LandingPage;
