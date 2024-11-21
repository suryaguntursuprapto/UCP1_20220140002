const express = require('express');
const router = express.Router();
const db = require('../database/db');  // Mengimpor koneksi ke database

// Menampilkan semua pool
router.get('/', (req, res) => {
    const query = 'SELECT * FROM pool';  // Menarik semua data dari tabel 'pool'

    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Gagal mengambil data kolam renang', error: err });
        }
        res.json(results);
    });
});

// Menambahkan data pool baru
router.post('/', (req, res) => {
    const { name, location, price } = req.body;

    if (!name || !location || !price) {
        return res.status(400).json({ message: 'Semua data harus diisi' });
    }

    const query = 'INSERT INTO pool (name, location, price) VALUES (?, ?, ?)';
    db.query(query, [name, location, price], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Gagal menambahkan kolam renang', error: err });
        }
        res.status(201).json({
            id: results.insertId,
            name,
            location,
            price
        });
    });
});

// Mengupdate data pool berdasarkan ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, location, price } = req.body;

    const query = 'UPDATE pool SET name = ?, location = ?, price = ? WHERE id = ?';
    db.query(query, [name, location, price, id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Gagal mengupdate kolam renang', error: err });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Kolam renang tidak ditemukan' });
        }
        res.json({ message: `Kolam renang dengan ID ${id} berhasil diperbarui` });
    });
});

// Menghapus pool berdasarkan ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const query = 'DELETE FROM pool WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Gagal menghapus kolam renang', error: err });
        }
        if (results.affectedRows === 0) {
            return res.status(404).json({ message: 'Kolam renang tidak ditemukan' });
        }
        res.json({ message: `Kolam renang dengan ID ${id} berhasil dihapus` });
    });
});

module.exports = router;
