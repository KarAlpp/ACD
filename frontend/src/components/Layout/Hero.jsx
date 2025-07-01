import React, { useState, useRef, useEffect } from 'react';

const DURATION = 5000;

const Hero = () => {
  const videoList = ['heroyeni2.mp4', 'heroyeni1.mp4'];
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % videoList.length);
      setProgress(0);
      startTimeRef.current = performance.now();
    }, DURATION);

    return () => clearInterval(interval);
  }, [videoList.length]);

  useEffect(() => {
    const updateProgress = () => {
      const now = performance.now();
      if (startTimeRef.current) {
        const elapsed = now - startTimeRef.current;
        setProgress(Math.min(elapsed / DURATION, 1));
      }
      requestAnimationFrame(updateProgress);
    };

    startTimeRef.current = performance.now();
    requestAnimationFrame(updateProgress);
  }, []);

  const handleDotClick = (index) => {
    setActiveIndex(index);
    setProgress(0);
    startTimeRef.current = performance.now();
  };

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-[80vh] sm:min-h-screen relative overflow-hidden"
    >
      {videoList.map((video, index) => (
        <video
          key={video}
          src={`/videos/${video}`}
          type="video/mp4"
          autoPlay
          loop
          muted
          playsInline
          className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
            index === activeIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        />
      ))}

      <div className="absolute bottom-0 w-full z-20 bg-black/40 text-white px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-3 sm:space-y-0">
        <div className="flex-grow">
          <p className="text-sm sm:text-lg text-gray-300 mb-1">News</p>
          <h3 className="text-base sm:text-2xl md:text-3xl font-semibold leading-snug">
            {activeIndex === 0
              ? 'Discover Our New Season Furniture Collection'
              : 'Where Comfort Meets Contemporary Design'}
          </h3>
        </div>

        <div className="sm:absolute sm:left-1/2 sm:transform sm:-translate-x-1/2 flex items-center gap-3 pt-2 sm:pt-0">
          {[0, 1].map((index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={index}
                onClick={() => handleDotClick(index)}
                className="w-7 h-7 sm:w-8 sm:h-8 relative flex items-center justify-center cursor-pointer touch-manipulation"
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${
                    isActive ? 'bg-white' : 'bg-white opacity-50'
                  }`}
                />
                {isActive && (
                  <svg className="absolute top-0 left-0 w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 32 32">
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      stroke="white"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeDasharray={2 * Math.PI * 14}
                      strokeDashoffset={2 * Math.PI * 14 * (1 - progress)}
                      style={{ transform: 'rotate(-90deg)', transformOrigin: 'center' }}
                    />
                  </svg>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Hero;
