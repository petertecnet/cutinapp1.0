import { Link } from 'react-router-dom';
import React  from "react";
import '../css/navlog.css'; // Importe seu arquivo CSS personalizado

const Navbar = () => {

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid text-white">
        <Link className="navbar-brand" to="/">
          <img src="/images/logo.png" alt="Logo" className="logo" />
        </Link>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 " >
          
            <li className="nav-item">
              <Link className="nav-link " to="/profile">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/settings">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
