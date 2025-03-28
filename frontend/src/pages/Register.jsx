import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        const result = await dispatch(registerUser({ name, email, password }));

        if (registerUser.fulfilled.match(result)) {
            navigate('/');
        } else {
            alert(result.payload || 'Registration failed, please try again.');
        }
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-full md:w-1/2 flex justify-center items-center p-8">
                <div className="w-full max-w-md bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                    <h1 className="text-xl font-bold text-center mb-2">ACD STORE</h1>
                    <h2 className="text-2xl font-bold text-center mb-2">Create Account 🚀</h2>
                    <p className="text-sm text-center text-gray-600 mb-6">
                        Fill in your details to create an account
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email address"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Create a password"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition font-medium"
                        >
                            Register
                        </button>
                    </form>

                    <p className="mt-4 text-center text-sm text-gray-600">
                        Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
                    </p>
                </div>
            </div>

            <div className="hidden md:block md:w-1/2">
                <img
                    src="https://scontent.fist7-1.fna.fbcdn.net/v/t39.30808-6/462456358_2924646494360941_8348179606554643587_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=R5wZPPM_fyAQ7kNvgHN1YRh&_nc_oc=AdkB4-FOSZrHAZJlgw-Qa8Fv-P89gWdutYOEsw1PYDVJMtB13d9TkpW63h5TQyfd_uY&_nc_zt=23&_nc_ht=scontent.fist7-1.fna&_nc_gid=1ejbpyf6lN_KIjAYowcMSQ&oh=00_AYEOKarruWQS6Xk-sPuQLkkE5SHULSTD8Xn47ZPwQfsqLQ&oe=67EC05F7"
                    alt="Register Page"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export default Register;