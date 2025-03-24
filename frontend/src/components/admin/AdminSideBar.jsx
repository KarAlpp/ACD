import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaBox, FaClipboardList, FaStore, FaSignOutAlt } from 'react-icons/fa';

const AdminSideBar = () => {
  return (
    <div className='p-6 bg-gray-900 text-white min-h-screen w-64 flex flex-col justify-between'>
      <div>
        <div className='mb-6 text-center'>
          <NavLink to='/admin' className='text-2xl font-medium'>
            ACD Store
          </NavLink>
        </div>
        
        <h2 className='text-xl font-medium mb-6 text-center'>Admin Dashboard</h2>
        
        <nav className='flex flex-col space-y-2'>
          <NavLink 
            to='/admin/users' 
            className={({ isActive }) => 
              isActive 
                ? 'bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2' 
                : 'hover:text-white py-3 px-4 rounded flex items-center space-x-2'
            }
          >
            <FaUser />
            <span>Users</span>
          </NavLink>
          <NavLink 
            to='/admin/products' 
            className={({ isActive }) => 
              isActive 
                ? 'bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2' 
                : 'hover:text-white py-3 px-4 rounded flex items-center space-x-2'
            }
          >
            <FaBox />
            <span>Products</span>
          </NavLink>
          <NavLink 
            to='/admin/orders' 
            className={({ isActive }) => 
              isActive 
                ? 'bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2' 
                : 'hover:text-white py-3 px-4 rounded flex items-center space-x-2'
            }
          >
            <FaClipboardList />
            <span>Orders</span>
          </NavLink>
          <NavLink 
            to='/admin/shop' 
            className={({ isActive }) => 
              isActive 
                ? 'bg-gray-700 text-white py-3 px-4 rounded flex items-center space-x-2' 
                : 'hover:text-white py-3 px-4 rounded flex items-center space-x-2'
            }
          >
            <FaStore />
            <span>Shop</span>
          </NavLink>
        </nav>
      </div>
      
      <div className='mt-6'>
        <button className='bg-red-600 text-white py-3 px-4 rounded flex items-center space-x-2 w-full'>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminSideBar;