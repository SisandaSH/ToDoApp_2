// todo.test.js

import { fetchTasks, addTask, updateTask, toggleTaskCompletion, deleteTask } from "../js/taskManager";
import { jest } from "@jest/globals"; // Explicitly import jest for ESM

// Mock the global fetch function
global.fetch = jest.fn();

describe("Task API Utilities", () => {
  beforeEach(() => {
    // Clear any previous calls to fetch before each test
    fetch.mockClear();
  });

  // Test for fetching tasks
  test("fetchTasks should retrieve tasks from the backend", async () => {
    const mockTasks = [{ id: 1, description: "Sample Task", completed: false }];
    fetch.mockResolvedValueOnce({
      json: async () => mockTasks,
    });

    const tasks = await fetchTasks();

    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/check-connection");
    expect(tasks).toEqual(mockTasks);
  });

  // Test for adding a task
  test("addTask should send a POST request to add a task", async () => {
    fetch.mockResolvedValueOnce({ status: 201 });

    await addTask("New Task");

    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/add-description", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: "New Task" }),
    });
  });

  // Test for updating a task
  test("updateTask should send a PUT request to update a task", async () => {
    const mockTasks = [{ id: 1, description: "Old Task", completed: false }];
    fetch
      .mockResolvedValueOnce({ json: async () => mockTasks }) // Mock fetchTasks
      .mockResolvedValueOnce({ status: 200 }); // Mock the update request

    await updateTask(1, "Updated Task");

    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/update-description", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 1, description: "Updated Task", completed: false }),
    });
  });

  // Test for toggling task completion
  test("toggleTaskCompletion should send a PUT request to toggle completion status", async () => {
    const mockTasks = [{ id: 1, description: "Sample Task", completed: false }];
    fetch
      .mockResolvedValueOnce({ json: async () => mockTasks }) // Mock fetchTasks
      .mockResolvedValueOnce({ status: 200 }); // Mock the toggle request

    await toggleTaskCompletion(1);

    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/update-description", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: 1, description: "Sample Task", completed: true }),
    });
  });

  // Test for deleting a task
  test("deleteTask should send a DELETE request to remove a task", async () => {
    fetch.mockResolvedValueOnce({ status: 200 });

    await deleteTask(1);

    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/delete-description/1", {
      method: "DELETE",
    });
  });

  // Error handling and edge case tests

  test("fetchTasks should handle network errors gracefully", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    await expect(fetchTasks()).rejects.toThrow("Network error");
  });

  test("addTask should handle server errors", async () => {
    fetch.mockResolvedValueOnce({ status: 500 });

    const description = "New Task";
    await addTask(description);

    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/add-description", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    });
  });

  test("updateTask should do nothing if task ID is invalid", async () => {
    fetch.mockResolvedValueOnce({ json: async () => [] });

    await updateTask(999, "Updated Task");

    expect(fetch).toHaveBeenCalledTimes(1); // Only initial fetchTasks call
  });

  test("addTask should ignore empty description", async () => {
    await addTask("");

    expect(fetch).not.toHaveBeenCalled();
  });

  test("toggleTaskCompletion should not attempt toggle if task is missing", async () => {
    fetch.mockResolvedValueOnce({ json: async () => [] });

    await toggleTaskCompletion(999);

    expect(fetch).toHaveBeenCalledTimes(1); // Only initial fetchTasks call
  });

  test("deleteTask should handle non-existent task gracefully", async () => {
    fetch.mockResolvedValueOnce({ status: 404 });

    await deleteTask(999);

    expect(fetch).toHaveBeenCalledWith("http://localhost:8000/delete-description/999", {
      method: "DELETE",
    });
  });
});
