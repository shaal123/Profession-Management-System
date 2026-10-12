
const employeeForm = document.getElementById("employeeForm");
const nameInput = document.getElementById("name");
const professionInput = document.getElementById("profession");
const ageInput = document.getElementById("age");

const employeeList = document.getElementById("employeeList");
const employeeCount = document.getElementById("employeeCount");
const message = document.getElementById("message");

let employees = [];
let nextId = 1;

// Add a new employee
employeeForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = nameInput.value.trim();
    const profession = professionInput.value.trim();
    const age = Number(ageInput.value);

    // Validate input fields
    if (!name || !profession || ageInput.value.trim() === "") {
        showMessage("Please fill in all fields.", "error");
        return;
    }

    if (!Number.isInteger(age) || age < 1 || age > 120) {
        showMessage("Please enter a valid age.", "error");
        return;
    }

    // Create an employee object
    const employee = {
        id: nextId++,
        name: name,
        profession: profession,
        age: age
    };

    // Store the employee
    employees.push(employee);

    // Update the page
    renderEmployees();

    // Clear the form
    employeeForm.reset();

    showMessage("Employee added successfully!", "success");
});

// Display all employees
function renderEmployees() {
    employeeList.replaceChildren();

    employeeCount.textContent =
        `You have ${employees.length} employee${employees.length === 1 ? "" : "s"}.`;

    if (employees.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "empty-message";
        emptyMessage.textContent = "No employees added yet.";
        employeeList.appendChild(emptyMessage);
        return;
    }

    employees.forEach(function (employee) {
        // Create an employee card
        const card = document.createElement("div");
        card.className = "employee-card";

        const name = document.createElement("p");
        name.textContent = `Name: ${employee.name}`;

        const profession = document.createElement("p");
        profession.textContent = `Profession: ${employee.profession}`;

        const age = document.createElement("p");
        age.textContent = `Age: ${employee.age}`;

        // Create a delete button
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            deleteEmployee(employee.id);
        });

        // Add details to the card
        card.append(name, profession, age, deleteButton);

        // Add the card to the employee list
        employeeList.appendChild(card);
    });
}

// Delete an employee
function deleteEmployee(id) {
    employees = employees.filter(function (employee) {
        return employee.id !== id;
    });

    renderEmployees();
    showMessage("Employee deleted successfully.", "success");
}

// Display success or error messages
function showMessage(text, type) {
    message.textContent = text;
    message.className = type;
}

// Show the initial empty list
renderEmployees();
