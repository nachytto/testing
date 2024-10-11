const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'futscript',
  password: '123',
  port: 5432,
});

const getTeams = async () => {
    const { rows } = await pool.query('SELECT * FROM equipos');
    return rows;
};

const getPlayers = async (teamID) => {
    const { rows } = await pool.query(`
        SELECT jugadores.name AS jugador, posiciones.name AS posicion
        FROM jugadores
        INNER JOIN posiciones ON jugadores.position = posiciones.id
        WHERE jugadores.id_equipo = $1
    `, [teamID]);
    return rows;
};

const addTeam = async (equipo) => {
    const { name } = equipo;
    await pool.query('INSERT INTO equipos (name) VALUES ($1)', [name]);
};

const addPlayer = async ({ jugador, teamID }) => {
    const { name, position } = jugador;
    await pool.query('INSERT INTO jugadores (id_equipo, name, position) VALUES ($1, $2, $3)', [teamID, name, position]);
};

module.exports = { getTeams, addTeam, getPlayers, addPlayer };
