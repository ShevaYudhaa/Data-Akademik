import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Mahasiswa from "./pages/Mahasiswa";
import Dosen from "./pages/Dosen";
import Jurusan from "./pages/Jurusan";
import Prodi from "./pages/Prodi";
import Institusi from "./pages/Institusi";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mahasiswa" element={<Mahasiswa />} />
        <Route path="/dosen" element={<Dosen />} />
        <Route path="/jurusan" element={<Jurusan />} />
        <Route path="/prodi" element={<Prodi />} />
        <Route path="/institusi" element={<Institusi />} />
      </Routes>
      <footer>© 2025 - Migrasi Data Akademik</footer>
    </Router>
  );
}
export default App;
