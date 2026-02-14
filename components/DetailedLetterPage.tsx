
import React, { useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform, Variants } from 'framer-motion';
import { Heart, Sparkles, ChevronRight } from 'lucide-react';
import Snowfall from './Snowfall';

interface DetailedLetterPageProps {
  onNext: () => void;
}

const DetailedLetterPage: React.FC<DetailedLetterPageProps> = ({ onNext }) => {
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);
  
  // Dynamic Lighting/Glow Position
  const glowX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Granular content for more impactful reveal
  const letterParts = useMemo(() => [
    "I have an endless list of things I want to say to you.",
    "Thank you for existing in my life not just today or tomorrow, but every day… every hour… every minute… every second.",
    "When everything feels uncertain, I want you to always be certain of me.",
    "I will stand by you always.",
    "I want to be your support system, your safe place, your lifeline — just like you are mine.",
    "I will always be the man you can tell everything to, trust blindly, and never fear being judged.",
    "And always come to me when you need a break from the world.",
    "I will also always be the lovable idiot who roasts you the best, annoys you the most and cares for you the deepest.",
    "And you will always be the girl who laughs at my lame jokes, scolds me for my recklessness, and gets mad at my stupidness.",
    "I will always be the man you tell your jokes and you deepest thoughts to.",
    "You will always the woman I will tell the most random useless things of my day… and share each other's every detail.",
    "I promise to keep flirting with you every day, to never stop doing cute little things for you.",
    "When you blush, I will make you blush harder.",
    "And yes, you can keep scolding and hitting me (thats your love language 😂)…",
    "bas please, try not to break my head daily."
  ], []);

  const containerVariants: Variants = {
    hidden: { 
      opacity: 0, 
      scale: 0.85, 
      z: -100,
      y: 50 
    },
    visible: {
      opacity: 1,
      scale: 1,
      z: 0,
      y: 0,
      transition: {
        duration: 2,
        staggerChildren: 1.2, // More deliberate and impactful reading pace
        delayChildren: 1.8,
        ease: [0.16, 1, 0.3, 1] // Cinematic easeOutExpo
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      x: -30, 
      filter: "blur(15px)",
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      x: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: { 
        duration: 2.5, // Even smoother, longer entrance
        ease: [0.16, 1, 0.3, 1] 
      }
    },
    hover: { 
      x: 12, 
      color: "#fee2e2", 
      textShadow: "0 0 20px rgba(254, 226, 226, 0.4)",
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0d0202] flex flex-col items-center py-20 px-6 overflow-y-auto overflow-x-hidden">
      <Snowfall />
      
      {/* Background radial glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.12)_0%,_transparent_80%)] pointer-events-none"></div>

      <div 
        className="perspective-2000 w-full max-w-2xl z-20"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ 
            scale: 1.04,
            z: 80,
            boxShadow: "0 60px 120px rgba(0,0,0,0.85), 0 0 80px rgba(220, 38, 38, 0.3)"
          }}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full space-y-8 bg-white/5 backdrop-blur-2xl p-8 md:p-14 rounded-[3.5rem] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.7)] group transition-all duration-1000"
        >
          {/* Main Pulsing Glow Effect */}
          <motion.div 
            animate={{ 
              opacity: [0.1, 0.3, 0.1],
              boxShadow: [
                "inset 0 0 40px rgba(220, 38, 38, 0.2)",
                "inset 0 0 100px rgba(220, 38, 38, 0.45)",
                "inset 0 0 40px rgba(220, 38, 38, 0.2)"
              ]
            }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-[3.5rem] pointer-events-none z-0"
          />

          {/* Dynamic Interactive Light Spot */}
          <motion.div 
            style={{
              background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(255,255,255,0.15) 0%, transparent 60%)`,
              transform: "translateZ(120px)"
            }}
            className="absolute inset-0 pointer-events-none rounded-[3.5rem] z-0"
          />

          <motion.div variants={itemVariants} className="flex justify-center mb-6" style={{ transform: "translateZ(60px)" }}>
            <motion.div
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut" }}
            >
              <Sparkles className="text-red-400 drop-shadow-[0_0_15px_rgba(248,113,113,0.9)]" size={48} />
            </motion.div>
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            style={{ transform: "translateZ(150px)" }}
            whileHover={{ scale: 1.05, textShadow: "0 0 40px rgba(255,255,255,0.6)" }}
            className="font-romantic text-6xl md:text-8xl text-red-100 text-center drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] select-none cursor-default leading-tight"
          >
            Dear Love,
          </motion.h2>

          <motion.div 
            className="font-playfair italic text-lg md:text-xl text-red-100/95 leading-relaxed space-y-6 relative z-10"
            style={{ transform: "translateZ(90px)" }}
          >
            {letterParts.map((text, idx) => (
              <motion.p 
                key={idx}
                variants={itemVariants}
                whileHover="hover"
                className="cursor-default select-none transition-colors duration-500 drop-shadow-sm"
              >
                {text}
              </motion.p>
            ))}
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            className="pt-14 text-right space-y-3"
            style={{ transform: "translateZ(180px)" }}
          >
            <p className="font-cinzel text-red-400 text-xs tracking-[0.6em] uppercase opacity-70">Yours Lovable Idiot</p>
            <motion.h3 
              whileHover={{ 
                scale: 1.1, 
                color: "#fff", 
                textShadow: "0 0 35px rgba(255,255,255,0.6)",
                x: -10
              }}
              className="font-romantic text-7xl md:text-9xl text-red-100 transition-all duration-500 cursor-default select-none"
            >
              Your Kaju ❤️
            </motion.h3>
          </motion.div>

          {/* Navigation Button */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center pt-16"
            style={{ transform: "translateZ(120px)" }}
          >
            <motion.button
              onClick={onNext}
              whileHover={{ 
                scale: 1.1, 
                y: -8,
                backgroundColor: "rgba(220, 38, 38, 1)",
                boxShadow: "0 0 60px rgba(220, 38, 38, 0.7), 0 0 20px rgba(255, 255, 255, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-5 px-14 py-6 bg-red-600/30 border border-red-500/50 text-red-100 rounded-full font-cinzel tracking-widest text-sm uppercase transition-all duration-500 shadow-[0_15px_40px_rgba(0,0,0,0.5)]"
            >
              Continue our journey
              <ChevronRight size={22} className="group-hover:translate-x-3 transition-transform duration-500" />
            </motion.button>
          </motion.div>

          {/* Decorative Corner Accents */}
          <div className="absolute top-10 left-10 w-16 h-16 border-t-2 border-l-2 border-red-500/50 rounded-tl-3xl pointer-events-none" />
          <div className="absolute bottom-10 right-10 w-16 h-16 border-b-2 border-r-2 border-red-500/50 rounded-br-3xl pointer-events-none" />
        </motion.div>
      </div>

      {/* Large Floating Background Heart */}
      <motion.div 
        animate={{ 
          y: [0, -50, 0],
          rotate: [0, 12, -12, 0],
          opacity: [0.03, 0.09, 0.03]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-10 right-10 pointer-events-none"
      >
        <Heart size={350} fill="currentColor" className="text-red-900" />
      </motion.div>
      
      {/* Decorative Bottom Vignette */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom,_rgba(220,38,38,0.1)_0%,_transparent_60%)] z-10" />
    </div>
  );
};

export default DetailedLetterPage;
