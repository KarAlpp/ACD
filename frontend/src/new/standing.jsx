import React, { useState, useEffect } from 'react';

const Standing = () => {
  const images = [
    "https://patiobalconyoutdoor.com.au/cdn/shop/products/FermobBistro96cmTable.jpg?v=1734337389",
    "https://patiobalconyoutdoor.com.au/cdn/shop/products/FermobBistro96cmtableWillowGreen.jpg?v=1734337389",
    "https://patiobalconyoutdoor.com.au/cdn/shop/files/w1608h1000zcZCq85_VincentSheppard_KodoCollection_extra3_1608x1000_1d8cf25b-7375-4254-8e23-409969c20e12.jpg?v=1712754783",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const overlayClass = `
    absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center
    text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10
  `;

  const previewText = (label) => (
    <div className={overlayClass}>
      <h2 className="text-2xl font-semibold">{label}</h2>
      <div className="w-8 h-px bg-white my-2"></div>
      <p className="text-xs tracking-widest uppercase">Preview</p>
    </div>
  );

  const wrapper = (src, type, label, width, height) => {
    return (
      <div className={`relative group rounded-xl overflow-hidden ${width} ${height}`}>
        {type === "video" ? (
          <video
            src={src}
            className="w-full h-full object-cover object-center transition-all duration-500"
            autoPlay
            loop
            muted
            playsInline
          />
        ) : type === "iframe" ? (
          <iframe
            src={src}
            className="w-full h-full object-cover object-center transition-all duration-500"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={label}
          />
        ) : (
          <img
            src={src}
            className="w-full h-full object-cover object-center transition-all duration-500"
            alt={label}
          />
        )}
        {previewText(label)}
      </div>
    );
  };

  return (
    <div className="relative w-full flex justify-center bg-gray-200 py-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-4 grid-rows-3 gap-4">

      {/* Sol: Video - 2 sütun, 3 satır */}
      <div className="col-span-2 row-span-3">
        {wrapper("/videos/fermob.mp4", "video", "Main Video", "w-full", "h-full")}
      </div>

      {/* Sağ üst: Değişen görsel - 2 sütun, 2 satır */}
      <div className="col-span-2 row-span-2">
        {wrapper(images[currentIndex], "image", "Rotating Image", "w-full", "h-full")}
      </div>

      {/* Sağ alt 1: Küçük görsel */}
      <div className="col-span-1 row-span-1">
        {wrapper(
          "https://patiobalconyoutdoor.com.au/cdn/shop/products/FermobBalad25cmAcapulcoBlue.jpg?v=1738313184",
          "image",
          "Bottom Left",
          "w-full",
          "h-[200px]"
        )}
      </div>

      {/* Sağ alt 2: Diğer görsel */}
      <div className="col-span-1 row-span-1">
        {wrapper(
          "https://www.fermob.com/mediatheque/2_produits/SO%20O/3-ambiance/MOOON_CARBONE_SOO_GRIS_LAPILI_TARBOURIECH_VISUELS2023_ROMAIN_RICARD.jpg?optimize=medium&fit=bounds&height=700&width=700",
          "image",
          "Bottom Right",
          "w-full",
          "h-[200px]"
        )}
      </div>

    </div>
  </div>
</div>

  );
};

export default Standing;
