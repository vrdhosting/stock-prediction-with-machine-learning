import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    });

    const [error, setError] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log('Submitting registration form with data:', formData);
    setIsSubmitting(true);
    //setError({});
    //setSuccessMessage('');

    try{
        const response = await axiosInstance.post('/register/', formData);
        console.log('Registration successful:', response.data);
        setFormData({ username: '', email: '', password: '' });
        setError({});
        setSuccessMessage('Registration successful! Please log in.');

    }
    catch(error){
        console.error('Registration error:', error);
        setError(error.response ? error.response.data : 'Registration failed. Please try again.');
        //setFormData({ ...formData, error: 'Registration failed. Please try again.' });
    }
    finally{
        setIsSubmitting(false);
    }


    /*try {
      const response = await fetch('http://localhost:8000/api/v1/register/', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('Registration failed:', data);
        // Optionally show a user-facing error message here
        return;
      }

      console.log('Registration successful:', data);
      // Optionally reset form or navigate to login
      setFormData({ username: '', email: '', password: '' });
    } catch (error) {
      console.error('Registration error:', error);
      // Optionally show a user-facing error message here
    }*/
  };

  return (
    <div className="register-container my-5 text-white text-center  rounded p-5">
        <div className="row justify-content-center">
         
        <div className="col-md-6 bg-light-dark p-5 rounded">
            <h2>Register</h2>
            <p>Create an account to access our stock prediction tools and insights.</p>
            
             <form onSubmit={handleSubmit}>
                 <div className="form-group py-6">
                     <label className="form-label " htmlFor="username">Username:</label>
                            <input
                                type="text"
                                className="form-control"
                                id="username"
                                name="username"
                                placeholder="Enter the username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                            />
                            <small className="form-text text-muted">
                                {error.username && <span className="text-danger">{error.username}</span>}
                            </small>
                            </div>
                            <div className="form-group">
                            <label className="form-label mt-3" htmlFor="email">Email:</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name="email"
                                placeholder="Enter the email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                            <small className="form-text text-muted">
                                {error.email && <span className="text-danger">{error.email}</span>}
                            </small>
                            </div>
                            <div className="form-group">
                            <label className="form-label mt-3" htmlFor="password">Password:</label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name="password"
                                placeholder="Enter the password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                            />
                            <small className="form-text text-muted">
                                {error.password && <span className="text-danger">{error.password}</span>}
                            </small>
                            </div>
                            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                            <button className="mt-5 btn btn-primary" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? 'Submitting...' : 'Register'}
                            </button>
                        </form>
                </div>
        </div>
    </div>
      
  );
};

export default Register;
