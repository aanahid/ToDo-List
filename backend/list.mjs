import { Task } from "./task.mjs";
export class List {
  #id;
  #title;
  #tasks;

  static #next_id = 1;
  static #all_lists = [];

  constructor(id, title, tasks) {
    this.#id = id;
    this.#title = title;
    this.#tasks = tasks;
  }

  static create(data) {
    if (
      data !== undefined &&
      data instanceof Object &&
      typeof data.title == "string"
    ) {
      let id = List.#next_id++;

      data.tasks = [];

      let list = new List(id, data.title, data.tasks);

      List.#all_lists.push(list);
      return list;
    }
    return null;
  }

  static getAllLists() {
    return List.#all_lists.map((list) => list.json());
  }

  getID() {
    return this.#id;
  }

  getTitle() {
    return this.#title;
  }

  static findByID(id) {
    return List.#all_lists.find((l) => {
      return l.getID() == id;
    });
  }

  deleteList() {
    List.#all_lists = List.#all_lists.filter((l) => l !== this);
  }

  deleteTask(id) {
    this.#tasks = this.#tasks.filter((t) => t.getID() !== id);
  }

  addTask(data) {
    const task = Task.create(data);
    this.#tasks.push(task);
  }

  json() {
    return {
      id: this.#id,
      title: this.#title,
      tasks: this.#tasks.map((task) => task.json()),
    };
  }
}
