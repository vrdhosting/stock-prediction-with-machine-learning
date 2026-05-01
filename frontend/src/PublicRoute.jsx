import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
//import { AuthContext } from './AuthProvider';
import { AuthProvider } from './AuthProvider';
import { AuthContext } from './AuthProvider';

const PublicRoute = ({ children }) => {
    const { isLoggedIn } = useContext(AuthContext);

    return !isLoggedIn ? children : <Navigate to="/dashboard" />;
};

export default PublicRoute;