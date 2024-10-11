const request = require('supertest');
const app = require('../index');

jest.setTimeout(20000);

describe('API FutScript', () => {
    it('Debería obtener un Array y status 200 en GET /equipos', async () => {
        const res = await request(app).get('/equipos');
        expect(res.statusCode).toBe(200);
        expect(res.body).toBeInstanceOf(Array);
    });
    it('Debería obtener un Object y token en POST /login con credenciales correctas', async () => {
        const res = await request(app).post('/login').send({ username: 'admin', password: '123' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('token');
    });
    it('Debería obtener status 400 en POST /login con credenciales incorrectas', async () => {
        const res = await request(app).post('/login').send({ username: 'wrong', password: 'wrong' });
        expect(res.statusCode).toBe(400);
    });
    it('Debería agregar un nuevo jugador con un token válido en POST /equipos/:teamID/jugadores', async () => {
        const loginRes = await request(app).post('/login').send({ username: 'admin', password: '123' });
        const token = loginRes.body.token;
        const equipo = { name: 'Equipo 1' };
        await request(app).post('/equipos').set('Authorization', `Bearer ${token}`).send(equipo);
        const jugador = { name: 'Nuevo Jugador', position: 1 };
        const res = await request(app)
          .post('/equipos/1/jugadores')
          .set('Authorization', `Bearer ${token}`)
          .send(jugador);
        expect(res.statusCode).toBe(201);
      });
    });

