// src/components/ui/navigation/Navbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useCart } from "../../../context/CartContext";

const Navbar = () => {
  // const { user, signOut } = useAuth();
  // const { totalItems } = useCart();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark pb-2 pt-2">
      <div className="container-fluid">
        <a className="navbar-brand text-white" href="/">
          <img
            src="/GaelCraves.jpg"
            alt="Logo"
            className="rounded"
            style={{ width: "7%", marginRight: "10px" }}
          />
          GaelCraves
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <a className="nav-link text-white" aria-current="page" href="/">
                Nutritional Information
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/">
                Order
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/about">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white" href="/contact">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
