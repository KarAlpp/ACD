import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts, createProduct, deleteProduct } from '/src/redux/slices/adminProductSlice';
import { Link } from 'react-router-dom';

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.adminProduct);

  // ✅ FORM STATE (Ürün Ekleme Formu)
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    color: '',
    brand: '',
    sku: '',
    imageUrl: '',
    countInStock: '',
    
   
    colors: '',
    tags: '',
    metaTitle: '',
    metaDescription: '',
    metaKeywords: '',
  });

  // ✅ ÜRÜNLERİ YÜKLE
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  // ✅ INPUT DEĞİŞİKLİKLERİNİ YAKALA
  const handleInputChange = (e) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // ✅ ÜRÜN EKLEME
  const handleAddProduct = (e) => {
    e.preventDefault();

    const productData = {
      name: newProduct.name,
      description: newProduct.description,
      price: parseFloat(newProduct.price),
      category: newProduct.category,
      brand: newProduct.brand,
      sku: newProduct.sku,
      images: [newProduct.imageUrl],
      countInStock: parseInt(newProduct.countInStock),
      
      colors: newProduct.colors.split(',').map(c => c.trim()),
      tags: newProduct.tags.split(',').map(t => t.trim()),
      metaTitle: newProduct.metaTitle,
      metaDescription: newProduct.metaDescription,
      metaKeywords: newProduct.metaKeywords.split(',').map(k => k.trim()),
      isFeatured: false,
      isPublished: true,
      rating: 0,
      numReviews: 0,
    };

    dispatch(createProduct(productData)).then((res) => {
      if (!res.error) {
        setNewProduct({
          name: '',
          description: '',
          price: '',
          category: '',
          color: '',
          brand: '',
          sku: '',
          imageUrl: '',
          countInStock: '',
          sizes: '',
          colors: '',
          tags: '',
          metaTitle: '',
          metaDescription: '',
          metaKeywords: '',
        });
        dispatch(fetchAllProducts());
      }
    });
  };

  // ✅ ÜRÜN SİLME
  const handleDelete = (id) => {
    dispatch(deleteProduct(id)).then((res) => {
      if (!res.error) {
        dispatch(fetchAllProducts());
      }
    });
  };

  return (
    <div className='max-w-5xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>Product Management</h1>

      {/* ✅ ÜRÜN EKLEME FORMU */}
      <form onSubmit={handleAddProduct} className='space-y-4 mb-10'>
        <h2 className='text-xl font-semibold'>Add New Product</h2>
        <div className='grid grid-cols-2 gap-4'>
          {[
            'name', 'description', 'price', 'category', 'brand', 'sku', 'imageUrl',
            'countInStock', 
             'colors', 'tags',
            'metaTitle', 'metaDescription', 'metaKeywords'
          ].map((field) => (
            <input
              key={field}
              name={field}
              value={newProduct[field]}
              onChange={handleInputChange}
              placeholder={field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
              className='p-2 border rounded'
              required={field !== 'imageUrl'}
              type={['price',  'countInStock', 'length', 'width', 'height'].includes(field) ? 'number' : 'text'}
            />
          ))}
        </div>
        <button type='submit' className='bg-green-600 text-white px-4 py-2 rounded'>
          Add Product
        </button>
      </form>

      {/* ✅ YÜKLENİYOR & HATA MESAJLARI */}
      {loading && <p>Loading...</p>}
      {error && <p className='text-red-600'>{error}</p>}

      {/* ✅ ÜRÜN TABLOSU */}
      <table className='min-w-full border-collapse border border-gray-200 mt-6'>
        <thead>
          <tr className='bg-gray-100'>
            <th className='p-4 border'>IMAGE</th>
            <th className='p-4 border'>NAME</th>
            <th className='p-4 border'>DESCRIPTION</th>
            <th className='p-4 border'>PRICE</th>
            <th className='p-4 border'>CATEGORY</th>
            <th className='p-4 border'>COLOR</th>
            <th className='p-4 border'>BRAND</th>
            <th className='p-4 border'>SKU</th>
            <th className='p-4 border'>ACTIONS</th>
          </tr>
        </thead>
        <tbody>
          {products && products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id} className='border-b hover:bg-gray-50'>
                <td className='p-4 border'>
                  <img src={product.images?.[0] || 'https://via.placeholder.com/150'} className='w-16 h-16 object-cover' />
                </td>
                <td className='p-4 border font-semibold'>{product.name}</td>
                <td className='p-4 border'>{product.description}</td>
                <td className='p-4 border'>${product.price}</td>
                <td className='p-4 border'>{product.category}</td>
                <td className='p-4 border'>{product.color}</td>
                <td className='p-4 border'>{product.brand}</td>
                <td className='p-4 border'>{product.sku}</td>
                <td className='p-4 border'>
                  {/* ✅ Edit Butonu */}
                  <Link to={`/admin/products/${product._id}/edit`} className='bg-yellow-500 text-white px-4 py-2 rounded mr-2'>
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(product._id)} className='bg-red-500 text-white px-4 py-2 rounded'>
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan='9' className='p-4 text-center'>
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductManagement;
