import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const productData = [
  { name: "PICOLINO", image: "https://www.fermob.com/mediatheque/2_produits/Picolino/3-ambiance/PICOLINO_MIEL_BCJ23_SEBASTIEN_EROME.jpg?optimize=medium&fit=bounds&height=700&width=700" },
  { name: "BIARRITZ", image: "https://www.le-petit-jardin.com/wp-content/uploads/2015/03/table-biarritz-fermob-album-2013_720.jpg" },
  { name: "BISTRO", image: "https://cdn.connox.com/m/100035/617778/media/fermob/2022-Ambiente/Fermob-Bistro-Tisch-Balad-Leuchte-Alto-Ambiente.jpg" },
  { name: "BOUQUET SAUVAGE", image: "https://www.fermob.com/mediatheque/2_produits/Bouquet%20sauvage/3-ambiance/BOUQUET_SAUVAGE_CERISE_NOIRE_NOEL2022_LYON_SEBASTIEN_EROME.jpg?optimize=medium&fit=bounds&height=700&width=700" },
  { name: "CADIZ", image: "https://www.fermob.com/mediatheque/2_produits/Cadiz/3-ambiance/CADIZ_CALVI_ROMARIN_RAMATUELLE_RESIDENTIAL_DESIGNER2021_NICOLAS_MATHEUS_2.jpg?optimize=medium&fit=bounds&height=700&width=700" },
  { name: "CALVI", image: "https://www.fermob.com/mediatheque/2_produits/Calvi/3-ambiance/CALVI_SURPRISING_BLANC_COTON_TECK_IOS_GRIS_ARGILE_KONG_VISUEL2022_SARAH_BALHADERE_4.jpg?optimize=medium&fit=bounds&height=700&width=700" },
  { name: "CARACTÈRE", image: "https://www.fermob.com/mediatheque/2_produits/Plein%20air/3-ambiance/CARACTERE_PLEIN_AIR_CARBONE_RAMATUELLE_RESIDENTIAL_DESIGNER2021_NICOLAS_MATHEUS.jpg" },
  { name: "CHARIVARI", image: "https://www.worm.co.uk/cdn/shop/products/Charivari-Ambiance-2_1200x1200.jpg?v=1674083971I" },
  { name: "COCOTTE", image: "https://cdn.connox.com/m/100035/247481/media/fermob/Cocotte/Fermbob-Cocotte-rot-orange-Beistelltisch-Ambiente.jpg" },
  { name: "MOOON!", image: "https://cdn.connox.com/m/100035/253259/media/Blogbeitraege/Gartenbeleuchtung/fermob-aussenleuchte-akku-led-ambiente_04.jpg" },
  { name: "LUXEMBOURG", image: "https://www.fermob.com/mediatheque/2_produits/Studie/3-ambiance/STUDIE_VERT_CEDRE_LUXEMBOURG_VERT_CEDRE_PARIS_VISUEL2022_ROMAIN_RICARD.jpg?optimize=medium&fit=bounds&height=700&width=700" },
  { name: "SURPRISING", image: "https://www.fermob.com/mediatheque/2_produits/Surprising/3-ambiance/Mas%20de%20la%20Fouque_Saintes%20Maries%20de%20la%20Mer_FR_Stephane%20Rambaud%20pour%20Fermob%20(4).jpg?optimize=medium&fit=bounds&height=700&width=700" },
];

export default function FurnitureShowcase() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  const slugify = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]/g, '');
  };

  return (
    <section className="w-full bg-neutral-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-light tracking-tight text-neutral-800 mb-4">
            Collection<span className="font-medium text-amber-600">.</span>
          </h2>
          <p className="text-neutral-500 max-w-2xl mx-auto">
            Explore our exclusive range of contemporary outdoor furniture, designed to transform your space.
          </p>

          <div className="flex flex-wrap justify-center mt-8 mb-8 gap-2">
            {["All", "Tables", "Chairs"].map((cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === cat ? 'bg-amber-600 text-white' : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {productData.map((item, idx) => (
            <Link
              key={idx}
              to={`/collectionsfermob/${slugify(item.name)}`}
              className="group relative overflow-hidden rounded-lg"
              onMouseEnter={() => setHoveredItem(idx)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover object-center transition-all duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="pt-4 pb-8">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-medium text-neutral-800 group-hover:text-amber-600 transition-colors duration-300">
                    {item.name}
                  </h3>
                  <div className={`text-sm font-medium text-amber-600 opacity-0 transform translate-x-2 transition-all duration-300 ${hoveredItem === idx ? 'opacity-100 translate-x-0' : ''}`}>
                    Explore →
                  </div>
                </div>
                <p className="mt-1 text-sm text-neutral-500">Outdoor collection</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
