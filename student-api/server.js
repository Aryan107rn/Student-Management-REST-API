import express from "express";

const app = express();

const PORT = 8000;

app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get("/",(req,res)=>{
    res.send("Student Management API is running");
});

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});