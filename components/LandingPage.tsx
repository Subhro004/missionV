
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Snowfall from './Snowfall';

interface LandingPageProps {
  onNext: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onNext }) => {
  return (
    <div className="relative h-screen w-full bg-red-50 overflow-hidden flex items-center justify-center">
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
        className="absolute top-10 left-10 md:top-16 md:left-16 z-30"
      >
        <motion.div 
          whileHover={{ scale: 1.1, x: 10 }}
          className="relative group cursor-default"
        >
          <h2 className="font-romantic text-4xl md:text-6xl text-red-800 tracking-tight leading-tight group-hover:text-red-600 transition-colors duration-500 drop-shadow-sm">
            From <span className="italic">"Coat of Justice"</span>...
          </h2>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ delay: 1.2, duration: 1 }}
            className="h-[2px] bg-red-300 mt-2 group-hover:bg-red-500 transition-colors duration-500"
          />
          <p className="font-cinzel text-[10px] md:text-xs text-red-400 tracking-[0.3em] uppercase mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            A small beginning
          </p>
        </motion.div>
      </motion.div>

      {/* Center Button: Refined Focal Point */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="z-40"
      >
        <button
          onClick={onNext}
          className="group relative flex flex-col items-center gap-6 transition-all hover:scale-105"
        >
          <div className="relative px-14 py-6 bg-white/80 backdrop-blur-md shadow-[0_20px_50px_rgba(239,68,68,0.15)] border border-red-100 rounded-full overflow-hidden transition-all duration-700 hover:shadow-red-200/50">
            <span className="relative z-10 font-cinzel text-red-950 text-sm md:text-lg tracking-[0.4em] uppercase font-bold">
              Let's embark on this journey
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
            <Heart size={32} className="text-red-600 fill-current" />
          </motion.div>
        </button>
      </motion.div>

      {/* Bottom Right Message: Enhanced visibility and interactivity */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
        className="absolute bottom-10 right-10 md:bottom-16 md:right-16 z-30 text-right"
      >
        <motion.div 
          whileHover={{ scale: 1.1, x: -10 }}
          className="relative group cursor-default"
        >
          <h2 className="font-romantic text-4xl md:text-6xl text-red-800 tracking-tight leading-tight italic group-hover:text-red-600 transition-colors duration-500 drop-shadow-sm">
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
          <p className="font-cinzel text-[10px] md:text-xs text-red-400 tracking-[0.3em] uppercase mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            A beautiful destiny
          </p>
        </motion.div>
      </motion.div>

      {/* Decorative Gradient vignette */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_30%,_rgba(254,226,226,0.15)_100%)]"></div>
    </div>
  );
};

export default LandingPage;
