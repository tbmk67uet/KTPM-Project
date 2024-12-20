async function fetchServerStats() {
    try {
        const response = await fetch('/api/server-stats');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        document.getElementById('cpuUsage').textContent = `CPU Usage: ${data.cpu || 'N/A'}%`;
        document.getElementById('memoryUsage').textContent = `Memory: ${
            data.memory?.used || 'N/A'
        } MB / ${data.memory?.total || 'N/A'} MB`;

        
        document.getElementById('networkBandwidthSent').textContent = `Upload Bandwidth: ${
            Math.abs(data.bandwidth?.sent) || 'N/A'
        } KB/s`;
        document.getElementById('networkBandwidthReceived').textContent = `Download Bandwidth: ${
            Math.abs(data.bandwidth?.received) || 'N/A'
        } KB/s`;
    } catch (error) {
        console.error('Error fetching server stats:', error);
        document.getElementById('statsContainer').textContent = 'Error loading server stats';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchServerStats();
    setInterval(fetchServerStats, 1500);
});