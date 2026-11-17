// 1. Create an Array of Objects with initial sample data
const students = [
  { name: "Rahul", marks: 75, result: "Pass" },
  { name: "Priya", marks: 88, result: "Pass" }
];

// Select DOM elements
const nameInput = document.getElementById("studentName");
const marksInput = document.getElementById("studentMarks");
const addBtn = document.getElementById("addBtn");
const studentList = document.getElementById("studentList");

const totalCountEl = document.getElementById("totalcount");
const passCountEl = document.getElementById("passcount");
const failCountEl = document.getElementById("failcount");

// 4 & 6. Function to render the student list and update summary counts
function renderStudents() {
  // Clear existing table rows
  studentList.innerHTML = "";

  let passCount = 0;
  let failCount = 0;

  // Loop through the array using forEach()
  students.forEach((student, index) => {
    // Count Pass and Fail
    if (student.result === "Pass") {
      passCount++;
    } else {
      failCount++;
    }

    // Create a table row dynamically
    const row = document.createElement("tr");
    const statusClass = student.result === "Pass" ? "status-pass" : "status-fail";

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${student.name}</td>
      <td>${student.marks}</td>
      <td class="${statusClass}">${student.result}</td>
    `;

    studentList.appendChild(row);
  });

  // Update summary UI using array length and counters
  totalCountEl.textContent = students.length;
  passCountEl.textContent = passCount;
  failCountEl.textContent = failCount;
}

// 3. Add Student Dynamically on button click
addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const marks = Number(marksInput.value);

  // Basic validation
  if (name === "" || marksInput.value === "" || marks < 0 || marks > 100) {
    alert("Please enter a valid name and marks between 0 and 100.");
    return;
  }

  // 5. Result Logic
  const result = marks >= 40 ? "Pass" : "Fail";

  // 2. Create Student Object
  const newStudent = {
    name: name,
    marks: marks,
    result: result
  };

  // Add object into the array using push()
  students.push(newStudent);

  // Clear input fields
  nameInput.value = "";
  marksInput.value = "";

  // Re-render UI
  renderStudents();
});

// Initial render on page load
renderStudents();
