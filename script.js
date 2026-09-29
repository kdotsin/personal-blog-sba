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

titleInput.addEventListener('input', function(e) {
    validInput(titleInput);
    titleError.textContent = titleInput.validationMessage;
})

contentInput.addEventListener('input', function(e) {
    validInput(contentInput);
    contentError.textContent = contentInput.validationMessage;
})

blogForm.addEventListener('submit', handleSubmitBtn);

blogContent.addEventListener('click', handleRemoveBtn);

function addPost(obj) {
    for (let i = 0; i < postList.length; i++) {
        if (obj.name == postList[i].name || obj.id == postList[i].id) {
            return;
        }
    }
    postList.push(obj);
}

function handleSubmitBtn(e) {
    e.preventDefault();
    validInput(titleInput);
    validInput(contentInput);

    if (!blogForm.checkValidity()) {
        blogForm.reportValidity();
        alert('Post invalid');
        return;
    }

    let postObj = {
        id: postId++,
        title: titleInput.value,
        content: contentInput.value,
    }
    addPost(postObj);
    displayContent()
    titleInput.value = '';
    contentInput.value = '';
}

function handleRemoveBtn(e) {
    if (e.target.tagName == 'BUTTON') {
        const targetId = e.target.closest('li').dataset.id;
        deletePost(targetId);
    }
}

function displayContent() {
    blogContent.innerHTML = ''
    for (let i = 0; i < postList.length; i++) {
        const blogContainer = document.createElement('li');
        const blogTitle = document.createElement('h1');
        const blogBody = document.createElement('span');
        const blogBtns = document.createElement('div');
        const blog = document.createElement('div');
        const blogEdit = createBtnClass();
        const blogRm = createBtnClass();
        blogContainer.dataset.id = postList[i].id;
        blogTitle.textContent = postList[i].title;
        blogContainer.className = 'flex justify-between gap-2';
        blogTitle.className = 'text-4xl font-bold text-slate-800 tracking-tight break-words';
        blogBody.className = 'text-xs font-medium text-slate-400'
        blogBody.textContent = postList[i].content;
        blogBody.className = 'break-words'
        blogEdit.textContent = 'Edit';
        blogRm.textContent = 'Remove';
        blogBtns.className = 'flex items-center gap-2'
        blog.append(blogTitle, blogBody);
        blogBtns.append(blogEdit, blogRm);
        blogContainer.append(blog, blogBtns);
        blogContent.append(blogContainer);
    }
}

function createBtnClass() {
    const button = document.createElement('button');
    button.className = `
    text-center bg-indigo-600 hover:bg-indigo-500 
    text-white font-sm px-5 py-2.5
    rounded-lg shadow-md hover:shadow-indigo-500/25 
    active:scale-95 transition-all duration-200 focus:outline-none
    focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
    `
    return button;
}

function validInput(input) {
    input.setCustomValidity('');
    const label = input.labels[0];
    if (input.validity.typeMismatch) {
        input.setCustomValidity(`Please enter valid ${label.textContent}`);
    } else if (input.validity.valueMissing) {
        input.setCustomValidity(`Please enter the ${label.textContent}`);
    } else if (input.validity.tooShort) {
        input.setCustomValidity(`Input too short. Must be at least ${input.minLength} characters`)
    }
}

function deletePost(id) {
    let newList = [];
    for (let i = 0; i < postList.length; i++) {
        if (id == postList[i].id) {
            continue;
        }
        newList.push(postList[i]);
    }
    postList = newList;
    displayContent();
}
