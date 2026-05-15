import React,{ useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'


const Dashboard = () => { 

    const [ticker, setTicker] = useState('')
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)

    // Plots States
    const [plot, setPlot] = useState()
    const [plot2, setPlot2] = useState()
    const [plot3, setPlot3] = useState()
   
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
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)

        try{
            const response = await axiosInstance.post('/predict/', {ticker : ticker});
            console.log(response.data);

            //Set Plots

            const imagePathGnome = import.meta.env.VITE_BACKEND_ROOT_URL
            const imagePathUrl = `${imagePathGnome}${response.data.plot_img}`
            const imagePathUrl2 = `${imagePathGnome}${response.data.plot_img_02}`
            const imagePathUrl3 = `${imagePathGnome}${response.data.plot_img_03}`
            //console.log(imagePathUrl)
            setPlot(imagePathUrl)
            setPlot2(imagePathUrl2)
            setPlot3(imagePathUrl3)


            if(response.data.error){
                setError(response.data.error)
            }
        }catch{
            console.error("There was some error",error)
        }finally{
            setLoading(false)
        }
    };

    return (
        <div className="container mt-5 text-white">
            <h2>Dashboard</h2>
            <p>Welcome to the dashboard! This is a protected route.</p>

            <div className="container">
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <form onSubmit={handleSubmit}>
                       <label>Stock Name</label>
                       <input type="text" id="ticker" className="form-control" name="ticker"
                            onChange={(e) => setTicker(e.target.value)} required />
                       
                        <small>{error && <div className='text-danger'>{error}</div>}</small>
                        <div className="mt-3">
                       <button type="submit" className="btn btn-primary">
                        {loading ? <span><FontAwesomeIcon icon={ faSpinner } />Getting Data...</span>:'Submit' }</button>
                        </div>
                    </form>
                </div>

                    {/* Print Prediction Plots */}
                <div className="prediction mt-5">
                    <div className="p-3 ">
                        {plot && (
                            <img src={plot} style = {{ maxWidth:'100%' }}/>

                        )}
                        {plot2 && (
                            <img src={plot2} style = {{ maxWidth:'100%' }} className='mt-3'/>
                        )}
                        {plot3 && (
                            <img src={plot3} style = {{ maxWidth:'100%' }} className='mt-3'/>
                        )}
                    </div>

                </div>


            </div>
        </div>
        </div>
        

    );

};

export default Dashboard;