const mongoose = require('mongoose');
const Task = require('../../src/models/task');

describe('Task model validation', () => {
  beforeAll(async () => {
    await mongoose.connect('mongodb://localhost:27017/todolist-test', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.connection.db.dropDatabase();
    await mongoose.disconnect();
  });

  it('should create a task with valid fields', async () => {
    const task = new Task({
      title: 'Test task',
      description: 'Test description',
    });
    const savedTask = await task.save();
    expect(savedTask._id).toBeDefined();
    expect(savedTask.completed).toBe(false);
  });

  it('should fail if required fields are missing', async () => {
    const task = new Task({});
    let err;
    try {
      await task.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.title).toBeDefined();
    expect(err.errors.description).toBeDefined();
  });
});
