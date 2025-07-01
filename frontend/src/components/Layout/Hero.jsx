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
      className=""
      style={{
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'pointer',
      }}
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
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: index === activeIndex ? 1 : 0,
            transition: 'opacity 0.3s ease',
            zIndex: index === activeIndex ? 1 : 0,
          }}
        />
      ))}

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          zIndex: 10,
        }}
        className="bg-yellow/30 text-white px-8 py-4 flex items-center relative"
      >
        <div className="flex-grow">
          <p className="text-lg text-gray-300">News</p>
          <h3 className="text-lg md:text-3xl font-semibold">
            {activeIndex === 0
              ? 'Discover Our New Season Furniture Collection'
              : 'Where Comfort Meets Contemporary Design'}
          </h3>
        </div>

        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-4">
          {[0, 1].map((index) => {
            const isActive = index === activeIndex;
            return (
              <div
                key={index}
                onClick={() => handleDotClick(index)}
                className="w-8 h-8 relative flex items-center justify-center cursor-pointer"
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    isActive ? 'bg-white' : 'bg-white opacity-50'
                  }`}
                />
                {isActive && (
                  <svg className="absolute top-0 left-0 w-8 h-8" viewBox="0 0 32 32">
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      stroke="black"
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
