// src/App.jsx
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Header from './components/Header';
import Cadastro from './pages/CadastroPage';
import CadastroRepublica from "./pages/CadastroRepublica";
import Home from './pages/Home';
import Perfil from './pages/Perfil';
import RepublicDetails from './pages/RepublicDetails';

// ✅ IMPORTAR O PROVIDER
import { RepublicaProvider } from './context/RepublicaContext';

function App() {
  return (
    <RepublicaProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/republica/:id" element={<RepublicDetails />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/anunciar" element={<CadastroRepublica />} />
          </Routes>
        </div>
      </Router>
    </RepublicaProvider>
  );
}

export default App;
