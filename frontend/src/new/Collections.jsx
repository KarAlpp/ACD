import React from 'react';
import { Link } from 'react-router-dom';

export default function KubrickFixed() {
  return (
    <div className="flex flex-col w-full bg-neutral-100 min-h-screen">
      {/* Hero Section — same as before */}
      
      {/* Luxembourg Section */}
      <section className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row-reverse items-center justify-center">
          <div className="w-full lg:w-1/2 h-[600px]">
            <img
              src="https://images.squarespace-cdn.com/content/v1/5a25882bb7411c731c31d2bc/1566254746913-EDASHGV991YPLE4272YI/Collection-Luxembourg-de-Fermob-mobilier-de-jardin-en-metal-1.jpg?format=1500w"
              alt="Luxembourg Collection"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center items-start py-12">
            <div className="max-w-[500px]">
              <h2 className="text-sm text-gray-500 tracking-wide mb-3 uppercase">Luxembourg</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                With elegant lines and an iconic stance, the Luxembourg Collection merges French garden culture with modern living...
              </p>
              <div className="flex gap-3">
                <Link to="/collectionsfermob/LUXEMBOURG">
                  <button className="px-4 py-2 text-white text-sm bg-black hover:bg-gray-800 transition">
                    View Details
                  </button>
                </Link>
                <Link to="/collectionsfermob/LUXEMBOURG">
                  <button className="px-4 py-2 text-sm border border-gray-400 hover:border-black transition">
                    See Products
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sixties Section */}
      <section className="w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center justify-center">
          <div className="w-full lg:w-1/2 h-[600px]">
            <img
              src="https://www.fermob.com/mediatheque/2_produits/Sixties/3-ambiance/SIXTIES_REGLISSE_BALAD_MOOON!_CARBONE_KONG_VISUEL2022_SARAH_BALHADERE.jpg"
              alt="Sixties Collection"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="w-full lg:w-1/2 flex flex-col justify-center items-start py-12">
            <div className="max-w-[500px]">
              <h2 className="text-sm text-gray-500 tracking-wide mb-3 uppercase">Sixties</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-6">
                The Sixties Collection blends retro spirit with contemporary aesthetics...
              </p>
              <div className="flex gap-3">
                <Link to="/collectionsfermob/SIXTIES">
                  <button className="px-4 py-2 text-white text-sm bg-black hover:bg-gray-800 transition">
                    View Details
                  </button>
                </Link>
                <Link to="/collectionsfermob/SIXTIES">
                  <button className="px-4 py-2 text-sm border border-gray-400 hover:border-black transition">
                    See Products
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
