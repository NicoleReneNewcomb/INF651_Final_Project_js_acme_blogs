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

addButtonListeners();
