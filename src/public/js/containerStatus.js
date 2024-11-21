async function fetchContainer1() {
    try {
        const response = await fetch('/containerstatus1');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const statusElement = document.getElementById('status-container1');

        if (data === 'running') {
            statusElement.textContent = 'Up';
            statusElement.classList.remove('down');
            statusElement.classList.add('up');
        } else {
            document.getElementById('status-container1').textContent = 'Down';
            statusElement.classList.remove('up');
            statusElement.classList.add('down');
        }
        
    } catch (error) {
        console.error('Error fetching server stats:', error);
        const statusElement = document.getElementById('status-container1');
        statusElement.textContent = 'Down';
        statusElement.classList.remove('up');
        statusElement.classList.add('down');
    }
}

async function fetchContainer2() {
    try {
        const response = await fetch('/containerstatus2');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const statusElement = document.getElementById('status-container2');

        if (data === 'running') {
            statusElement.textContent = 'Up';
            statusElement.classList.remove('down');
            statusElement.classList.add('up');
        } else {
            document.getElementById('status-container2').textContent = 'Down';
            statusElement.classList.remove('up');
            statusElement.classList.add('down');
        }
        
    } catch (error) {
        console.error('Error fetching server stats:', error);
        const statusElement = document.getElementById('status-container2');
        statusElement.textContent = 'Down';
        statusElement.classList.remove('up');
        statusElement.classList.add('down');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchContainer1();
    fetchContainer2();

    
    setInterval(fetchContainer1, 200);
    setInterval(fetchContainer2, 200);
});