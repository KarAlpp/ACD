import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const brands = [
  "YZILABS",
  "COINBASE VENTURES",
  "PANTERA CAPITAL",
  "DEFIANCE CAPITAL",
];

const descriptions = [
  "Innovative Blockchain Solutions",
  "Leading Crypto Investments",
  "Powering the Next Generation",
  "Defining the Future of Finance",
];

const ScrollLockBrandList = () => {
  const [step, setStep] = useState(0);
  const [scrollLocked, setScrollLocked] = useState(true);
  const containerRef = useRef(null);
  const scrollTimerRef = useRef(null);
  const prevScrollY = useRef(0);
  const [direction, setDirection] = useState(null);
  const processingScroll = useRef(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    prevScrollY.current = 0;
  }, []);

  const handleScrollStep = (dir) => {
    if (processingScroll.current) return;
    
    processingScroll.current = true;
    setDirection(dir);
    
    if (dir === 'down') {
      setStep((prev) => Math.min(prev + 1, brands.length - 1));
    } else {
      setStep((prev) => Math.max(prev - 1, 0));
    }
    
    setTimeout(() => {
      processingScroll.current = false;
    }, 400);
  };

  useEffect(() => {
    let accumulatedDelta = 0;
    const deltaThreshold = 10;
    
    const handleWheel = (e) => {
      if (!scrollLocked) return;
      e.preventDefault();
      
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
      
      accumulatedDelta += e.deltaY;
      
      scrollTimerRef.current = setTimeout(() => {
        if (Math.abs(accumulatedDelta) > deltaThreshold) {
          handleScrollStep(accumulatedDelta > 0 ? 'down' : 'up');
        }
        accumulatedDelta = 0;
      }, 50);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener("wheel", handleWheel);
      }
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
    };
  }, [scrollLocked]);

  useEffect(() => {
    if (step === brands.length - 1) {
      setTimeout(() => setScrollLocked(false), 500);
    } else {
      setScrollLocked(true);
    }
  }, [step]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const currentScrollY = window.scrollY;

          if (currentScrollY > prevScrollY.current) {
            setDirection('down');
            setStep(0);
          } else {
            setDirection('up');
            setStep(brands.length - 1);
          }

          prevScrollY.current = currentScrollY;
          setScrollLocked(true);
        }
      },
      { threshold: 0.5, rootMargin: "10px" }
    );

    const container = containerRef.current;
    if (container) {
      observer.observe(container);
    }

    return () => {
      if (container) {
        observer.unobserve(container);
      }
    };
  }, []);

  useEffect(() => {
    let touchStartY = 0;
    let touchIdentifier = null;
    
    const handleTouchStart = (e) => {
      if (touchIdentifier === null) {
        touchIdentifier = e.touches[0].identifier;
        touchStartY = e.touches[0].clientY;
      }
    };
    
    const handleTouchMove = (e) => {
      if (!scrollLocked || processingScroll.current) return;
      
      let touchIdx = -1;
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === touchIdentifier) {
          touchIdx = i;
          break;
        }
      }
      
      if (touchIdx === -1) return;
      
      const touchY = e.changedTouches[touchIdx].clientY;
      const diff = touchStartY - touchY;
      
      if (scrollTimerRef.current) {
        clearTimeout(scrollTimerRef.current);
      }
      
      if (Math.abs(diff) > 20) {
        e.preventDefault();
        
        scrollTimerRef.current = setTimeout(() => {
          handleScrollStep(diff > 0 ? 'down' : 'up');
          touchStartY = touchY;
        }, 10);
      }
    };
    
    const handleTouchEnd = (e) => {
      for (let i = 0; i < e.changedTouches.length; i++) {
        if (e.changedTouches[i].identifier === touchIdentifier) {
          touchIdentifier = null;
          break;
        }
      }
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchmove", handleTouchMove, { passive: false });
      container.addEventListener("touchend", handleTouchEnd);
      container.addEventListener("touchcancel", handleTouchEnd);
    }
    
    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchmove", handleTouchMove);
        container.removeEventListener("touchend", handleTouchEnd);
        container.removeEventListener("touchcancel", handleTouchEnd);
      }
    };
  }, [scrollLocked]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!scrollLocked || processingScroll.current) return;
      
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        handleScrollStep('down');
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        handleScrollStep('up');
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [scrollLocked]);

  // 🔥 Burada düzeltildi: y değerleri ters çevrildi!
  const brandVariants = {
    active: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 25,
        duration: 0.4
      }
    },
    inactive: (custom) => ({
      opacity: 0.15,
      scale: 0.9,
      y: custom === "up" ? -20 : 20, // <<< düzeltildi!
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 25,
        duration: 0.4
      }
    })
  };

  const descriptionVariants = {
    active: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 25,
        duration: 0.4
      }
    },
    inactive: {
      opacity: 0.15,
      x: -15,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 25,
        duration: 0.4
      }
    }
  };

  const dotVariants = {
    active: {
      scale: 1.5,
      backgroundColor: "#FBBF24",
      transition: { duration: 0.3 }
    },
    inactive: {
      scale: 1,
      backgroundColor: "#333333",
      transition: { duration: 0.3 }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="w-full min-h-screen bg-black text-white flex items-center justify-center py-32 relative overflow-hidden"
    >
      <div className="absolute left-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-3 items-center">
        {brands.map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 rounded-full cursor-pointer"
            variants={dotVariants}
            animate={i === step ? "active" : "inactive"}
            onClick={() => {
              if (processingScroll.current) return;
              const newDirection = i > step ? 'down' : 'up';
              setDirection(newDirection);
              setStep(i);
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-12 px-8">
        <div className="flex-1 text-left flex flex-col gap-12 relative">
          {descriptions.map((desc, i) => (
            <motion.div
              key={i}
              custom={direction}
              animate={i === step ? "active" : "inactive"}
              variants={descriptionVariants}
              className={`text-xl md:text-3xl font-medium transition-colors duration-200 ${
                i === step ? "text-yellow-400" : "text-white"
              }`}
            >
              {desc}
            </motion.div>
          ))}
        </div>

        <div className="flex-1 text-right flex flex-col gap-12 relative">
          {brands.map((brand, i) => (
            <motion.div
              key={i}
              custom={direction}
              animate={i === step ? "active" : "inactive"}
              variants={brandVariants}
              className={`text-4xl md:text-7xl font-extrabold transition-colors duration-200 ${
                i === step ? "text-yellow-400" : "text-white"
              }`}
            >
              {brand}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-6">
        <button
          onClick={() => {
            if (step > 0 && !processingScroll.current) {
              handleScrollStep('up');
            }
          }}
          disabled={step === 0 || processingScroll.current}
          className={`p-2 rounded-full border border-gray-600 ${
            step === 0 ? 'opacity-30 cursor-not-allowed' : 'hover:border-yellow-400'
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 4L14 10L12.6 11.4L8 6.8L3.4 11.4L2 10L8 4Z" fill="currentColor"/>
          </svg>
        </button>
        <button
          onClick={() => {
            if (step < brands.length - 1 && !processingScroll.current) {
              handleScrollStep('down');
            }
          }}
          disabled={step === brands.length - 1 || processingScroll.current}
          className={`p-2 rounded-full border border-gray-600 ${
            step === brands.length - 1 ? 'opacity-30 cursor-not-allowed' : 'hover:border-yellow-400'
          }`}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 12L2 6L3.4 4.6L8 9.2L12.6 4.6L14 6L8 12Z" fill="currentColor"/>
          </svg>
        </button>
      </div>

      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
        animate={{ 
          y: [0, 10, 0],
          opacity: scrollLocked ? [0.7, 1, 0.7] : 0
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <div className="text-gray-400 text-sm mb-2">Scroll</div>
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <motion.div
            className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default ScrollLockBrandList;
