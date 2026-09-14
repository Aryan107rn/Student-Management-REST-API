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
    const { name, age, course } = req.body;

    if (!name || !age || !course) {
        return res.status(400).json({
            message: "name, age and course are required"
        });
    }

    const student = {
        id: students.length + 1,
        name,
        age,
        course
    };

    students.push(student);

    return res.status(201).json(student);
});

app.put("/api/students/:id", (req, res) => {
    const id = Number(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const { name, age, course } = req.body;

    if (!name || !age || !course) {
        return res.status(400).json({
            message: "name, age and course are required"
        });
    }

    student.name = name;
    student.age = age;
    student.course = course;

    return res.json(student);
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});