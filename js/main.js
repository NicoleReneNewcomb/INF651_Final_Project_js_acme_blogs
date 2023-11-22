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
