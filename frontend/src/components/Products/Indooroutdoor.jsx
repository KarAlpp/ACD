import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { ArrowRight, PlusCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const IndoorOutdoor = () => {
  const containerRef = useRef(null);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.product-section',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        '.section-title',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          delay: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSectionFocus = (section) => {
    setActiveSection(section);

    if (window.innerWidth >= 768) {
      gsap.to(`.product-section.${section}`, {
        flex: 1.75,
        duration: 0.5,
        ease: 'power2.inOut',
      });

      gsap.to(`.product-section:not(.${section})`, {
        flex: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      });

      gsap.to(`.content-container.${section}`, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        delay: 0.1,
        ease: 'power2.out',
      });

      gsap.to(`.content-container:not(.${section})`, {
        opacity: 0.7,
        duration: 0.3,
        ease: 'power2.out',
      });
    }
  };

  const handleSectionBlur = () => {
    setActiveSection(null);

    if (window.innerWidth >= 768) {
      gsap.to('.product-section', {
        flex: 1,
        duration: 0.5,
        ease: 'power2.inOut',
      });

      gsap.to('.content-container', {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-blue-600 text-sm font-bold uppercase tracking-wider">Discover Our Collection</span>
          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">Find Your Perfect Space</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Elevate your home with our curated selection of premium furniture for both indoor and outdoor spaces.
          </p>
        </div>

        <div 
          ref={containerRef}
          className="flex flex-col md:flex-row gap-6 h-[650px] md:h-[500px]"
        >
          {/* Indoor Section */}
          <div 
            className={`product-section indoor relative rounded-2xl overflow-hidden transition-all duration-500 flex-1 ${activeSection === 'indoor' ? 'active' : ''}`}
            onMouseEnter={() => handleSectionFocus('indoor')}
            onMouseLeave={handleSectionBlur}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent mix-blend-multiply" />
            
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-700"
              style={{ 
                backgroundImage: `url('https://olta.eu/wp-content/uploads/2024/09/MAXWELL_1-1-scaled.jpg')`,
                transform: activeSection === 'indoor' ? 'scale(1.05)' : 'scale(1)'
              }}
            />
            
            <div className="content-container indoor absolute inset-0 flex flex-col justify-between p-8 text-white">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium mb-4">
                  Indoor Collection
                </span>
                <h3 className="section-title text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Elevate Your <br className="hidden md:block" />Interior Space
                </h3>
              </div>
              
              <div className="mt-auto">
                {activeSection === 'indoor' && (
                  <p className="max-w-md mb-6 text-white/90 animate-fadeIn">
                    Discover our collection of elegant, comfortable furniture designed to transform your living spaces.
                  </p>
                )}
                
                <Link
                  to="/collections/all?door=indoor"
                  className="group inline-flex items-center gap-2 bg-white text-gray-900 py-3 px-6 rounded-full font-medium transition-all hover:bg-blue-600 hover:text-white"
                >
                  <span>Shop Indoor</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>

          {/* Outdoor Section */}
          <div 
            className={`product-section outdoor relative rounded-2xl overflow-hidden transition-all duration-500 flex-1 ${activeSection === 'outdoor' ? 'active' : ''}`}
            onMouseEnter={() => handleSectionFocus('outdoor')}
            onMouseLeave={handleSectionBlur}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent mix-blend-multiply" />
            
            <div 
              className="absolute inset-0 bg-cover bg-center transition-all duration-700"
              style={{ 
                backgroundImage: `url('https://lpe-prod.s3.eu-west-3.amazonaws.com/sifas/Custom-lists/Sperone+collection/Sifas+-+Sperone+Collection.png')`,
                transform: activeSection === 'outdoor' ? 'scale(1.05)' : 'scale(1)'
              }}
            />
            
            <div className="content-container outdoor absolute inset-0 flex flex-col justify-between p-8 text-white">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-xs font-medium mb-4">
                  Outdoor Living
                </span>
                <h3 className="section-title text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  Create Your <br className="hidden md:block" />Perfect Patio
                </h3>
              </div>
              
              <div className="mt-auto">
                {activeSection === 'outdoor' && (
                  <p className="max-w-md mb-6 text-white/90 animate-fadeIn">
                    Weather-resistant, stylish furniture that brings comfort and elegance to your outdoor sanctuary.
                  </p>
                )}
                
                <Link
                  to="/collections/all?door=outdoor"
                  className="group inline-flex items-center gap-2 bg-white text-gray-900 py-3 px-6 rounded-full font-medium transition-all hover:bg-blue-600 hover:text-white"
                >
                  <span>Shop Outdoor</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/collections/all"
            className="group inline-flex items-center gap-2 text-blue-600 font-medium hover:text-blue-800"
          >
            <PlusCircle className="w-5 h-5" />
            <span>View All Collections</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default IndoorOutdoor;
