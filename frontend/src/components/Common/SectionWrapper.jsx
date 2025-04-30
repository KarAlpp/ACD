import React from 'react';

const SectionWrapper = ({ children, bgImage }) => {
  return (
    <section
      className="w-full bg-cover bg-center py-20"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-white/90 backdrop-blur-sm max-w-7xl mx-auto px-6 py-12 rounded-xl shadow-xl">
        {children}
      </div>
    </section>
  );
};

export default SectionWrapper;
