console.log("client loaded");

$(document).ready(function () {
  console.log("jQ loaded");

  setupClickListeners();

  getTasks();
});

function setupClickListeners() {
  $("#viewTasks").on("click", ".taskComplete", completeTaskToggle);
  $("#viewTasks").on("click", ".deleteBtn", deleteBtn);

  $("#viewCompletedTasks").on("click", ".taskComplete", completeTaskToggle);
  $("#viewCompletedTasks").on("click", ".deleteBtn", deleteBtn);

  $("#addTaskBtn").on("click", function () {
    console.log("in addButton on click");

    let taskToSend = {
      dueDate: $("#dateIn").val(),
      task: $("#taskIn").val(),
      completed: $("#completedIn").is(':checked'),
      notes: $("#notesIn").val(),
    };

    // call addTask with the new object
    if (
      taskToSend.dueDate &&
      taskToSend.task &&
      taskToSend.notes
    ) {
      addTask(taskToSend);
    } else {
      Swal.fire({
        title: "This is not the task you want to submit",
        imageUrl: "https://media.giphy.com/media/4560Nv2656Gv0Lvp9F/giphy.gif",
        text : "Please fill out all inputs fields before submitting your task",
        confirmButtonText: "This is not the task I want to submit"
      });
    }
  });
}

function addTask(newTask) {
  console.log("in addTask", newTask);

  $.ajax({
    type: "POST",
    url: "/tasks",
    data: newTask,
  }).then(function (response) {
    $("#dateIn").val(""),
      $("#taskIn").val(""),
      $("#completedIn").prop('checked', false),
      $("#notesIn").val(""),
      getTasks();
  });
}

function completeTaskToggle() {
  console.log("clicked complete task");

  let task = $(this).closest("tr").data("task");
  console.log(task);

  $.ajax({
    type: "PUT",
    url: `/tasks/${task.id}`,
    data: task,
  })
    .then(function (response) {
      console.log("Updated");
      getTasks();
    })
    .catch(function (error) {
      alert("error updating completed BOOLEAN BOI");
    });
}

function getTasks() {
  console.log("in getTasks");

  $("#viewTasks").empty();
  $("#viewCompletedTasks").empty();
  $.ajax({
    type: "GET",
    url: "/tasks",
  }).then(function (response) {
    renderTasks(response);
  });
}

function renderTasks(tasks) {
  for (let i = 0; i < tasks.length; i++) {
    let task = tasks[i];
    let time = new Date(task.dueDate).toLocaleDateString("en-gb", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    let $tr = $(`<tr></tr>`);
    $tr.data("task", task);
    $tr.append(`<td>${time}</td>`);
    $tr.append(`<td>${task.task}</td>`);
    $tr.append(`<td>${task.completed}</td>`);
    $tr.append(`<td>${task.notes}</td>`);
    if (task.completed === false) {
      $($tr).addClass("table-warning");
      $tr.append(
        `<td><button class = "taskComplete btn btn-success">Task Complete</button></td>`
      );
      $("#viewTasks").append($tr);
    } else if (task.completed === true) {
      $($tr).addClass("table-success completed");
      $tr.append(
        `<td><button class = "taskComplete btn btn-secondary">Task Completed! Click to Undo</button></td>`
      );
      $("#viewCompletedTasks").append($tr);
    }
    $tr.append(
      `<td><button class = "deleteBtn btn btn-danger">DELETE</button></td>`
    );
  }
}

function deleteBtn() {
  console.log("clicked delete");

  Swal.fire({
    title: "This will permanently delete the task!",
    imageUrl: "https://media.giphy.com/media/41wiNJ6HB8JLW/giphy.gif",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete this task!",
  }).then((result) => {
    if (result.isConfirmed) {
      ajaxDelete();
      Swal.fire("Deleted!", "Your task has been deleted.", "success");
    }
  });

  const task = $(this).closest("tr").data("task").id;
  console.log(task);

  function ajaxDelete() {
    $.ajax({
      type: "DELETE",
      url: `/tasks/${task}`,
    })
      .then(function (response) {
        getTasks();
      })
      .catch(function (error) {
        alert("error in delete");
      });
  }
}
