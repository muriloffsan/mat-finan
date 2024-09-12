document.addEventListener('DOMContentLoaded', function() {
    const entradas = document.getElementById('entradas');
    const saidas = document.getElementById('saidas');
    const total = document.getElementById('total');
    const transactionsTable = document.getElementById('transactions-table');
    const addEntradaButton = document.getElementById('add-entrada');
    const addSaidaButton = document.getElementById('add-saida');

    let transactions = [
    ];

    function updateBalance() {
        let totalEntradas = 0;
        let totalSaidas = 0;

        transactions.forEach(transaction => {
            if (transaction.type === 'entrada') {
                totalEntradas += transaction.value;
            } else if (transaction.type === 'saida') {
                totalSaidas += transaction.value;
            }
        });

        entradas.textContent = `R$ ${totalEntradas.toFixed(2)}`;
        saidas.textContent = `-R$ ${Math.abs(totalSaidas).toFixed(2)}`;
        const totalValue = totalEntradas + totalSaidas;
        total.textContent = totalValue >= 0 ? `R$ ${totalValue.toFixed(2)}` : `-R$ ${Math.abs(totalValue).toFixed(2)}`;

        const totalCard = total.parentElement;
        if (totalValue < 0) {
            totalCard.classList.add('total-negativo');
            totalCard.classList.remove('total-positivo');
        } else {
            totalCard.classList.add('total-positivo');
            totalCard.classList.remove('total-negativo');
        }
    }

    function renderTransactions() {
        transactionsTable.innerHTML = '';

        transactions.forEach(transaction => {
            const row = transactionsTable.insertRow();
            const descriptionCell = row.insertCell();
            const valueCell = row.insertCell();
            const dateCell = row.insertCell();
            const actionCell = row.insertCell();

            descriptionCell.textContent = transaction.description;
            valueCell.textContent = transaction.value > 0 ? `R$ ${transaction.value.toFixed(2)}` : `-R$ ${Math.abs(transaction.value).toFixed(2)}`;
            dateCell.textContent = transaction.date;
            actionCell.innerHTML = `<button class="delete-transaction" data-id="${transaction.id}">-</button>`;
        });

        addEventListenersToTransactions();
    }

    function addEventListenersToTransactions() {
        const deleteButtons = document.querySelectorAll('.delete-transaction');

        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const transactionId = parseInt(button.dataset.id);
                transactions = transactions.filter(transaction => transaction.id !== transactionId);
                updateBalance();
                renderTransactions();
            });
        });
    }

    function addTransaction(type) {
        const description = prompt("Digite a descrição da transação:");
        const value = parseFloat(prompt("Digite o valor da transação:"));
        const date = prompt("Digite a data da transação (DD/MM/AAAA):");

        if (description && !isNaN(value) && date) {
            const newTransaction = {
                id: transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1,
                description: description,
                value: type === 'entrada' ? value : -value,
                date: date,
                type: type
            };

            transactions.push(newTransaction);
            updateBalance();
            renderTransactions();
        } else {
            alert("Por favor, preencha todos os campos corretamente.");
        }
    }

    addEntradaButton.addEventListener('click', () => addTransaction('entrada'));
    addSaidaButton.addEventListener('click', () => addTransaction('saida'));

    updateBalance();
    renderTransactions();
});
