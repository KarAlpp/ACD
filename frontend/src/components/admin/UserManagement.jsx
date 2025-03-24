import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'customer' });
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  // Backend API base URL
  const BACKEND_URL = 'http://localhost:9000'; 

  // Get user token
  const token = localStorage.getItem('token');

  // Axios config
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  };

  // Fetch current user profile
  const fetchCurrentUser = async () => {
    if (!token) {
      setLoading(false);
      return;
    }
    
    try {
      const response = await axios.get(`${BACKEND_URL}/api/users/profile`, config);
      setCurrentUser(response.data);
      
      // If the user is admin, fetch all users
      if (response.data.role === 'admin') {
        fetchAllUsers();
      } else {
        // If not admin, just add the current user to the users array
        setUsers([response.data]);
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      setError(error.response?.data?.message || 'Failed to fetch user profile');
      setLoading(false);
    }
  };

  // Function to fetch all users (only if admin)
  const fetchAllUsers = async () => {
    try {
      // For now, since you don't have a get all users endpoint, we'll use this workaround
      // This is temporary until you add the proper endpoint
      const response = await axios.get(`${BACKEND_URL}/api/admin/users`, config);
      
      if (Array.isArray(response.data)) {
        setUsers(response.data);
      } else {
        // If the response is not an array, create an array with current user
        setUsers([currentUser]);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      console.error('Response status:', error.response?.status);
      console.error('Response data:', error.response?.data);
      
      // If we get an error, just use the current user
      if (currentUser) {
        setUsers([currentUser]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  // Register user
  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      console.log("Registering user:", formData);
      await axios.post(`${BACKEND_URL}/api/users/register`, formData);
      setFormData({ name: '', email: '', password: '', role: 'customer' });
      
      // Refresh user list if admin
      if (currentUser?.role === 'admin') {
        fetchAllUsers();
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert(`Failed to add user: ${error.response?.data?.message || error.message}`);
    }
  };

  // Delete user - Note: You'll need to add this endpoint to your backend
  const handleDeleteUser = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        console.log("Deleting user:", id);
        // You don't have this endpoint yet
        await axios.delete(`${BACKEND_URL}/api/admin/users/${id}`, config);
        fetchAllUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert(`Failed to delete user: ${error.response?.data?.message || error.message}`);
      }
    }
  };

  // Update role - Note: You'll need to add this endpoint to your backend
  const handleRoleChange = async (id, newRole) => {
    try {
      console.log("Updating role for user:", id, "to", newRole);
      // You don't have this endpoint yet
      await axios.put(`${BACKEND_URL}/api/admin/users/${id}`, { role: newRole }, config);
      fetchAllUsers();
    } catch (error) {
      console.error('Error updating role:', error);
      alert(`Failed to update role: ${error.response?.data?.message || error.message}`);
    }
  };

  return (
    <div className='max-w-7xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-6'>User Management</h1>

      {!token && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <p>Authentication token not found. Please log in to manage users.</p>
        </div>
      )}

      {currentUser && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-4">
          <p>Logged in as: {currentUser.name} ({currentUser.email}) - Role: {currentUser.role}</p>
        </div>
      )}

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Form */}
        <div className='p-4 shadow-md rounded-lg border'>
          <h2 className='text-xl font-semibold mb-4'>Add New User</h2>
          <form onSubmit={handleAddUser}>
            <div className='mb-4'>
              <label className='block text-gray-700'>Name</label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className='w-full p-2 border rounded'
                required
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700'>Email</label>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className='w-full p-2 border rounded'
                required
              />
            </div>

            <div className='mb-4'>
              <label className='block text-gray-700'>Password</label>
              <input
                type='password'
                name='password'
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className='w-full p-2 border rounded'
                required
              />
            </div>

            {currentUser?.role === 'admin' && (
              <div className='mb-4'>
                <label className='block text-gray-700'>Role</label>
                <select
                  name='role'
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className='w-full p-2 border rounded'
                >
                  <option value='customer'>Customer</option>
                  <option value='admin'>Admin</option>
                </select>
              </div>
            )}

            <button
              type='submit'
              className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded'
              disabled={!token}
            >
              Add User
            </button>
          </form>
        </div>

        {/* Table */}
        <div className='p-4 shadow-md rounded-lg border overflow-x-auto'>
          <h2 className='text-xl font-semibold mb-4'>User List</h2>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              <p>{error}</p>
            </div>
          )}
          
          {loading ? (
            <p>Loading users...</p>
          ) : (
            <table className='min-w-full border-collapse border border-gray-200'>
              <thead>
                <tr className='bg-gray-100'>
                  <th className='p-4 border border-gray-300'>NAME</th>
                  <th className='p-4 border border-gray-300'>EMAIL</th>
                  <th className='p-4 border border-gray-300'>ROLE</th>
                  {currentUser?.role === 'admin' && (
                    <th className='p-4 border border-gray-300'>ACTIONS</th>
                  )}
                </tr>
              </thead>
              <tbody>
                {users && Array.isArray(users) && users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user._id} className='border-b hover:bg-gray-50'>
                      <td className='p-4 border border-gray-300 font-semibold'>{user.name}</td>
                      <td className='p-4 border border-gray-300'>{user.email}</td>
                      <td className='p-4 border border-gray-300'>
                        {currentUser?.role === 'admin' ? (
                          <select
                            className='border rounded p-2'
                            value={user.role}
                            onChange={(e) => handleRoleChange(user._id, e.target.value)}
                          >
                            <option value='customer'>Customer</option>
                            <option value='admin'>Admin</option>
                          </select>
                        ) : (
                          user.role
                        )}
                      </td>
                      {currentUser?.role === 'admin' && (
                        <td className='p-4 border border-gray-300'>
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className='bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded'
                          >
                            Delete
                          </button>
                        </td>
                      )}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={currentUser?.role === 'admin' ? '4' : '3'} className='p-4 text-center'>
                      {error ? 'Error loading users' : 'No users found'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
      
      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h3 className="text-lg font-semibold mb-2">Debugging Information</h3>
        <p>API URL: {BACKEND_URL}</p>
        <p>Authentication: {token ? 'Token Available' : 'No Token'}</p>
        <p>User Role: {currentUser?.role || 'Not authenticated'}</p>
        <p>Data Status: {loading ? 'Loading' : error ? 'Error' : users.length > 0 ? `${users.length} users loaded` : 'No users found'}</p>
        <button 
          onClick={() => fetchCurrentUser()}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Refresh Data
        </button>
      </div>
    </div>
  );
};

export default UserManagement;