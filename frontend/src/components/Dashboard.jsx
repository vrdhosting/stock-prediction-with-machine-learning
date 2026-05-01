import React,{ useEffect } from 'react';
import axiosInstance from '../axiosInstance';

const Dashboard = () => { 

   
    useEffect(() => {
        
        const fetchProtectedData = async () => {
            try {
                const response = await axiosInstance.get('/secured-view/');
                console.log(response.data);

            } catch (error) {
                console.error('Error fetching protected data:', error);
            }
        };

        fetchProtectedData();
    }, []); // Empty dependency array ensures this runs only once on component mount
    
    return (
        <div className="container mt-5 text-white">
            <h2>Dashboard</h2>
            <p>Welcome to the dashboard! This is a protected route.</p>
        </div>
    );

};

export default Dashboard;