// src/App.jsx
import Header from './components/Header';
import Home from './pages/Home';
import RepublicDetails from './pages/RepublicDetails';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/republica/:id" element={<RepublicDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;