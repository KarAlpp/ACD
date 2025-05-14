import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const CatalogDetails = () => {
  const { catalogName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/filter?collection=${encodeURIComponent(catalogName)}`);
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [catalogName]);

  if (loading) {
    return <div className="py-20 text-center">Loading...</div>;
  }

  if (products.length === 0) {
    return <div className="py-20 text-center text-gray-500">No products found for {catalogName}.</div>;
  }

  return (
    <div className="px-6 py-40 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">{catalogName} Collection</h1>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            to={`/product/${product._id}`}
            key={product._id}
            className="bg-white rounded-md shadow hover:shadow-md transition p-4"
          >
            <div className="h-48  mb-4 flex items-center justify-center">
              <img
                src={
                  product.images && typeof product.images === 'object'
                    ? Object.values(product.images)[0]
                    : (product.image || '/default-image.jpg')
                }
                alt={product.name}
                className="h-full object-contain"
                onError={(e) => (e.target.src = '/default-image.jpg')}
              />
            </div>
            <h2 className="text-md font-semibold mb-1">{product.name}</h2>
            <p className="text-sm text-gray-500 mb-2">Ref: {product.ref}</p>
            
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CatalogDetails;
