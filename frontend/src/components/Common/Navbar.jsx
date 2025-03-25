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
  const { user } = useSelector((state) => state.auth); // <-- eksik buydu

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
    
    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // GSAP animation effect
  useEffect(() => {
    if (!navContainerRef.current) return;
    
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <>
      <div
  ref={navContainerRef}
  className="fixed top-0 left-0 right-0 z-40 h-auto transition-all duration-700"
>
  <nav className="w-full flex items-center justify-between py-4 px-6 bg-[#1A1A1A] opacity-80 transition-opacity duration-300 hover:opacity-100">
    {/* Diğer navbar içeriği tamamen aynı kalıyor */}

          <div className="flex items-center space-x-8">
            <div className="relative group">
              <Link to="/">
                <img
                  src={logo}
                  alt="ACD STORE Logo"
                  className="h-10 transition duration-300 group-hover:brightness-125 group-hover:scale-105"
                />
              </Link>
            </div>
            <div
              className="relative"
              onMouseEnter={() => setIsProductsOpen(true)}
              onMouseLeave={() => setIsProductsOpen(false)}
            >
              <button className="text-white text-lg transition duration-300 hover:text-gray-400 flex items-center relative pb-2">
                Products <TiLocationArrow className="ml-1 text-sm" />
              </button>
              {isProductsOpen && (
                <div className="absolute left-0 mt-0 w-48 bg-white shadow-lg rounded-md z-50">
                  <div
                    className="relative"
                    onMouseEnter={() => setIsHomeDecorOpen(true)}
                    onMouseLeave={() => setIsHomeDecorOpen(false)}
                  >
     <Link to="/collections/all?door=Indoor&size=&material=&brand=&maxPrice=100000" className="block px-4 py-5 text-gray-800 hover:bg-gray-200">
    Indoor Products ▸
  </Link>
  {isHomeDecorOpen && (
    <div className="absolute left-full top-0 mt-0 w-48 bg-white shadow-lg rounded-md z-50">
      <Link to="/collections/all?category=Living%20Room
" className="block px-4 py-5 text-gray-800 hover:bg-gray-200">
        Living Room
      </Link>
      <Link to="/collections/all?category=Bedroom&size=&material=&brand=&maxPrice=100000" className="block px-4 py-5 text-gray-800 hover:bg-gray-200">
        Bedroom
      </Link>
      <Link to="/collections/all?category=Dining+Room&size=&material=&brand=&maxPrice=100000" className="block px-4 py-5 text-gray-800 hover:bg-gray-200">
        Dining Room
      </Link>
    </div>
  )}
</div>

<div
  className="relative"
  onMouseEnter={() => setIsGardenDecorOpen(true)}
  onMouseLeave={() => setIsGardenDecorOpen(false)}
>
  <Link to="/collections/all?door=Outdoor&size=&material=&brand=&maxPrice=100000" className="block px-4 py-5 text-gray-800 hover:bg-gray-200">
    Outdoor Products ▸
  </Link>
  {isGardenDecorOpen && (
    <div className="absolute left-full top-0 mt-0 w-48 bg-white shadow-lg rounded-md z-50">
      <Link to="/collections/all?category=Bench&size=&material=&brand=&maxPrice=100000" className="block px-4 py-5 text-gray-800 hover:bg-gray-200">
        Bench
      </Link>
      <Link to="/collections/all?category=Bergere&size=&material=&brand=&maxPrice=100000" className="block px-4 py-5 text-gray-800 hover:bg-gray-200">
        Bergère
      </Link>
      <Link to="/collections/all?category=Sofa+Couch&size=&material=&brand=&maxPrice=100000" className="block px-4 py-5 text-gray-800 hover:bg-gray-200">
        Sofa & Couch
      </Link>
      <Link to="/collections/all?category=Table+Chair&size=&material=&brand=&maxPrice=100000" className="block px-4 py-5 text-gray-800 hover:bg-gray-200">
        Table & Chair
      </Link>
      <Link to="/collections/all?category=Pouf&size=&material=&brand=&maxPrice=100000" className="block px-4 py-5 text-gray-800 hover:bg-gray-200">
        Pouf
      </Link>
      <Link to="/collections/all?category=Swing&size=&material=&brand=&maxPrice=100000" className="block px-4 py-5 text-gray-800 hover:bg-gray-200">
        Swing
      </Link>
    </div>
  )}
</div>
                  
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-6">
            <Searchbar />
            
            <button 
  onClick={toggleCartDrawer} 
  className="text-white text-2xl transition duration-300 hover:text-gray-400 relative"
>
  <FiShoppingBag />
  <div className="absolute -top-2 -right-2 bg-white text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border border-black">
    {cartCount}
  </div>
</button>

            
            <Link
      to={user ? "/profile" : "/login"}
      className="text-white text-2xl transition duration-300 hover:text-gray-400"
    >
      <FiUser />
    </Link>

             
    {user && user.role === 'admin' && (
  <Link
    to="/admin"
    className="text-white transition duration-300 hover:text-gray-400"
  >
    Admin Panel
  </Link>
)}

            <button onClick={toggleNavDrawer} className="text-white text-2xl transition duration-300 hover:text-gray-400">
              <FiMenu />
            </button>
          </div>
        </nav>
      </div>
      
      {/* Moved CardDrawer outside the navbar container */}
      <CardDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />
      
      {navDrawerOpen && (
        <div className="absolute left-0 mt-0 w-48 bg-white/80 backdrop-blur-md shadow-xl rounded-xl z-50 border border-gray-200">
        <div className="flex justify-end p-4">
            <button onClick={toggleNavDrawer}>
              <IoMdClose className="h-6 w-6 text-gray-600" />
            </button>
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold">Menü</h2>
            <nav className="space-y-4">
              <Link to="/" className="block py-2 text-lg text-gray-600 hover:text-gray-800">Anasayfa</Link>
              <Link to="/products" className="block py-2 text-lg text-gray-600 hover:text-gray-800">Ev Dekorasyon</Link>
              <Link to="/products" className="block py-2 text-lg text-gray-600 hover:text-gray-800">Bahçe Dekorasyon</Link>
              <Link to="/brands" className="block py-2 text-lg text-gray-600 hover:text-gray-800">Markalar</Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;