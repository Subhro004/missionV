
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ChevronRight } from 'lucide-react';
import Snowfall from './Snowfall';

interface FinalImagePageProps {
  onNext?: () => void;
}

const FinalImagePage: React.FC<FinalImagePageProps> = ({ onNext }) => {
  const imageUrl = "https://drive.google.com/thumbnail?id=1QtzJlsUyzdL1NnTe1l4r3HgVkY_UIc6-&sz=w1600";

  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      <Snowfall />
      
      {/* Cinematic wide-view container */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 3 }}
        className="w-full h-full absolute inset-0 flex items-center justify-center"
      >
        <img 
          src={imageUrl} 
          alt="Our forever" 
          className="w-full h-full object-contain max-h-[90vh] md:max-h-screen p-4 md:p-10"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://picsum.photos/1200/800?romantic=1";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-40"></div>
      </motion.div>

      {/* Subtle overlay text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 2 }}
        className="z-20 absolute bottom-12 text-center w-full flex flex-col items-center gap-6"
      >
        <h2 className="font-romantic text-5xl md:text-7xl text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
          Always Yours, Kaju
        </h2>
        
        {onNext && (
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(220, 38, 38, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 px-8 py-3 border border-white/20 bg-white/5 backdrop-blur-md text-white rounded-full font-cinzel tracking-widest text-xs uppercase transition-all duration-300"
          >
            Continue our story
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        )}

        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="mt-2"
        >
          <Heart size={24} className="text-red-600" fill="currentColor" />
        </motion.div>
      </motion.div>

      {/* Decorative frame corners */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-white/20 m-8 rounded-tl-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-white/20 m-8 rounded-br-3xl pointer-events-none"></div>
    </div>
  );
};

export default FinalImagePage;
