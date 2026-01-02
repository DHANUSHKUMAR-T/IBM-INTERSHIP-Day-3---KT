const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5000;

/* Middleware */
app.use(cors());
app.use(express.json());

/* In-memory student records */
let studentRecords = [
  { id: 1, name: "Priya", department: "CCE", age: 20 },
  { id: 2, name: "Jeni", department: "AIDS", age: 21 },
  { id: 3, name: "Neevi", department: "Computer Science", age: 21 },
  { id: 4, name: "Guru", department: "EEE", age: 22 }
];

app.get("/api/students", (req, res) => {
    res.json(studentRecords);
  });
  
  app.post("/api/students", (req, res) => {
    const { name, department, age } = req.body;
  
    if (!name || !department) {
      return res.status(400).json({ message: "Missing fields" });
    }
  
    const newStudent = {
      id: studentRecords.length + 1,
      name,
      department,
      age
    };
  
    studentRecords.push(newStudent);
    res.status(201).json(newStudent);
  });
  

/* PUT: Update student details */
app.put("/api/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const index = studentRecords.findIndex(s => s.id === studentId);

  if (index === -1) {
    return res.status(404).json({
      message: "Student record not found"
    });
  }

  studentRecords[index] = {
    ...studentRecords[index],
    ...req.body
  };

  res.json(studentRecords[index]);
});

/* DELETE: Remove student */
app.delete("/api/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  studentRecords = studentRecords.filter(s => s.id !== studentId);

  res.json({
    message: "Student record deleted successfully"
  });
});

/* Server start */
app.listen(PORT, () => {
  console.log(`Student Management API running on port ${PORT}`);
});
