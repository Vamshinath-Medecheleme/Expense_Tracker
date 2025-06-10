document.addEventListener("DOMContentLoaded", function () {
    // Select elements
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");
    const totalExpense = document.getElementById("total-expense");

    // Array to store expenses
    let expenses = [];

    // Function to add an expense
    function addExpense(event) {
        event.preventDefault(); // Prevent form refresh

        // Get input values
        const nameInput = document.getElementById("expense-name");
        const amountInput = document.getElementById("expense-amount");
        const dateInput = document.getElementById("expense-date");

        const name = nameInput.value.trim();
        const amount = parseFloat(amountInput.value);
        const date = dateInput.value;

        // Validate input
        if (name === "" || isNaN(amount) || amount <= 0 || date === "") {
            alert("Please enter valid expense details.");
            return;
        }

        // Create expense object
        const expense = {
            id: Date.now(),
            name,
            amount,
            date
        };

        // Add expense to array
        expenses.push(expense);

        // Update UI
        updateExpenseList();
        updateTotal();

        // Clear input fields
        nameInput.value = "";
        amountInput.value = "";
        dateInput.value = "";
    }

    // Function to update the expense list
    function updateExpenseList() {
        expenseList.innerHTML = ""; // Clear list before updating

        expenses.forEach(expense => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${expense.name} - ₹${expense.amount} (${expense.date})
                <button class="delete-btn" onclick="deleteExpense(${expense.id})">X</button>
            `;
            expenseList.appendChild(li);
        });
    }

    // Function to update total expense
    function updateTotal() {
        const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
        totalExpense.textContent = total;
    }

    // Function to delete an expense
    function deleteExpense(id) {
        expenses = expenses.filter(expense => expense.id !== id);
        updateExpenseList();
        updateTotal();
    }

    // Event listener for form submission
    expenseForm.addEventListener("submit", addExpense);
});
