import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Hero from '../components/Layout/Hero';
import Indooroutdoor from '../components/Products/Indooroutdoor';
import NewArrivals from '../components/Products/NewArrivals';
import Bestseller from '../components/Common/Bestseller'; // Best Sellers Component
import ProductDetails from '../components/Common/ProductDetails';
import MayAlsoLike from '../components/Common/MayAlsoLike';
import TopFurniture from '../components/Common/TopFurniture';
import FeaturedCollection from '../components/Common/FeaturedCollection';
import { fetchProductByFilters } from '../redux/slices/productSlice';
import MonthlyClubSection from './MonthlyClubSection ';
import Brands from '../components/Products/Brands';
import HoverPreview from '../components/Layout/HoverPreview';
import Standing from '../new/standing';
import Collections from '../new/Collections';
import Scrolldeneme from '../new/Scrolldeneme';
import Showcase from '../new/Showcase';

const Home = () => {
    const dispatch = useDispatch();
    const { products, loading, error } = useSelector((state) => state.products);
    const [bestSellerProducts, setBestSellerProducts] = useState([]); // ✅ Default value as []

    // Fetch Best Seller Products
    const fetchBestSellers = async () => {
        try {
            console.log("Fetching best sellers from:", import.meta.env.VITE_BACKEND_URL); // ✅ Debugging
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`);
            setBestSellerProducts(response.data);
            console.log("Best Sellers Data:", response.data); // ✅ Check response
        } catch (error) {
            console.error("Error fetching best sellers:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await dispatch(fetchProductByFilters({ limit: 8 })); // ✅ Fetch products from Redux
            await fetchBestSellers(); // ✅ Fetch best sellers
        };
        fetchData();
    }, [dispatch]);

    return (
        <div>
            
            <Hero />
            
            <Bestseller  /> 

            <Collections />
            <Standing />
            <Indooroutdoor />
            <Brands/>
            {/* ✅ Pass bestSellerProducts as props */}
            <HoverPreview />
            <Showcase />
            <MonthlyClubSection /> 
            <MayAlsoLike />
            <TopFurniture />
            
            <FeaturedCollection />
        </div>
    );
};

export default Home;
