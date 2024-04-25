// Task properties: id, title, description, completed
// description is optional

export class Task {
  #id;
  #title;
  #description;
  #completed;

  static #next_id = 1;
  static #all_tasks = [];

  constructor(id, title, description, completed) {
    this.#id = id;
    this.#title = title;
    this.#description = description;
    this.#completed = completed;
  }

  static create(data) {
    if (
      data !== undefined &&
      data instanceof Object &&
      typeof data.title == "string"
    ) {
      let id = Task.#next_id++;

      if (data.description == undefined) {
        data.description = "";
      }

      let task = new Task(id, data.title, data.description, false);

      Task.#all_tasks.push(task);
      return task;
    }
    return null;
  }

  static getAllTasks() {
    return Task.#all_tasks.map((task) => task.json());
  }

  static findByID(id) {
    return Task.#all_tasks.find((t) => {
      return t.getID() == id;
    });
  }

  getID() {
    return this.#id;
  }

  deleteTask() {
    Task.#all_tasks = Task.#all_tasks.filter((t) => t !== this);
  }

  editTask(data) {
    if (data !== undefined && data instanceof Object) {
      if (data.title) {
        if (typeof data.title != "string") {
          return null;
        } else {
          this.#title = data.title;
        }
      }
      if (data.description) {
        if (typeof data.description != "string") {
          return null;
        } else {
          this.#description = data.description;
        }
      }
      if (data.completed) {
        if (typeof data.completed != "boolean") {
          return null;
        } else {
          this.#completed = data.completed;
        }
      }
    }
  }

  json() {
    return {
      id: this.#id,
      title: this.#title,
    };
  }
}
