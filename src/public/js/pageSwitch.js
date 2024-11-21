document.getElementById('overview').addEventListener('click', () => {
    window.location.href = 'http://localhost:3000'; 
});

document.getElementById('containers').addEventListener('click', () => {
    window.location.href = 'http://localhost:3000/forex'; 
});

document.getElementById('apis').addEventListener('click', () => {
    window.location.href = 'http://localhost:3000/goldprice'; 
});

document.getElementById('resources').addEventListener('click', () => {
    window.location.href = 'http://localhost:3000/resources'; 
});

document.getElementById('refresh').addEventListener('click', () => {
    location.reload(); 
});