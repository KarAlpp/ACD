import React, { useState, useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useAnimationFrame,
} from 'framer-motion';

const DURATION = 5000; // 5 saniye

const Hero = () => {
  const videoList = ['hero-2.mp4', 'hero-3.mp4'];
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef(null);
  const startTimeRef = useRef(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const { scrollYProgress } = useScroll();

  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const clipPath = useTransform(
    scrollYProgress,
    [0, 0.3],
    [
      'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      'polygon(10% -10%, 90% -10%, 100% 110%, 0% 110%)',
    ]
  );

  const dotsOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  const handleMouseMove = (e) => {
    if (sectionRef.current) {
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      mouseX.set(x * 20 - 10);
      mouseY.set(y * 20 - 10);
    }
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
    startTimeRef.current = null;
    setProgress(0);
  };

  useAnimationFrame((time) => {
    if (!startTimeRef.current) startTimeRef.current = time;
    const elapsed = time - startTimeRef.current;
    const nextProgress = Math.min(elapsed / DURATION, 1);
    setProgress(nextProgress);

    if (elapsed >= DURATION) {
      setActiveIndex((prev) => (prev + 1) % videoList.length);
      startTimeRef.current = time;
      setProgress(0);
    }
  });

  return (
    <motion.section
      ref={sectionRef}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
      onMouseMove={handleMouseMove}
    >
      {videoList.map((video, index) => (
        <motion.video
          key={video}
          src={`/videos/${video}`}
          type="video/mp4"
          autoPlay
          loop
          muted
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: index === activeIndex ? 1 : 0,
            x: mouseX,
            y: mouseY,
            scale,
            clipPath,
            transition: 'opacity 0.3s ease, transform 0.2s ease-out',
            zIndex: index === activeIndex ? 1 : 0,
          }}
        />
      ))}

      <motion.div
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          scale,
          clipPath,
          transformOrigin: 'center center',
          zIndex: 10,
        }}
        className="bg-yellow/30 text-white px-8 py-4 flex items-center relative"
      >
        <div className="flex-grow">
          <p className="text-lg text-gray-300">News</p>
          <motion.h3
            key={activeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-lg md:text-3xl font-semibold"
          >
            {activeIndex === 0
              ? 'Discover Our New Season Furniture Collection'
              : 'Where Comfort Meets Contemporary Design'}
          </motion.h3>
        </div>

        <motion.div
          style={{ opacity: dotsOpacity }}
          className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-4"
        >
          {[0, 1].map((index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={index}
                onClick={() => handleDotClick(index)}
                className="w-8 h-8 relative flex items-center justify-center cursor-pointer"
              >
                <motion.div
                  className={`
                    w-2 h-2 rounded-full 
                    ${isActive ? 'bg-white' : 'bg-white opacity-50'}
                  `}
                />
                {isActive && (
                  <svg className="absolute top-0 left-0 w-8 h-8" viewBox="0 0 32 32">
                    <motion.circle
                      cx="16"
                      cy="16"
                      r="14"
                      stroke="black"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 14}
                      strokeDashoffset={2 * Math.PI * 14 * (1 - progress)}
                      style={{ rotate: -90, originX: '50%', originY: '50%' }}
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;