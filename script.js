const titleInput = document.querySelector('#post-title');
const contentInput = document.querySelector('#post-content');
const blogForm = document.querySelector('#blog-form');
const blogContent = document.getElementById('blog-content')
const titleError = document.getElementById('title-error');
const contentError = document.getElementById('content-error');
const savedData = localStorage.getItem('blogPosts');
let postList = savedData ? JSON.parse(savedData) : [];
let postId = savedData ? JSON.parse(savedData).id : 0;

window.addEventListener('load', function(e) {
    console.log('logic for displaying previous posts')
})

blogForm.addEventListener('submit', handleSubmitBtn);

function addPost(obj) {
    for (let i = 0; i < postList.length; i++) {
        if (obj.id == postList.length) {
            return;
        }
    }
    postList.push(obj);
}

function handleSubmitBtn(e) {
    e.preventDefault();
    let postObj = {
        id: postId++,
        title: titleInput.value,
        content: contentInput.value,
    }
    addPost(postObj);
    displayContent()
}

function displayContent() {
    blogContent.innerHTML = ''
    for (let i = 0; i < postList.length; i++) {
        const blogContainer = document.createElement('li');
        const blogTitle = document.createElement('h1');
        const blogBody = document.createElement('p');
        const blogEdit = document.createElement('button'); //for edit
        const blogRm = document.createElement('button') //for remove
        blogContainer.dataset.id = postList[i].id;
        blogTitle.textContent = postList[i].title;
        blogBody.textContent = postList[i].content;
        blogContainer.append(blogTitle, blogBody, blogEdit);
        blogContent.append(blogContainer);
    }
}
