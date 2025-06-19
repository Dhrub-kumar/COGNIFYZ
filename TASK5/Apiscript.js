
//TASK4 - Functionality of colors changing 
function changeBackgroundColor() {

    const colors = ['#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#8E44AD', '#E74C3C', '#3498DB', '#2ECC71'];
    
    
    const randomIndex = Math.floor(Math.random() * colors.length);
    

    document.body.style.backgroundColor = colors[randomIndex];
}


document.getElementById('colorButton').addEventListener('click', changeBackgroundColor);


// API Configuration TASK5
const API_BASE = 'https://jsonplaceholder.typicode.com';
let currentPostPage = 1;

// Fetch and display posts TASK5
async function fetchPosts() {
    const postsContainer = document.getElementById('posts-container');
    const loadingElement = document.getElementById('posts-loading');
    
    try {
        loadingElement.textContent = 'Loading posts...';
        const response = await fetch(`${API_BASE}/posts?_page=${currentPostPage}&_limit=6`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        
        const posts = await response.json();
        loadingElement.style.display = 'none';
        
        if (posts.length === 0) {
            postsContainer.innerHTML += '<p class="error-message">No more posts available</p>';
            document.getElementById('loadMorePosts').style.display = 'none';
            return;
        }
        
        posts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'post-card';
            postElement.innerHTML = `
                <h3 class="post-title">${post.title}</h3>
                <p class="post-body">${post.body}</p>
                <p class="post-id">Post ID: ${post.id}</p>
            `;
            postsContainer.appendChild(postElement);
        });
        
        currentPostPage++;
    } catch (error) {
        loadingElement.textContent = `Error: ${error.message}`;
        loadingElement.className = 'error-message';
    }
}


// Event Listeners
document.getElementById('loadMorePosts').addEventListener('click', fetchPosts);


// Initial Load
document.addEventListener('DOMContentLoaded', () => {
    fetchPosts();
    
});
