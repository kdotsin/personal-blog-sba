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
    console.log(titleError);
    titleError.textContent = titleInput.validationMessage;
    console.log(titleError.textContent)
})

contentInput.addEventListener('input', function(e) {
    validInput(contentInput);
    contentError.textContent = contentInput.validationMessage;
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

function displayContent() {
    blogContent.innerHTML = ''
    for (let i = 0; i < postList.length; i++) {
        const blogContainer = document.createElement('li');
        const blogTitle = document.createElement('h1');
        const blogBody = document.createElement('p');
        const blogBtns = document.createElement('div');
        const blogEdit = createBtnClass();
        const blogRm = createBtnClass();
        blogContainer.dataset.id = postList[i].id;
        blogTitle.textContent = postList[i].title;
        blogTitle.className = 'flex justify-between'
        blogBody.textContent = postList[i].content;
        blogEdit.textContent = 'Edit';
        blogRm.textContent = 'Remove';
        blogContainer.append(blogTitle, blogBody);
        blogContent.append(blogContainer);
        blogBtns.append(blogEdit, blogRm);
        blogTitle.append(blogBtns);
    }
}

function createBtnClass() {
    const button = document.createElement('button');
    button.className = `
    bg-indigo-600 hover:bg-indigo-500 
    text-white font-medium px-5 py-2.5
    rounded-lg shadow-md hover:shadow-indigo-500/25 
    active:scale-95 transition-all duration-200 focus:outline-none
    focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 w-25
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
