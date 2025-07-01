import React from "react";

const Standing = () => {
  const overlay = (title, subtitle) => (
    <div className="absolute bottom-0 left-0 w-full px-4 pb-4 text-white bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10">
      <h2 className="text-xl font-extrabold">{title}</h2>
      <p className="text-sm">{subtitle}</p>
    </div>
  );

  const Card = ({ src, label, subtitle, isVideo }) => (
    <div
      onClick={() => window.location.href = "/collectionsfermob"}
      className="relative group rounded-xl overflow-hidden cursor-pointer aspect-[4/3]"
    >
      {isVideo ? (
        <video
          src={src}
          className="w-full h-full object-cover transition-all duration-500"
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <img
          src={src}
          alt={label}
          className="w-full h-full object-cover transition-all duration-500"
        />
      )}
      {overlay(label, subtitle)}
    </div>
  );

  return (
    <div className="bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Sol Üst - Aksesuar */}
        <Card
          src="https://www.fermob.com/mediatheque/2_produits/Accroche%20coeurs/3-ambiance/ACCROCHE-COEURS_CACTUS_COLOR_MIX_REY_VISUEL2022_SARAH_BALHADERE.jpg?optimize=medium&fit=bounds&height=700&width=700"
          label="AKSESUAR"
          subtitle="Dekoratif objeler."
        />

        {/* Sol Alt - Aydınlatma */}
        <Card
          src="https://patiobalconyoutdoor.com.au/cdn/shop/products/FermobBalad25cmAcapulcoBlue.jpg?v=1738313184"
          label="AYDINLATMA"
          subtitle="Aydınlatma çözümleri."
        />

        {/* Sağ Büyük - Mobilya (Video) */}
        <Card
          src="/videos/ati.mp4"
          label="MOBİLYA"
          subtitle="Ev, ofis mobilyaları."
          isVideo={true}
        />
      </div>
    </div>
  );
};

export default Standing;
