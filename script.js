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

blogContent.addEventListener('click', handleContentEvents);

function addPost(obj) {
    for (let i = 0; i < postList.length; i++) {
        if (obj.title == postList[i].title || obj.id == postList[i].id) {
            alert('title or id already exists!')
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

function handleContentEvents(e) {
    if (e.target.id == 'remove-btn') {
        const targetId = e.target.closest('li').dataset.id;
        deletePost(targetId);
    } else if (e.target.id == 'edit-btn') {
        console.log(e.target.id)
        const container = e.target.closest('li');
        const bodyContainer = container.querySelector('#body-container');
        const btnContainer = container.querySelector('#btn-container');
        const titleElement = container.querySelector('h1');
        const spanElement = container.querySelector('span');
        const newTitleInput = document.createElement('input');
        const newSpanInput = document.createElement('input');
        newTitleInput.id = 'new-title';
        newSpanInput.id = 'new-span'
        const newYesBtn = createBtnClass();
        const newNoBtn = createBtnClass();
        newYesBtn.id = 'yes-btn';
        newYesBtn.textContent = 'Yes';
        newNoBtn.id = 'no-btn';
        newNoBtn.textContent = 'No'
        newTitleInput.value = titleElement.textContent;
        newSpanInput.value = spanElement.textContent;
        btnContainer.replaceChildren(newNoBtn, newYesBtn);
        bodyContainer.replaceChildren(newTitleInput, newSpanInput);
    } else if (e.target.id == 'no-btn') {
        const container = e.target.closest('li');
        const postContainer = container.querySelector('#body-container');
        const btnContainer = container.querySelector('#btn-container');
        const newEditBtn = createBtnClass();
        const newRmBtn = createBtnClass();
        const title = createTitleClass();
        const span = createSpanClass();
        const prevPost = searchPost(container.dataset.id);
        newEditBtn.textContent = 'Edit';
        newEditBtn.id = 'edit-btn';
        newRmBtn.textContent = 'Remove';
        newRmBtn.id = 'remove-btn';
        title.textContent = prevPost.title;
        span.textContent = prevPost.content;
        postContainer.replaceChildren(title, span);
        btnContainer.replaceChildren(newEditBtn, newRmBtn);
    } else if (e.target.id == 'yes-btn') {
        const container = e.target.closest('li');
        const id = container.dataset.id;
        const titleContent = container.querySelector('#new-title').value;
        const bodyContent = container.querySelector('#new-span').value;
        const postContainer = container.querySelector('#body-container');
        const btnContainer = container.querySelector('#btn-container');
        const newEditBtn = createBtnClass();
        const newRmBtn = createBtnClass();
        const title = createTitleClass();
        const span = createSpanClass();
        console.log(`id ${id} title ${titleContent} body ${bodyContent}`)
        console.log(postList);
        changePostValues(id, titleContent, bodyContent);
        const newPost = searchPost(id);
        newEditBtn.textContent = 'Edit';
        newEditBtn.id = 'edit-btn';
        newRmBtn.textContent = 'Remove';
        newRmBtn.id = 'remove-btn';
        title.textContent = newPost.title;
        span.textContent = newPost.content;
        postContainer.replaceChildren(title, span);
        btnContainer.replaceChildren(newEditBtn, newRmBtn);
    }
}

function searchPost(id) {
    for (let i = 0; i < postList.length; i++) {
        if (id == postList[i].id) {
            return postList[i];
        }
    }
}

function displayContent() {
    blogContent.replaceChildren();
    for (let i = 0; i < postList.length; i++) {
        const blogContainer = document.createElement('li');
        const blogTitle = createTitleClass();
        const blogBody = createSpanClass();
        const blogBtns = document.createElement('div');
        const blog = document.createElement('div');
        const blogEdit = createBtnClass();
        const blogRm = createBtnClass();
        blogBtns.id = 'btn-container';
        blog.id = 'body-container';
        blogRm.id = 'remove-btn'
        blogEdit.id = 'edit-btn'
        blogContainer.dataset.id = postList[i].id;
        blogTitle.textContent = postList[i].title;
        blogContainer.className = 'flex justify-between gap-2';
        blogBody.textContent = postList[i].content;
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

function createTitleClass() {
    const title = document.createElement('h1');
    title.className = 'text-4xl font-bold text-slate-800 tracking-tight break-words';
    return title;
}

function createSpanClass() {
    const span = document.createElement('span');
    span.className = 'text-xs font-medium text-slate-400 break-words';
    return span;

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

function changePostValues(id, title, content) {
    for (let i = 0; i < postList.length; i++) {
        if (id == postList[i].id) {
            postList[i].title = title;
            postList[i].content = content;
        }
    }
}
