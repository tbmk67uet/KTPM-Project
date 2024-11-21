const usdVndElement = document.getElementById('usd-vnd');
const ctx = document.getElementById('rateChart').getContext('2d');
let chart;

const fetchExchangeRate = async () => {
  try {
    const response = await fetch('/forexs');
    const data = await response.json();
    const usdToVnd = data.USD_VND;
    usdVndElement.textContent = usdToVnd.toFixed(2);
    updateChart(usdToVnd);
  } catch (error) {
    console.error('Error fetching exchange rate:', error);
  }
};

const updateChart = (usdToVnd) => {
  const currentTime = new Date().toLocaleTimeString();

  if (!chart) {
    chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [currentTime],
        datasets: [{
          label: 'USD to VND',
          data: [usdToVnd],
          borderColor: 'rgba(75, 192, 192, 1)',
          fill: false,
          tension: 0.1
        }]
      },
      options: {
        scales: {
          x: {
            type: 'category',
            title: {
              display: true,
              text: 'Time'
            }
          },
          y: {
            beginAtZero: false,
            title: {
              display: true,
              text: 'Exchange Rate (VND)'
            },
            min: 23000,  
            max: 27000,  
          }
        }
      }
    });
  } else {
    chart.data.labels.push(currentTime);
    chart.data.datasets[0].data.push(usdToVnd);

    if (chart.data.labels.length > 20) {
      chart.data.labels.shift();
      chart.data.datasets[0].data.shift();
    }

    chart.update();
  }
};

setInterval(fetchExchangeRate, 6000);

fetchExchangeRate();
