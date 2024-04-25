import express from "express";
import bodyParser from "body-parser";
import { Task } from "./task.mjs";
import { List } from "./list.mjs";

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.get("/api/data", (req, res) => {
  res.json(List.getAllLists());
});

// Test Data ----------------------
const list1 = List.create({ title: "List" });
list1.addTask({ title: "Task 1" });
list1.addTask({ title: "Task 2" });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
