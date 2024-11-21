document.addEventListener('DOMContentLoaded', async () => {
    const tableBody = document.querySelector('#data-table tbody');

    try {
        const response = await fetch('/api/data');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        

        
        tableBody.innerHTML = data[0].DataList.Data.map(item => {
    		let row = '';
    		
    		for (let key in item) {
        	
        		if (/^@\w+_/.test(key)) {
            		row += `<td>${item[key] || 'N/A'}</td>`;
        		}
    }
    return `<tr>${row}</tr>`;
}).join('');
    } catch (error) {
        console.error('Error fetching data from server:', error);
        tableBody.innerHTML = '<tr><td colspan="6">Error loading data</td></tr>';
    }

});
