import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, fetchUserProfile } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, token, loading } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else if (!user) {
            dispatch(fetchUserProfile(token));
        }
    }, [token, user, navigate, dispatch]);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/login');
    };

    if (loading || !user) {
        return (
            <div className="pt-20 min-h-screen flex justify-center items-center bg-gray-50">
                <div className="text-xl">Loading profile...</div>
            </div>
        );
    }

    return (
        <div className="pt-20 min-h-screen flex flex-col bg-gray-50">
            <div className="flex-grow container mx-auto p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
                    <div className="w-full md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6 bg-white">
                        <h1 className="text-2xl md:text-3xl font-bold mb-4">{user.name}</h1>
                        <p className="text-lg text-gray-600 mb-4">{user.email}</p>
                        <button
                            onClick={handleLogout}
                            className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        >
                            Logout
                        </button>
                    </div>

                    <div className="flex-grow">
                        <div className="bg-white shadow-md rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4">My Orders</h2>
                            <p className="text-gray-600">
                                You don't have any orders yet.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
