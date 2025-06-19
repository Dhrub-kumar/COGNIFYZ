

function changeBackgroundColor() {

    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD', '#E74C3C', '#3498DB', '#2ECC71'];
    
    
    const randomIndex = Math.floor(Math.random() * colors.length);
    

    document.body.style.backgroundColor = colors[randomIndex];
}


document.getElementById('colorButton').addEventListener('click', changeBackgroundColor);
