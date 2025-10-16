// ====== storage.js ======
// File ini berisi fungsi CRUD sederhana untuk localStorage
// Bisa digunakan untuk semua master (Mahasiswa, Dosen, Prodi, Jurusan, Institusi)

/**
 * Ambil data dari localStorage
 * @param {string} key - nama key penyimpanan (misal: 'mahasiswa')
 * @returns {Array} data array dari localStorage
 */
export const getData = (key) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Gagal mengambil data dari localStorage:", error);
    return [];
  }
};

/**
 * Simpan data baru ke localStorage
 * @param {string} key - nama key penyimpanan
 * @param {Array} data - data array yang mau disimpan
 */
export const saveData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error("Gagal menyimpan data ke localStorage:", error);
  }
};

/**
 * Tambah item baru ke data di localStorage
 * @param {string} key - nama key penyimpanan
 * @param {Object} newItem - data baru yang mau ditambahkan
 */
export const addItem = (key, newItem) => {
  const data = getData(key);
  const updatedData = [...data, newItem];
  saveData(key, updatedData);
  return updatedData;
};

/**
 * Update data di localStorage berdasarkan index
 * @param {string} key - nama key penyimpanan
 * @param {number} index - index data yang mau diupdate
 * @param {Object} updatedItem - data baru yang menggantikan
 */
export const updateItem = (key, index, updatedItem) => {
  const data = getData(key);
  data[index] = updatedItem;
  saveData(key, data);
  return data;
};

/**
 * Hapus data di localStorage berdasarkan index
 * @param {string} key - nama key penyimpanan
 * @param {number} index - index item yang akan dihapus
 */
export const deleteItem = (key, index) => {
  const data = getData(key);
  const updatedData = data.filter((_, i) => i !== index);
  saveData(key, updatedData);
  return updatedData;
};
