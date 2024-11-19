async function fetchTrafficStats() {
    try {
      const response = await fetch('/api/traffic-stats');
      return await response.json();
    } catch (error) {
      console.error('Error fetching traffic stats:', error);
      return null;
    }
  }

  async function updateChart(chart) {
    const stats = await fetchTrafficStats();
    if (!stats) return;

    
    chart.data.labels = Object.keys(stats.pages);
    chart.data.datasets[0].data = Object.values(stats.pages);
    chart.update();
  }

  
  const ctx = document.getElementById('trafficChart').getContext('2d');
  const trafficChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: [], 
      datasets: [{
        label: 'Traffic Count',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'Page' } },
        y: { title: { display: true, text: 'Visits' } }
      }
    }
  });

  
  setInterval(() => updateChart(trafficChart), 5000);
  updateChart(trafficChart);