import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const FermobDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedPacking, setSelectedPacking] = useState('');
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [isZoomed, setIsZoomed] = useState(false);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const colorMap = {
    "Cotton white": "#FFFFFF",
    "Deep blue": "#003366",
    "Acapulco blue": "#115573",
    "Maya blue": "#73C2FB",
    "Cactus": "#005c41",
    "Anthracite": "#2a2a2a",
    "Black Cherry": "#3B0F1D",
    "Frosted Lemon": "#FFF8C9",
    "Clay Grey": "#A79E84",
    "Lapilli Grey": "#B4B8B0",
    "Storm Grey": "#6c7a80",
    "Marshmallow": "#F0E6E6",
    "Ice mint": "#C8E5D7",
    "Honey": "#b8a93c",
    "Nutmeg": "#a67b5b",
    "Red ochre": "#A52A2A",
    "Candied orange": "#FF9147",
    "Gingerbread": "#8B4513",
    "Pesto": "#7D8F4E",
    "Willow Green": "#76B583",
    "Chili": "#D22B2B",
    "Rosemary": "#889191",
    "Liquorice": "#000000",
    "Tonka": "#705D41",
    "Cedar green": "#5e6a40"
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
        setProduct(data);

        if (data.colors && data.colors.length > 0) {
          setSelectedColor(data.colors[0]);
          if (data.images && data.images[data.colors[0]]) {
            setSelectedImage(data.images[data.colors[0]]);
          }
        }

        if (data.packings && data.packings.length > 0) {
          setSelectedPacking(data.packings[0]);
        } else {
          setSelectedPacking('1');
        }
      } catch (error) {
        console.error('Product could not be fetched:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    if (product?.images && product.images[color]) {
      setSelectedImage(product.images[color]);
    }
  };

  const handlePackingChange = (p) => setSelectedPacking(p);

  const handleAddToCart = () => {
    if (product?.colors?.length > 0 && !selectedColor) {
      alert("Lütfen önce bir renk seçin!");
      return;
    }
    if (!selectedPacking) {
      alert("Lütfen önce bir koli seçeneği seçin!");
      return;
    }
  
    const message = `Merhaba, aşağıdaki ürünü sipariş etmek istiyorum:\n- Ürün Adı: ${product?.name}\n${selectedColor ? `- Renk: ${selectedColor}\n` : ''}${selectedPacking ? `- Koli: ${selectedPacking}\n` : ''}\nBilgi alabilir miyim? Teşekkürler.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/905332362513?text=${encodedMessage}`, '_blank');
  };
  
  const handleOrderEmail = () => {
    if (product?.colors?.length > 0 && !selectedColor) {
      alert("Lütfen önce bir renk seçin!");
      return;
    }
    if (!selectedPacking) {
      alert("Lütfen önce bir koli seçeneği seçin!");
      return;
    }
  
    const subject = encodeURIComponent(`Sipariş Talebi: ${product?.name}`);
    const body = encodeURIComponent(
      `Merhaba,\n\nAşağıdaki ürünü sipariş etmek istiyorum:\n- Ürün Adı: ${product?.name}\n${selectedColor ? `- Renk: ${selectedColor}\n` : ''}${selectedPacking ? `- Koli: ${selectedPacking}\n` : ''}\n\nStok durumu ve gönderim hakkında bilgi verebilir misiniz?\n\nTeşekkürler.`
    );
  
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=info@acdstore.com.tr,tuba@acdstore.com.tr&su=${subject}&body=${body}`,
      '_blank'
    );
  };
  
  const getDisplayedImage = () => {
    if (selectedImage) return selectedImage;
    if (!product?.images) return 'https://placehold.co/400x400?text=No+Image';
    if (selectedColor && product.images[selectedColor]) {
      return product.images[selectedColor];
    }
    const validImages = Object.values(product.images).filter((img) => img && img.trim() !== '');
    if (validImages.length > 0) return validImages[0];
    return 'https://placehold.co/400x400?text=No+Image';
  };

  if (loading) return <div className="w-full py-24 text-center text-lg">Loading...</div>;
  if (!product) return <div className="w-full py-24 text-center text-lg">Product not found.</div>;

  const displayedImage = getDisplayedImage();
  const colorsArray = product.colors || [];
  const packingArray = product.packings?.length > 0 ? product.packings : ['1'];

  return (
    <div className="w-full px-4 py-40 relative">
      <div className="bg-gray-100 py-2 px-4 mb-8">
        <nav className="flex items-center space-x-2 text-sm text-gray-600">
          <Link to="/" className="hover:underline hover:text-blue-600">Home</Link>
          <span>/</span>
          <Link to="/collectionsfermob" className="hover:underline hover:text-blue-600">Collections</Link>
          <span>/</span>
          <span className="font-semibold text-gray-800">{product.name?.split(' - ')[0]}</span>
        </nav>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12 items-start justify-start text-left">
        <div className="flex flex-col items-center">
<div
  className="relative p-2 rounded aspect-square w-full max-w-[500px] mx-auto cursor-pointer overflow-hidden border border-gray-200"
  onClick={() => selectedImage && setIsZoomed(true)}
  onMouseMove={(e) => {
    if (!selectedImage) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setHoverPosition({ x, y });
  }}
  onMouseEnter={() => selectedImage && setIsHovering(true)}
  onMouseLeave={() => setIsHovering(false)}
>
  {displayedImage.includes('placehold.co') ? (
    <div className="flex items-center justify-center w-full h-full text-center text-gray-500 text-sm px-4">
      Ürün görseli mevcut değil
    </div>
  ) : (
    <>
      <img src={displayedImage} alt={product.name} className="object-contain w-full h-full" />
      {isHovering && (
        <div className="absolute pointer-events-none top-0 left-0 w-full h-full">
          <div
            className="absolute w-40 h-40 border-2 border-gray-300 rounded-full overflow-hidden"
            style={{
              left: `${hoverPosition.x}%`,
              top: `${hoverPosition.y}%`,
              backgroundImage: `url(${displayedImage})`,
              backgroundSize: '200%',
              backgroundPosition: `${hoverPosition.x}% ${hoverPosition.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          />
        </div>
      )}
    </>
  )}
</div>


          {/* Thumbnail + Teknik Görsel */}
          <div className="w-full mt-4">
          <div className="flex gap-4 justify-center mt-4 flex-wrap">
          {colorsArray.slice(0, 5).map((color, index) => (
                product.images?.[color] ? (
                  <img
                    key={index}
                    src={product.images[color]}
                    alt={`${color} variant`}
                    onClick={() => handleColorChange(color)}
                    className={`w-20 h-20 object-contain border rounded-lg cursor-pointer hover:border-black ${
                      selectedColor === color ? 'border-2 border-black' : 'border-gray-200'
                    }`}
                  />
                ) : null
              ))}
            </div>

            {product?.images && (
              <div className="mt-6 w-full flex justify-center">
                <div className="border border-gray-200 rounded overflow-hidden max-w-md bg-white shadow-sm">
                  <img
                    src={product.images[Object.keys(product.images).slice(-1)[0]]}
                    alt="Technical Drawing"
                    className="w-full h-auto object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col items-start justify-start text-left w-full">
          <div className="mb-6">
            <h1 className="text-4xl font-bold text-gray-800">{product.name}</h1>
            {product.category && <p className="text-xl text-gray-600 mt-1">{product.category.toUpperCase()}</p>}
            {product.design && <p className="text-lg mt-2">Design: {product.design}</p>}
            <p className="text-gray-500 mt-2">Ref: {product.ref}</p>
          </div>

          {/* Color Selection */}
          {colorsArray.length > 0 && (
            <div className="mb-8 w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium">Color</h3>
                <p className="text-right">{selectedColor}</p>
              </div>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {colorsArray.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => handleColorChange(color)}
                    className={`w-12 h-12 border relative ${
                      selectedColor === color ? 'border-black ring-2 ring-gray-400' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: colorMap[color] || '#dddddd' }}
                    title={color}
                  >
                    {selectedColor === color && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-white rounded-full flex items-center justify-center">
                        <span className="text-xs">✓</span>
                      </div>
                    )}
                  </button>
                ))}
              </div>
              <div className="w-full mb-4">
                <select
                  value={selectedColor}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="border border-gray-300 rounded px-3 py- w-full text-sm"
                >
                  {colorsArray.map((color, index) => (
                    <option key={index} value={color}>{color}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* Technical Details */}
          {product.technicalSheet?.length > 0 && (
            <div className="mb-8 w-full">
              <h3 className="text-lg font-medium mb-3">Technical Details</h3>
              <ul className="list-disc pl-5 text-gray-700">
                {product.technicalSheet.map((item, i) => (
                  <li key={i} className="mb-2">{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Usage Icons */}
          <div className="mt-4 mb-8 flex gap-2">
            {product.door?.includes('outdoor') && (
              <div className="bg-gray-200 p-2 w-10 h-10 flex items-center justify-center rounded">
                <span>☀️</span>
              </div>
            )}
            {product.door?.includes('indoor') && (
              <div className="bg-gray-200 p-2 w-10 h-10 flex items-center justify-center rounded">
                <span>🏠</span>
              </div>
            )}
            {product.collection && (
              <div className="bg-gray-200 p-2 w-32 h-10 flex items-center justify-center rounded">
                <span className="text-xs">{product.collection.toUpperCase()}</span>
              </div>
            )}
          </div>

          {/* Packing Buttons */}
          <div className="mb-8 w-full">
            <label className="block mb-2 font-medium text-lg">Choose Packing:</label>
            <div className="flex flex-wrap gap-2">
              {packingArray.map((p, index) => (
                <button
                  key={index}
                  onClick={() => handlePackingChange(p)}
                  className={`px-6 py-2 rounded-full border text-sm font-semibold ${
                    selectedPacking === p ? 'bg-gray-800 text-white border-gray-800' : 'bg-white text-gray-800 border-gray-300'
                  } hover:bg-gray-100 transition-all duration-200`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          {/* Order Buttons */}
          <div className="flex items-center gap-4 flex-wrap mt-4">
            <button
              onClick={handleAddToCart}
              className="bg-gray-800 text-white rounded-full hover:bg-gray-700 px-8 py-3 text-sm font-semibold transition-all duration-200"
            >
              Order via WhatsApp
            </button>
            <button
              onClick={handleOrderEmail}
              className="bg-gray-800 text-white rounded-full hover:bg-gray-700 px-8 py-3 text-sm font-semibold transition-all duration-200"
            >
              Order via mail
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      {product.features && (
        <div className="mb-12 text-left">
          <h3 className="text-xl font-semibold mb-4">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(product.features).map(([key, value], i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">{key}</h4>
                <p className="text-gray-700">{value}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50" onClick={() => setIsZoomed(false)}>
          <div className="relative max-w-4xl max-h-screen p-4">
            <button className="absolute top-4 right-4 bg-white rounded-full p-2" onClick={(e) => { e.stopPropagation(); setIsZoomed(false); }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <img src={displayedImage} alt={product.name} className="max-w-full max-h-[80vh] object-contain" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FermobDetails;
