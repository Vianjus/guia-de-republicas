// src/pages/RepublicDetails.jsx
import { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/css/image-gallery.css";
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar, FaUsers, FaWhatsapp, FaEnvelope, FaPhone, FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './RepublicDetails.css';

export default function RepublicDetails() {
  const { id } = useParams();
  const [republica, setRepublica] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('descricao');
  const [responsavel, setResponsavel] = useState(null);

  useEffect(() => {
    const fetchRepublica = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:3001/api/reps/${id}`);
        if (!res.ok) throw new Error("Erro ao buscar república");
        const data = await res.json();

        setRepublica(data);

        if (data.id_usuario_responsavel) {
          const resUser = await fetch(`http://localhost:3001/api/users/${data.id_usuario_responsavel}`);
          if (!resUser.ok) throw new Error("Erro ao buscar dados do responsável");
          // A API retorna um array, então pegamos o primeiro item
          const userData = await resUser.json(); 
          setResponsavel(userData[0]);
        }

        // Monta imagens para react-image-gallery
        if (data.fotos && data.fotos.length > 0) {
          const imgs = data.fotos.map((foto) => ({
            original: foto.url_imagem,
            thumbnail: foto.url_imagem,
          }));
          setImages(imgs);
        } else {
          // Fallback para imagem padrão se não houver fotos
          setImages([{
            original: 'https://via.placeholder.com/800x500/f0f2f5/666666?text=Sem+Imagem',
            thumbnail: 'https://via.placeholder.com/150x100/f0f2f5/666666?text=Sem+Imagem'
          }]);
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRepublica();
  }, [id]);

    const handleContact = (method) => {
    const numeroContato = responsavel?.telefone_contato;
    const emailContato = responsavel?.email;

    if (method === 'WhatsApp') {
      if (!numeroContato) return alert("O responsável não informou um número de WhatsApp.");
      const numeroLimpo = numeroContato.replace(/\D/g, '');
      window.open(`https://wa.me/55${numeroLimpo}?text=Olá, vi o anúncio da república "${republica.nome}" e gostaria de mais informações!`, '_blank');
    } 
    else if (method === 'Email') {
      if (!emailContato) return alert("O responsável não informou um email de contato.");
      window.location.href = `mailto:${emailContato}?subject=Interesse na república "${republica.nome}"`;
    } 
    else if (method === 'Telefone') {
      if (!numeroContato) return alert("O responsável não informou um número de telefone.");
      window.location.href = `tel:${numeroContato}`;
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="loading-spinner"></div>
      <p>Carregando república...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <h2>Erro ao carregar</h2>
      <p>{error}</p>
      <Link to="/" className="back-button">
        <FaArrowLeft /> Voltar para a página inicial
      </Link>
    </div>
  );
  
  if (!republica) return (
    <div className="not-found-container">
      <h2>República não encontrada</h2>
      <p>A república que você está procurando não existe ou foi removida.</p>
      <Link to="/" className="back-button">
        <FaArrowLeft /> Voltar para a página inicial
      </Link>
    </div>
  );

  return (
    <main className="republic-details-container">
      <Link to="/" className="back-button">
        <FaArrowLeft /> Voltar para repúblicas
      </Link>

      <div className="republic-header">
        <div className="republic-title-section">
          <h1>{republica.nome}</h1>
          <div className="republic-meta">
            <span className="republic-type">{republica.tipo}</span>
            <span className="republic-rating">
              <FaStar /> {republica.rating || 'N/A'} ({republica.reviews || 0} avaliações)
            </span>
            <span className="republic-location">
              <FaMapMarkerAlt /> {republica.endereco_completo}
            </span>
          </div>
        </div>
      </div>

      <div className="republic-content">
        <div className="gallery-section">
          <ImageGallery
            items={images}
            showPlayButton={false}
            showFullscreenButton={false}
            showThumbnails={true}
            thumbnailPosition="bottom"
            autoPlay={false}
            additionalClass="custom-image-gallery"
          />
        </div>

        <div className="info-sidebar">
          <div className="price-card">
            <h3>Preço Mensal</h3>
            <div className="price-value">
              R$ {parseFloat(republica.preco_medio_mensal || 0).toFixed(2)}
            </div>
            <p className="price-note">Para bixos</p>
            
            <div className="vacancy-info">
              <FaUsers /> {republica.vagas_disponiveis || 0} vagas disponíveis
            </div>

            <div className="contact-options">
              <h4>Entrar em contato:</h4>
              <div className="contact-buttons">
                <button 
                  className="contact-btn whatsapp"
                  onClick={() => handleContact('WhatsApp')}
                >
                  <FaWhatsapp /> WhatsApp
                </button>
                <button 
                  className="contact-btn email"
                  onClick={() => handleContact('Email')}
                >
                  <FaEnvelope /> Email
                </button>
                <button 
                  className="contact-btn phone"
                  onClick={() => handleContact('Telefone')}
                >
                  <FaPhone /> Ligar
                </button>
              </div>
            </div>
          </div>

          <div className="quick-info">
            <h3>Informações Rápidas</h3>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Tipo</span>
                <span className="info-value">{republica.tipo}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Vagas</span>
                <span className="info-value">{republica.vagas_disponiveis || 0}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Avaliação</span>
                <span className="info-value">{republica.rating || 'N/A'}/5</span>
              </div>
              <div className="info-item">
                <span className="info-label">Distância UFOP</span>
                <span className="info-value">{republica.distancia_ufop || 'Não informado'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="republic-details">
        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'descricao' ? 'active' : ''}`}
            onClick={() => setActiveTab('descricao')}
          >
            Descrição
          </button>
          <button 
            className={`tab ${activeTab === 'avaliacoes' ? 'active' : ''}`}
            onClick={() => setActiveTab('avaliacoes')}
          >
            Avaliações
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'descricao' && (
            <div className="description-section">
              <h3>Sobre esta república</h3>
              <p>
                {republica.descricao || 
                  "Esta república não possui uma descrição detalhada. Entre em contato para obter mais informações sobre as instalações, regras e ambiente da casa."}
              </p>
            </div>
          )}

          {activeTab === 'avaliacoes' && (
            <div className="reviews-section">
              <h3>Avaliações dos Moradores</h3>
              {republica.reviews > 0 ? (
                <div className="reviews-list">
                  <div className="review-item">
                    <div className="review-header">
                      <span className="reviewer">👤 Anônimo</span>
                      <span className="review-rating">
                        <FaStar /> {republica.rating}
                      </span>
                    </div>
                    <p className="review-text">
                      {republica.avaliacao_texto || "Ótima república, ambiente acolhedor e localização perfeita!"}
                    </p>
                  </div>
                </div>
              ) : (
                <p>Esta república ainda não possui avaliações. Seja o primeiro a avaliar!</p>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="similar-republics">
        <h2>Repúblicas Similares</h2>
        <p>Em breve: outras repúblicas que podem te interessar...</p>
      </div>
    </main>
  );
}