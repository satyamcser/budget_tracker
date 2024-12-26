// DOM Elements
const descriptionInput = document.getElementById("descriptionInput");
const amountInput = document.getElementById("amountInput");
const typeSelect = document.getElementById("typeSelect");
const addTransactionButton = document.getElementById("addTransactionButton");
const totalIncomeElement = document.getElementById("totalIncome");
const totalExpenseElement = document.getElementById("totalExpense");
const balanceElement = document.getElementById("balance");
const transactionList = document.getElementById("transactionList");

// Track totals
let totalIncome = 0;
let totalExpense = 0;

// Function to update summary
function updateSummary() {
    totalIncomeElement.textContent = totalIncome.toFixed(2);
    totalExpenseElement.textContent = totalExpense.toFixed(2);
    balanceElement.textContent = (totalIncome - totalExpense).toFixed(2);
}

// Function to add a new transaction
function addTransaction() {
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const type = typeSelect.value;

    if (description === "" || isNaN(amount) || amount <= 0) {
        alert("Please enter a valid description and amount!");
        return;
    }

    // Update totals
    if (type === "income") {
        totalIncome += amount;
    } else if (type === "expense") {
        totalExpense += amount;
    }

    // Create transaction element
    const transactionItem = document.createElement("div");
    transactionItem.classList.add("transaction-item", type);
    transactionItem.innerHTML = `
        <span>${description}: $${amount.toFixed(2)}</span>
        <button class="btn btn-danger btn-sm btn-delete">Delete</button>
    `;

    // Add event listener for delete button
    const deleteButton = transactionItem.querySelector(".btn-delete");
    deleteButton.addEventListener("click", () => {
        // Update totals
        if (type === "income") {
            totalIncome -= amount;
        } else if (type === "expense") {
            totalExpense -= amount;
        }

        // Remove transaction and update summary
        transactionList.removeChild(transactionItem);
        updateSummary();
    });

    // Add transaction to the list
    transactionList.appendChild(transactionItem);

    // Update summary
    updateSummary();

    // Clear input fields
    descriptionInput.value = "";
    amountInput.value = "";
}

// Event listener for Add Transaction button
addTransactionButton.addEventListener("click", addTransaction);

// Add transaction on pressing Enter key
amountInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        addTransaction();
    }
});