import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import session from "express-session";
import { Task } from "./task.mjs";
import { List } from "./list.mjs";

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());
// app.use(session({
//   secret: 'sea-fairy-cookie',
//   resave: false,
//   saveUninitialized: false
// })
// );

// Routes

// Get all lists with their tasks
// app.get("/sessions", (req, res) => {
//   const sessionData = req.session;
//   sessionData = List.getAllLists();
//   res.send('Session data updated');
// });

app.get("/lists", (req, res) => {
  res.json(List.getAllLists());
});

app.post("/lists", (req, res) => {
  let list = List.create(req.body);

  if (!list) {
    res.status(400).send("Could not create list.");
  }

  res.status(201).json(list.json());
});

app.put("/lists/:id", (req, res) => {
  let id = parseInt(req.params.id);
  if (isNaN(id) || id < 0) {
    res.status(400).send("Invalid ID.");
  }
  let list = List.findByID(id);
  if (!list) {
    res.status(404).send("List not found.");
  }
  list.addTask(req.body);
  res.status(200).json(list.json());
});

app.delete("/lists/:id", (req, res) => {
  let id = parseInt(req.params.id);
  if (isNaN(id) || id < 0) {
    res.status(400).send("Invalid ID.");
  }
  let list = List.findByID(id);
  if (!list) {
    res.status(404).send("List not found.");
  }
  list.deleteList();
  res.status(200).json();
});

app.put("/tasks/:id", (req, res) => {
  let id = parseInt(req.params.id);
  if (isNaN(id) || id < 0) {
    res.status(400).send("Invalid ID.");
  }
  let task = Task.findByID(id);
  if (!task) {
    res.status(404).send("Task not found.");
  }
  task.editTask(req.body);
  res.status(200).json(task.json());
});

app.delete("/lists/:id/:tid", (req, res) => {
  let id = parseInt(req.params.id);
  if (isNaN(id) || id < 0) {
    res.status(400).send("Invalid ID.");
  }
  let list = List.findByID(id);
  if (!list) {
    res.status(404).send("List not found.");
  }
  let tid = parseInt(req.params.tid);
  if (isNaN(tid) || tid < 0) {
    res.status(400).send("Invalid ID.");
  }
  let task = Task.findByID(tid);
  if (!task) {
    res.status(404).send("Task not found.");
  }

  list.deleteTask(tid);
  res.status(200).json();
});

// Test Data ----------------------
const list1 = List.create({ title: "List" });
list1.addTask({ title: "Task 1" });
list1.addTask({ title: "Task 2" });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
