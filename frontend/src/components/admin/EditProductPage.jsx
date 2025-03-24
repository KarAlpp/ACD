import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';

const EditProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    sizes: [''],
    categories: [''],
    colors: [''],
    sku: '',
    images: ['']
  });

  // Fetch product details on mount
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`);
        const data = res.data;
        
        // Handle different data formats (array vs string)
        const formatAsArray = (field) => {
          if (!field) return [''];
          return Array.isArray(field) ? field : [field];
        };
        
        setProduct({
          name: data.name || '',
          description: data.description || '',
          price: data.price || '',
          sizes: formatAsArray(data.sizes || data.size),
          categories: formatAsArray(data.categories || data.category),
          colors: formatAsArray(data.colors || data.color),
          sku: data.sku || '',
          images: formatAsArray(data.images)
        });
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
        {
          ...product,
          // Filter out empty entries
          sizes: product.sizes.filter(size => size.trim() !== ''),
          colors: product.colors.filter(color => color.trim() !== ''),
          categories: product.categories.filter(category => category.trim() !== ''),
          images: product.images.filter(img => img.trim() !== '')
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      toast.success('Product updated successfully');
      navigate('/admin/products');
    } catch (error) {
      console.error('Update Error:', error);
      toast.error('Failed to update product');
    }
  };

  const uploadImageToCloudinary = async (file, index) => {
    if (!file) return;
    
    const formData = new FormData();
    formData.append('image', file);
    
    setUploading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('userToken')}`,
          },
        }
      );
      
      if (response.data && response.data.imageUrl) {
        const newImages = [...product.images];
        newImages[index] = response.data.imageUrl;
        setProduct({ ...product, images: newImages });
        
        toast.success('Image uploaded successfully');
      } else {
        console.error('Invalid response from server:', response.data);
        toast.error('Upload failed: Invalid server response');
      }
    } catch (error) {
      console.error('Upload error:', error);
      if (error.response) {
        console.error('Server response:', error.response.data);
        toast.error(`Upload failed: ${error.response.data.message || 'Server error'}`);
      } else if (error.request) {
        toast.error('Upload failed: No response from server');
      } else {
        toast.error(`Upload failed: ${error.message}`);
      }
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      console.log('Selected file:', file.name, file.type, file.size);
      uploadImageToCloudinary(file, index);
    }
  };

  // Generic function to handle multi-value fields (colors, sizes, categories)
  const handleMultiValueChange = (field, index, value) => {
    const newValues = [...product[field]];
    newValues[index] = value;
    setProduct({ ...product, [field]: newValues });
  };

  // Generic function to add a new entry to a multi-value field
  const addValueToField = (field) => {
    setProduct({ ...product, [field]: [...product[field], ''] });
  };

  // Generic function to remove an entry from a multi-value field
  const removeValueFromField = (field, index) => {
    const newValues = product[field].filter((_, i) => i !== index);
    setProduct({ ...product, [field]: newValues });
  };

  // Function to render multi-value input fields
  const renderMultiValueInput = (field, label) => (
    <div className='mb-4'>
      <label className='block text-gray-700 mb-2'>{label}</label>
      {product[field].map((value, index) => (
        <div key={index} className='flex items-center mb-2 gap-2'>
          <input
            type='text'
            value={value}
            onChange={(e) => handleMultiValueChange(field, index, e.target.value)}
            className='flex-1 p-2 border rounded'
            placeholder={`Enter ${label.toLowerCase()}`}
          />
          {product[field].length > 1 && (
            <button
              type='button'
              onClick={() => removeValueFromField(field, index)}
              className='text-red-500 hover:text-red-700'
            >
              Remove
            </button>
          )}
        </div>
      ))}
      <button
        type='button'
        onClick={() => addValueToField(field)}
        className='text-blue-600 hover:underline text-sm mt-1'
      >
        + Add another {label.toLowerCase()}
      </button>
    </div>
  );

  if (loading) return <div className="text-center py-10">Loading product...</div>;

  return (
    <div className='max-w-3xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        {/* Single value inputs */}
        <div className='mb-4'>
          <label className='block text-gray-700'>Name</label>
          <input
            type='text'
            name='name'
            value={product.name}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            required
          />
        </div>
        
        <div className='mb-4'>
          <label className='block text-gray-700'>Description</label>
          <textarea
            name='description'
            value={product.description}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            required
          />
        </div>
        
        <div className='mb-4'>
          <label className='block text-gray-700'>Price</label>
          <input
            type='number'
            name='price'
            value={product.price}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            required
          />
        </div>
        
        <div className='mb-4'>
          <label className='block text-gray-700'>SKU</label>
          <input
            type='text'
            name='sku'
            value={product.sku}
            onChange={handleChange}
            className='w-full p-2 border rounded'
            required
          />
        </div>
        
        {/* Multi-value inputs */}
        {renderMultiValueInput('sizes', 'Sizes')}
        {renderMultiValueInput('colors', 'Colors')}
        {renderMultiValueInput('categories', 'Categories')}

        {/* Images section */}
        <div className='mb-4'>
          <label className='block text-gray-700 mb-2'>Product Images</label>
          {product.images.map((img, index) => (
            <div key={index} className='flex items-center mb-3 gap-2'>
              <div className='flex-1'>
                <input
                  type='text'
                  value={img}
                  onChange={(e) => handleMultiValueChange('images', index, e.target.value)}
                  className='w-full p-2 border rounded'
                  placeholder="Image URL"
                />
              </div>
              
              <div className='flex items-center'>
                <input
                  type="file"
                  id={`file-${index}`}
                  className="hidden"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, index)}
                />
                <label 
                  htmlFor={`file-${index}`}
                  className='cursor-pointer bg-gray-200 text-gray-700 px-3 py-2 rounded hover:bg-gray-300 text-sm whitespace-nowrap'
                >
                  {uploading ? 'Uploading...' : 'Upload Image'}
                </label>
                
                {img && (
                  <div className='w-12 h-12 ml-2 border rounded overflow-hidden'>
                    <img src={img} alt="Preview" className='w-full h-full object-cover' />
                  </div>
                )}
              </div>
              
              {product.images.length > 1 && (
                <button
                  type='button'
                  onClick={() => removeValueFromField('images', index)}
                  className='text-red-500 hover:text-red-700'
                >
                  Remove
                </button>
              )}
            </div>
          ))}
          <button
            type='button'
            onClick={() => addValueToField('images')}
            className='text-blue-600 hover:underline text-sm mt-2'
          >
            + Add another image
          </button>
        </div>

        <button 
          type='submit' 
          className='bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700'
          disabled={uploading}
        >
          {uploading ? 'Please wait...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;