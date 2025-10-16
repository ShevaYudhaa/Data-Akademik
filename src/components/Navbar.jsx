import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
        <Link className="navbar-brand fw-bold" to="/">Data Akademik</Link>
        <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/mahasiswa">Mahasiswa</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/dosen">Dosen</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/jurusan">Jurusan</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/prodi">Prodi</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/institusi">Institusi</Link></li>
            </ul>
        </div>
        </nav>
    );
    }
export default Navbar;
