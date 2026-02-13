
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Heart, Stars, ChevronRight } from 'lucide-react';
import Snowfall from './Snowfall';

interface NicknamePageProps {
  onNext: () => void;
}

const NicknamePage: React.FC<NicknamePageProps> = ({ onNext }) => {
  // Added Variants type to prevent easing string literal widening
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.8,
        delayChildren: 0.3,
      },
    },
  };

  // Added Variants type to fix 'string' is not assignable to 'Easing' error
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: "easeOut" }
    },
  };

  return (
    <div className="relative min-h-screen w-full bg-red-50 flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto">
      <Snowfall />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-20 w-full max-w-4xl space-y-12 py-12"
      >
        <motion.div variants={itemVariants} className="space-y-6 text-center">
          <p className="font-playfair text-xl md:text-2xl text-red-900 leading-relaxed max-w-2xl mx-auto">
            I’ve always been a huge fan of personalization.
          </p>
          <p className="font-montserrat text-base md:text-lg text-red-800/80 leading-relaxed max-w-3xl mx-auto">
            So for the longest time, I kept trying to find the perfect nickname for you. I tried Lavender… Lily… and so many others… but honestly? None of them felt right. I didn’t like them myself either. They just didn’t feel <span className="italic font-bold">you</span>.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center">
          <div className="h-px w-24 bg-red-200 mx-auto my-8" />
          <h3 className="font-romantic text-4xl md:text-5xl text-red-700">
            Then one day I realized something.
          </h3>
          <p className="font-playfair italic text-lg text-red-900 mt-4">
            I was looking too hard and too far… when the answer was always right there within me.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="bg-white/40 backdrop-blur-sm p-8 rounded-2xl border border-red-100 shadow-xl max-w-2xl mx-auto text-center space-y-6">
          <p className="font-montserrat text-lg text-red-950 font-medium italic">
            All these years, people have been asking me since childhood,
          </p>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="font-romantic text-5xl md:text-6xl text-red-600 drop-shadow-sm"
          >
            “Kaju… Kismis koi?” 😂
          </motion.div>
          <p className="font-montserrat text-sm text-red-800/70 tracking-wide uppercase">
            And I guess life was just waiting for the right person to give that answer.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center space-y-6">
          <p className="font-playfair text-xl text-red-900">
            But kya kare… your boyfriend is too filmy.
          </p>
          <p className="font-montserrat text-base text-red-800/80">
            I couldn’t just casually give you such a special nickname. I had to wait for the perfect day… a proper Bollywood-style reveal.
          </p>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center space-y-8 pt-6">
          <div className="flex justify-center items-center gap-4">
            <Stars className="text-red-400 animate-pulse" />
            <p className="font-cinzel text-red-900 tracking-widest text-sm">So here we are, today.</p>
            <Stars className="text-red-400 animate-pulse" />
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 4.5, duration: 1.5, type: "spring" }}
            className="space-y-4"
          >
            <h2 className="font-romantic text-6xl md:text-8xl text-red-600 drop-shadow-lg">
              I finally have my Kismis ❤️
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 6 }}
            className="pt-12"
          >
            <button 
              onClick={onNext}
              className="group flex items-center gap-3 px-12 py-4 bg-red-600 text-white rounded-full font-cinzel tracking-widest text-sm hover:bg-red-700 transition-all shadow-xl hover:scale-105 active:scale-95 mx-auto"
            >
              Continue Our Story
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative background elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 5, -5, 0]
        }}
        transition={{ repeat: Infinity, duration: 8 }}
        className="fixed bottom-10 left-10 opacity-10 pointer-events-none"
      >
        <Heart size={150} fill="currentColor" className="text-red-900" />
      </motion.div>
    </div>
  );
};

export default NicknamePage;
