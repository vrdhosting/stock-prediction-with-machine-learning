import React from 'react'
import { useState } from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (

    <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark align-items-start">
            <div className="container">
                <Link className="navbar-brand" to="/">Stock Prediction Portal</Link>
                <button className="navbar-toggler" type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">   
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                                       
                    </ul>
                    <div>
                        <Button text="Login" class="btn-outline-light" url="/login"/> &nbsp;
                        <Button text="Sign Up" class="btn-info" url="/register"/>
                    </div>
                </div>
            </div>
        </nav>
    
    </>

    
  )
}

export default Header