import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./Perfil.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = { email, senha };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/users/login",
        credentials
      );

      const { token } = response.data;

      localStorage.setItem('token', token);
      
      console.log("Login bem-sucedido!");
      alert("Login realizado com sucesso!");

      navigate('/'); 

    } catch (error) {
      console.error("Erro no login:", error);
      
      if (error.response && error.response.data && error.response.data.error) {
        alert(`Falha no login: ${error.response.data.error}`);
      } else {
        alert("Ocorreu um erro ao tentar fazer login. Tente novamente.");
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <form onSubmit={handleSubmit} className="login-form">
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
            <label>Senha</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <button type="submit" className="login-button">Entrar</button>
        </form>
        <p className="login-footer">
          Ainda não tem uma conta? <Link to="/cadastro">Cadastre-se</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;