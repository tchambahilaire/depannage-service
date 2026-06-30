const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Servir les fichiers statiques
app.use(express.static(path.join(__dirname, 'backend/public')));

// Servir le fichier index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'backend/public/index.html'));
});

// API de test
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'API fonctionne!' });
});

// API inscription
app.post('/api/register', (req, res) => {
    res.json({ success: true, message: 'Inscription réussie' });
});

// API connexion
app.post('/api/login', (req, res) => {
    res.json({ success: true, message: 'Connexion réussie' });
});

// API mécaniciens
app.get('/api/mechanics', (req, res) => {
    res.json([
        { id: 1, name: 'Mécanicien Pro', workshop_name: 'Garage Central', base_price: 5000, rating: 4.9 },
        { id: 2, name: 'Express Dépannage', workshop_name: 'Auto Secours', base_price: 7000, rating: 4.8 },
        { id: 3, name: 'Expert Auto', workshop_name: 'Méca Plus', base_price: 10000, rating: 5.0 }
    ]);
});

// Toutes les autres routes → index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'backend/public/index.html'));
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`🚀 Serveur sur http://localhost:${PORT}`);
});
