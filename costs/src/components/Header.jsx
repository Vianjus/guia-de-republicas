import './Header.css';
import { FaUserCircle } from 'react-icons/fa';
import logo from '../assets/logo.png'; 

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <img src={logo} alt="StudentHome" className="logo" />
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
          Anuncie sua república no StudentHome
        </a>
        <FaUserCircle className="user-icon" />
      </div>
    </header>
  );
}
