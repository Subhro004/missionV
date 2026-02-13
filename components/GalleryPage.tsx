
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import Snowfall from './Snowfall';

interface PhotoItem {
  url: string;
  caption: string;
  sub: string;
}

interface GalleryPageProps {
  onNext?: () => void;
}

const GalleryItem: React.FC<{ photo: PhotoItem; index: number }> = ({ photo, index }) => {
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  });

  const yImage = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const yText = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const rotateImage = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 2 : -2, index % 2 === 0 ? -2 : 2]);

  const smoothYImage = useSpring(yImage, { stiffness: 100, damping: 30 });
  const smoothYText = useSpring(yText, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      ref={targetRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16 relative`}
    >
      <motion.div 
        whileHover={{ scale: 1.03 }}
        className="relative group w-full md:w-1/2 cursor-pointer"
        style={{ y: smoothYImage }}
      >
        <div className="absolute -inset-4 bg-red-600/0 group-hover:bg-red-600/20 rounded-3xl blur-2xl transition-all duration-700"></div>
        
        <motion.div 
          className="relative bg-white p-3 md:p-4 pb-12 md:pb-16 shadow-2xl rounded-sm transform transition-all duration-500 border-[1px] border-transparent group-hover:border-red-200 group-hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
          style={{ rotate: rotateImage }}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="absolute -top-3 -left-3 bg-red-600 text-white p-2 rounded-full shadow-lg z-30 pointer-events-none"
          >
            <Heart size={16} fill="currentColor" />
          </motion.div>

          <div className="overflow-hidden rounded-sm relative">
            <motion.div className="h-full w-full">
               <img 
                src={photo.url} 
                alt="Subhangee Mukherjee" 
                className="w-full aspect-[3/4] object-cover grayscale-[15%] group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-115"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://picsum.photos/seed/fallback${index}/800/1000`;
                }}
              />
            </motion.div>
            <div className="absolute inset-0 bg-red-900/0 group-hover:bg-red-900/10 transition-colors duration-700 pointer-events-none"></div>
          </div>

          <div className="absolute bottom-4 left-0 right-0 text-center">
            <motion.span 
              animate={{ y: [0, -2, 0] }}
              transition={{ repeat: Infinity, duration: 4, delay: index * 0.5 }}
              className="font-romantic text-3xl md:text-4xl text-red-950/40 group-hover:text-red-600 transition-all duration-500 tracking-wider block"
            >
              {(index === 1 || index === 3) ? 'Kismis' : 'Rai'}
            </motion.span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div 
        className="w-full md:w-1/2 space-y-4 text-center md:text-left"
        style={{ y: smoothYText }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 5 }}
          >
            <Sparkles className="text-red-500 mb-4 mx-auto md:mx-0" size={20} />
          </motion.div>
          <h3 className="font-playfair italic text-2xl md:text-3xl text-red-100 leading-relaxed font-light">
            "{photo.caption}"
          </h3>
          <div className="h-[2px] w-20 bg-gradient-to-r from-red-800 to-transparent my-6 mx-auto md:mx-0"></div>
          <p className="font-cinzel text-red-400 tracking-[0.3em] text-xs md:text-sm uppercase font-bold">
            {photo.sub}
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const GalleryPage: React.FC<GalleryPageProps> = ({ onNext }) => {
  const photos: PhotoItem[] = [
    {
      url: "https://drive.google.com/thumbnail?id=1vdWCxCsvhTQiVSAZMKC7Se4IgvJ2UQ6x&sz=w1000",
      caption: "In the gallery of my heart, your radiance is the only masterpiece that truly matters.",
      sub: "My Eternal Muse"
    },
    {
      url: "https://drive.google.com/thumbnail?id=1AZWTKKLSLyI7dMXeahFwZRGo22i3rIzA&sz=w1000",
      caption: "If only she could see what I see in her",
      sub: "My Sweetest Kismis"
    },
    {
      url: "https://drive.google.com/thumbnail?id=1h6ncdLI5sPKq5-N2lb-DIaFl9OexDbXh&sz=w1000",
      caption: "How are you this pretty without even trying? Just standing there… holding your phone… doing absolutely nothing special… and still managing to steal my heart like it’s your full-time job.",
      sub: "Simply Perfect"
    },
    {
      url: "https://drive.google.com/thumbnail?id=1erz5qjaOYeODLGfefb_0iA05VjuQw3Yu&sz=w1000",
      caption: "That look back ruined my entire focus and made my day, Those eyes are gonna be the end of me one day",
      sub: "Captivating"
    },
    {
      url: "https://drive.google.com/thumbnail?id=1nUzGQ97EIc7EqgGMvuk7HCcbCmRBpFwH&sz=w1000",
      caption: "And after all the glamorous pics this blurry one remains my fav, because beyond the beauty and the grace, it's the depth of your kind soul that I fall for deeper every single day..",
      sub: "My Favorite Version"
    }
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#1a0505] overflow-y-auto overflow-x-hidden flex flex-col items-center py-20 px-6">
      <Snowfall />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-24 z-20"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="mb-4"
        >
          <Heart size={60} className="text-red-600 fill-current mx-auto drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
        </motion.div>
        <h2 className="font-romantic text-6xl md:text-8xl text-red-100 px-4 leading-tight">
          You are crazy... but you are mine
        </h2>
        <p className="font-cinzel text-red-400 tracking-[0.5em] text-sm uppercase mt-4">
          Capturing the magic of Rai
        </p>
      </motion.div>

      <div className="w-full max-w-5xl space-y-32 md:space-y-64 z-20">
        {photos.map((photo, index) => (
          <GalleryItem key={index} photo={photo} index={index} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="mt-48 mb-32 text-center space-y-12 z-20"
      >
        <p className="max-w-md mx-auto text-red-300/50 font-cinzel text-[10px] md:text-xs tracking-[0.5em] leading-relaxed px-4 uppercase mb-10">
          Every moment with you is a new page of our favorite story. I love you, Rai. Forever yours.
        </p>

        {onNext && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5 }}
            className="flex justify-center"
          >
            <button 
              onClick={onNext}
              className="group relative px-10 md:px-16 py-8 bg-transparent border-[1px] border-red-500/20 text-red-100 rounded-3xl font-romantic hover:border-red-500/60 hover:text-white transition-all duration-700 shadow-[0_0_15px_rgba(220,38,38,0.1)] hover:shadow-[0_0_40px_rgba(220,38,38,0.4)] overflow-hidden"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/10 to-red-600/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              
              <span className="relative z-10 block text-center leading-[1.3] select-none">
                <span className="text-4xl md:text-6xl block">I love you Subhranil Ghosh</span>
                <span className="text-xl md:text-3xl opacity-70 italic block mt-2 font-montserrat tracking-wide">
                  I love you very very much
                </span>
              </span>
            </button>
          </motion.div>
        )}

        <motion.div
          animate={{ y: [0, 15, 0], scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 3 }}
          className="pt-16"
        >
          <Heart size={48} className="text-red-900/40 mx-auto fill-current" />
        </motion.div>
      </motion.div>

      <div className="fixed top-0 left-0 p-12 opacity-10 pointer-events-none">
        <div className="w-32 h-32 border-t-2 border-l-2 border-red-500 rounded-tl-full"></div>
      </div>
      <div className="fixed bottom-0 right-0 p-12 opacity-10 pointer-events-none">
        <div className="w-32 h-32 border-b-2 border-r-2 border-red-500 rounded-br-full"></div>
      </div>
    </div>
  );
};

export default GalleryPage;
