async function fetchEndpoint1() {
    try {
        const response = await fetch('/endpointstatus1');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const statusElement = document.getElementById('status-endpoint1');

        if (data === 200) {
            statusElement.textContent = '🟢Up';
            statusElement.classList.remove('down');
            statusElement.classList.add('up');
        } else {
            document.getElementById('status-endpoint1').textContent = '🔴Down';
            statusElement.classList.remove('up');
            statusElement.classList.add('down');
        }
        
    } catch (error) {
        console.error('Error fetching server stats:', error);
        const statusElement = document.getElementById('status-endpoint1');
        statusElement.textContent = '🔴Down';
        statusElement.classList.remove('up');
        statusElement.classList.add('down');
    }
}

async function fetchEndpoint2() {
    try {
        const response = await fetch('/endpointstatus2');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const statusElement = document.getElementById('status-endpoint2');

        if (data === 200) {
            statusElement.textContent = '🟢Up';
            statusElement.classList.remove('down');
            statusElement.classList.add('up');
        } else {
            document.getElementById('status-endpoint2').textContent = '🔴Down';
            statusElement.classList.remove('up');
            statusElement.classList.add('down');
        }
        
    } catch (error) {
        console.error('Error fetching server stats:', error);
        const statusElement = document.getElementById('status-endpoint2');
        statusElement.textContent = '🔴Down';
        statusElement.classList.remove('up');
        statusElement.classList.add('down');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchEndpoint1();
    fetchEndpoint2();

    
    setInterval(fetchEndpoint1, 200);
    setInterval(fetchEndpoint2, 200);
});