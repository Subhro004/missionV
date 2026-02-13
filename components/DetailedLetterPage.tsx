
import React from 'react';
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

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);
  
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

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 1.2,
        staggerChildren: 0.15,
        delayChildren: 0.4,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.8 }
    },
    hover: { 
      x: 10, 
      color: "#fee2e2", 
      transition: { duration: 0.3 } 
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#0d0202] flex flex-col items-center py-20 px-6 overflow-y-auto overflow-x-hidden">
      <Snowfall />
      
      {/* Background radial glow */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.1)_0%,_transparent_80%)] pointer-events-none"></div>

      <div 
        className="perspective-2000 w-full max-w-2xl z-20"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d",
          }}
          className="relative w-full space-y-8 bg-white/5 backdrop-blur-xl p-8 md:p-14 rounded-[2.5rem] border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.7)] group"
        >
          {/* Dynamic Interactive Glow Overlay */}
          <motion.div 
            style={{
              background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(255,255,255,0.08) 0%, transparent 50%)`,
              transform: "translateZ(50px)"
            }}
            className="absolute inset-0 pointer-events-none rounded-[2.5rem] z-0"
          />

          <motion.div variants={itemVariants} className="flex justify-center mb-4" style={{ transform: "translateZ(30px)" }}>
            <motion.div
              animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 4 }}
            >
              <Sparkles className="text-red-400" size={40} />
            </motion.div>
          </motion.div>

          <motion.h2 
            variants={itemVariants}
            style={{ transform: "translateZ(60px)" }}
            className="font-romantic text-6xl md:text-7xl text-red-100 text-center drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            Dear Love,
          </motion.h2>

          <motion.div 
            className="font-playfair italic text-lg md:text-xl text-red-100/90 leading-relaxed space-y-8 relative z-10"
            style={{ transform: "translateZ(40px)" }}
          >
            {[
              "I have an endless list of things I want to say to you. Thank you for existing in my life not just today or tomorrow, but every day… every hour… every minute… every second.",
              "When everything feels uncertain, I want you to always be certain of me. I will stand by you always. I want to be your support system, your safe place, your lifeline — just like you are mine. I will always be the man you can tell everything to, trust blindly, and never fear being judged. And always come to me when you need a break from the world.",
              "I will also always be the lovable idiot who roasts you the best, annoys you the most and cares for you the deepest. And you will always be the girl who laughs at my lame jokes, scolds me for my recklessness, and gets mad at my stupidness. I will always be the man you tell your jokes and you deepest thoughts to. You will always the woman I will tell the most random useless things of my day… and share each other's every detail.",
              "I promise to keep flirting with you every day, to never stop doing cute little things for you. When you blush, I will make you blush harder. And yes, you can keep scolding and hitting me (thats your love language 😂)… bas please, try not to break my head daily."
            ].map((paragraph, idx) => (
              <motion.p 
                key={idx}
                variants={itemVariants}
                whileHover="hover"
                className="cursor-default select-none"
              >
                {paragraph}
              </motion.p>
            ))}
          </motion.div>

          <motion.div 
            variants={itemVariants} 
            className="pt-10 text-right space-y-2"
            style={{ transform: "translateZ(70px)" }}
          >
            <p className="font-cinzel text-red-400 text-xs tracking-[0.4em] uppercase opacity-70">Forever Yours,</p>
            <motion.h3 
              whileHover={{ scale: 1.05, color: "#fff" }}
              className="font-romantic text-6xl md:text-7xl text-red-100 transition-all cursor-default"
            >
              Your Kaju ❤️
            </motion.h3>
          </motion.div>

          {/* Navigation Button */}
          <motion.div 
            variants={itemVariants}
            className="flex justify-center pt-12"
            style={{ transform: "translateZ(50px)" }}
          >
            <motion.button
              onClick={onNext}
              whileHover={{ scale: 1.05, backgroundColor: "rgba(220, 38, 38, 0.9)" }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-4 px-10 py-5 bg-red-600/20 border border-red-500/40 text-red-100 rounded-full font-cinzel tracking-widest text-xs uppercase transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.3)]"
            >
              Continue our journey
              <ChevronRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </motion.button>
          </motion.div>

          {/* Decorative Corner Accents */}
          <div className="absolute top-6 left-6 w-8 h-8 border-t-2 border-l-2 border-red-500/30 rounded-tl-xl" />
          <div className="absolute bottom-6 right-6 w-8 h-8 border-b-2 border-r-2 border-red-500/30 rounded-br-xl" />
        </motion.div>
      </div>

      {/* Large Floating Background Heart */}
      <motion.div 
        animate={{ 
          y: [0, -30, 0],
          rotate: [0, 5, 0],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-10 right-10 pointer-events-none"
      >
        <Heart size={250} fill="currentColor" className="text-red-900" />
      </motion.div>
      
      {/* Decorative Bottom Vignette */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_bottom,_rgba(220,38,38,0.05)_0%,_transparent_50%)] z-10" />
    </div>
  );
};

export default DetailedLetterPage;
