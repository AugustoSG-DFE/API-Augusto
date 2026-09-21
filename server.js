const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let filmes = [];
let proximoId = 1;

app.post('/api/filmes', (req, res) => {
    const novoFilme = { id: proximoId++, ...req.body };
    filmes.push(novoFilme);
    res.status(201).json(novoFilme);
});

app.get('/api/filmes', (req, res) => {
    res.json(filmes);
});

app.put('/api/filmes/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = filmes.findIndex(f => f.id === id);
    
    if (index === -1) {
        return res.status(404).json({ erro: 'Filme não encontrado.' });
    }
    
    filmes[index] = { id, ...filmes[index], ...req.body };
    res.json(filmes[index]);
});

app.delete('/api/filmes/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = filmes.findIndex(f => f.id === id);
    
    if (index === -1) {
        return res.status(404).json({ erro: 'Filme não encontrado.' });
    }
    
    filmes.splice(index, 1);
    res.status(204).send();
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});