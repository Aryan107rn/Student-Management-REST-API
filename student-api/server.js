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

app.route("/api/students/:id")
    .get((req, res) => {
        const id = Number(req.params.id);

        const student = students.find(student => student.id === id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        return res.json(student);
    })

    .put((req, res) => {
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
    })

    .patch((req, res) => {
        const id = Number(req.params.id);

        const student = students.find(student => student.id === id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        const { name, age, course } = req.body;

        if (name !== undefined) student.name = name;
        if (age !== undefined) student.age = age;
        if (course !== undefined) student.course = course;

        return res.json(student);
    })

    .delete((req, res) => {
        const id = Number(req.params.id);

        const index = students.findIndex(student => student.id === id);

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

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});