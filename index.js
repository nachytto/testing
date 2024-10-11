const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const { secretKey } = require('./utils');
const { validateToken } = require('./middleware/auth');

app.use(express.json());

app.listen(3000, console.log("SERVER ON"));

const { obtenerJugadores, registrarJugador } = require('./controllers/jugadores');
const { obtenerEquipos, agregarEquipo } = require('./controllers/equipos');

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === "admin" && password === "123") {
        const token = jwt.sign({ username }, secretKey, { expiresIn: '1h' });
        return res.json({ token });
    } else {
        return res.status(400).json({ message: "Credenciales incorrectas" });
    }
});

app.get("/equipos", obtenerEquipos);
app.get("/equipos/:teamID/jugadores", obtenerJugadores);
app.post("/equipos", validateToken, agregarEquipo);
app.post("/equipos/:teamID/jugadores", validateToken, registrarJugador);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Ocurrió un error en el servidor' });
});

module.exports = app;
