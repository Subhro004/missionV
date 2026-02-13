
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Heart, ChevronRight } from 'lucide-react';
import Snowfall from './Snowfall';

interface LetterPageProps {
  onNext: () => void;
}

const LetterPage: React.FC<LetterPageProps> = ({ onNext }) => {
  // Animation variants for staggered text reveal
  // Added Variants type to prevent easing string literal widening
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.5,
      },
    },
  };

  // Added Variants type to fix 'string' is not assignable to 'Easing' error
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1, ease: "easeOut" }
    },
  };

  const interactiveTextClass = "cursor-default hover:text-red-600 transition-all duration-300 inline-block drop-shadow-sm";

  return (
    <div className="relative min-h-screen w-full bg-red-50 flex flex-col items-center justify-center p-6 md:p-12 overflow-y-auto overflow-x-hidden">
      <Snowfall />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
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
            transition={{ delay: 0.3 }}
          >
            <h1 className="font-romantic text-5xl md:text-7xl text-red-600 leading-tight">
              For my Sweetest distraction...
            </h1>
          </motion.div>

          {/* Staggered Text Reveal */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="font-montserrat text-base md:text-lg text-red-950 leading-[1.8] space-y-6 font-medium tracking-tight"
          >
            <motion.p variants={itemVariants}>
              <span className={interactiveTextClass}>I think this is the perfect day to go back to that night —</span><br />
              <motion.strong 
                whileHover={{ scale: 1.05, color: "#991b1b" }}
                className="font-bold text-red-800 cursor-pointer transition-transform inline-block"
              >
                30th August 2025, Saturday.
              </motion.strong><br />
              <span className={interactiveTextClass}>Your last 4th sem exam… Computer.</span>
            </motion.p>

            <motion.p variants={itemVariants}>
              <span className={interactiveTextClass}>After that you went shopping at Garia, remember?</span>
            </motion.p>

            <motion.p variants={itemVariants}>
              <span className={interactiveTextClass}>Then you came home — sobai chilo… ma, baba, mistimoni, papel — all watching TV together.</span><br />
              <span className={interactiveTextClass}>And in the middle of all that, you were busy doing just one thing…</span><br />
              <span className={interactiveTextClass}>relieving me of my misery with four simple words:</span>
            </motion.p>
            
            <motion.p variants={itemVariants} className="text-center py-4">
              <motion.span 
                whileHover={{ scale: 1.15, rotate: [0, -1, 1, 0] }}
                className="text-red-600 font-bold italic underline decoration-red-300 underline-offset-8 cursor-help px-4 py-2 inline-block transition-transform text-3xl md:text-4xl"
              >
                “The answer is yes.”
              </motion.span>
            </motion.p>

            <motion.p variants={itemVariants}>
              <span className={interactiveTextClass}>I won’t hide it today, I won’t deny it —</span><br />
              <span className={interactiveTextClass}>I was overjoyed. Super happy.</span><br />
              <span className={interactiveTextClass}>So peaceful that I literally fell asleep smiling like a kid.</span><br />
              <span className={interactiveTextClass}>And when I woke up the next morning… everything still felt unreal.</span>
            </motion.p>

            <motion.p variants={itemVariants} className="font-bold text-red-800 italic text-xl">
              But that was just the beginning.
            </motion.p>

            <motion.p variants={itemVariants}>
              <span className={interactiveTextClass}>Because from that day onwards…</span><br />
              <motion.span 
                whileHover={{ scale: 1.05, textShadow: "0 0 8px rgba(220, 38, 38, 0.4)" }}
                className="text-red-700 font-bold italic transition-all inline-block text-xl md:text-2xl mt-2"
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
             transition={{ delay: 3.5 }}
             className="pt-6 border-t border-red-50"
          >
            <p className="font-bold text-xl md:text-2xl font-romantic text-red-800 hover:text-red-600 transition-colors duration-500 cursor-default">
              The Day superlajuk pro max Subhangee put me out of my misery.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 4.5 }}
            className="pt-6 flex justify-center"
          >
            <button 
              onClick={onNext}
              className="group flex items-center gap-3 px-10 py-4 bg-red-600 text-white rounded-full font-cinzel tracking-widest text-sm hover:bg-red-700 transition-all shadow-xl hover:scale-105 active:scale-95"
            >
              Continue Our Journey
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>

        {/* Floating background heart inside the card */}
        <motion.div 
          animate={{ rotate: [12, 18, 12], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute -bottom-10 -right-10 opacity-10 pointer-events-none"
        >
          <Heart size={200} className="text-red-900" />
        </motion.div>
      </motion.div>

      {/* Page vignette */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(254,202,202,0.15)_100%)]"></div>
    </div>
  );
};

export default LetterPage;
