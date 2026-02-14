
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Heart, Stars, ChevronRight } from 'lucide-react';
import Snowfall from './Snowfall';

interface NicknamePageProps {
  onNext: () => void;
}

const NicknamePage: React.FC<NicknamePageProps> = ({ onNext }) => {
  // Refined animation variants for deliberate impact
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 1.5, // Significantly increased for storytelling impact
        delayChildren: 1.0,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, filter: "blur(12px)" },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 2.2, 
        ease: [0.16, 1, 0.3, 1] 
      }
    },
  };

  const textGlowHover = {
    scale: 1.08,
    textShadow: [
      "0 0 10px rgba(220, 38, 38, 0.4)",
      "0 0 20px rgba(220, 38, 38, 0.6)",
      "0 0 30px rgba(220, 38, 38, 0.4)"
    ],
    color: "#dc2626", // Red-600
    transition: { 
      type: "spring" as const, 
      stiffness: 300, 
      damping: 15 
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-red-50 flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto overflow-x-hidden">
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

        {/* Enhanced Interactive Box */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ 
            scale: 1.03,
            boxShadow: "0 20px 60px rgba(220, 38, 38, 0.25), 0 0 30px rgba(220, 38, 38, 0.15)",
            borderColor: "rgba(220, 38, 38, 0.4)",
            backgroundColor: "rgba(255, 255, 255, 0.6)"
          }}
          className="bg-white/40 backdrop-blur-sm p-10 rounded-3xl border border-red-100 shadow-xl max-w-2xl mx-auto text-center space-y-6 cursor-pointer transition-all duration-500 group"
        >
          <p className="font-montserrat text-lg text-red-950 font-medium italic group-hover:text-red-900 transition-colors">
            All these years, people have been asking me since childhood,
          </p>
          <motion.div 
            whileHover={textGlowHover}
            className="font-romantic text-6xl md:text-7xl text-red-600 drop-shadow-sm select-none"
          >
            “Kaju… Kismis koi?” 😂
          </motion.div>
          <p className="font-montserrat text-sm text-red-800/70 tracking-wide uppercase group-hover:text-red-600 transition-colors">
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
            <p className="font-cinzel text-red-900 tracking-widest text-sm uppercase">So here we are, today.</p>
            <Stars className="text-red-400 animate-pulse" />
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 2, type: "spring", bounce: 0.4 }}
            className="space-y-4"
          >
            <motion.h2 
              whileHover={textGlowHover}
              className="font-romantic text-6xl md:text-9xl text-red-600 drop-shadow-lg cursor-default select-none inline-block px-8 py-2"
            >
              I finally have my Kismis ❤️
            </motion.h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1.5 }}
            className="pt-12"
          >
            <motion.button 
              onClick={onNext}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 35px rgba(220, 38, 38, 0.4)"
              }}
              whileTap={{ scale: 0.96 }}
              className="group flex items-center gap-3 px-12 py-5 bg-red-600 text-white rounded-full font-cinzel tracking-widest text-sm transition-all shadow-2xl mx-auto overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <span className="relative z-10 flex items-center gap-3">
                Continue Our Story
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative background elements */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ repeat: Infinity, duration: 10 }}
        className="fixed -bottom-20 -left-20 opacity-[0.05] pointer-events-none"
      >
        <Heart size={400} fill="currentColor" className="text-red-900" />
      </motion.div>
    </div>
  );
};

export default NicknamePage;
