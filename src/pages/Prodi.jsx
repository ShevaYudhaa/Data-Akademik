import { useState, useEffect } from "react";
import FormInput from "../components/FormInput";
import DataTable from "../components/DataTable";

function Prodi() {
    const [data, setData] = useState([]);
    const [kode, setKode] = useState("");
    const [nama, setNama] = useState("");
    const [jenjang, setJenjang] = useState("");
    const [editId, setEditId] = useState(null);

    // 🔹 Load data dari localStorage saat halaman dibuka
    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("prodi")) || [];
        setData(saved);
    }, []);

    // 🔹 Simpan otomatis ke localStorage setiap data berubah
    useEffect(() => {
        localStorage.setItem("prodi", JSON.stringify(data));
    }, [data]);

    // 🔹 Reset form input
    const resetForm = () => {
        setKode("");
        setNama("");
        setJenjang("");
        setEditId(null);
    };

    // 🔹 Tambah atau Update data
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!kode || !nama || !jenjang) return alert("Semua field wajib diisi!");

        if (editId) {
            // Update data
            const updated = data.map((d) =>
                d.id === editId ? { ...d, kode, nama, jenjang } : d
            );
            setData(updated);
            alert("Data program studi berhasil diperbarui!");
        } else {
            // Tambah data baru
            const newData = [...data, { id: Date.now(), kode, nama, jenjang }];
            setData(newData);
            alert("Data program studi berhasil ditambahkan!");
        }

        resetForm();
    };

    // 🔹 Hapus data
    const handleDelete = (id) => {
        if (window.confirm("Yakin ingin menghapus data ini?")) {
            setData(data.filter((d) => d.id !== id));
        }
    };

    // 🔹 Edit data
    const handleEdit = (item) => {
        setKode(item.kode);
        setNama(item.nama);
        setJenjang(item.jenjang);
        setEditId(item.id);
    };

    return (
        <div className="container my-4">
            <h2 className="text-primary mb-3 fw-bold">Master Data Program Studi</h2>

            {/* Form Input */}
            <form onSubmit={handleSubmit} className="mb-4 shadow-sm p-3 bg-light rounded">
                <FormInput
                    label="Kode Prodi"
                    value={kode}
                    onChange={(e) => setKode(e.target.value)}
                    required
                />
                <FormInput
                    label="Nama Prodi"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    required
                />
                <FormInput
                    label="Jenjang"
                    value={jenjang}
                    onChange={(e) => setJenjang(e.target.value)}
                    required
                />

                <div className="d-flex gap-2">
                    <button type="submit" className="btn btn-primary w-100">
                        {editId ? "Simpan Perubahan" : "Tambah Prodi"}
                    </button>
                    {editId && (
                        <button
                            type="button"
                            onClick={resetForm}
                            className="btn btn-secondary w-100"
                        >
                            Batal
                        </button>
                    )}
                </div>
            </form>

            {/* Tabel Data */}
            <table className="table table-bordered table-striped">
                <thead className="table-primary">
                    <tr>
                        <th>Kode Prodi</th>
                        <th>Nama Prodi</th>
                        <th>Jenjang</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.kode}</td>
                                <td>{item.nama}</td>
                                <td>{item.jenjang}</td>
                                <td>
                                    <button
                                        onClick={() => handleEdit(item)}
                                        className="btn btn-warning btn-sm me-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Hapus
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center text-muted">
                                Belum ada data program studi.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Prodi;
