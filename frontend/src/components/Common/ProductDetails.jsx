import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import axios from 'axios';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MayAlsoLike = ({ productId }) => {
  const containerRef = useRef(null);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!productId) return;

    const fetchSimilarProducts = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${productId}`);
        setSimilarProducts(response.data);
      } catch (error) {
        console.error("Error fetching similar products:", error);
        setError("Failed to load similar products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarProducts();
  }, [productId]);

  useEffect(() => {
    if (!containerRef.current || similarProducts.length === 0) return;

    const items = containerRef.current.querySelectorAll('.product-card');

    gsap.fromTo(
      items,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, [similarProducts]);

  const getImageUrl = (product) => {
    if (!product) return '/default-image.jpg';
    if (product.images && product.images.length > 0) {
      if (product.images[0].url) return product.images[0].url;
      if (typeof product.images[0] === 'string') return product.images[0];
    }
    if (product.image && product.image.url) return product.image.url;
    if (product.image && typeof product.image === 'string') return product.image;
    return '/default-image.jpg';
  };

  return (
    <div className="mt-16 flex justify-center">
      <div className="w-full max-w-screen-xl px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          You May Also Like
        </h2>

        {loading && <p className="text-center text-gray-500">Loading products...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}
        {!loading && !error && similarProducts.length === 0 && (
          <p className="text-center text-gray-500">No similar products available.</p>
        )}

        <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {similarProducts.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="product-card flex flex-col items-center cursor-pointer transition-transform hover:scale-105"
            >
              <div className="w-full aspect-[3/4] overflow-hidden rounded-lg">
                <img
                  src={getImageUrl(product)}
                  alt={product.name || 'Product Image'}
                  className="w-full h-full object-cover"
                  onError={(e) => (e.target.src = '/default-image.jpg')}
                />
              </div>
              <h3 className="mt-3 text-center text-sm font-medium text-gray-800">
                {product.name || 'No Name'}
              </h3>
              <p className="text-center text-sm text-gray-600">
                ${product.price ? product.price.toFixed(2) : 'N/A'}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

const ProductDetails = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  useEffect(() => {
    const fetchProductDetails = async () => {
      if (!id) {
        try {
          const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
          const topProduct = response.data;
          setSelectedProduct(topProduct);
          setSelectedImage(topProduct?.images?.[0]?.url || topProduct?.images?.[0] || '');
          setSelectedColor(topProduct?.colors?.[0] || '');
          setSelectedSize(topProduct?.sizes?.[0] || '');
          setLoading(false);
        } catch (error) {
          console.error("Error fetching top rated product:", error);
          toast.error('Failed to load featured product');
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
        const productData = response.data;
        setSelectedProduct(productData);
        setSelectedImage(productData?.images?.[0]?.url || productData?.images?.[0] || '');
        setSelectedColor(productData?.colors?.[0] || '');
        setSelectedSize(productData?.sizes?.[0] || '');
      } catch (error) {
        console.error("Error fetching product details:", error);
        toast.error('Failed to load product details');
      }
      setLoading(false);
    };

    fetchProductDetails();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = async () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color");
      return;
    }
    setIsButtonDisabled(true);
    try {
      // Instead of making the API call, we'll simulate a failed request
      // Comment out or remove the actual API call:
      // await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {...});
      
      // Display an error message
      toast.error("Sorry, this feature is temporarily unavailable. Please contact us via WhatsApp for assistance.");
      
      // Optional: You could log that someone tried to use the cart feature
      console.log("Cart attempt:", {
        productId: selectedProduct._id,
        quantity,
        size: selectedSize,
        color: selectedColor
      });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      toast.error("Failed to add product to cart");
    } finally {
      setIsButtonDisabled(false);
    }
  };
  

  if (loading) return <div className="py-10 text-center">Loading product details...</div>;
  if (!selectedProduct) return <div className="py-10 text-center">Product not found</div>;

  const { dimensions, material, weight, sku, category, brand, door, tags } = selectedProduct;

  return (
    <>
      <div className="py-24 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[80px_1fr_1fr] gap-8">
          <div className="hidden md:flex flex-col space-y-4">
            {selectedProduct.images?.map((image, index) => (
              <img
                key={index}
                src={image.url || image}
                alt={image.altText || `Thumbnail ${index}`}
                onClick={() => setSelectedImage(image.url || image)}
                className={`w-16 h-16 object-cover rounded-lg cursor-pointer border ${selectedImage === (image.url || image) ? 'border-black' : 'border-gray-300'}`}
              />
            ))}
          </div>

          <div className="w-full">
            <img
              src={selectedImage || '/default-image.jpg'}
              alt="Selected Product"
              className="w-full object-cover rounded-lg h-160"
              onError={(e) => { e.target.src = '/default-image.jpg'; }}
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl font-semibold">{selectedProduct.name}</h1>
            <p className="text-2xl text-gray-600">${selectedProduct.price}</p>
            <p className="text-gray-700">{selectedProduct.description}</p>

            <div>
              <p className="text-gray-700 font-medium">Color:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.colors?.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border ${selectedColor === color ? 'border-black' : 'border-gray-300'}`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>

            <div>
              <p className="text-gray-700 font-medium">Size:</p>
              <div className="flex gap-2 mt-2">
                {selectedProduct.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded border ${selectedSize === size ? 'border-black text-black' : 'border-gray-300'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <p className="text-gray-700 font-medium">Quantity:</p>
              <div className="flex items-center space-x-4 mt-2">
                <button onClick={decreaseQuantity} className="px-3 py-1 bg-gray-200 rounded text-lg">-</button>
                <span className="text-lg">{quantity}</span>
                <button onClick={increaseQuantity} className="px-3 py-1 bg-gray-200 rounded text-lg">+</button>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={isButtonDisabled}
              className={`w-full bg-black text-white py-3 rounded-lg transition ${isButtonDisabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-900'}`}
            >
              {isButtonDisabled ? 'Adding...' : 'Add to Cart'}
            </button>

            <div className="mt-8 flex items-center gap-2">
              <a
                href="https://wa.me/+905332362513"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-600 hover:text-green-800 text-lg font-bold"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
                  alt="WhatsApp"
                  className="w-6 h-6"
                />
                Contact for Product Info
              </a>
            </div>

            <div className="mt-10 text-sm text-gray-600 space-y-2">
              {category && <p><strong>Category:</strong> {category}</p>}
              {brand && <p><strong>Brand:</strong> {brand}</p>}
              {material && <p><strong>Material:</strong> {material}</p>}
              {door && <p><strong>Type:</strong> {door}</p>}
              {dimensions && (
                <p>
                  <strong>Dimensions:</strong> {dimensions.length} x {dimensions.width} x {dimensions.height} cm
                </p>
              )}
              {tags && tags.length > 0 && (
                <p><strong>Tags:</strong> {tags.join(', ')}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <MayAlsoLike productId={id || selectedProduct?._id} />
      <Toaster position="top-center" />
    </>
  );
};

export default ProductDetails;