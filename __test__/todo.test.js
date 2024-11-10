// todo.test.js

import { fetchTasks, addTask, updateTask, toggleTaskCompletion, deleteTask } from "../js/taskManager";
import { jest } from "@jest/globals"; // Explicitly import jest for ESM

// Mock the global fetch function
global.fetch = jest.fn();

describe("Task API Utilities", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  // Tests for fetchTasks
  test("fetchTasks should retrieve tasks from the backend", async () => {
    const mockTasks = [{ id: 1, description: "Sample Task", completed: false }];
    fetch.mockResolvedValueOnce({
      json: async () => mockTasks,
    });

    const tasks = await fetchTasks();
    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/check-connection");
    expect(tasks).toEqual(mockTasks);
  });

  test("fetchTasks should handle an empty task list", async () => {
    fetch.mockResolvedValueOnce({
      json: async () => [],
    });

    const tasks = await fetchTasks();
    expect(tasks).toEqual([]);
  });

  test("fetchTasks should handle multiple tasks", async () => {
    const mockTasks = [
      { id: 1, description: "Task 1", completed: false },
      { id: 2, description: "Task 2", completed: true },
    ];
    fetch.mockResolvedValueOnce({
      json: async () => mockTasks,
    });

    const tasks = await fetchTasks();
    expect(tasks).toEqual(mockTasks);
  });

  // Tests for addTask
  test("addTask should send a POST request to add a task", async () => {
    fetch.mockResolvedValueOnce({ status: 201 });

    await addTask("New Task");

    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/add-description", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: "New Task" }),
    });
  });

  test("addTask should ignore empty description", async () => {
    await addTask("");
    expect(fetch).not.toHaveBeenCalled();
  });

  test("addTask should handle special characters in description", async () => {
    fetch.mockResolvedValueOnce({ status: 201 });

    await addTask("New Task! @ #");

    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/add-description", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: "New Task! @ #" }),
    });
  });

  // Tests for updateTask
  test("updateTask should send a PUT request to update a task", async () => {
    const mockTasks = [{ id: 1, description: "Old Task", completed: false }];
    fetch
      .mockResolvedValueOnce({ json: async () => mockTasks })
      .mockResolvedValueOnce({ status: 200 });

    await updateTask(1, "Updated Task");

    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/update-description", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 1, description: "Updated Task", completed: false }),
    });
  });

  test("updateTask should do nothing if task ID is invalid", async () => {
    fetch.mockResolvedValueOnce({ json: async () => [] });

    await updateTask(999, "Updated Task");

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("updateTask should handle special characters in the updated description", async () => {
    const mockTasks = [{ id: 1, description: "Old Task", completed: false }];
    fetch
      .mockResolvedValueOnce({ json: async () => mockTasks })
      .mockResolvedValueOnce({ status: 200 });

    await updateTask(1, "Updated! @ Task");

    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/update-description", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 1, description: "Updated! @ Task", completed: false }),
    });
  });

  // Tests for toggleTaskCompletion
  test("toggleTaskCompletion should toggle completion status", async () => {
    const mockTasks = [{ id: 1, description: "Task", completed: false }];
    fetch
      .mockResolvedValueOnce({ json: async () => mockTasks })
      .mockResolvedValueOnce({ status: 200 });

    await toggleTaskCompletion(1);

    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/update-description", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 1, description: "Task", completed: true }),
    });
  });

  test("toggleTaskCompletion should handle a non-existent task", async () => {
    fetch.mockResolvedValueOnce({ json: async () => [] });

    await toggleTaskCompletion(999);

    expect(fetch).toHaveBeenCalledTimes(1);
  });

  // Tests for deleteTask
  test("deleteTask should send a DELETE request to remove a task", async () => {
    fetch.mockResolvedValueOnce({ status: 200 });

    await deleteTask(1);

    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/delete-description/1", {
      method: "DELETE",
    });
  });

  test("deleteTask should handle non-existent task gracefully", async () => {
    fetch.mockResolvedValueOnce({ status: 404 });

    await deleteTask(999);

    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/delete-description/999", {
      method: "DELETE",
    });
  });
});
