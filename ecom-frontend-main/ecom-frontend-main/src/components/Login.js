import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/auth', { email, password });
            if (response.data.success) {
                alert('Login successful!');
                navigate('/categories');
            } else {
                setErrorMessage('Login failed. Please check your credentials.');
            }
        } catch (error) {
            console.error(error);
            setErrorMessage('Login failed. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-xl font-bold mb-4">Login</h2>
                {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                    className="border border-gray-300 p-2 mb-4 w-full rounded"
                />
                <div className="password-container mb-4 relative">
                    <input
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                        className="border border-gray-300 p-2 w-full rounded"
                    />
                    <span
                        className="absolute right-2 top-2 cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} />
                    </span>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition">
                    Login
                </button>
                <p className="mt-4">
                    <button 
                        type="button" 
                        onClick={() => navigate('/forgot-password')} 
                        className="text-blue-500"
                    >
                        Forgot Password?
                    </button>
                </p>
                <p className="mt-4">
                    Don't have an account? <button onClick={() => navigate('/signup')} className="text-blue-500">Signup</button>
                </p>
            </form>
        </div>
    );
};

export default Login;
