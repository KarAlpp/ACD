import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function KubrickModern() {
  return (
    <div className="w-full bg-white min-h-screen">
      <div className="h-16"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-24">
        
        {/* Luxembourg Section */}
        <section className="relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-stretch">
            <div className="w-full lg:w-3/5 h-96 lg:h-auto relative group">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all duration-500"></div>
              <img
                src="https://images.squarespace-cdn.com/content/v1/5a25882bb7411c731c31d2bc/1566254746913-EDASHGV991YPLE4272YI/Collection-Luxembourg-de-Fermob-mobilier-de-jardin-en-metal-1.jpg?format=1500w"
                alt="Luxembourg Collection"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="w-full lg:w-2/5 flex flex-col justify-center bg-gray-50 p-8 lg:p-12">
              <div className="max-w-md">
                <h3 className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-3">Collection</h3>
                <h2 className="text-3xl font-light mb-6 tracking-tight">Luxembourg</h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  With elegant lines and an iconic stance, the Luxembourg Collection merges French garden 
                  culture with modern living, creating timeless outdoor spaces.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/collectionsfermob/LUXEMBOURG" className="group">
                    <button className="w-full sm:w-auto px-6 py-3 bg-black text-white text-sm font-medium flex items-center justify-center transition-all hover:bg-gray-900">
                      Explore Collection
                      <ArrowRight size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </Link>
                  <Link to="/collectionsfermob/LUXEMBOURG" className="group">
                    <button className="w-full sm:w-auto px-6 py-3 border text-sm font-medium flex items-center justify-center border-gray-300 hover:border-black transition-colors">
                      View Products
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sixties Section */}
        <section className="relative overflow-hidden">
          <div className="flex flex-col lg:flex-row-reverse items-stretch">
            <div className="w-full lg:w-3/5 h-96 lg:h-auto relative group">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all duration-500"></div>
              <img
                src="https://www.fermob.com/mediatheque/2_produits/Sixties/3-ambiance/SIXTIES_REGLISSE_BALAD_MOOON!_CARBONE_KONG_VISUEL2022_SARAH_BALHADERE.jpg"
                alt="Sixties Collection"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="w-full lg:w-2/5 flex flex-col justify-center bg-gray-50 p-8 lg:p-12">
              <div className="max-w-md">
                <h3 className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-3">Collection</h3>
                <h2 className="text-3xl font-light mb-6 tracking-tight">Sixties</h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  The Sixties Collection blends retro spirit with contemporary aesthetics, creating 
                  distinctive outdoor furniture that celebrates both comfort and style.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/collectionsfermob/SIXTIES" className="group">
                    <button className="w-full sm:w-auto px-6 py-3 bg-black text-white text-sm font-medium flex items-center justify-center transition-all hover:bg-gray-900">
                      Explore Collection
                      <ArrowRight size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </Link>
                  <Link to="/collectionsfermob/SIXTIES" className="group">
                    <button className="w-full sm:w-auto px-6 py-3 border text-sm font-medium flex items-center justify-center border-gray-300 hover:border-black transition-colors">
                      View Products
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Croisette Section */}
        <section className="relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-stretch">
            <div className="w-full lg:w-3/5 h-96 lg:h-auto relative group">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-all duration-500"></div>
              <img
                src="https://www.fermob.com/mediatheque/2_produits/Croisette/3-ambiance/CROISETTE_GRIS_ORAGE_CHATEAU-CLEMENT_VISUEL2018_STEPHANE_RAMBAUD_2.jpg"
                alt="Croisette Collection"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="w-full lg:w-2/5 flex flex-col justify-center bg-gray-50 p-8 lg:p-12">
              <div className="max-w-md">
                <h3 className="text-xs font-medium tracking-widest text-gray-400 uppercase mb-3">Collection</h3>
                <h2 className="text-3xl font-light mb-6 tracking-tight">Croisette</h2>
                <p className="text-gray-600 leading-relaxed mb-8">
                  The Croisette Collection introduces lightweight, woven designs with retro flair. 
                  Perfect for urban balconies or sunny terraces, it combines compact comfort with 
                  Fermob’s outdoor durability.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to="/collectionsfermob/CROISSETTE" className="group">
                    <button className="w-full sm:w-auto px-6 py-3 bg-black text-white text-sm font-medium flex items-center justify-center transition-all hover:bg-gray-900">
                      Explore Collection
                      <ArrowRight size={16} className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  </Link>
                  <Link to="/collectionsfermob/CROISSETTE" className="group">
                    <button className="w-full sm:w-auto px-6 py-3 border text-sm font-medium flex items-center justify-center border-gray-300 hover:border-black transition-colors">
                      View Products
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
