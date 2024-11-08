import { addTask, removeTask, editTask, getTasks } from '../js/taskManager';

describe('Task Manager Functions', () => {
  
  test('addTask should add a task to the tasks array', () => {
    const tasks = [];
    const task = { id: 1, name: 'Sample Task' };
    
    addTask(tasks, task);
    expect(tasks).toContainEqual(task);
  });

  test('removeTask should remove a task by id', () => {
    const tasks = [{ id: 1, name: 'Sample Task' }];
    const taskId = 1;
    
    removeTask(tasks, taskId);
    expect(tasks).toHaveLength(0);
  });

  test('removeTask should not remove anything if id is not found', () => {
    const tasks = [{ id: 1, name: 'Sample Task' }];
    const taskId = 2; // Non-existing ID
    
    removeTask(tasks, taskId);
    expect(tasks).toHaveLength(1); // Length should remain the same
  });

  test('editTask should update a task by id', () => {
    const tasks = [{ id: 1, name: 'Old Task' }];
    const taskId = 1;
    const updatedTask = { name: 'Updated Task' };
    
    editTask(tasks, taskId, updatedTask);
    expect(tasks[0].name).toBe('Updated Task');
  });

  test('editTask should not change tasks if id is not found', () => {
    const tasks = [{ id: 1, name: 'Sample Task' }];
    const taskId = 2; // Non-existing ID
    const updatedTask = { name: 'Updated Task' };
    
    editTask(tasks, taskId, updatedTask);
    expect(tasks[0].name).toBe('Sample Task'); // Name should remain the same
  });

  test('getTasks should return the tasks array', () => {
    const tasks = [{ id: 1, name: 'Sample Task' }];
    
    const result = getTasks(tasks);
    expect(result).toEqual(tasks); // Should return the exact same array
  });

});
