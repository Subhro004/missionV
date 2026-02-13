
import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import Snowfall from './Snowfall';

const WrapUpPage: React.FC = () => {
  const imageUrl = "https://drive.google.com/thumbnail?id=1QtzJlsUyzdL1NnTe1l4r3HgVkY_UIc6-&sz=w1600";

  return (
    <div className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden">
      <Snowfall />
      
      {/* Cinematic Image Background */}
      <motion.div
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 3, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <img 
          src={imageUrl} 
          alt="Our wrap up" 
          className="w-full h-full object-contain md:object-cover p-4 md:p-0 opacity-60"
          onError={(e) => {
            (e.target as HTMLImageElement).src = "https://picsum.photos/1600/900?romantic=4";
          }}
        />
        {/* Dark cinematic vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/80"></div>
      </motion.div>

      {/* Final Messages */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 2 }}
        className="z-20 text-center px-6 max-w-4xl space-y-12"
      >
        <div className="space-y-4">
          <motion.h1 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="font-romantic text-6xl md:text-8xl text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]"
          >
            That's a wrap
          </motion.h1>
          <p className="font-playfair italic text-2xl md:text-3xl text-red-100/70 tracking-wide">
            Until the next year
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1.5 }}
          className="pt-10 flex flex-col items-center gap-8"
        >
          <h2 className="font-romantic text-5xl md:text-7xl text-red-500">
            Happy Valentine's Day Subhangee
          </h2>
          
          <motion.div
            animate={{ scale: [1, 1.3, 1], rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="text-red-600"
          >
            <Heart size={64} fill="currentColor" className="drop-shadow-[0_0_20px_rgba(220,38,38,0.6)]" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Page decorative corners */}
      <div className="absolute top-0 left-0 w-32 h-32 border-t border-l border-white/10 m-12 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 border-b border-r border-white/10 m-12 pointer-events-none"></div>
      
      {/* Footer Signature */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 5, duration: 2 }}
        className="absolute bottom-8 text-center w-full"
      >
        <p className="font-cinzel text-[10px] tracking-[0.8em] text-white uppercase">
          Forever Yours, Kaju
        </p>
      </motion.div>
    </div>
  );
};

export default WrapUpPage;
