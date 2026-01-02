import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders Student Management System heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/Student Management System/i);
  expect(headingElement).toBeInTheDocument();
});

test("renders Add Student form", () => {
  render(<App />);
  const addStudentText = screen.getByText(/Add Student/i);
  expect(addStudentText).toBeInTheDocument();
});
