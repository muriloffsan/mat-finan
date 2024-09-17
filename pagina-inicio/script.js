document.addEventListener('DOMContentLoaded', function() {
    const entradas = document.getElementById('entradas');
    const saidas = document.getElementById('saidas');
    const total = document.getElementById('total');
    const transactionsTable = document.getElementById('transactions-table');
    const addEntradaButton = document.getElementById('add-entrada');
    const addSaidaButton = document.getElementById('add-saida');

    const modal = document.getElementById('transactionModal');
    const closeModal = document.querySelector('.close');
    const saveTransactionButton = document.getElementById('saveTransaction');
    let transactionType = '';

    let transactions = [];

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
                
                // SweetAlert confirmation before deleting
                Swal.fire({
                    title: 'Você tem certeza?',
                    text: "Essa ação não poderá ser desfeita!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Sim, apagar!',
                    cancelButtonText: 'Cancelar'
                }).then((result) => {
                    if (result.isConfirmed) {
                        transactions = transactions.filter(transaction => transaction.id !== transactionId);
                        updateBalance();
                        renderTransactions();
                        Swal.fire(
                            'Apagado!',
                            'A transação foi apagada.',
                            'success'
                        );
                    }
                });
            });
        });
    }

    function addTransaction() {
        const description = document.getElementById('description').value;
        const value = parseFloat(document.getElementById('value').value);
        const date = document.getElementById('date').value;

        if (description && !isNaN(value) && date) {
            // Verificar se o valor é negativo em uma entrada
            if (transactionType === 'entrada' && value < 0) {
                Swal.fire({
                    icon: 'error',
                    title: 'Valor inválido',
                    text: 'O valor de uma entrada não pode ser negativo.'
                });
                return; // Impedir o salvamento da transação
            }

            const newTransaction = {
                id: transactions.length > 0 ? transactions[transactions.length - 1].id + 1 : 1,
                description: description,
                value: transactionType === 'entrada' ? value : -value,
                date: date,
                type: transactionType
            };

            transactions.push(newTransaction);
            updateBalance();
            renderTransactions();

            modal.style.display = 'none';
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Erro',
                text: 'Por favor, preencha todos os campos corretamente.'
            });
        }
    }

    addEntradaButton.addEventListener('click', () => {
        transactionType = 'entrada';
        modal.style.display = 'block';
    });

    addSaidaButton.addEventListener('click', () => {
        transactionType = 'saida';
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    saveTransactionButton.addEventListener('click', addTransaction);

    updateBalance();
    renderTransactions();
});
