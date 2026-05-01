import React, { useState, useContext } from 'react';
import axios from 'axios';
import axiosInstance from '../axiosInstance';
import { useNavigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from '../AuthProvider';
//import { AuthProvider } from '../AuthProvider'


const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await axiosInstance.post('/token/', formData); 
            
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);
            setFormData({ username: '', password: '' });
            console.log('Login successful:', response.data);
            setIsLoggedIn(true);
            navigate('/dashboard');
            
        } catch (error) {
            console.error('Login error:', error);
            setError(error.response ? error.response.data.detail : 'Login failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mt-5 text-white">
            <div className="row justify-content-center ">
                <div className="col-md-6 p-4 border rounded ">
                    <h2 className=" text-center">Login</h2>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            {error && <small className="text-danger">{error}</small>}
                        </div>
                        <button type="submit" className="btn btn-primary " disabled={isSubmitting}>
                            {isSubmitting ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;