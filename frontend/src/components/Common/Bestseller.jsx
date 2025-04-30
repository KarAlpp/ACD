import React from 'react';
import { FiArrowRight } from "react-icons/fi";

const Standing = () => {
  const categories = [
    {
      label: "Table & Chair",
      src: "https://patiobalconyoutdoor.com.au/cdn/shop/products/FermobBistro96cmTable.jpg?v=1734337389",
      link: "/collections/all?category=Table&Chair"
    },
    {
      label: "Cushion",
      src: "https://plaisirdujardin.mu/wp-content/uploads/Ava-1.jpg",
      link: "/collections/all?category=Chair"
    },
    {
      label: "Sofa & Couch",
      src: "https://patiobalconyoutdoor.com.au/cdn/shop/files/w1608h1000zcZCq85_VincentSheppard_KodoCollection_extra3_1608x1000_1d8cf25b-7375-4254-8e23-409969c20e12.jpg?v=1712754783",
      link: "/collections/all?category=Sofa+%26+Couch"
    },
    {
      label: "Lamp",
      src: "https://patiobalconyoutdoor.com.au/cdn/shop/products/FermobBalad25cmAcapulcoBlue.jpg?v=1738313184",
      link: "/collections/all?category=Lamp"
    },
    {
      label: "DINING CHAIRS",
      src: "https://cdn.stylepark.com/transformations/manufacturers/_697xAUTO_fit_center-center_none/STUDIE_VERT_CEDRE_LUXEMBOURG_VERT_CEDRE_PARIS_VISUEL2022_ROMAIN_RICARD.jpg",
      link: "/dining-chairs"
    }
  ];

  const CategoryCard = ({ src, label, link }) => (
    <a href={link} className="group relative w-full h-full rounded-lg overflow-hidden block">
      <img src={src} alt={label} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="absolute w-40 h-40 bg-black/20 backdrop-blur-md rounded-full transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
        <h3 className="text-white text-xl font-semibold text-center px-2 z-10">
          {label}
        </h3>
        <FiArrowRight className="mt-4 text-yellow-500 text-3xl opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 z-10" />
      </div>
    </a>
  );

  return (
    <section className="w-full bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Başlık */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">CATEGORIES</h2>
          <p className="text-xl italic text-yellow-500 mt-1">Featured</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4">
          <div>
            <CategoryCard {...categories[0]} />
          </div>
          <div>
            <CategoryCard {...categories[1]} />
          </div>
          <div className="row-span-2">
            <CategoryCard {...categories[4]} />
          </div>
          <div>
            <CategoryCard {...categories[2]} />
          </div>
          <div>
            <CategoryCard {...categories[3]} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Standing;
