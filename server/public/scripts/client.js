console.log('client loaded');

$(document).ready(function() {
    console.log('jQ loaded');

    setupClickListeners();

    getTasks();

});


function setupClickListeners() {
    // $('#viewTasks').on('click', '.taskComplete', completeTask);
    // $('#viewTasks').on('click', '.deleteBtn', deleteBtn);
    $('#addTaskBtn').on('click', function () {
        console.log('in addButton on click');

        let taskToSend = {
            dueDate : $('#dateIn').val(),
            task : $('#taskIn').val(),
            completed : $('#completedIn').val(),
            notes : $('#notesIn').val()
        };

        // call addTask with the new object
        if (
            taskToSend.dueDate &&
            taskToSend.task &&
            taskToSend.completed &&
            taskToSend.notes
        ) {
           addTask(taskToSend);
        } else {
            Swal.fire({
                title: 'This is not the task you want to submit',
                imageUrl: 'https://media.giphy.com/media/4560Nv2656Gv0Lvp9F/giphy.gif',
                confirmButtonText: 'This is not the task I want to submit'
              })
        }
    })
}

// function completeTask() {
//     console.log('clicked complete task');

//     let task = $(this).closest('tr').data('task');
//     console.log(task);

//     $.ajax({
//         type : 'PUT'
//         url : 
//     })
// }


function getTasks(){
    console.log('in getTasks');

    $('#viewTasks').empty();
    $.ajax({
        type : 'GET',
        url : '/tasks'
    }).then(function (response) {
        renderTasks(response);
    })
}


function renderTasks(tasks) {
    for (let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        let $tr = $(`<tr class="table-warning"></tr>`);
        $tr.data('task', task);
        $tr.append(`<td>${task.dueDate}</td>`);
        $tr.append(`<td>${task.task}</td>`);
        $tr.append(`<td>${task.completed}</td>`);
        $tr.append(`<td>${task.notes}</td>`);
        if (task.completed === false) {
            $tr.append(
                `<td><button class = "taskComplete btn btn-success">Mark Completed</button></td>`
            )
        } else {
            $tr.append(
                `<td><button class = "taskComplete btn btn-secondary">Mark NOT Complete</button></td>`
            );
        }
        $tr.append(
            `<td><button class = "deleteBtn btn btn-danger">DELETE</button></td>`
        );
        $('#viewTasks').append($tr);
    }
}