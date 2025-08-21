import React, { useState, useEffect, useRef } from 'react';
import './Header.css';
import { FaUserCircle, FaSignInAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png'; 

export default function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  const menuRef = useRef(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      const nome = localStorage.getItem('nome');
      if (nome) {
        setUserName(nome);
      }
    } else {
      setUserName('');
    }
  }, [token]);


  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('nome');
    setUserName('');
    setMenuAberto(false);
    navigate('/login');
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAberto(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/">
          <img src={logo} alt="Guia de Repúblicas" className="logo" />
        </Link>
      </div>

      <div className="header-center">
        <h1 className="header-title">Guia de Repúblicas</h1>
      </div>

      <div className="header-right">
        {token ? (
          <>
            <p className="welcome-message">Bem vindo, {userName}!</p>
            <div className="profile-container" ref={menuRef}>
              <button 
                className="profile-button" 
                onClick={() => setMenuAberto(!menuAberto)}
              >
                <FaUserCircle className="user-icon" />
              </button>
              {menuAberto && (
                <div className="profile-menu">
                  <button onClick={handleLogout} className="menu-item logout-button">
                    Sair
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          <Link to="/login" className="login-button">
            <FaSignInAlt />
            <span>Entrar</span>
          </Link>
        )}
      </div>
    </header>
  );
}