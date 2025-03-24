import React from 'react';
import Header from '../Common/Header';
import Footer from '../Common/Footer';
import { Outlet } from 'react-router-dom';
const UserLayout = () => {
  return (
    <>
      <Header /> {/* ✅ Header çağrıldığı için Navbar da gösterilecek */}
      {/* Diğer bileşenler buraya eklenebilir */}
      <main>
      
      <Outlet />
      </main>
     
      <Footer/>
    </>
  );
}

export default UserLayout;
