import React from 'react'
import { useState } from 'react'
import Button from './Button'


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (

    <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark align-items-start">
            <div className="container">
                <a className="navbar-brand" href="#">Stock Prediction Portal</a>
                <button className="navbar-toggler" type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">   
                            <a className="nav-link" href="#">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Features</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact</a>
                        </li>
                                       
                    </ul>
                    <div>
                        <Button text="Login" class="btn-outline-light"/> &nbsp;
                        <Button text="Sign Up" class="btn-info"/>
                    </div>
                </div>
            </div>
        </nav>
    
    </>

    
  )
}

export default Header