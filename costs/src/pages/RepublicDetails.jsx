// src/pages/RepublicDetails.jsx
import './RepublicDetails.css';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import testInd1 from '../imgtests/testInd1.png';
import testInd2 from '../imgtests/testInd2.png';
import testInd3 from '../imgtests/testInd3.png';

export default function RepublicDetails() {
  const images = [
    {
      original: testInd1,
      thumbnail: testInd1
    },
    {
      original: testInd2,
      thumbnail: testInd2
    },
    {
      original: testInd3,
      thumbnail: testInd3
    }
  ];

  return (
    <main className="details-container">
      <div className="details-content">
        <div className="details-gallery">
          <ImageGallery
            items={images}
            showPlayButton={false}
            showFullscreenButton={true}
            showThumbnails={true}
            thumbnailPosition="bottom"
            autoPlay={false}
          />
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