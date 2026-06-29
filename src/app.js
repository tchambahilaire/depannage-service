
const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Connexion PostgreSQL
const pool = new Pool({
    user: 'yango_user',
    password: 'yangopass123',
    host: 'localhost',
    database: 'yango_db',
    port: 5432,
});

// Test connexion
pool.connect((err) => {
    if (err) console.log('❌ Erreur BD:', err.message);
    else console.log('✅ Base de données connectée');
});

// Route inscription
app.post('/api/register', async (req, res) => {
    console.log('📝 Inscription reçue:', req.body);
    try {
        const { phone, password, name, role, workshopName, basePrice } = req.body;
        
        const result = await pool.query(
            'INSERT INTO users (phone, password, name, role, workshop_name, base_price) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, phone, name, role',
            [phone, password, name, role, workshopName || null, basePrice || 5000]
        );
        res.json({ success: true, user: result.rows[0] });
    } catch (err) {
        console.log('Erreur:', err.message);
        res.status(400).json({ error: err.message });
    }
});

// Route connexion
app.post('/api/login', async (req, res) => {
    console.log('🔐 Connexion reçue:', req.body);
    try {
        const { phone, password } = req.body;
        const result = await pool.query('SELECT * FROM users WHERE phone = $1 AND password = $2', [phone, password]);
        
        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Identifiants incorrects' });
        }
        const user = result.rows[0];
        res.json({ success: true, user: { id: user.id, phone: user.phone, name: user.name, role: user.role, workshop_name: user.workshop_name, base_price: user.base_price } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route mécaniciens
app.get('/api/mechanics', async (req, res) => {
    try {
        const result = await pool.query('SELECT id, name, workshop_name, base_price, rating FROM users WHERE role = $1', ['mechanic']);
        res.json(result.rows);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(5000, () => console.log('🚀 Serveur sur http://localhost:5000'));

