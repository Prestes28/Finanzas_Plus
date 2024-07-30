let balance = 0;
const balanceElement = document.getElementById('balance');
const transactionsList = document.getElementById('transactions');

function addTransaction() {
    const type = document.getElementById('type').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value.trim();

    if (isNaN(amount) || amount <= 0) {
        alert('Por favor ingresa un monto válido.');
        return;
    }

    if (!description) {
        alert('Por favor ingresa una descripción.');
        return;
    }

    const transaction = document.createElement('li');
    transaction.classList.add(type);
    transaction.innerHTML = `
        <div class="transaction-details">
            <strong>${type === 'income' ? 'Ingreso' : 'Gasto'}: $${amount.toFixed(2)}</strong>
            <br>${description}
        </div>
        <div class="transaction-actions">
            <button onclick="removeTransaction(this, ${amount}, '${type}')">Eliminar</button>
        </div>
    `;
    transactionsList.appendChild(transaction);

    updateBalance(type, amount);
    document.getElementById('amount').value = '';
    document.getElementById('description').value = '';
}

function updateBalance(type, amount) {
    if (type === 'income') {
        balance += amount;
    } else {
        balance -= amount;
    }
    balanceElement.textContent = balance.toFixed(2);
}

function removeTransaction(element, amount, type) {
    element.parentElement.parentElement.remove();
    if (type === 'income') {
        balance -= amount;
    } else {
        balance += amount;
    }
    balanceElement.textContent = balance.toFixed(2);
}

function showDetails() {
    // Abrir una nueva ventana o pestaña con los detalles de las transacciones y el balance
    const detailsWindow = window.open('', '_blank');
    detailsWindow.document.write('<html><head><title>Detalles de Finanzas Personales</title></head><body>');
    detailsWindow.document.write('<h1>Detalles de Finanzas Personales</h1>');
    detailsWindow.document.write(`<h2>Balance: $${balance.toFixed(2)}</h2>`);
    detailsWindow.document.write('<ul>');
    
    const items = transactionsList.querySelectorAll('li');
    items.forEach((item, index) => {
        const text = item.querySelector('.transaction-details').innerHTML;
        detailsWindow.document.write(`<li>${index + 1}. ${text}</li>`);
    });

    detailsWindow.document.write('</ul>');
    detailsWindow.document.write('</body></html>');
    detailsWindow.document.close();
}

function deleteAll() {
    location.reload();
}