import { useState, useEffect } from "react";
import { getData, addItem, updateItem, deleteItem } from "../utils/storage";
import FormInput from "../components/FormInput";

function Institusi() {
    const STORAGE_KEY = "institusi";
    const [data, setData] = useState([]);
    const [kode, setKode] = useState("");
    const [nama, setNama] = useState("");
    const [alamat, setAlamat] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => { setData(getData(STORAGE_KEY)); }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!kode || !nama || !alamat) return alert("Semua field wajib diisi!");
        let updatedData;
        if (editIndex !== null) {
        updatedData = updateItem(STORAGE_KEY, editIndex, { kode, nama, alamat });
        setEditIndex(null);
        } else {
        updatedData = addItem(STORAGE_KEY, { kode, nama, alamat });
        }
        setData(updatedData);
        setKode(""); setNama(""); setAlamat("");
    };

    const handleEdit = (i) => {
        const item = data[i];
        setKode(item.kode); setNama(item.nama); setAlamat(item.alamat); setEditIndex(i);
    };

    const handleDelete = (i) => {
        if (confirm("Yakin hapus data ini?")) setData(deleteItem(STORAGE_KEY, i));
    };

    return (
        <div className="container my-4">
        <h2 className="text-primary fw-bold mb-3">Master Data Institusi</h2>
        <form onSubmit={handleSubmit} className="mb-4 bg-light p-3 rounded shadow-sm">
            <FormInput label="Kode Institusi" value={kode} onChange={(e) => setKode(e.target.value)} required />
            <FormInput label="Nama Institusi" value={nama} onChange={(e) => setNama(e.target.value)} required />
            <FormInput label="Alamat" value={alamat} onChange={(e) => setAlamat(e.target.value)} required />
            <button type="submit" className={`btn w-100 ${editIndex !== null ? "btn-success" : "btn-primary"}`}>
            {editIndex !== null ? "Update Data" : "Tambah Institusi"}
            </button>
        </form>

        <table className="table table-striped table-bordered shadow-sm">
            <thead className="table-primary">
            <tr>
                <th>No</th><th>Kode</th><th>Nama</th><th>Alamat</th><th>Aksi</th>
            </tr>
            </thead>
            <tbody>
            {data.length === 0 ? (
                <tr><td colSpan="5" className="text-center text-muted">Belum ada data</td></tr>
            ) : data.map((item, i) => (
                <tr key={i}>
                <td>{i + 1}</td><td>{item.kode}</td><td>{item.nama}</td><td>{item.alamat}</td>
                <td>
                    <button className="btn btn-sm btn-warning me-2" onClick={() => handleEdit(i)}>Edit</button>
                    <button className="btn btn-sm btn-danger" onClick={() => handleDelete(i)}>Hapus</button>
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </div>
    );
    }

export default Institusi;
