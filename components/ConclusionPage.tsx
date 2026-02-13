
import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Stars } from 'lucide-react';
import Snowfall from './Snowfall';

const ConclusionPage: React.FC = () => {
  // Provided image ID: 1Ujddz11GjaH6q7N4TX0nCDwRcT6NT8xn
  const imageUrl = "https://drive.google.com/thumbnail?id=1Ujddz11GjaH6q7N4TX0nCDwRcT6NT8xn&sz=w1600";

  return (
    <div className="relative min-h-screen w-full bg-[#0a0101] flex flex-col items-center justify-center p-6 md:p-12 overflow-hidden">
      <Snowfall />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.08)_0%,_transparent_70%)] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="z-20 w-full max-w-5xl flex flex-col md:flex-row items-center gap-12 md:gap-20"
      >
        {/* Image Card with 3D Float Effect */}
        <motion.div
          initial={{ x: -50, opacity: 0, rotate: -5 }}
          animate={{ x: 0, opacity: 1, rotate: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative group perspective-1000 w-full max-w-[400px]"
        >
          <div className="absolute -inset-2 bg-gradient-to-tr from-red-600/20 via-transparent to-red-600/20 blur-xl opacity-0 group-hover:opacity-100 transition duration-1000"></div>
          <div className="relative bg-white/5 p-2 rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden backdrop-blur-sm">
            <img 
              src={imageUrl} 
              alt="A beautiful memory" 
              className="w-full aspect-[4/5] object-cover rounded-[2rem] grayscale-[20%] group-hover:grayscale-0 transition-all duration-1000"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/800/1000?romantic=2";
              }}
            />
          </div>
          
          <motion.div 
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4 }}
            className="absolute -top-6 -right-6 text-red-500"
          >
            <Sparkles size={40} />
          </motion.div>
        </motion.div>

        {/* Text Section */}
        <div className="flex-1 space-y-8 text-center md:text-left">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <h3 className="font-romantic text-5xl md:text-7xl text-red-100 drop-shadow-sm">
              My Sweetest Rai...
            </h3>
            <div className="h-[1px] w-24 bg-red-600/50 my-6 mx-auto md:mx-0"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1.5 }}
            className="space-y-6 font-playfair italic text-xl md:text-2xl text-red-200/90 leading-relaxed"
          >
            <p>
              "Some people search their whole lives to find what I found in you."
            </p>
            <p className="text-white font-medium not-italic">
              Tui amar shei 'yes' jeta ami protidin thank koli bhogoban ke.
            </p>
            <p className="text-red-100/70">
              I promise to be the man who keeps choosing you, over and over again, without a single doubt in my mind.
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 2, duration: 1 }}
            className="pt-8 flex flex-col items-center md:items-start gap-4"
          >
            <div className="flex items-center gap-3">
              <Stars className="text-yellow-500/50" size={20} />
              <p className="font-cinzel tracking-[0.4em] text-xs text-red-400 uppercase font-bold">
                Endless Love Story
              </p>
              <Stars className="text-yellow-500/50" size={20} />
            </div>
            
            <p className="font-romantic text-4xl md:text-5xl text-red-100">
              Yours, Kaju ❤️
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Floating background heart decoration */}
      <motion.div
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.03, 0.07, 0.03]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-10 right-10 pointer-events-none"
      >
        <Heart size={300} fill="currentColor" className="text-red-900" />
      </motion.div>

      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom_right,_rgba(220,38,38,0.05)_0%,_transparent_50%)]"></div>
    </div>
  );
};

export default ConclusionPage;
