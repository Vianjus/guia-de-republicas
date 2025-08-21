// src/pages/Home.jsx
import { useContext, useEffect, useState } from "react";
import { FaHeart, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { RepublicaContext } from '../context/RepublicaContext';
import republicaFallback from '../imgtests/testInd1.png'; // fallback de imagem
import './Home.css';

export default function Home() {
  const { republicas, setRepublicas } = useContext(RepublicaContext);
  const [filtros, setFiltros] = useState({
    tipo: "Tipo de república",
    preco: "Preço",
    distancia: "Distância da UFOP"
  });
  const [palavraChave, setPalavraChave] = useState('');
  const [republicasFiltradas, setRepublicasFiltradas] = useState([]);

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

    if (filtros.tipo !== "Tipo de república") {
      resultado = resultado.filter(rep => rep.tipo === filtros.tipo);
    }

    if (filtros.preco !== "Preço") {
      if (filtros.preco === "Até R$ 400") resultado = resultado.filter(rep => (rep.preco_media_mensal || 0) <= 400);
      if (filtros.preco === "R$ 400 - R$ 600") resultado = resultado.filter(rep => {
        const p = rep.preco_media_mensal || 0; return p >= 400 && p <= 600;
      });
      if (filtros.preco === "Acima de R$ 600") resultado = resultado.filter(rep => (rep.preco_media_mensal || 0) > 600);
    }

    if (filtros.distancia !== "Distância da UFOP") {
      resultado = resultado.filter(rep => {
        const dist = parseInt(rep.distancia?.split(" ")[0]) || 0;
        if (filtros.distancia === "Até 5 min") return dist <= 5;
        if (filtros.distancia === "5-10 min") return dist > 5 && dist <= 10;
        if (filtros.distancia === "10+ min") return dist > 10;
        return true;
      });
    }

    if (palavraChave.trim()) {
      resultado = resultado.filter(rep =>
        (rep.caracteristicas || []).some(carac =>
          carac.toLowerCase().includes(palavraChave.toLowerCase())
        )
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

  return (
    <main className="home-container">
      <section className="search-section">
        <div className="search-filters">
          <input
            type="text"
            placeholder="Pesquise"
            value={palavraChave}
            onChange={(e) => setPalavraChave(e.target.value)}
          />
          <select
            value={filtros.tipo}
            onChange={(e) => setFiltros({ ...filtros, tipo: e.target.value })}
          >
            <option>Tipo de república</option>
            <option>Feminina</option>
            <option>Masculina</option>
            <option>Mista</option>
          </select>
          <select
            value={filtros.preco}
            onChange={(e) => setFiltros({ ...filtros, preco: e.target.value })}
          >
            <option>Preço</option>
            <option>Até R$ 400</option>
            <option>R$ 400 - R$ 600</option>
            <option>Acima de R$ 600</option>
          </select>
          <select
            value={filtros.distancia}
            onChange={(e) => setFiltros({ ...filtros, distancia: e.target.value })}
          >
            <option>Distância da UFOP</option>
            <option>Até 5 min</option>
            <option>5-10 min</option>
            <option>10+ min</option>
          </select>
        </div>
      </section>

      <section className="republicas-section">
        <h2>Repúblicas em destaque</h2>
        <div className="republicas-grid">
          {republicasFiltradas.map(rep => (
            <Link to={`/republica/${rep.id}`} key={rep.id} className="republica-card-link">
              <div className="republica-card">
                <div className="card-image">
                  <img src={rep.fotos?.[0]?.url_imagem || republicaFallback} alt={rep.nome || "República"} />
                  <button
                    className="favorite-button"
                    onClick={(e) => toggleFavorito(rep.id, e)}
                  >
                    <FaHeart className={rep.favoritada ? "favoritada" : ""} />
                  </button>
                </div>
                <div className="card-info">
                  <h3>{rep.nome || "—"}</h3>
                  <p className="republica-type">{rep.tipo || "—"}</p>
                  <p className="republica-price">
                    R$ {(rep.preco_media_mensal || 0).toFixed(2)}
                  </p>
                  <div className="republica-meta">
                    <span><FaMapMarkerAlt /> {rep.distancia || "—"}</span>
                    <span><FaStar /> {rep.rating || 0} ({rep.reviews || 0})</span>
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
