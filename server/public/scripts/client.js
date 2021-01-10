console.log('client loaded');

$(document).ready(function() {
    console.log('jQ loaded');

    setupClickListeners();
});


function setupClickListeners() {
    $('#viewTasks').on('click', '.taskComplete', completeTaskBtn);
    $('#viewTasks').on('click', '.deleteBtn', deleteBtn);
    $('#addTaskBtn').on('click', function () {
        console.log('in addButton on click');

        let taskToSend = {
            dueDate : $('#dateIn').val(),
            task : $('#taskIn').val(),
            completed : $('#completedIn').val(),
            notes : $('#notesIn').val()
        }
    })
}