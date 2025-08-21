// src/pages/Home.jsx
import { useContext, useEffect, useState } from "react";
import { FaHeart, FaMapMarkerAlt, FaStar, FaSearch, FaFilter } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { RepublicaContext } from '../context/RepublicaContext';
import republicaFallback from '../imgtests/testInd1.png';
import './Home.css';

export default function Home() {
  const { republicas, setRepublicas } = useContext(RepublicaContext);
  const [filtros, setFiltros] = useState({
    tipo: "",
    preco: "",
    distancia: ""
  });
  const [palavraChave, setPalavraChave] = useState('');
  const [republicasFiltradas, setRepublicasFiltradas] = useState([]);
  const [mostrarFiltrosMobile, setMostrarFiltrosMobile] = useState(false);

  // Busca as repúblicas da API na montagem
  useEffect(() => {
    async function fetchRepublicas() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001'}/api/reps`);
        const data = await res.json();
        if (res.ok) setRepublicas(data);
      } catch (e) {
        console.error("Erro ao buscar repúblicas:", e);
      }
    }
    fetchRepublicas();
  }, [setRepublicas]);

  // Atualiza filtradas sempre que muda a lista ou filtros
  useEffect(() => {
    let resultado = [...republicas];

    if (filtros.tipo) {
      resultado = resultado.filter(rep => rep.tipo === filtros.tipo);
    }

    if (filtros.preco) {
      if (filtros.preco === "ate-400") resultado = resultado.filter(rep => parseFloat(rep.preco_medio_mensal || 0) <= 400);
      if (filtros.preco === "400-600") resultado = resultado.filter(rep => {
        const p = parseFloat(rep.preco_medio_mensal || 0); 
        return p >= 400 && p <= 600;
      });
      if (filtros.preco === "acima-600") resultado = resultado.filter(rep => parseFloat(rep.preco_medio_mensal || 0) > 600);
    }

    if (palavraChave.trim()) {
      resultado = resultado.filter(rep =>
        (rep.caracteristicas || []).some(carac =>
          carac.toLowerCase().includes(palavraChave.toLowerCase())
        ) ||
        (rep.nome && rep.nome.toLowerCase().includes(palavraChave.toLowerCase()))
      );
    }

    setRepublicasFiltradas(resultado);
  }, [republicas, filtros, palavraChave]);

  const toggleFavorito = (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    setRepublicas(prev =>
      prev.map(rep => rep.id === id ? { ...rep, favoritada: !rep.favoritada } : rep)
    );
  };

  const limparFiltros = () => {
    setFiltros({ tipo: "", preco: "", distancia: "" });
    setPalavraChave('');
  };

  const temFiltrosAtivos = filtros.tipo || filtros.preco || filtros.distancia || palavraChave;

  return (
    <main className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Encontre sua república ideal em Ouro Preto</h1>
          <p>Conheça as melhores opções de moradia estudantil perto da UFOP</p>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <div className="search-header">
          <h2>Encontrar República</h2>
          <button 
            className="mobile-filter-toggle"
            onClick={() => setMostrarFiltrosMobile(!mostrarFiltrosMobile)}
          >
            <FaFilter /> Filtros
          </button>
        </div>

        <div className={`search-filters ${mostrarFiltrosMobile ? 'mobile-active' : ''}`}>
          <div className="search-input-container">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Pesquisar por nome ou características..."
              value={palavraChave}
              onChange={(e) => setPalavraChave(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filter-group">
            <select
              value={filtros.tipo}
              onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
              className="filter-select"
            >
              <option value="">Tipo de república</option>
              <option value="Feminina">Feminina</option>
              <option value="Masculina">Masculina</option>
              <option value="Mista">Mista</option>
            </select>
          </div>

          <div className="filter-group">
            <select
              value={filtros.preco}
              onChange={(e) => setFiltros({ ...filtros, preco: e.target.value })}
              className="filter-select"
            >
              <option value="">Faixa de preço</option>
              <option value="ate-400">Até R$ 400</option>
              <option value="400-600">R$ 400 - R$ 600</option>
              <option value="acima-600">Acima de R$ 600</option>
            </select>
          </div>

          {temFiltrosAtivos && (
            <button className="clear-filters" onClick={limparFiltros}>
              Limpar filtros
            </button>
          )}
        </div>

        {temFiltrosAtivos && republicasFiltradas.length > 0 && (
          <div className="results-count">
            {republicasFiltradas.length} república{republicasFiltradas.length !== 1 ? 's' : ''} encontrada{republicasFiltradas.length !== 1 ? 's' : ''}
          </div>
        )}
      </section>

      {/* Republicas Section */}
      <section className="republicas-section">
        {republicasFiltradas.length === 0 && temFiltrosAtivos ? (
          <div className="no-results">
            <h3>Nenhuma república encontrada</h3>
            <p>Tente ajustar os filtros ou buscar por outros termos.</p>
            <button onClick={limparFiltros} className="primary-button">
              Limpar filtros
            </button>
          </div>
        ) : (
          <>
            <h2>Repúblicas {temFiltrosAtivos ? 'Encontradas' : 'em Destaque'}</h2>
            <div className="republicas-grid">
              {republicasFiltradas.map(rep => (
                <Link to={`/republica/${rep.id}`} key={rep.id} className="republica-card-link">
                  <div className="republica-card">
                    <div className="card-image">
                      <img 
                        src={rep.fotos?.[0]?.url_imagem || republicaFallback} 
                        alt={rep.nome || "República"} 
                        onError={(e) => {
                          e.target.src = republicaFallback;
                        }}
                      />
                      <div className="card-badge">{rep.tipo || "—"}</div>
                      <button
                        className="favorite-button"
                        onClick={(e) => toggleFavorito(rep.id, e)}
                        aria-label={rep.favoritada ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                      >
                        <FaHeart className={rep.favoritada ? "favoritada" : ""} />
                      </button>
                    </div>
                    <div className="card-info">
                      <h3>{rep.nome || "República Sem Nome"}</h3>
                      <p className="republica-location">
                        <FaMapMarkerAlt /> {rep.endereco_completo ? rep.endereco_completo.split(',')[0] : "Endereço não informado"}
                      </p>
                      <div className="republica-meta">
                        <span className="republica-price">
                          R$ {parseFloat(rep.preco_medio_mensal || 0).toFixed(2)}/mês
                        </span>
                        <span className="republica-rating">
                          <FaStar /> {rep.rating || "N/A"} ({rep.reviews || 0})
                        </span>
                      </div>
                      <div className="republica-features">
                        {rep.vagas_disponiveis > 0 && (
                          <span className="feature-tag">{rep.vagas_disponiveis} vaga{rep.vagas_disponiveis !== 1 ? 's' : ''}</span>
                        )}
                        {(rep.caracteristicas || []).slice(0, 2).map((carac, index) => (
                          <span key={index} className="feature-tag">{carac}</span>
                        ))}
                        {(rep.caracteristicas || []).length > 2 && (
                          <span className="feature-tag">+{(rep.caracteristicas || []).length - 2}</span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>

      {/* Info Section */}
      <section className="info-section">
        <div className="info-content">
          <h2>Como funciona o Guia de Repúblicas?</h2>
          <div className="info-cards">
            <div className="info-card">
              <div className="info-icon">1</div>
              <h3>Pesquise</h3>
              <p>Busque repúblicas por localização, preço e características usando nossos filtros inteligentes</p>
            </div>
            <div className="info-card">
              <div className="info-icon">2</div>
              <h3>Visite</h3>
              <p>Entre em contato diretamente com os responsáveis e agende uma visita presencial</p>
            </div>
            <div className="info-card">
              <div className="info-icon">3</div>
              <h3>Junte-se</h3>
              <p>Escolha a república que mais combina com você e faça parte da comunidade</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}