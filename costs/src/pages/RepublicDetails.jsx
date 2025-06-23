// src/pages/RepublicDetails.jsx
import './RepublicDetails.css';

export default function RepublicDetails() {
  return (
    <main className="details-container">
      <div className="details-content">
        <div className="details-gallery">
          <img src="/casa-principal.jpg" className="main-image" />
          <div className="thumbnail-grid">
            <img src="/foto1.jpg" />
            <img src="/foto2.jpg" />
            <img src="/foto3.jpg" />
          </div>
        </div>

        <div className="details-info">
          <h2>República Indiscreta</h2>
          <p className="subtitle">Feminina - Particular</p>

          <ul className="features">
            <li>2 minutos da UFOP</li>
            <li>1 sala com TV e várias plataformas streaming</li>
            <li>1 sala de estudos</li>
            <li>5 quartos</li>
            <li>3 banheiros</li>
            <li>Cozinha equipada</li>
            <li>Garagem</li>
            <li>Área de churrasqueira</li>
            <li>Área de serviço com máquina de lavar</li>
            <li>Internet</li>
            <li>Temos uma gatinha</li>
          </ul>

          <button className="contact-button">Entrar em contato com a república</button>

          <p className="price">R$ 430,00 <span className="light">para bixos</span></p>
          <p className="address">Rua: Arthur Vitorino Coelho, 193 - Bauxita</p>

          <p className="rating">⭐ 5,00 - 10 comentários</p>
          <p className="anonymous">👤 Anônimo</p>
        </div>
      </div>
    </main>
  );
}
