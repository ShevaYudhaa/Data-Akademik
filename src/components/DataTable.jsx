import { useState } from "react";

function DataTable({ data, columns, onDelete }) {
    const [search, setSearch] = useState("");
    const [sortColumn, setSortColumn] = useState(null);
    const [sortOrder, setSortOrder] = useState("asc");
    const [deleteIndex, setDeleteIndex] = useState(null);

    const filteredData = data.filter((item) =>
        Object.values(item).some((val) =>
        val.toString().toLowerCase().includes(search.toLowerCase())
        )
    );

    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortColumn) return 0;
        const aVal = a[sortColumn].toString().toLowerCase();
        const bVal = b[sortColumn].toString().toLowerCase();
        if (aVal < bVal) return sortOrder === "asc" ? -1 : 1;
        if (aVal > bVal) return sortOrder === "asc" ? 1 : -1;
        return 0;
    });

    const handleSort = (col) => {
        if (sortColumn === col) {
        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
        setSortColumn(col);
        setSortOrder("asc");
        }
    };

    const confirmDelete = () => {
        onDelete(deleteIndex);
        setDeleteIndex(null);
    };

    return (
        <div>
        <div className="d-flex justify-content-between align-items-center mb-3">
            <input
            type="text"
            className="form-control w-50"
            placeholder="Cari data..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            />
        </div>

        <div className="table-responsive">
            <table className="table table-striped table-hover align-middle">
            <thead className="table-primary">
                <tr>
                {columns.map((col, i) => (
                    <th
                    key={i}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSort(col.accessor)}
                    >
                    {col.header}{" "}
                    {sortColumn === col.accessor ? (sortOrder === "asc" ? "▲" : "▼") : ""}
                    </th>
                ))}
                <th>Aksi</th>
                </tr>
            </thead>
            <tbody>
                {sortedData.length === 0 ? (
                <tr>
                    <td colSpan={columns.length + 1} className="text-center text-muted">
                    Belum ada data
                    </td>
                </tr>
                ) : (
                sortedData.map((row, i) => (
                    <tr key={i}>
                    {columns.map((col, j) => (
                        <td key={j}>{row[col.accessor]}</td>
                    ))}
                    <td>
                        <button
                        className="btn btn-sm btn-danger"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteModal"
                        onClick={() => setDeleteIndex(i)}
                        >
                        <i className="bi bi-trash"></i> Hapus
                        </button>
                    </td>
                    </tr>
                ))
                )}
            </tbody>
            </table>
        </div>

        {/* Modal konfirmasi hapus */}
        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
                <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Konfirmasi Hapus</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                </div>
                <div className="modal-body">
                Apakah kamu yakin ingin menghapus data ini?
                </div>
                <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                    Batal
                </button>
                <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    onClick={confirmDelete}
                >
                    Hapus
                </button>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
    }
export default DataTable;
