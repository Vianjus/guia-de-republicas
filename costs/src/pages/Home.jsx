import './Home.css';
import { Link } from 'react-router-dom';
import { FaStar, FaHeart, FaMapMarkerAlt } from 'react-icons/fa';
import republica1 from '../imgtests/testInd1.png';
import republica2 from '../imgtests/testInd2.png';
import republica3 from '../imgtests/testInd3.png';

export default function Home() {
  const republicas = [
    {
      id: 1,
      nome: "República Indiscreta",
      tipo: "Feminina",
      preco: 430,
      distancia: "2 min da UFOP",
      imagem: republica1,
      rating: 5,
      reviews: 10,
      favoritada: false
    },
    {
      id: 2,
      nome: "República Quinta Negra",
      tipo: "Mista",
      preco: 380,
      distancia: "5 min da UFOP",
      imagem: republica2,
      rating: 4.8,
      reviews: 15,
      favoritada: true
    },
    {
      id: 3,
      nome: "República Barraca Armada",
      tipo: "Masculina",
      preco: 400,
      distancia: "7 min da UFOP",
      imagem: republica3,
      rating: 4.5,
      reviews: 8,
      favoritada: false
    }
  ];

  const toggleFavorito = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log(`República ${id} favoritada`);
    // Aqui você implementaria a lógica real de favoritar
  };

  return (
    <main className="home-container">
      <section className="search-section">
        <div className="search-filters">
          <select>
            <option>Tipo de república</option>
            <option>Feminina</option>
            <option>Masculina</option>
            <option>Mista</option>
          </select>
          <select>
            <option>Preço</option>
            <option>Até R$ 400</option>
            <option>R$ 400 - R$ 600</option>
            <option>Acima de R$ 600</option>
          </select>
          <select>
            <option>Distância da UFOP</option>
            <option>Até 5 min</option>
            <option>5-10 min</option>
            <option>10+ min</option>
          </select>
          <button className="filter-button">Filtrar</button>
        </div>
      </section>

      <section className="republicas-section">
        <h2>Repúblicas em destaque</h2>
        <div className="republicas-grid">
          {republicas.map((rep) => (
            <Link to={`/republica/${rep.id}`} key={rep.id} className="republica-card-link">
              <div className="republica-card">
                <div className="card-image">
                  <img src={rep.imagem} alt={rep.nome} />
                  <button 
                    className="favorite-button"
                    onClick={(e) => toggleFavorito(rep.id, e)}
                  >
                    <FaHeart className={rep.favoritada ? "favoritada" : ""} />
                  </button>
                </div>
                <div className="card-info">
                  <h3>{rep.nome}</h3>
                  <p className="republica-type">{rep.tipo}</p>
                  <p className="republica-price">R$ {rep.preco.toFixed(2)}</p>
                  <div className="republica-meta">
                    <span><FaMapMarkerAlt /> {rep.distancia}</span>
                    <span><FaStar /> {rep.rating} ({rep.reviews})</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="info-section">
        <h2>Como funciona o Guia de Repúblicas?</h2>
        <div className="info-cards">
          <div className="info-card">
            <h3>1. Pesquise</h3>
            <p>Busque repúblicas por localização, preço e características</p>
          </div>
          <div className="info-card">
            <h3>2. Visite</h3>
            <p>Entre em contato e agende uma visita</p>
          </div>
          <div className="info-card">
            <h3>3. Junte-se</h3>
            <p>Escolha a sua e junte-se à república</p>
          </div>
        </div>
      </section>
    </main>
  );
}