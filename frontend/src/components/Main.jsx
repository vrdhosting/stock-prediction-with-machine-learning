import React from 'react'
import Button from './Button'



const Main = () => {
  return (
    <>
        <main className="container my-5 text-white text-center bg-light-dark rounded p-5">
       <h2>Welcome to the Stock Prediction Portal</h2>
       <p>
        This stock prediction application utilizes machine learning algorithms to analyze historical stock data and provide insights into future stock price movements. IT specifically employing keras, tensorFlow, and LSTM models, integrated within Django framework.
        Whether you're a seasoned investor or just starting out, our portal offers valuable tools and predictions to help you make informed decisions in the stock market.
       </p>
       <Button text="Get Started" class="btn-success"/>
       </main>
    
    </>
    
  )
}

export default Main