import { useState, useEffect } from "react";
import { getData, addItem, updateItem, deleteItem } from "../utils/storage";
import FormInput from "../components/FormInput";

function Mahasiswa() {
    const STORAGE_KEY = "mahasiswa";
    const [data, setData] = useState([]);
    const [nama, setNama] = useState("");
    const [nim, setNim] = useState("");
    const [email, setEmail] = useState("");
    const [editIndex, setEditIndex] = useState(null);

    useEffect(() => {
        setData(getData(STORAGE_KEY));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!nama || !nim || !email) return alert("Isi semua data!");
        let updatedData;
        if (editIndex !== null) {
        updatedData = updateItem(STORAGE_KEY, editIndex, { nama, nim, email });
        setEditIndex(null);
        } else {
        updatedData = addItem(STORAGE_KEY, { nama, nim, email });
        }
        setData(updatedData);
        setNama(""); setNim(""); setEmail("");
    };

    const handleEdit = (i) => {
        const item = data[i];
        setNama(item.nama);
        setNim(item.nim);
        setEmail(item.email);
        setEditIndex(i);
    };

    const handleDelete = (i) => {
        if (confirm("Yakin hapus data ini?")) setData(deleteItem(STORAGE_KEY, i));
    };

    return (
        <div className="container my-4">
        <h2 className="text-primary fw-bold mb-3">Master Data Mahasiswa</h2>
        <form onSubmit={handleSubmit} className="mb-4 bg-light p-3 rounded shadow-sm">
            <FormInput label="Nama" value={nama} onChange={(e) => setNama(e.target.value)} required />
            <FormInput label="NIM" value={nim} onChange={(e) => setNim(e.target.value)} required />
            <FormInput label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <button type="submit" className={`btn w-100 ${editIndex !== null ? "btn-success" : "btn-primary"}`}>
            {editIndex !== null ? "Update Data" : "Tambah Data"}
            </button>
        </form>

        <table className="table table-striped table-bordered shadow-sm">
            <thead className="table-primary">
            <tr>
                <th>No</th><th>Nama</th><th>NIM</th><th>Email</th><th>Aksi</th>
            </tr>
            </thead>
            <tbody>
            {data.length === 0 ? (
                <tr><td colSpan="5" className="text-center text-muted">Belum ada data</td></tr>
            ) : data.map((m, i) => (
                <tr key={i}>
                <td>{i + 1}</td><td>{m.nama}</td><td>{m.nim}</td><td>{m.email}</td>
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

export default Mahasiswa;
