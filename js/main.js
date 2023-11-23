/*  Name: Nicole-Rene Newcomb
    Course: INF651
    Date: 11/21/2023
    Description: Final Project
*/

function createElemWithText(elementName = "p", 
    textContent = "", className) {
       const htmlElement = document.createElement(elementName);
       const newText = document.createTextNode(textContent);
       htmlElement.appendChild(newText);

       if (className) {
        htmlElement.classList.add(className);
       }

       return htmlElement;
    };

function createSelectOptions(usersJSON) {
    if (!usersJSON || typeof(usersJSON) === undefined) {
        return undefined;
    }

    // const selectOptions = document.getElementById("selectMenu");
    const userArray = [];

    usersJSON.forEach(element => {
        const userOption = createElemWithText("option", element.name);
        userOption.value = element.id;
        userArray.push(userOption);
    });

    return userArray;
};

function toggleCommentSection(postID) {
    if (!postID || typeof(postID) === undefined) {
        return undefined;
    }

    const sectionElement = document.querySelector(`section[data-post-id="${postID}"]`);

    if (!sectionElement || typeof(sectionElement) === undefined) {
        return null;
    }

    sectionElement.classList.toggle("hide");
    return sectionElement;
};

function toggleCommentButton(postID) {
    if (!postID || typeof(postID) === undefined) {
        return undefined;
    }

    const buttonElement = document.querySelector(`button[data-post-id="${postID}"]`);
    
    if (!buttonElement || typeof(buttonElement) == undefined) {
        return null;
    }

    buttonElement.textContent === "Show Comments"
    ? buttonElement.textContent = "Hide Comments"
    : buttonElement.textContent = "Show Comments";

    return buttonElement;
};

function deleteChildElements(parentElement) {
    if (!parentElement?.tagName) {
        return undefined;
    }
    
    var child = parentElement.lastElementChild;

    while (child) {
        parentElement.removeChild(child);
        child = parentElement.lastElementChild;
    }

    return parentElement;
};

function addButtonListeners() {
    const buttons = document.querySelectorAll("main button");
    
    if (buttons) {
        buttons.forEach(button => {
            const postID = button.dataset.postId;

            if (postID) {
                button.addEventListener("click", function (e) {
                    toggleComments(e, postID)});
            }
        })
    }

    return buttons;
};

function removeButtonListeners() {
    const buttons = document.querySelectorAll("main button");

    if (buttons) {
        buttons.forEach(button => {
            const postID = button.dataset.postId;

            if (postID) {
                button.removeEventListener("click", function (e) {
                    toggleComments(e, postID)});
            }
        })
    }

    return buttons;
};

function createComments(commentsJSON) {
    if (!commentsJSON) {
        return undefined;
    }

    const fragment = document.createDocumentFragment();

    commentsJSON.forEach(comment => {
        const article = document.createElement("article");
        const h3 = createElemWithText('h3', comment.name);
        const p1 = createElemWithText('p', comment.body);
        const p2 = createElemWithText('p', `From: ${comment.email}`);
        article.appendChild(h3);
        article.appendChild(p1);
        article.appendChild(p2);
        fragment.appendChild(article);
    })

    return fragment;
};

function populateSelectMenu(usersJSON) {
    if (!usersJSON) {
        return undefined;
    }

    const selectMenu = document.getElementById("selectMenu");
    const usersArray = createSelectOptions(usersJSON);

    usersArray.forEach(user => {
        selectMenu.append(user);
    })

    return selectMenu;
};

async function getUsers() {
    try {
        const users = await fetch("https://jsonplaceholder.typicode.com/users");    
        
        if (!users.ok) {
            throw new Error("API fetch failed.")
        }
        else {
            return users.json();
        }
    }   
    catch (err) {
        console.error(err);
    }
};

async function getUserPosts(userID) {
    if (!userID) {
        return undefined;
    }

    try {
        const userPosts = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}/posts`);    
        
        if (!userPosts.ok) {
            throw new Error("API fetch failed.")
        }
        else {
            return userPosts.json();
        }
    }   
    catch (err) {
        console.error(err);
    }
};

async function getUser(userID) {
    if (!userID) {
        return undefined;
    }

    try {
        const user = await fetch(`https://jsonplaceholder.typicode.com/users/${userID}`);    
        
        if (!user.ok) {
            throw new Error("API fetch failed.")
        }
        else {
            return user.json();
        }
    }   
    catch (err) {
        console.error(err);
    }
};

async function getPostComments(postID) {
    if (!postID) {
        return undefined;
    }

    try {
        const postComments = await fetch(`https://jsonplaceholder.typicode.com/posts/${postID}/comments`);    
        
        if (!postComments.ok) {
            throw new Error("API fetch failed.")
        }
        else {
            return postComments.json();
        }
    }   
    catch (err) {
        console.error(err);
    }
};

async function displayComments(postID) {
    if (!postID) {
        return undefined;
    }

    const section = document.createElement("section");
    section.dataset.postId = postID;
    section.classList.add("comments");
    section.classList.add("hide");

    const comments = await getPostComments(postID);
    const fragment = createComments(comments);
    section.appendChild(fragment);
    
    return section;
};

async function createPosts(postsJSON) {
    if (!postsJSON) {
        return undefined;
    }

    const fragment = document.createDocumentFragment();

    for (const post of postsJSON) {
        const article = document.createElement("article");
        const h2 = createElemWithText('h2', post.title);
        const p1 = createElemWithText('p', post.body);
        const p2 = createElemWithText('p', `Post ID: ${post.id}`);
        
        const author = await getUser(post.userId);
        const p3 = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);
        const p4 = createElemWithText('p', `${author.company.catchPhrase}`);
        const button = createElemWithText('button', 'Show Comments');
        
        button.dataset.postId = post.id;
        article.appendChild(h2);
        article.appendChild(p1);
        article.appendChild(p2);
        article.appendChild(p3);
        article.appendChild(p4);
        article.appendChild(button);
        
        const section1 = await displayComments(post.id);
        article.appendChild(section1);
        fragment.appendChild(article);
    }

    return fragment;
};

async function displayPosts(posts) {
    const main = document.querySelector("main");

    const element = posts 
    ? await createPosts(posts)
    : createElemWithText("p", "Select an Employee to display their posts.", "default-text");

    main.append(element);

    return element;
};

function toggleComments(e, postID) {
    if (!e || !postID) {
        return undefined;
    }

    e.target.listener=true;
    const section = toggleCommentSection(postID);
    const button = toggleCommentButton(postID);

    return [section, button];
};

async function refreshPosts(postsJSON) {
    if (!postsJSON) {
        return undefined;
    }

    const removeButtons = removeButtonListeners();
    const main = document.querySelector("main");
    deleteChildElements(main);

    const fragment = await displayPosts(postsJSON);
    const addButtons = addButtonListeners();

    return [removeButtons, main, fragment, addButtons];
};

async function selectMenuChangeEventHandler(e) {
    
    if (!e) {
        return undefined;
    }

    const selectMenu = document.getElementById("selectMenu");
    selectMenu.disabled = true;

    const userId = e?.target?.value || 1;
    const posts = await getUserPosts(userId);
    const refreshPostsArray = await refreshPosts(posts);
    selectMenu.disabled = false;

    return [userId, posts, refreshPostsArray];
};

async function initPage() {
    const users = await getUsers();
    const select = populateSelectMenu(users);
    
    return [users, select];
};

async function initApp() {
    await initPage();

    const selectMenu = document.getElementById("selectMenu");
    selectMenu.addEventListener("change", selectMenuChangeEventHandler);
};

document.addEventListener("DOMContentLoaded", initApp);