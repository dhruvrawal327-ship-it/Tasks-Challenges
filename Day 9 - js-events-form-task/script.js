let employees = [];

const employeeForm = document.getElementById("employeeForm");
const nameInput = document.getElementById("empName");
const emailInput = document.getElementById("empEmail");
const deptInput = document.getElementById("empDept");
const salaryInput = document.getElementById("empSalary");

const nameError = document.getElementById("nameError");
const emailError = document.getElementById("emailError");
const salaryError = document.getElementById("salaryError");


const charCount = document.getElementById("charCount");

const employeeList = document.getElementById("employeeList");
const totalEmployeesEl = document.getElementById("totalEmployees");
const avgSalaryEl = document.getElementById("avgSalary");
const highestSalaryEl = document.getElementById("highestSalary");


nameInput.addEventListener("input", function () {
    const currentLength = nameInput.value.length;
    charCount.textContent = `${currentLength} / 50`;

    if (currentLength >= 50) {
        charCount.style.color = "#e74c3c";
    } else {
        charCount.style.color = "#7f8c8d";
    }
});

// Form submission event
employeeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const department = deptInput.value;
    const salary = Number(salaryInput.value);

    if (!validateForm(name, email, salary)) {
        return;
    }

    const newEmployee = {
        name: name,
        email: email,
        department: department,
        salary: salary
    };

    employees.push(newEmployee);

    renderEmployees();
    updateStatistics();
    employeeForm.reset();

    
    charCount.textContent = "0 / 50";
    charCount.style.color = "#7f8c8d";
});

// Validation function
function validateForm(name, email, salary) {
    let isValid = true;

    nameError.textContent = "";
    emailError.textContent = "";
    salaryError.textContent = "";

    const namePattern = /^[A-Za-z\s]{1,50}$/;
    if (name === "") {
        nameError.textContent = "Employee Name is required!";
        isValid = false;
    } else if (name.length > 50) {
        nameError.textContent = "Name cannot exceed 50 characters!";
        isValid = false;
    } else if (!namePattern.test(name)) {
        nameError.textContent = "Name must contain only letters and spaces!";
        isValid = false;
    }

    const strictEmailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (email === "") {
        emailError.textContent = "Email is required!";
        isValid = false;
    } else if (!strictEmailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email address (e.g., name@domain.com)!";
        isValid = false;
    }

    if (isNaN(salary) || salary <= 0) {
        salaryError.textContent = "Salary must be more than 0!";
        isValid = false;
    }

    return isValid;
}

function renderEmployees() {
    employeeList.innerHTML = "";

    if (employees.length === 0) {
        employeeList.innerHTML = '<p class="empty-msg">No employees registered yet!</p>';
        return;
    }

    employees.forEach(function (emp, index) {
        const card = document.createElement("div");
        card.classList.add("employee-card");

        card.innerHTML = `
            <h4>${emp.name}</h4>
            <p><strong>Email:</strong> ${emp.email}</p>
            <p><strong>Department:</strong> ${emp.department}</p>
            <p><strong>Salary:</strong> ₹${emp.salary.toLocaleString()}</p>
            <button class="delete-btn" onclick="deleteEmployee(${index})">Delete</button>
        `;

        employeeList.appendChild(card);
    });
}

function deleteEmployee(index) {
    employees.splice(index, 1);
    renderEmployees();
    updateStatistics();
}

function updateStatistics() {
    const total = employees.length;
    totalEmployeesEl.textContent = total;

    if (total === 0) {
        avgSalaryEl.textContent = "₹0";
        highestSalaryEl.textContent = "₹0";
        return;
    }

    let sum = 0;
    let highest = 0;

    employees.forEach(function (emp) {
        sum += emp.salary;
        if (emp.salary > highest) {
            highest = emp.salary;
        }
    });

    const average = Math.round(sum / total);

    avgSalaryEl.textContent = `₹${average.toLocaleString()}`;
    highestSalaryEl.textContent = `₹${highest.toLocaleString()}`;
}
