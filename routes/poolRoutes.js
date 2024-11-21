// routes/poolRoutes.js
const express = require('express');
const router = express.Router();
const db = require('../database/db');  // Mengimpor koneksi database

// Get all pools
router.get('/', (req, res) => {
    db.query('SELECT * FROM pool', (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving data' });
        }
        res.render('index', { pools: result });  // Menampilkan data ke view
    });
});

// Create a new pool
router.post('/', (req, res) => {
    const { name, location, price } = req.body;
    const query = 'INSERT INTO pool (name, location, price) VALUES (?, ?, ?)';
    db.query(query, [name, location, price], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error adding pool' });
        }
        res.redirect('/pools');  // Redirect ke halaman utama setelah berhasil
    });
});

// Edit pool (GET)
router.get('/edit/:id', (req, res) => {
    const poolId = req.params.id;
    const query = 'SELECT * FROM pool WHERE id = ?';
    db.query(query, [poolId], (err, result) => {
        if (err || result.length === 0) {
            return res.status(404).json({ message: 'Kolam Renang tidak ditemukan' });
        }
        res.render('edit', { pool: result[0] });  // Menampilkan halaman edit dengan data kolam renang
    });
});

// Update pool (POST)
router.post('/edit/:id', (req, res) => {
    const poolId = req.params.id;
    const { name, location, price } = req.body;
    const query = 'UPDATE pool SET name = ?, location = ?, price = ? WHERE id = ?';
    db.query(query, [name, location, price, poolId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error updating pool' });
        }
        res.redirect('/pools');  // Redirect ke halaman utama setelah berhasil
    });
});

// Delete pool
router.get('/delete/:id', (req, res) => {
    const poolId = req.params.id;
    const query = 'DELETE FROM pool WHERE id = ?';
    db.query(query, [poolId], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error deleting pool' });
        }
        res.redirect('/pools');  // Redirect ke halaman utama setelah berhasil
    });
});

module.exports = router;
