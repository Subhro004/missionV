
import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { Heart, Stars, ChevronRight } from 'lucide-react';
import Snowfall from './Snowfall';

interface QuotePageProps {
  onNext: () => void;
}

const QuotePage: React.FC<QuotePageProps> = ({ onNext }) => {
  const [isHovered, setIsHovered] = useState(false);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 25 };
  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["12deg", "-12deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-12deg", "12deg"]);

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

  const imageUrl = "https://drive.google.com/thumbnail?id=1m-klDLwRVmm73GGH2GpUwFuIYzxy1XD9&sz=w1600";

  return (
    <div className="relative min-h-screen w-full bg-[#050101] flex flex-col items-center justify-start py-20 px-8 overflow-y-auto overflow-x-hidden">
      <Snowfall />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_center,_rgba(220,38,38,0.1)_0%,_transparent_80%)] pointer-events-none"></div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
        className="z-20 max-w-4xl w-full text-center space-y-12"
      >
        {/* Main Quote */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative"
        >
          <div className="absolute -inset-10 bg-red-600/5 blur-3xl rounded-full"></div>
          <p className="font-playfair italic text-3xl md:text-5xl text-red-50 leading-[1.6] relative z-10 drop-shadow-lg">
            "I don't need a Valentine's Day or Valentine's Week to love you, I love you always."
          </p>
        </motion.div>

        {/* Interactive Image Container */}
        <div 
          className="perspective-2000 w-full flex justify-center items-center py-8 relative"
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => { 
            setIsHovered(false);
            x.set(0); 
            y.set(0); 
          }}
        >
          {/* Subtle Background Glow on Hover */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.15 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none"
              >
                <div className="w-full h-full bg-red-600/15 blur-[120px] rounded-full" />
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            style={{
              rotateX,
              rotateY,
              transformStyle: "preserve-3d",
            }}
            whileHover={{ scale: 1.02 }}
            className="relative w-full max-w-[500px] rounded-3xl overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.8)] border border-white/10 z-10 bg-red-950/10 transition-shadow duration-500"
          >
            <motion.img 
              src={imageUrl} 
              alt="Together" 
              className="w-full h-auto object-cover block rounded-3xl transition-all duration-700"
              style={{ transform: "translateZ(40px)" }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://picsum.photos/800/1000?romantic=3";
              }}
            />
            {/* Soft inner shadow overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-20 pointer-events-none" />
          </motion.div>
        </div>

        {/* Closing Thoughts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="space-y-6"
        >
          <p className="font-montserrat text-xl md:text-2xl text-red-200/80 font-light leading-relaxed">
            Hope this little effort sneaks me into your dreams and makes you think of me in sleep...
          </p>
          <p className="font-romantic text-3xl md:text-4xl text-red-400 opacity-70 italic">
            (Jege jege to tui bhabis na ki r korbo)
          </p>
        </motion.div>

        {/* End of Beginning Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="pt-6"
        >
          <motion.button
            onClick={onNext}
            whileHover={{ scale: 1.05, backgroundColor: "rgba(220, 38, 38, 0.4)" }}
            whileTap={{ scale: 0.95 }}
            className="group flex items-center gap-3 px-10 py-4 bg-red-600/20 border border-red-500/40 text-red-100 rounded-full font-cinzel tracking-widest text-xs uppercase transition-all duration-300 shadow-xl"
          >
            End of Beginning
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </motion.div>

        {/* Footer Heart */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3, duration: 1 }}
          className="pt-12"
        >
          <div className="flex justify-center">
            <motion.div 
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 3 }}
            >
              <Heart size={40} className="text-red-900/40" fill="currentColor" />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Floating background stars */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: Math.random() * 100 + "%", y: Math.random() * 100 + "%" }}
            animate={{ opacity: [0, 0.5, 0], scale: [0, 1, 0] }}
            transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 5 }}
            className="absolute text-yellow-200/20"
          >
            <Stars size={Math.random() * 20 + 10} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuotePage;
