import express from "express";
import students from "./student.json" with { type: "json" };

const app = express();

const PORT = 8000;

// Middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Home route
app.get("/", (req, res) => {
    res.send("Student Management API is running");
});

// Get students / filter by course
app.get("/api/students", (req, res) => {
    const course = req.query.course;

    if (course) {
        const filteredStudents = students.filter(
            student => student.course === course
        );

        return res.json(filteredStudents);
    }

    return res.json(students);
});

// Get student by ID
app.get("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    return res.json(student);
});

// Create student
app.post("/api/students", (req, res) => {
    const student = req.body;

    students.push(student);

    return res.status(201).json(student);
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});