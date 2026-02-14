
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Heart, ChevronRight } from 'lucide-react';
import Snowfall from './Snowfall';

interface LetterPageProps {
  onNext: () => void;
}

const LetterPage: React.FC<LetterPageProps> = ({ onNext }) => {
  // Refined animation variants for smoother staggered reveal
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 1.0, // Increased for deliberate, cinematic reading
        delayChildren: 1.4,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: { 
        duration: 2.0, 
        ease: [0.16, 1, 0.3, 1] // Smooth easeOutExpo
      }
    },
  };

  const sentenceHover = {
    scale: 1.02,
    x: 10,
    color: "#dc2626", // Red-600
    textShadow: "0 0 15px rgba(220, 38, 38, 0.2)",
    transition: { type: "spring", stiffness: 300, damping: 20 }
  };

  // Helper component for interactive sentences
  const InteractiveSentence: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
    <motion.span 
      whileHover={sentenceHover}
      className={`inline-block cursor-default transition-colors duration-300 drop-shadow-sm origin-left ${className}`}
    >
      {children}
    </motion.span>
  );

  return (
    <div className="relative min-h-screen w-full bg-red-50 flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto overflow-x-hidden">
      <Snowfall />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-3xl bg-white/80 backdrop-blur-md p-8 md:p-16 rounded-3xl shadow-2xl border border-red-100 my-10"
      >
        {/* Letter Ornament */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-red-600 p-3 rounded-full shadow-lg">
          <Heart fill="white" className="text-white" size={24} />
        </div>

        <div className="space-y-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 2, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.h1 
              whileHover={{ scale: 1.02, color: "#991b1b" }}
              className="font-romantic text-5xl md:text-7xl text-red-600 leading-tight cursor-default select-none"
            >
              For my Sweetest distraction...
            </motion.h1>
          </motion.div>

          {/* Staggered Text Reveal */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="font-montserrat text-base md:text-lg text-red-950 leading-[2] space-y-8 font-medium tracking-tight"
          >
            <motion.p variants={itemVariants} className="flex flex-col gap-2">
              <InteractiveSentence>I think this is the perfect day to go back to that night —</InteractiveSentence>
              <motion.strong 
                whileHover={{ scale: 1.08, color: "#991b1b", x: 15 }}
                className="font-bold text-red-800 cursor-pointer transition-all inline-block origin-left text-xl md:text-2xl"
              >
                30th August 2025, Saturday.
              </motion.strong>
              <InteractiveSentence>Your last 4th sem exam… Computer.</InteractiveSentence>
            </motion.p>

            <motion.p variants={itemVariants}>
              <InteractiveSentence>After that you went shopping at Garia, remember?</InteractiveSentence>
            </motion.p>

            <motion.p variants={itemVariants} className="flex flex-col gap-2">
              <InteractiveSentence>Then you came home — sobai chilo… ma, baba, mistimoni, papel — all watching TV together.</InteractiveSentence>
              <InteractiveSentence>And in the middle of all that, you were busy doing just one thing…</InteractiveSentence>
              <InteractiveSentence>relieving me of my misery with four simple words:</InteractiveSentence>
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-center py-6">
              <motion.span 
                whileHover={{ 
                  scale: 1.2, 
                  rotate: [-1, 1, -1, 0],
                  textShadow: "0 0 25px rgba(220, 38, 38, 0.4)"
                }}
                className="text-red-600 font-bold italic underline decoration-red-300 underline-offset-8 cursor-heart px-6 py-2 inline-block transition-all text-4xl md:text-5xl"
              >
                “The answer is yes.”
              </motion.span>
            </motion.p>

            <motion.p variants={itemVariants} className="flex flex-col gap-2">
              <InteractiveSentence>I won’t hide it today, I won’t deny it —</InteractiveSentence>
              <InteractiveSentence>I was overjoyed. Super happy.</InteractiveSentence>
              <InteractiveSentence>So peaceful that I literally fell asleep smiling like a kid.</InteractiveSentence>
              <InteractiveSentence>And when I woke up the next morning… everything still felt unreal.</InteractiveSentence>
            </motion.p>

            <motion.p variants={itemVariants}>
              <motion.span 
                whileHover={{ scale: 1.05, x: 10, color: "#7f1d1d" }}
                className="font-bold text-red-800 italic text-2xl inline-block transition-all cursor-default"
              >
                But that was just the beginning.
              </motion.span>
            </motion.p>

            <motion.p variants={itemVariants}>
              <InteractiveSentence>Because from that day onwards…</InteractiveSentence><br />
              <motion.span 
                whileHover={{ 
                  scale: 1.05, 
                  textShadow: "0 0 12px rgba(220, 38, 38, 0.5)",
                  color: "#dc2626"
                }}
                className="text-red-700 font-bold italic transition-all inline-block text-2xl md:text-3xl mt-4"
              >
                I kept falling more and more in love with you
              </motion.span>.
            </motion.p>
          </motion.div>

          {/* Footer of the letter card */}
          <motion.div
             initial={{ opacity: 0, scale: 0.9 }}
             whileInView={{ opacity: 1, scale: 1 }}
             viewport={{ once: true }}
             transition={{ delay: 3.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
             className="pt-8 border-t border-red-100"
          >
            <motion.p 
              whileHover={{ scale: 1.02, color: "#991b1b" }}
              className="font-bold text-2xl md:text-3xl font-romantic text-red-800 transition-colors duration-500 cursor-default leading-tight"
            >
              The Day superlajuk pro max Subhangee put me out of my misery.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 5.5, duration: 1 }}
            className="pt-6 flex justify-center"
          >
            <motion.button 
              onClick={onNext}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 15px 35px rgba(220, 38, 38, 0.3)"
              }}
              whileTap={{ scale: 0.96 }}
              className="group flex items-center gap-3 px-10 py-5 bg-red-600 text-white rounded-full font-cinzel tracking-widest text-sm transition-all shadow-xl overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-white/10 -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
              <span className="relative z-10 flex items-center gap-3">
                Continue Our Journey
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </motion.div>
        </div>

        {/* Floating background heart inside the card */}
        <motion.div 
          animate={{ rotate: [12, 18, 12], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute -bottom-10 -right-10 opacity-[0.05] pointer-events-none"
        >
          <Heart size={250} className="text-red-900" />
        </motion.div>
      </motion.div>

      {/* Page vignette */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(254,202,202,0.15)_100%)]"></div>
    </div>
  );
};

export default LetterPage;
