import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { loginUser } from '../redux/slices/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const redirect = new URLSearchParams(location.search).get("redirect") || "/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(loginUser({ email, password }));

        if (result.payload && result.payload.token) {
            localStorage.setItem('token', result.payload.token);
            navigate(redirect);
        } else {
            alert('Login failed, please check your credentials.');
        }
    };

    return (
        <div className="flex min-h-screen">
            <div className="w-full md:w-1/2 flex justify-center items-center p-8">
                <div className="w-full max-w-md bg-white p-8 rounded-lg border border-gray-200 shadow-sm">
                    <h1 className="text-xl font-bold text-center mb-2">ACD STORE</h1>
                    <h2 className="text-2xl font-bold text-center mb-2">Hey there! 👋</h2>
                    <p className="text-sm text-center text-gray-600 mb-6">
                        Enter your username and password to login
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-4">
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
                                placeholder="Enter your password"
                                className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-black text-white py-2 rounded-xl hover:bg-gray-800 transition font-medium"
                        >
                            Sign In
                        </button>
                    </form>

                    <p className="mt-4 text-center text-sm text-gray-600">
                        Don’t have an account? <Link to={`/register?redirect=${redirect}`} className="text-blue-500">Register</Link>
                    </p>
                </div>
            </div>

            <div className="hidden md:block md:w-1/2">
                <img
                    src="https://scontent.fist7-1.fna.fbcdn.net/v/t39.30808-6/462456358_2924646494360941_8348179606554643587_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=127cfc&_nc_ohc=R5wZPPM_fyAQ7kNvgHN1YRh&_nc_oc=AdkB4-FOSZrHAZJlgw-Qa8Fv-P89gWdutYOEsw1PYDVJMtB13d9TkpW63h5TQyfd_uY&_nc_zt=23&_nc_ht=scontent.fist7-1.fna&_nc_gid=1ejbpyf6lN_KIjAYowcMSQ&oh=00_AYEOKarruWQS6Xk-sPuQLkkE5SHULSTD8Xn47ZPwQfsqLQ&oe=67EC05F7"

                    alt="Login Page"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
};

export default Login;