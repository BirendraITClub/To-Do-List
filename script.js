const addTaskButton = document.getElementById('add-task');
const tasksList = document.getElementById('tasks');
const completedList = document.getElementById('completed');
const collectionButtons = document.querySelectorAll('.collection');
const currentCollectionHeader = document.getElementById('current-collection');
const modal = document.getElementById('task-modal');
const closeModal = document.querySelector('.close-modal');
const saveTaskButton = document.getElementById('save-task');
const newTaskInput = document.getElementById('new-task-input');

let currentCollection = 'school';

// Function to update the displayed collection
function updateCollectionDisplay(collection) {
    currentCollection = collection;
    currentCollectionHeader.textContent = collection.charAt(0).toUpperCase() + collection.slice(1);
}

// Add event listeners to collection buttons
collectionButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove 'active' class from all buttons
        collectionButtons.forEach(btn => btn.classList.remove('active'));
        // Add 'active' class to the clicked button
        button.classList.add('active');
        updateCollectionDisplay(button.dataset.collection);
    });
});

// Function to create a new task element
function createTaskElement(taskText) {
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task');
    taskDiv.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
        taskDiv.remove();
    });

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.classList.add('complete-btn');
    completeButton.addEventListener('click', () => {
        completedList.appendChild(taskDiv);
        completeButton.remove(); //Remove complete button after moving to completed list
    });

    taskDiv.appendChild(completeButton);
    taskDiv.appendChild(deleteButton);

    return taskDiv; // Return the created task element
}

// Function to add a task to the task list
function addTask(taskText) {
    const taskElement = createTaskElement(taskText);
    tasksList.appendChild(taskElement);
}

// Modal event listeners
addTaskButton.addEventListener('click', () => {
    modal.style.display = "block";
    newTaskInput.value = ""; // Clear input field
});

closeModal.addEventListener('click', () => {
    modal.style.display = "none";
});

// Close modal if clicked outside of it
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = "none";
    }
});

saveTaskButton.addEventListener('click', () => {
    const taskText = newTaskInput.value.trim(); // Trim whitespace
    if (taskText !== "") { // Check if not empty
        addTask(taskText);
        modal.style.display = "none";
    } else{
        alert("Please enter a task.")
    }
});

// Initialize the display
updateCollectionDisplay(currentCollection);