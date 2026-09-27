const titleInput = document.querySelector('#post-title');
const contentInput = document.querySelector('#post-content');
const blogForm = document.getElementById('blog-form');
const titleError = document.getElementById('title-error');
const contentError = document.getElementById('content-error');
const savedData = localStorage.getItem('blogPosts');
let postList = savedData ? JSON.parse(savedData) : [];
