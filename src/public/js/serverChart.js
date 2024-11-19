async function fetchServerStats() {
    try {
      const response = await fetch('/api/server-stats');
      return await response.json();
    } catch (error) {
      console.error('Error fetching server stats:', error);
      return null;
    }
  }

  //CPU
  const cpuChartCtx = document.getElementById('cpuChart').getContext('2d');
  const cpuChart = new Chart(cpuChartCtx, {
    type: 'line',
    data: {
      labels: [], 
      datasets: [{
        label: 'CPU Load (%)',
        data: [],
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'Time' } },
        y: { title: { display: true, text: 'CPU Load (%)' } }
      }
    }
  });

  //Memory
  const memoryChartCtx = document.getElementById('memoryChart').getContext('2d');
  const memoryChart = new Chart(memoryChartCtx, {
    type: 'bar',
    data: {
      labels: ['Total Memory', 'Used Memory'],
      datasets: [{
        label: 'Memory (MB)',
        data: [],
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)']
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { title: { display: true, text: 'Memory (MB)' } }
      }
    }
  });

  //Bandwidth
  const bandwidthChartCtx = document.getElementById('bandwidthChart').getContext('2d');
  const bandwidthChart = new Chart(bandwidthChartCtx, {
    type: 'line',
    data: {
      labels: [], 
      datasets: [{
        label: 'Sent (KB/s)',
        data: [],
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        tension: 0.1
      },
      {
        label: 'Received (KB/s)',
        data: [],
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        tension: 0.1
      }]
    },
    options: {
      responsive: true,
      scales: {
        x: { title: { display: true, text: 'Time' } },
        y: { title: { display: true, text: 'Bandwidth (KB/s)' } }
      }
    }
  });

  
  async function updateCharts() {
    const stats = await fetchServerStats();
    if (!stats) return;

    const now = new Date().toLocaleTimeString();

    
    cpuChart.data.labels.push(now);
    cpuChart.data.datasets[0].data.push(stats.cpu);
    if (cpuChart.data.labels.length > 10) {
      cpuChart.data.labels.shift();
      cpuChart.data.datasets[0].data.shift();
    }
    cpuChart.update();

    //Memory
    memoryChart.data.datasets[0].data = [stats.memory.total, stats.memory.used];
    memoryChart.update();

    //Bandwidth
    bandwidthChart.data.labels.push(now);
    bandwidthChart.data.datasets[0].data.push(stats.bandwidth.sent);
    bandwidthChart.data.datasets[1].data.push(stats.bandwidth.received);
    if (bandwidthChart.data.labels.length > 10) {
      bandwidthChart.data.labels.shift();
      bandwidthChart.data.datasets[0].data.shift();
      bandwidthChart.data.datasets[1].data.shift();
    }
    bandwidthChart.update();
  }

  
  setInterval(updateCharts, 5000);
  updateCharts();