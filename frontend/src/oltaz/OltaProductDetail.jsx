import { useState } from 'react';
import { ArrowLeft, ChevronRight, Info } from 'lucide-react';

export default function OltaProductDetail() {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="max-w-7xl mx-auto p-4 font-sans">
      {/* Back button */}
      <div className="mb-8">
        <button className="border border-gray-300 px-4 py-2 flex items-center text-sm">
          <ArrowLeft size={16} className="mr-1" />
          Back
        </button>
      </div>

      {/* Product Header and Image Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="space-y-6">
          <div>
            <p className="text-gray-600">The classic parasol since 1931</p>
            <h1 className="text-3xl font-bold mt-1">ALEXO®</h1>
          </div>

          <div>
            <p className="font-medium text-lg">from 445.00€</p>
            <p className="text-sm text-gray-500">RRP incl. VAT, excl. base</p>
          </div>

          <p className="text-gray-800">
            Alexo is an icon. For over 90 years, this quintessential parasol has perfectly combined design and functionality
          </p>

          <div>
            <button className="border border-red-500 text-red-500 hover:bg-red-50 px-8 py-3 w-full sm:w-auto">
              Parasol configurator
            </button>
          </div>
        </div>

        <div className="relative">
          <img 
            src="https://www.glatz.com/media/18000220751523.webp" 
            alt="ALEXO Parasol" 
            className="mx-auto"
          />
          <div className="absolute top-1/2 right-1/4 bg-red-500 text-white rounded-full w-12 h-12 flex items-center justify-center">
            <span className="font-bold">3D</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-8">
        <div className="flex space-x-8">
          <button 
            className={`pb-2 relative ${activeTab === 'description' ? 'text-red-500 font-medium' : 'text-gray-600'}`}
            onClick={() => setActiveTab('description')}
          >
            Description
            {activeTab === 'description' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500"></div>}
          </button>
          <button 
            className={`pb-2 relative ${activeTab === 'technical' ? 'text-red-500 font-medium' : 'text-gray-600'}`}
            onClick={() => setActiveTab('technical')}
          >
            Technical data
            {activeTab === 'technical' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500"></div>}
          </button>
        </div>
      </div>

      {/* Description Content */}
      {activeTab === 'description' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="md:col-span-2 space-y-6">
            <h2 className="text-2xl font-medium text-gray-800">The classic parasol since 1931</h2>
            
            <p className="text-gray-700">
              Alexo is an icon. For over 90 years, this quintessential parasol has perfectly combined design and functionality. Made of Swiss ash wood and featuring a gear joint, its pole as well as its domed parasol roof make it a real classic for sunny days. Thanks to the traction of up to 360° and Alexo's ability to rotate around its own axis, creating shade becomes child's play.
            </p>
            
            <p className="text-gray-700">
              At 200 to 220 centimetres in diameter, Alexo is also the ideal parasol when space is limited. Its break-proof ribs, the iconic and high-quality ash wood mast and a solid gear joint, made of die-cast zinc, ensure that Alexo is a permanently reliable companion. And as you would expect, it comes with assorted fixations and the appropriate flounce. This is what savoir vivre with a rich heritage looks like.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-8">
              <button className="border border-red-500 text-red-500 hover:bg-red-50 px-6 py-3">
                Product brochure
              </button>
              <button className="border border-red-500 text-red-500 hover:bg-red-50 px-6 py-3">
                Play operating film
              </button>
              <button className="border border-red-500 text-red-500 hover:bg-red-50 px-6 py-3">
                Operating manual
              </button>
            </div>
          </div>
          
          <div className="bg-gray-50 p-6">
            <h3 className="font-medium mb-4">Frame</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>10 parts</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Pole Ø 30 mm</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Gear joint made from nickel-plated brass</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Ribs made from flexible, break-proof fiberglass</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Function: Tiltable to 90°</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Frame roof: round</span>
              </li>
            </ul>
          </div>
        </div>
      )}

      {/* Technical Data Content */}
      {activeTab === 'technical' && (
        <div className="py-8">
          <h2 className="text-2xl font-medium text-gray-800 mb-6">Technical Specifications</h2>
          <p className="text-gray-700 mb-4">Full technical specifications for the ALEXO parasol.</p>
        </div>
      )}

      {/* Feature Icons Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12 text-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 mb-3 bg-gray-100 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 rounded-full border border-gray-400"></div>
          </div>
          <h4 className="font-medium mb-1">Round</h4>
          <p className="text-sm text-gray-600">Ø200cm, Ø220cm</p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 mb-3 bg-gray-100 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4V20M4 12H20" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </div>
          <h4 className="font-medium mb-1">Frame colour</h4>
          <p className="text-sm text-gray-600">Swiss ash wood, colourless varnish</p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 mb-3 bg-gray-100 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 flex flex-row items-center">
              <div className="w-3 h-6 bg-gray-400"></div>
              <div className="w-3 h-6 bg-gray-600"></div>
            </div>
          </div>
          <h4 className="font-medium mb-1">Fabric quality & Colours</h4>
          <p className="text-sm text-gray-600">2 different fabric qualities</p>
          <button className="text-red-500 text-sm mt-1">See fabrics & colours</button>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 mb-3 bg-gray-100 rounded-full flex items-center justify-center">
            <div className="w-6 h-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L3 12H5V20H19V12H21L12 4Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </div>
          <h4 className="font-medium mb-1">Volant</h4>
          <p className="text-sm text-gray-600">With or without volant</p>
        </div>
        
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 mb-3 bg-gray-100 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </div>
          <h4 className="font-medium mb-1">Places of use</h4>
          <p className="text-sm text-gray-600">Meadow, Balcony, Terrace, Hotel & Restaurant</p>
        </div>
      </div>

      {/* Bottom Feature Icons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <div className="flex flex-col items-center md:items-start">
          <div className="w-12 h-12 mb-3 bg-gray-100 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </div>
          <h4 className="font-medium mb-1">Fastening types</h4>
          <p className="text-sm text-gray-600 mb-2">Base, Ground socket, Wall console, Grass spike</p>
          <button className="text-red-500 text-sm">View fastenings</button>
        </div>
        
        <div className="flex flex-col items-center md:items-start">
          <div className="w-12 h-12 mb-3 bg-gray-100 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 7H4C2.89543 7 2 7.89543 2 9V19C2 20.1046 2.89543 21 4 21H20C21.1046 21 22 20.1046 22 19V9C22 7.89543 21.1046 7 20 7Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M16 21V5C16 3.89543 15.1046 3 14 3H10C8.89543 3 8 3.89543 8 5V21" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </div>
          <h4 className="font-medium mb-1">Accessories</h4>
          <p className="text-sm text-gray-600">Protection cover, Lighting</p>
        </div>
        
        <div className="flex flex-col items-center md:items-start">
          <div className="w-12 h-12 mb-3 bg-gray-100 rounded-full flex items-center justify-center">
            <div className="w-6 h-6 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 4L3 12H5V20H19V12H21L12 4Z" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
          </div>
          <h4 className="font-medium mb-1">Spare parts</h4>
          <p className="text-sm text-gray-600 mb-2">Ask your dealer for spare parts</p>
          <button className="text-red-500 text-sm">Find a dealer</button>
        </div>
      </div>
    </div>
  );
}