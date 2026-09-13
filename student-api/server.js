import express from "express";
import students from "./student.json" with { type: "json" };

const app = express();

const PORT = 8000;

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get("/api/students", (req, res) => {
    res.json(students);
});

app.get("/", (req, res) => {
    res.send("Student Management API is running");
});

app.post("/api/students", (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});