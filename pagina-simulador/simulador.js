document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('simuladorForm');
    const ctx = document.getElementById('grafico').getContext('2d');
  
    form.addEventListener('submit', function(event) {
      event.preventDefault();
      
      const valorInicial = parseFloat(document.getElementById('valorInicial').value);
      const taxaJuros = parseFloat(document.getElementById('taxaJuros').value) / 100;
      const dataInicio = new Date(document.getElementById('dataInicio').value);
      const meses = parseInt(document.getElementById('anos').value, 10);
  
      const labels = [];
      const valores = [];
      
      let valorAtual = valorInicial;
  
      for (let i = 0; i <= meses; i++) {
        labels.push(new Date(dataInicio.getFullYear(), dataInicio.getMonth() + i, dataInicio.getDate()).toLocaleDateString());
        valores.push(valorAtual);
        valorAtual *= (1 + taxaJuros / 12); // Juros mensais
      }
  
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Valor Acumulado',
            data: valores,
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Data'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Valor (R$)'
              },
              beginAtZero: true
            }
          }
        }
      });
    });
  });
  