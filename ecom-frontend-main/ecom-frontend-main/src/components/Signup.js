import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match!');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/signup', { name, email, password });
            setSuccessMessage(response.data.message); 
            setErrorMessage(''); 
            navigate('/'); 
        } catch (error) {
            console.error(error);
            if (error.response && error.response.data.message === 'Duplicate') {
                setErrorMessage('User already exists.'); 
            } else {
                setErrorMessage('Signup failed. Please try again.');
            }
        }
    };

    return (
        <div className="signup-container flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h2 className="text-xl font-bold mb-4">Signup</h2>
            <form onSubmit={handleSignup} className="bg-white p-6 rounded shadow-md w-80">
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    required
                    className="border border-gray-300 p-2 mb-4 w-full rounded"
                />
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
                <div className="password-container mb-4 relative">
                    <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm Password"
                        required
                        className="border border-gray-300 p-2 w-full rounded"
                    />
                    <span
                        className="absolute right-2 top-2 cursor-pointer"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                        <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} />
                    </span>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full hover:bg-blue-600 transition">
                    Signup
                </button>
            </form>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            {successMessage && <p className="text-green-500">{successMessage}</p>}
            <p className="mt-4">
                Already have an account? <button onClick={() => navigate('/')} className="text-blue-500">Login</button>
            </p>
        </div>
    );
};

export default Signup;
