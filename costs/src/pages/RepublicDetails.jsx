import './RepublicDetails.css';
import { useParams } from 'react-router-dom';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import testInd1 from '../imgtests/testInd1.png';
import testInd2 from '../imgtests/testInd2.png';
import testInd3 from '../imgtests/testInd3.png';

export default function RepublicDetails() {
  const { id } = useParams();
  
  // Dados mockados
  const republicas = {
    1: {
      nome: "República Indiscreta",
      tipo: "Feminina - Particular",
      preco: 430,
      endereco: "Rua: Arthur Vitorino Coelho, 193 - Bauxita",
      rating: 5,
      reviews: 10,
      features: [
        "2 minutos da UFOP",
        "1 sala com TV e várias plataformas streaming",
        "1 sala de estudos",
        "5 quartos",
        "3 banheiros",
        "Cozinha equipada",
        "Garagem",
        "Área de churrasqueira",
        "Área de serviço com máquina de lavar",
        "Internet",
        "Temos uma gatinha"
      ]
    },
    2: {
      nome: "República Quinta Negra",
      tipo: "Mista - Particular",
      preco: 380,
      endereco: "Rua: São José, 45 - Centro",
      rating: 4.8,
      reviews: 15,
      features: [
        "5 minutos da UFOP",
        "2 salas de estar",
        "4 quartos",
        "2 banheiros",
        "Cozinha completa",
        "Quintal arborizado"
      ]
    },
    3: {
      nome: "República Barraca Armada",
      tipo: "Masculina - Particular",
      preco: 400,
      endereco: "Rua: Alfa, 22 - Bauxita",
      rating: 4.5,
      reviews: 8,
      features: [
        "7 minutos da UFOP",
        "3 quartos",
        "2 banheiros",
        "Sala de jogos",
        "Cozinha equipada",
        "Área de churrasco"
      ]
    }
  };

  const republica = republicas[id] || republicas[1];
  
  const images = [
    { original: testInd1, thumbnail: testInd1 },
    { original: testInd2, thumbnail: testInd2 },
    { original: testInd3, thumbnail: testInd3 }
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
          <h2>{republica.nome}</h2>
          <p className="subtitle">{republica.tipo}</p>

          <ul className="features">
            {republica.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>

          <button className="contact-button">Entrar em contato com a república</button>

          <p className="price">R$ {republica.preco.toFixed(2)} <span className="light">para bixos</span></p>
          <p className="address">{republica.endereco}</p>

          <p className="rating">⭐ {republica.rating} - {republica.reviews} comentários</p>
          <p className="anonymous">👤 Anônimo</p>
        </div>
      </div>
    </main>
  );
}