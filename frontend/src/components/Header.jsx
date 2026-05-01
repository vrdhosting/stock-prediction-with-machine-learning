import React, { useState, useContext } from 'react'
import Button from './Button'
import { Link , useNavigate} from 'react-router-dom'
import { AuthContext } from '../AuthProvider'


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext)
  const navigate = useNavigate();


  return (

    <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark align-items-start">
            <div className="container">
                <Link className="navbar-brand" to="/">Stock Prediction Portal</Link>
                <button className="navbar-toggler" type="button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}>
                    
                    <div className="navbar-nav ms-auto">
                        {isLoggedIn ? (
                            <>
                            <span className="navbar-text me-3">Welcome, User!</span>
                            <button type="button" className="btn btn-outline-light" onClick={() => {
                                localStorage.removeItem('access_token');
                                localStorage.removeItem('refresh_token');
                                setIsLoggedIn(false);
                                navigate('/');
                            }}>
                                Logout
                            </button>
                            </>
                              
                        ) : (
                              <>
                                <Button text="Login" class="btn-outline-light" url="/login"/> &nbsp;
                                <Button text="Sign Up" class="btn-info" url="/register"/>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    
    </>

    
  )
}

export default Header