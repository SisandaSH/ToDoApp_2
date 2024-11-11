import {
  fetchTasks,
  addTask,
  updateTask,
  toggleTaskCompletion,
  deleteTask,
} from "../js/taskManager";
import jest from "jest"

const serverURL = "http://localhost:7000";

describe("Task API Utilities", () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("fetchTasks should retrieve tasks from the backend", async () => {
    const mockTasks = [{ id: 1, description: "Test task", completed: false }];
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockTasks),
    });

    const tasks = await fetchTasks();
    expect(fetch).toHaveBeenCalledWith(`${serverURL}/check-connection`);
    expect(tasks).toEqual(mockTasks);
  });

  test("addTask should send a POST request to add a task", async () => {
    const description = "New task";
    fetch.mockResolvedValueOnce({});

    await addTask(description);
    expect(fetch).toHaveBeenCalledWith(`${serverURL}/add-description`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description }),
    });
  });

  test("updateTask should send a PUT request to update a task", async () => {
    const mockTasks = [{ id: 1, description: "Old task", completed: false }];
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockTasks),
    });

    const id = 1;
    const newDescription = "Updated task";
    await updateTask(id, newDescription);

    expect(fetch).toHaveBeenCalledWith(`${serverURL}/check-connection`);
    expect(fetch).toHaveBeenCalledWith(`${serverURL}/update-description`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id,
        description: newDescription,
        completed: false,
      }),
    });
  });

  test("toggleTaskCompletion should send a PUT request to toggle completion status", async () => {
    const mockTasks = [{ id: 1, description: "Test task", completed: false }];
    fetch.mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce(mockTasks),
    });

    const id = 1;
    await toggleTaskCompletion(id);

    expect(fetch).toHaveBeenCalledWith(`${serverURL}/check-connection`);
    expect(fetch).toHaveBeenCalledWith(`${serverURL}/update-description`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, description: "Test task", completed: true }),
    });
  });

  test("deleteTask should send a DELETE request to remove a task", async () => {
    const id = 1;
    fetch.mockResolvedValueOnce({});

    await deleteTask(id);
    expect(fetch).toHaveBeenCalledWith(
      `${serverURL}/delete-description/${id}`,
      { method: "DELETE" }
    );
  });
});
