// src/pages/CadastroRepublica.jsx
import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ImageUploader from "../components/ImageUploader";
import { RepublicaContext } from "../context/RepublicaContext";

const API_BASE = process.env.REACT_APP_API_BASE_URL || "http://localhost:3001";

export default function CadastroRepublica() {
  const { setRepublicas } = useContext(RepublicaContext);
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");
  const [endereco, setEndereco] = useState("");
  const [tipo, setTipo] = useState("mista");
  const [preco, setPreco] = useState(750);
  const [vagas, setVagas] = useState(1);
  const [emailResp, setEmailResp] = useState("");
  const [telefoneRep, setTelefoneRep] = useState("");
  const [fotos, setFotos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [ok, setOk] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setErro("");
    setOk(false);

    if (fotos.length === 0) return setErro("Envie ao menos 1 imagem.");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/reps/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome,
          descricao,
          endereco_completo: endereco,
          tipo,
          preco_media_mensal: Number(preco),
          vagas_disponiveis: Number(vagas),
          ativa: true,
          email_responsavel: emailResp,
          telefone_rep: telefoneRep,
          fotos,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Erro ao criar república");

      // Atualiza o estado global do context
      setRepublicas((prev) => [...prev, data]);

      setOk(true);
      setNome(""); setDescricao(""); setEndereco("");
      setPreco(750); setVagas(1); setFotos([]);

      navigate("/"); // volta para a Home
    } catch (e) {
      setErro(e.message || "Erro inesperado");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <h2 className="cadastro-title">Anunciar república</h2>

        {erro && <div style={{ color: "#b91c1c", marginBottom: 12 }}>{erro}</div>}
        {ok && <div style={{ color: "#065f46", marginBottom: 12 }}>República criada com sucesso!</div>}

        <form onSubmit={handleSubmit} className="cadastro-form">
          <div className="form-group">
            <label>Nome</label>
            <input value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Descrição</label>
            <textarea value={descricao} onChange={(e) => setDescricao(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Endereço completo</label>
            <input value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Tipo</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
              <option value="masculina">Masculina</option>
              <option value="feminina">Feminina</option>
              <option value="mista">Mista</option>
            </select>
          </div>

          <div className="form-group">
            <label>Preço médio mensal (R$)</label>
            <input type="number" value={preco} onChange={(e) => setPreco(e.target.value)} min="0" required />
          </div>

          <div className="form-group">
            <label>Vagas disponíveis</label>
            <input type="number" value={vagas} onChange={(e) => setVagas(e.target.value)} min="0" required />
          </div>

          <div className="form-group">
            <label>Email do responsável</label>
            <input type="email" value={emailResp} onChange={(e) => setEmailResp(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Telefone da república</label>
            <input value={telefoneRep} onChange={(e) => setTelefoneRep(e.target.value)} />
          </div>

          <div className="form-group">
            <label>Imagens (upload para a nuvem)</label>
            <ImageUploader onUploaded={setFotos} />
            {!!fotos.length && (
              <ul style={{ marginTop: 8 }}>
                {fotos.map((f, i) => (<li key={i}>{f.url_imagem}</li>))}
              </ul>
            )}
          </div>

          <button type="submit" className="cadastro-button" disabled={loading}>
            {loading ? "Salvando..." : "Salvar república"}
          </button>
        </form>
      </div>
    </div>
  );
}
