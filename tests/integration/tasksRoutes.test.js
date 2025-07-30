const mongoose = require('mongoose');
const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const express = require('express');
const taskRoutes = require('../../src/routes/tasks');
const Task = require('../../src/models/task');

let app;
let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  app = express();
  app.use(express.json());
  app.use('/tasks', taskRoutes);
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongoServer.stop();
});

afterEach(async () => {
  await Task.deleteMany({});
});

describe('Task API integration tests', () => {
  it('POST /tasks - should create a new task', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'New Task', description: 'Test' });

    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('New Task');
    expect(res.body.completed).toBe(false);
  });

  it('GET /tasks - should return all tasks', async () => {
    await Task.create({ title: 'T1', description: 'D1' });
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBe(1);
  });

  it('GET /tasks/:id - should return a task by ID', async () => {
    const task = await Task.create({ title: 'T2', description: 'D2' });
    const res = await request(app).get(`/tasks/${task._id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('T2');
  });

  it('PUT /tasks/:id - should update a task', async () => {
    const task = await Task.create({ title: 'Old', description: 'Old' });
    const res = await request(app)
      .put(`/tasks/${task._id}`)
      .send({ title: 'New', description: 'New', completed: true });

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toBe('New');
    expect(res.body.completed).toBe(true);
  });

  it('DELETE /tasks/:id - should delete a task', async () => {
    const task = await Task.create({ title: 'Del', description: 'Del' });
    const res = await request(app).delete(`/tasks/${task._id}`);
    expect(res.statusCode).toBe(200);
    const findRes = await Task.findById(task._id);
    expect(findRes).toBeNull();
  });
});
