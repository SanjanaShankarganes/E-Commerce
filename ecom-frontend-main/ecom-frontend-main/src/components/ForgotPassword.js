import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/forgot-password', { email });
            setMessage(response.data.message); 
                        if (response.data.success) {
                setTimeout(() => {
                    navigate('/'); 
                }, 2000); 
            }
        } catch (error) {
            console.error(error);
            setMessage('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form onSubmit={handleForgotPassword} className="bg-white p-6 rounded shadow-md w-80">
                <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="border border-gray-300 p-2 mb-4 w-full rounded"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition">
                    Send Reset Link
                </button>
                {message && <p className="mt-4 text-green-500">{message}</p>}
                <p className="mt-4">
                    Remembered your password? <button onClick={() => navigate('/')} className="text-blue-500">Login</button>
                </p>
            </form>
        </div>
    );
};

export default ForgotPassword;
