import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    age: ""
  });

  // Fetch students from backend API
  useEffect(() => {
    fetch("http://localhost:5000/api/students")
      .then(response => response.json())
      .then(data => setStudents(data))
      .catch(error => console.error("API Error:", error));
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Add new student
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("http://localhost:5000/api/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    })
      .then(res => res.json())
      .then(newStudent => {
        setStudents([...students, newStudent]);
        setFormData({ name: "", department: "", age: "" });
      });
  };

  // Delete student
  const deleteStudent = (id) => {
    fetch(`http://localhost:5000/api/students/${id}`, {
      method: "DELETE"
    }).then(() => {
      setStudents(students.filter(student => student.id !== id));
    });
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Student Management System</h1>
        <p>IBM Naan Mudhalvan Internship Project</p>
      </header>

      <section className="student-form">
        <h2>Add Student</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Student Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="department"
            placeholder="Department"
            value={formData.department}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="age"
            placeholder="Age"
            value={formData.age}
            onChange={handleChange}
            required
          />

          <button type="submit">Add Student</button>
        </form>
      </section>

      <section className="student-table">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {students.length > 0 ? (
              students.map(student => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.department}</td>
                  <td>{student.age}</td>
                  <td>
                    <button
                      className="btn-delete"
                      onClick={() => deleteStudent(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No student records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      <footer className="app-footer">
        © 2026 Student Management System
      </footer>
    </div>
  );
}

export default App;
