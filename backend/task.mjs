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

  json() {
    return {
      id: this.#id,
      title: this.#title,
    };
  }
}
