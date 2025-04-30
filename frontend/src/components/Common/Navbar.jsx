import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiSearch, FiMenu, FiShoppingBag, FiUser } from 'react-icons/fi';
import { IoMdClose } from 'react-icons/io';
import { TiLocationArrow } from 'react-icons/ti';
import { useWindowScroll } from 'react-use';
import gsap from 'gsap';
import clsx from 'clsx';
import Searchbar from './Searchbar';
import CardDrawer from '../Layout/CardDrawer';
import logo from '../../assets/ACD_Stor_Logo_Beyaz.png';
import { useSelector } from 'react-redux';


const Navbar = () => {
  // Existing state from your original navbar
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isHomeDecorOpen, setIsHomeDecorOpen] = useState(false);
  const [isGardenDecorOpen, setIsGardenDecorOpen] = useState(false);
  const { user } = useSelector((state) => state.auth); 
  const [isBrandsOpen, setIsBrandsOpen] = useState(false);

  // New state for audio features and scroll animation
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Refs
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);
  const { y: currentScrollY } = useWindowScroll();

  // Toggle functions
  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Audio playback effect
  useEffect(() => {
    if (!audioElementRef.current) return;
    
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  // Scroll animation effects
  useEffect(() => {
    if (!navContainerRef.current) return;

    if (currentScrollY > lastScrollY) {
      // Scrolling down → hide navbar
      setIsNavVisible(false);
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up → show navbar
      setIsNavVisible(true);
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);
  
  // GSAP animation effect
  useEffect(() => {
    if (!navContainerRef.current) return;
    
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.3,
      ease: "power2.out",
    });
    
  }, [isNavVisible]);

  return (
    <>
      <div
        ref={navContainerRef}
        className="fixed top-0 left-0 right-0 z-40 w-full transition-all duration-700"
      >
        <nav className="w-full py-12 bg-[#1A1A1A] opacity-60 hover:opacity-100 transition-opacity duration-300">
          <div className="container mx-auto px-4 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/">
                <img
                  src={logo}
                  alt="ACD STORE Logo"
                  className="h-15 transition duration-300 hover:brightness-125 hover:scale-105"
                />
              </Link>
            </div>

            {/* Middle: Products + Brands */}
            <div className="flex space-x-10 items-center">
              {/* PRODUCTS */}
              <div
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
                className="relative"
              >
                <button className="text-white text-2xl flex items-center pb-2 hover:text-gray-400 transition">
                  Products 
                </button>

                {isProductsOpen && (
                  <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 w-screen max-w-[1200px] bg-white/80 shadow-xl rounded-md p-8 grid grid-cols-3 gap-8 z-50">
                    
                    {/* Column 1 – Indoor */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Indoor</h3>
                      <ul className="space-y-2 text-gray-800">
                        <li><Link to="/collections/all?category=Living%20Room" className="hover:text-gray-500">Living Room</Link></li>
                        <li><Link to="/collections/all?category=Bedroom" className="hover:text-gray-500">Bedroom</Link></li>
                        <li><Link to="/collections/all?category=Dining+Room" className="hover:text-gray-500">Dining Room</Link></li>
                      </ul>
                    </div>

                    {/* Column 2 – Outdoor */}
                    <div>
                      <h3 className="text-lg font-semibold mb-4">Outdoor</h3>
                      <ul className="space-y-2 text-gray-800">
                        <li><Link to="/collections/all?category=Bench" className="hover:text-gray-500">Bench</Link></li>
                        <li><Link to={`/collections/all?category=${encodeURIComponent("Bergère")}`} className="hover:text-gray-500">Bergère</Link></li>
                        <li><Link to={`/collections/all?category=${encodeURIComponent("Sofa & Couch")}`} className="hover:text-gray-500">Sofa & Couch</Link></li>
                        <li><Link to={`/collections/all?category=${encodeURIComponent("Table & Chair")}`} className="hover:text-gray-500">Table & Chair</Link></li>
                        <li><Link to={`/collections/all?category=${encodeURIComponent("Lamp")}`} className="hover:text-gray-500">Lamp</Link></li>
                        <li><Link to={`/collections/all?category=${encodeURIComponent("Accessories")}`} className="hover:text-gray-500">Accessories</Link></li>
                        <li><Link to="/collections/all?category=Pouf" className="hover:text-gray-500">Pouf</Link></li>
                        <li><Link to="/collections/all?category=Swing" className="hover:text-gray-500">Swing</Link></li>
                      </ul>
                    </div>

                    {/* Column 3 – Images */}
                    <div className="space-y-6">
                      <div className="overflow-hidden rounded-md">
                        <img
                          src="https://cdn.novamobili.it/image/upload/f_auto/q_auto/v1/cdn.novamobili.it/lappartamento-liberty-original_webp?_a=BBGAEtBp0"
                          alt="Indoor preview"
                          className="w-full h-28 object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                        />
                        <Link
                          to="/collections/all?door=Indoor"
                          className="text-sm text-gray-600 mt-2 block hover:text-gray-800"
                        >
                          Discover all indoor products
                        </Link>
                      </div>

                      <div className="overflow-hidden rounded-md">
                        <img
                          src="https://cdn.shopify.com/s/files/1/0110/3911/3312/files/fern-header.jpg?v=1567111044"
                          alt="Outdoor preview"
                          className="w-full h-28 object-cover transition-transform duration-500 ease-in-out hover:scale-110"
                        />
                        <Link
                          to="/collections/all?door=Outdoor"
                          className="text-sm text-gray-600 mt-2 block hover:text-gray-800"
                        >
                          Discover all outdoor products
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* BRANDS */}
              <div
                onMouseEnter={() => setIsBrandsOpen(true)}
                onMouseLeave={() => setIsBrandsOpen(false)}
                className="relative"
              >
                <button className="text-white text-2xl flex items-center pb-2 hover:text-gray-400 transition">
                  Brands
                </button>

                {isBrandsOpen && (
  <div className="absolute left-1/2 transform -translate-x-1/2 mt-0 w-[1200px] bg-white/80 backdrop-blur-md shadow-xl rounded-md p-8 grid grid-cols-3 gap-6 z-50">
    
    {/* FERMOB */}
    <Link
      to="/collectionsfermob"
      className="group overflow-hidden rounded-md relative block text-center"
    >
      <img
        src="https://assets.pbimgs.com/pbimgs/rk/images/dp/wcm/202452/0482/fermob-metal-outdoor-bistro-chairs-set-of-2-o.jpg"
        alt="Fermob preview"
        className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105 rounded-md"
      />
      <span className="mt-3 block text-lg font-semibold text-gray-800 group-hover:text-black">
        Fermob
      </span>
    </Link>

    {/* GLATZ */}
    <Link
      to="/collections/all?brand=OLTA"
      className="group overflow-hidden rounded-md relative block text-center"
    >
      <img
        src="https://gardenandpatio.co.uk/cdn/shop/collections/Glatz-2021-Brochure-Retail-Email-e1620917534302.jpg?v=1709128854&width=1190"
        alt="Glatz preview"
        className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105 rounded-md"
      />
      <span className="mt-3 block text-lg font-semibold text-gray-800 group-hover:text-black">
        Glatz
      </span>
    </Link>

    {/* SIFAS */}
    <Link
      to="/collections/all?brand=SIFAS"
      className="group overflow-hidden rounded-md relative block text-center"
    >
      <img
        src="https://www.sifas.com/wp-content/uploads/2024/04/sifas-komfy-canape-fauteuil.jpg"
        alt="Sifas preview"
        className="w-full h-40 object-cover transition-transform duration-500 group-hover:scale-105 rounded-md"
      />
      <span className="mt-3 block text-lg font-semibold text-gray-800 group-hover:text-black">
        Sifas
      </span>
    </Link>

  </div>
)}
              </div>
            </div>

            {/* Right: Search, cart, user */}
            <div className="flex items-center space-x-6">
              <Searchbar />
              <button onClick={() => setDrawerOpen(!drawerOpen)} className="text-white text-2xl relative hover:text-gray-400">
                <FiShoppingBag />
                <div className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border border-black">
                  {cartCount}
                </div>
              </button>
              <Link to={user ? "/profile" : "/login"} className="text-white text-2xl hover:text-gray-400">
                <FiUser />
              </Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className="text-white hover:text-gray-400">Admin Panel</Link>
              )}
              <button onClick={() => setNavDrawerOpen(!navDrawerOpen)} className="text-white text-2xl hover:text-gray-400">
                <FiMenu />
              </button>
            </div>
          </div>
        </nav>
      </div>
      
      {/* Moved CardDrawer outside the navbar container */}
      <CardDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
      
      {navDrawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Left Menu Area */}
          <div className="w-1/2 bg-white/80 backdrop-blur-md shadow-xl p-6 flex flex-col justify-between border-r border-gray-200">
            <div className="flex justify-end">
              <button onClick={toggleNavDrawer}>
                <IoMdClose className="h-6 w-6 text-gray-600" />
              </button>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">Menü</h2>
              <nav className="space-y-4">
                <Link to="/" className="block text-lg text-gray-700 hover:text-gray-900">Anasayfa</Link>
                <Link to="collections/all?door=indoor" className="block text-lg text-gray-700 hover:text-gray-900">Ev Dekorasyon</Link>
                <Link to="/collections/all?door=outdoor" className="block text-lg text-gray-700 hover:text-gray-900">Bahçe Dekorasyon</Link>
                <Link to="/collections/all?brand=FERMOB" className="block text-lg text-gray-700 hover:text-gray-900">Markalar</Link>
              </nav>
            </div>
            <p className="text-sm text-gray-500">&copy; 2025 ACDStore</p>
          </div>

          {/* Right visual area - empty in original code */}
          <div className="w-1/2"></div>
        </div>
      )}
    </>
  );
}

export default Navbar;