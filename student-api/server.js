import express from "express";
import students from "./student.json" with { type: "json" };

const app = express();

const PORT = 8000;

// ==================== MIDDLEWARE ====================

// Parse JSON request bodies
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// ==================== VALIDATION MIDDLEWARE ====================

const validateStudent = (req, res, next) => {
    const { name, age, course } = req.body;

    if (!name || !age || !course) {
        return res.status(400).json({
            message: "name, age and course are required"
        });
    }

    next();
};

// ==================== ROUTES ====================

// Home
app.get("/", (req, res) => {
    res.send("Student Management API is running");
});

// Get all students / filter by course
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

// Create student
app.post("/api/students", validateStudent, (req, res) => {
    const student = {
        id: students.length + 1,
        ...req.body
    };

    students.push(student);

    return res.status(201).json(student);
});

// Get / Update / Delete student by ID
app.route("/api/students/:id")

    // GET ONE STUDENT
    .get((req, res) => {
        const id = Number(req.params.id);

        const student = students.find(
            student => student.id === id
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        return res.json(student);
    })

    // PUT - Replace student
    .put(validateStudent, (req, res) => {
        const id = Number(req.params.id);

        const student = students.find(
            student => student.id === id
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const { name, age, course } = req.body;

        student.name = name;
        student.age = age;
        student.course = course;

        return res.json(student);
    })

    // PATCH - Partial update
    .patch((req, res) => {
        const id = Number(req.params.id);

        const student = students.find(
            student => student.id === id
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const { name, age, course } = req.body;

        if (name !== undefined) {
            student.name = name;
        }

        if (age !== undefined) {
            student.age = age;
        }

        if (course !== undefined) {
            student.course = course;
        }

        return res.json(student);
    })

    // DELETE
    .delete((req, res) => {
        const id = Number(req.params.id);

        const index = students.findIndex(
            student => student.id === id
        );

        if (index === -1) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const deletedStudent = students.splice(index, 1);

        return res.json({
            message: "Student deleted successfully",
            student: deletedStudent[0]
        });
    });

// ==================== SERVER ====================

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});