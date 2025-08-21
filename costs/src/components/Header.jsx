import './Header.css';
import { FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Importe o componente Link
import logo from '../assets/logo.png'; 

export default function Header() {
  return (
    <header className="header">
      <div className="header-left">
        {/* Substitua a tag <a> por <Link> para navegação sem recarregar a página */}
        <Link to="/">
          <img src={logo} alt="Guia de Republicas" className="logo" />
        </Link>
      </div>

      <div className="header-center">
        <input
          type="text"
          placeholder="Pesquisar repúblicas..."
          className="search-input"
        />
      </div>

      <div className="header-right">
        {/* Atualize o link para usar o componente Link */}
        <Link to="/anunciar" className="announce-link">
          Anuncie aqui
        </Link>
        
        {/* Adicione um Link ou botão para a área do usuário */}
        <Link to="/perfil" className="user-icon-wrapper">
          <FaUserCircle className="user-icon" />
        </Link>
      </div>
    </header>
  );
}