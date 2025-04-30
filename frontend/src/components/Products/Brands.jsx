import React, { useEffect, useState } from "react";

const Brands = () => {
  const brands = [
    {
      name: "SIFAS",
      image:
        "https://www.sifas.com/wp-content/uploads/2024/04/Sifas-KALIFE_Ambiance.jpg",
      link: "/collections/all?brand=SIFAS",
      description: "Sifas koleksiyonumuzla açık hava şıklığını keşfedin.",
    },
    {
      name: "OLTA",
      image: "https://olta.eu/wp-content/uploads/2020/06/elixir-1.jpg",
      link: "/collections/all?brand=OLTA",
      description: "Olta'nın zarif tasarımlarıyla yaşam alanınızı yenileyin.",
    },
    {
      name: "FERMOB",
      image:
        "https://www.fermob.com/mediatheque/2_produits/Luxembourg/3-ambiance/LUXEMBOURG_CACTUS_ROMARIN_OCRE_RAMATUELLE_RESIDENTIAL_DESIGNER2021_NICOLAS_MATHEUS.jpg",
      link: "/collections/all?brand=FERMOB",
      description: "Fermob’un renkli dünyasında bahçenize enerji katın.",
    },
    {
      name: "GLATZ",
      image:
        "https://jenb.nl/uploads/card_image/card_image-sunwing_casa_20211-image-2905-67.jpg",
      link: "/collections/all?brand=GLATZ",
      description: "Glatz şemsiyeleriyle dış mekan keyfini zirveye taşıyın.",
    },
  ];

  const [currentBrandIndex, setCurrentBrandIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBrandIndex((prevIndex) => (prevIndex + 1) % brands.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [brands.length]);

  return (
    <section className="relative bg-white py-20">
      {/* Başlık */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          CHECK OUT OUR NEWEST BRAND COLLECTIONS
        </h2>
        <div className="h-10">
          <p
            key={brands[currentBrandIndex].name}
            className="text-2xl md:text-3xl font-bold text-gray-600 animate-fade"
          >
            {brands[currentBrandIndex].name}
          </p>
        </div>
      </div>

      {/* Marka Kartları */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-12">
        {brands.map((brand, index) => (
          <a
            key={brand.name}
            href={brand.link}
            className={`flex flex-col md:flex-row items-center rounded-xl shadow-lg overflow-hidden group transition-transform duration-300 ${
              index % 2 === 0 ? "-translate-y-4" : "translate-y-4"
            }`}
          >
            <div className="relative w-full md:w-1/2 h-[300px]">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-full object-cover object-center transform transition duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-col justify-center items-start p-6 md:w-1/2 bg-white h-full">
              <h3 className="text-2xl font-bold mb-2">{brand.name}</h3>
              <p className="text-gray-600 text-base">{brand.description}</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Brands;
