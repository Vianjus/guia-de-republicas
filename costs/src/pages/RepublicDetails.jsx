import { useEffect, useState } from 'react';
import ImageGallery from 'react-image-gallery';
import { useParams } from 'react-router-dom';
import './RepublicDetails.css';

export default function RepublicDetails() {
  const { id } = useParams();
  const [republica, setRepublica] = useState(null);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepublica = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/reps/${id}`);
        if (!res.ok) throw new Error("Erro ao buscar república");
        const data = await res.json();

        setRepublica(data);

        // monta imagens para react-image-gallery
        if (data.fotos && data.fotos.length > 0) {
          const imgs = data.fotos.map((foto) => ({
            original: foto.url_imagem,
            thumbnail: foto.url_imagem,
          }));
          setImages(imgs);
        }

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRepublica();
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!republica) return <p>República não encontrada</p>;

  return (
    <main className="details-container">
      <div className="details-content">
        <div className="details-gallery">
          {images.length > 0 ? (
            <ImageGallery
              items={images}
              showPlayButton={false}
              showFullscreenButton={true}
              showThumbnails={true}
              thumbnailPosition="bottom"
              autoPlay={false}
            />
          ) : (
            <p>Sem fotos disponíveis</p>
          )}
        </div>

        <div className="details-info">
          <h2>{republica.nome}</h2>
          <p className="subtitle">{republica.tipo}</p>

          {republica.features?.length > 0 && (
            <ul className="features">
              {republica.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          )}

          <button className="contact-button">Entrar em contato com a república</button>

          <p className="price">
            R$ {parseFloat(republica.preco_medio_mensal || 0).toFixed(2)}{" "}
            <span className="light">para bixos</span>
          </p>
          <p className="address">{republica.endereco_completo}</p>

          <p className="rating">⭐ {republica.rating || 0} - {republica.reviews || 0} comentários</p>
          <p className="anonymous">👤 Anônimo</p>
        </div>
      </div>
    </main>
  );
}
