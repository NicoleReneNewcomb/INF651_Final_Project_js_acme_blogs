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

    const sectionElement = document.querySelector(`[data-post-id="${postID}"]`);

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
                button.addEventListener("click", (event) => {
                    toggleComments(event, postID);
                });
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
                button.removeEventListener("click", (event) => {
                    toggleComments(event, postID);
                });
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



// async function jsonData() {
//     const data = await fetch("https://jsonplaceholder.typicode.com/users");
//     const json = await data.json();
//     return json;
// }

// async function order() {
//     const sampleUserJSON = await jsonData();
//     await createSelectOptions(sampleUserJSON);
// }

// order();
