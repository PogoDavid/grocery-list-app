//Define an array of grocery items
const groceryItems = [
    "Apples",
    "Milk",
    "Bread",
    "Eggs"
];

//function to display grocery items
const displayItems = array =>  {
    const groceryList = document.getElementById("grocery-list");
    //select the ul tag by its ID

    //clear any existing items in the list
    groceryList.innerHTML = '';

    //iteratr over the array of grocery items
    array.forEach(item => {
        //create a new list item element
        const listItem = document.createElement('li');

        //create a delete button element
        const deleteButton = document.createElement('span');

        //add a class to the delete button for styling
        deleteButton.classList.add('delete');

        //set the content of the delete button to 'x'
        deleteButton.textContent = '\u00D7';

        //append the delete button to the list item
        listItem.appendChild(deleteButton);

        //create a span element for the item text
        const itemText = document.createElement('span');

        //set the text content of the list item to the current item in the array
        itemText.textContent = item;

        listItem.appendChild(itemText);

        //Append the list item to the ul tag
        groceryList.appendChild(listItem);
    })
}

//Call the displayItems function to display the grocery items
displayItems(groceryItems);

//function to set default checked items
const setDefaultChecked = () => {
    //select the first two list items indicating they have been bought
    const boughtItems = document.querySelectorAll("#grocery-list li:nth-child(-n+2)");

    //iterate over the selected list items
    boughtItems.forEach(item => {
        //addd a CSS class to indicate that the item has been bought
        item.classList.add('bought');
    })
}

//call the setDefaultChecked function to set default checked items
setDefaultChecked();

//function to add a new item to the grocery list
const addItem = () => {
    const newItem = document.getElementById('new-item').value;
    if (newItem === '') {
        alert('Please insert an item.');
    } else {
        //Add the new item to the groceryItems array
        groceryItems.push(newItem);
        //clear the input field
        document.getElementById('new-item').value = '';
        //Redisplay the updated grocery items
        displayItems(groceryItems);
        //attach delete functionality to the newly added item
        deleteItem();
    }
}

//function to delete an item from the grocery list
const deleteItem = () => {

    //select all elements with the delete class
    const deleteButtons = document.querySelectorAll('.delete');

    //iterate over the delete buttons
    deleteButtons.forEach(button => {
        //add click event listener to each delete button
        button.addEventListener('click', () => {

            //get the parent list item of the clicked delete button
            const listItem = button.parentElement;

            //get the text content of the item to be deleted
            const itemText = listItem.lastElementChild.textContent;

            //find the index of the item in the groceryItems array
            const index = groceryItems.indexOf(itemText);

            //Remove the item from the array
            if (index !== -1) {
                groceryItems.splice(index, 1);
            }

            //remove the list item from the display
            listItem.remove();
        })
    })
}

//call the deleteItem function to set up event listeners for delete buttons
deleteItem();

//add a click event listener to the grocery-list element
document.getElementById('grocery-list').addEventListener('click', event => {
    //check if the clicked element is a list item
    if (event.target.tagName === 'LI') {
        //toggle the 'checked' class on the clicked list item
        event.target.classList.toggle('checked');
    }
});

//Add a keyup event listener to the input element
document.getElementById('new-item').addEventListener('keyup', event => {
    //Check if the event key is 'Enter'
    if (event.key === 'Enter') {
        //call the addItem function to add a new item to the list
        addItem();
    }
});