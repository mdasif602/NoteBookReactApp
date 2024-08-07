import React from 'react'
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom'

export const Navbar = () => {
    let location = useLocation();
    let navigate = useNavigate();
    // React.useEffect(() => {
    //     console.log(location.pathname);
    // }, [location]);

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('name')
        localStorage.removeItem('email')
        navigate("/login");
    }
    const handleProfile = () => {
        navigate("/user");
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary" data-bs-theme="dark" >
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">NoteBook</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token') ? <form className="d-flex" role="search">
                        <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
                        <Link className="btn btn-primary" to="/signup" role="button">SignUp</Link>
                    </form> :
                        <div className='d-flex'>
                            <Link onClick={handleProfile} className="btn btn-primary mx-2" to="/user" role="button">Profile</Link>
                            <Link onClick={handleLogout} className="btn btn-primary mx-2" to="/login" role="button">Logout</Link>
                        </div>}
                </div>
            </div>
        </nav>
    )
}
