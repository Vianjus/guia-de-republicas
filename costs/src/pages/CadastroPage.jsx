import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Usando axios para as requisições
import "./CadastroPage.css";

const CadastroPage = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }
    
    // Se o tipo de usuário não foi selecionado, exibe um alerta.
    if (!tipoUsuario) {
      alert("Por favor, selecione o tipo de morador.");
      return;
    }

    // --- PAYLOAD ATUALIZADO ---
    // Objeto de dados que será enviado para o back-end
    // Os nomes das chaves (ex: nome_completo) devem ser os mesmos que o back-end espera
    const userData = {
      nome_completo: nome,
      email: email,
      senha: senha,
      telefone_contato: telefone,
      tipo_usuario: tipoUsuario,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/create",
        userData
      );

      console.log("Usuário cadastrado com sucesso:", response.data);
      alert("Cadastro realizado com sucesso!");

      navigate("/login");

    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);

      if (error.response && error.response.data && error.response.data.error) {
        alert(`Erro no cadastro: ${error.response.data.error}`);
      } else {
        alert("Ocorreu um erro ao tentar cadastrar. Tente novamente.");
      }
    }
  };

  return (
    <div className="cadastro-container">
      <div className="cadastro-card">
        <h2 className="cadastro-title">Cadastro</h2>
        <form onSubmit={handleSubmit} className="cadastro-form">
          <div className="form-group">
            <label>Nome Completo</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              placeholder="Seu nome completo"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="seuemail@exemplo.com"
            />
          </div>
          <div className="form-group">
            <label>Telefone de Contato</label>
            <input
              type="tel"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
              placeholder="(XX) XXXXX-XXXX"
            />
          </div>
          <div className="form-group">
            <label>Eu sou</label>
            <select
              value={tipoUsuario}
              onChange={(e) => setTipoUsuario(e.target.value)}
              required
            >
              <option value="" disabled>Selecione uma opção...</option>
              <option value="estudante">Estudante</option>
              <option value="morador">Morador</option>
            </select>
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <div className="form-group">
            <label>Confirmar Senha</label>
            <input
              type="password"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="cadastro-button">
            Cadastrar
          </button>
        </form>
        <p className="cadastro-footer">
          Já tem uma conta? <a href="/login">Faça login</a>
        </p>
      </div>
    </div>
  );
};

export default CadastroPage;