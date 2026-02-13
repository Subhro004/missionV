
import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { Heart, Sparkles, Star, ChevronRight } from 'lucide-react';
import Snowfall from './Snowfall';

interface FinalLetterPageProps {
  onNext?: () => void;
}

const FinalLetterPage: React.FC<FinalLetterPageProps> = ({ onNext }) => {
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
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 1.2, ease: "easeOut" }
    },
  };

  const textInteraction = {
    whileHover: { x: 15, color: "#fca5a5", transition: { duration: 0.4 } },
    whileTap: { scale: 0.98, x: 5 },
  };

  const embers = useMemo(() => {
    return [...Array(30)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      duration: 15 + Math.random() * 25,
      delay: Math.random() * -20,
      drift: (Math.random() - 0.5) * 10,
    }));
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-[#1a0505] overflow-y-auto overflow-x-hidden flex flex-col items-center py-20 px-6">
      <Snowfall />

      <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
        {embers.map((ember) => (
          <motion.div
            key={ember.id}
            initial={{ 
              left: `${ember.x}%`, 
              top: `${ember.y + 10}%`, 
              opacity: 0,
              scale: 0 
            }}
            animate={{ 
              top: [`${ember.y + 10}%`, `${ember.y - 20}%`],
              left: [`${ember.x}%`, `${ember.x + ember.drift}%`],
              opacity: [0, 0.4, 0.4, 0],
              scale: [0, 1, 1, 0]
            }}
            transition={{
              duration: ember.duration,
              repeat: Infinity,
              delay: ember.delay,
              ease: "linear",
            }}
            className="absolute rounded-full bg-red-400/40 blur-[1px]"
            style={{ width: ember.size, height: ember.size }}
          />
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-20 w-full max-w-3xl space-y-12"
      >
        <motion.div variants={itemVariants} className="space-y-4">
          <motion.h2 
            {...textInteraction}
            className="font-romantic text-5xl md:text-7xl text-red-100 cursor-default"
          >
            For Kaju’s Kismis,
          </motion.h2>
          <div className="h-[2px] w-24 bg-gradient-to-r from-red-500 to-transparent" />
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="bg-white/5 backdrop-blur-sm border-l-4 border-red-600 p-8 md:p-12 rounded-r-3xl shadow-2xl relative"
        >
          <Sparkles className="absolute -top-4 -right-4 text-yellow-300 opacity-50" size={32} />
          <motion.p 
            {...textInteraction}
            className="font-playfair italic text-2xl md:text-4xl text-red-200 leading-relaxed drop-shadow-lg cursor-default"
          >
            “In a world full of doubts, I will always be your sure thing.”
          </motion.p>
        </motion.div>

        <motion.div variants={itemVariants} className="space-y-10 font-playfair italic text-red-100/90 leading-[1.8] text-xl md:text-2xl">
          <motion.p 
            {...textInteraction}
            className="font-romantic text-5xl text-red-300 cursor-default"
          >
            I love you.
          </motion.p>
          
          <motion.p {...textInteraction} className="cursor-default">
            And I care about you more than I probably ever say out loud.
          </motion.p>
          
          <motion.p 
            {...textInteraction}
            className="text-red-200/70 border-l border-red-900 pl-6 cursor-default"
          >
            I am not very good at expressing my feelings or writing stuff like this…
            so yeah, I might mess it up a little but still, let's try.
          </motion.p>

          <motion.p {...textInteraction} className="cursor-default">
            It's funny how I go through my day so recklessly, so carefree…
            and then suddenly I become soft... careful… gentle... the moment I am around you.
          </motion.p>

          <motion.div 
            {...textInteraction}
            className="flex items-center gap-4 text-red-300 font-bold not-italic cursor-default font-montserrat"
          >
            <span>Ami nijei notice korechi eta 😂😂</span>
          </motion.div>

          <motion.p {...textInteraction} className="cursor-default">
            Tui nishchoi kichu kala jadu korechis.
            Because somehow you lowered all my recklessness 
            and increased my patience.
          </motion.p>

          <motion.p 
            {...textInteraction}
            className="relative z-10 cursor-default"
          >
            And trust me, patience is something I <span className="text-red-400 font-bold not-italic font-montserrat">NEVER</span> thought I would have in my life. From waiting outside tuition, waiting for your replies to waiting here in my hostel just to spend a little more time with you… Had it been before, I would have killed people for far less.
          </motion.p>
        </motion.div>

        <motion.div variants={itemVariants} className="pt-12 text-right">
          <p className="font-cinzel text-red-400 tracking-[0.4em] text-xs uppercase mb-2">With all my heart,</p>
          <motion.h3 
            {...textInteraction}
            className="font-romantic text-6xl md:text-8xl text-red-100 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] cursor-default"
          >
            From Your Kaju
          </motion.h3>
        </motion.div>

        {onNext && (
          <motion.div 
            variants={itemVariants}
            className="flex justify-center pt-20"
          >
             <motion.button
               onClick={onNext}
               whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(239, 68, 68, 0.4)" }}
               whileTap={{ scale: 0.95 }}
               className="group relative px-12 py-5 bg-red-600 rounded-full flex items-center gap-4 text-white shadow-2xl transition-all duration-300"
             >
               <Heart className="animate-pulse" fill="white" size={24} />
               <span className="font-romantic text-3xl">You complete me</span>
               <ChevronRight className="group-hover:translate-x-1 transition-transform" />
             </motion.button>
          </motion.div>
        )}

        <motion.div 
          variants={itemVariants}
          className="flex justify-center pt-24 pb-12"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.4, 1, 0.4]
            }}
            transition={{ repeat: Infinity, duration: 4 }}
          >
            <Heart size={48} fill="currentColor" className="text-red-600 drop-shadow-[0_0_20px_rgba(220,38,38,0.5)]" />
          </motion.div>
        </motion.div>
      </motion.div>

      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="fixed pointer-events-none text-red-500/10 z-10"
          initial={{ 
            x: Math.random() * window.innerWidth, 
            y: Math.random() * window.innerHeight 
          }}
          animate={{ 
            y: [null, -100, null],
            opacity: [0, 0.5, 0]
          }}
          transition={{ 
            duration: 10 + Math.random() * 20, 
            repeat: Infinity,
            delay: i * 2
          }}
        >
          <Star size={Math.random() * 30 + 10} fill="currentColor" />
        </motion.div>
      ))}
    </div>
  );
};

export default FinalLetterPage;
