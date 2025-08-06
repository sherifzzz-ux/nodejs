import request from 'supertest';
import app from '../app';

describe('Authentication flow', () => {
  let userToken: string;
  let adminToken: string;

  it('registers a user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ username: 'user1', password: 'pass1' });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ message: 'User registered' });
  });

  it('logs in the user', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'user1', password: 'pass1' });
    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
    userToken = res.body.token;
  });

  it('denies access to /api/me without token', async () => {
    const res = await request(app).get('/api/me');
    expect(res.status).toBe(401);
  });

  it('allows access to /api/me with token', async () => {
    const res = await request(app)
      .get('/api/me')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.status).toBe(200);
    expect(res.body.user).toMatchObject({ id: 1, role: 'user' });
  });

  it('denies user access to admin route', async () => {
    const res = await request(app)
      .get('/api/admin')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.status).toBe(403);
  });

  it('registers and logs in an admin', async () => {
    await request(app)
      .post('/api/auth/register')
      .send({ username: 'admin', password: 'adminpass', role: 'admin' })
      .expect(201);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ username: 'admin', password: 'adminpass' });
    expect(res.status).toBe(200);
    adminToken = res.body.token;
  });

  it('allows admin access to admin route', async () => {
    const res = await request(app)
      .get('/api/admin')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Admin access granted');
  });
});
