import { Routes, Route } from 'react-router-dom';
import UnauthorizedPage from './pages/UnauthorizedPage'; // oluşturman gerekiyor

function App() {
  return (
    <Routes>
      {/* Diğer rotaların burada */}

      <Route path="/unauthorized" element={<UnauthorizedPage />} />
      
      {/* diğer route'lar */}
    </Routes>
  );
}

export default App;
