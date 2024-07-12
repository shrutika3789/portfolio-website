// Wait until the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', () => {
    // Get references to the form, task input, and task list elements
    const form = document.getElementById('todo-form');
    const taskInput = document.getElementById('new-task');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage
    loadTasks();

    // Add event listener for form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();// prevents default form
        addTask(taskInput.value);// Add the new task
        taskInput.value = ''; // Clear the input field
    });
    
    // Add event listener for click events on the task list
    taskList.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            removeTask(e.target.parentElement);//If delete is clicked,remove task
        } else if (e.target.tagName === 'LI') {
            toggleTask(e.target);//If list element is clicked,toggle it
        }
    });

    // Function to add a new task
    function addTask(task) {
        const li = document.createElement('li');//Create new element
        li.textContent = task;//set text content to task
        const deleteBtn = document.createElement('button');// Create a delete button
        deleteBtn.textContent = 'Delete';// Set the text content of the button
        deleteBtn.classList.add('delete');// Set the delete class of the button
        li.appendChild(deleteBtn);//Add the delete button to the list item

        taskList.appendChild(li);// Add the new list item to the task list
        saveTasks();//save the task
    }

     // Function to remove a task
    function removeTask(taskItem) {
        taskList.removeChild(taskItem);//Remove the selected task
        saveTasks();//Save the updated list
    }

     // Function to toggle the completion status of a task
    function toggleTask(taskItem) {
        taskItem.classList.toggle('completed');// Toggle the 'completed' class on the task item
        saveTasks();//Save the updated list
    }

    //Saving
    function saveTasks() {
        const tasks = [];// Initialize an empty array
        // Loop through all list items and add their data to the tasks array
        taskList.querySelectorAll('li').forEach(taskItem => {
            tasks.push({
                text: taskItem.firstChild.textContent,// Get the text content of task
                completed: taskItem.classList.contains('completed')// Get the completion status of  task
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Loop through the tasks and recreate the list items
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.text;
            if (task.completed) {
                li.classList.add('completed');// Add the 'completed' class if the task is completed
            }
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.classList.add('delete');// Add the delete class to the button
            li.appendChild(deleteBtn); // Add the delete button to the list item

            // Add the list item to the task list
            taskList.appendChild(li);
        });
    }
});
