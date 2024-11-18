const ctx = document.getElementById('trafficChart').getContext('2d');

const trafficChart = new Chart(ctx, {
    type: 'line',  
    data: {
        labels: ['00:00', '01:00', '02:00', '03:00', '04:00'],  
        datasets: [{
            label: 'Traffic (requests)',
            data: [50, 75, 60, 90, 100],  
            borderColor: 'rgba(75, 192, 192, 1)',  
            fill: false  
        }]
    },
    options: {
        responsive: true,
        scales: {
            x: {
                beginAtZero: true
            },
            y: {
                beginAtZero: true
            }
        }
    }
});
