import React from "react";

const Brands = () => {
  const brands = [
    {
      name: "SIFAS",
      image:
        "https://www.sifas.com/wp-content/uploads/2024/04/Sifas-KALIFE_Ambiance.jpg",
      link: "/collections/all?brand=SIFAS",
    },
    {
      name: "OLTA",
      image: "https://olta.eu/wp-content/uploads/2020/06/elixir-1.jpg",
      link: "/collections/all?brand=OLTA",
    },
    {
      name: "FERMOB",
      image:
        "https://www.fermob.com/mediatheque/2_produits/Luxembourg/3-ambiance/LUXEMBOURG_CACTUS_ROMARIN_OCRE_RAMATUELLE_RESIDENTIAL_DESIGNER2021_NICOLAS_MATHEUS.jpg",
      link: "/collections/all?brand=FERMOB",
    },
    {
      name: "GLATZ",
      image:
        "https://jenb.nl/uploads/card_image/card_image-sunwing_casa_20211-image-2905-67.jpg",
      link: "/collections/all?brand=GLATZ",
    },
  ];

  return (
    <section className="relative overflow-hidden mt-12">
      <div className="absolute inset-0 bg-[#d7eedc] top-[25%]"></div>
      <div className="absolute inset-0 bg-white bottom-[75%]"></div>

      <div className="relative max-w-6xl mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-2 gap-0">
        {brands.map((brand, index) => (
          <a
            key={brand.name}
            href={brand.link}
            className={`rounded-xl shadow-lg overflow-hidden group transform transition-transform duration-300 hover:scale-[1.02] ${
              [
                "-translate-y--translate-x-6",
                "-translate-y- translate-x-6",
                "translate-y-4 -translate-x-1",
                "translate-y-4 translate-x-6",
              ][index]
            }`}
          >
            <div className="relative h-[400px] overflow-hidden">
              <img
                src={brand.image}
                alt={brand.name}
                className="w-full h-full object-cover object-center transform transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end justify-center p-4">
                <h3 className="text-white text-base font-semibold">
                  {brand.name}
                </h3>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Brands;