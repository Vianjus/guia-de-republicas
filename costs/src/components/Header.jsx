import './Header.css';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../assets/logo.png'; 

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="Guia de Republicas" className="logo" />
      </div>

      <div className="header-center">
        <input
          type="text"
          placeholder="Pesquisar..."
          className="search-input"
        />
      </div>

      <div className="header-right">
        <a href="#" className="announce-link">
          Anuncie aqui
        </a>
        <FaUserCircle className="user-icon" />
      </div>
    </header>
  );
}
