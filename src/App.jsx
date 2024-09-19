import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './assets/Pages/Signup';
import Signin from './assets/Pages/Signin';
import PasswordReset from './assets/Pages/PasswordReset';
import HomePage from './assets/Pages/HomePage';

function App() {
    const [token, setToken] = React.useState(false);

    useEffect(() => {
        const storedToken = sessionStorage.getItem("token");
        if (storedToken) {
            setToken(JSON.parse(storedToken));
        }
    }, []);

    useEffect(() => {
        if (token) {
            sessionStorage.setItem("token", JSON.stringify(token));
        }
    }, [token]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/signin" />} /> {/* Redirect to Sign In */}
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin setToken={setToken} />} />
                <Route path="/passwordreset" element={<PasswordReset />} />
                {/* Conditionally render the home route based on token */}
                {token && <Route path="/home" element={<HomePage />} />}
                {/* Redirect to sign-in if the user tries to access /home without a valid token */}
                <Route path="/home" element={token ? <HomePage /> : <Navigate to="/signin" />} />
            </Routes>
        </Router>
    );
}

export default App;
