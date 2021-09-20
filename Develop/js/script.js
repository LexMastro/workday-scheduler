const storeData = window.localStorage;
const now = moment();
const saveButton = document.getElementsByClassName(".savebtn");
const container = $(".container");

let currentTime = moment().format('MMMM Do YYYY, h:mm:ss a');
$("#currentDay").text(currentTime);
function update() {
    $('#currentDay').html(moment().format('MMMM Do YYYY, h:mm:ss a'));
}

setInterval(update, 1000);

// // Make time blocks of a work day (9-5pm)
const hours = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM',
];

// // Make time blocks clickable & able to write data inside
for (let i = 0; i < hours.length; i++) {
    //Assign current hour in 24-hr form
    let dataHour = [i + 9];
    // Create a row
    let tRow = $('<tr class="time-block">');
    // Populate first column with work hours
    let hourRow = $(
        `<td class="align-middle"><h3 class="time" id="${hours[i]}" data-hour="${dataHour}">${hours[i]}</h3></td>`
    );
    // Create a column with a textbox to input tasks
    // grab exisiting value from local storage
    let existingNote = localStorage.getItem('taskText' + dataHour) || "";

    let textArea = $(`<textarea class="form-control taskText" id="${dataHour}text" rows="3"></textarea>`);

    textArea.text(existingNote);

    let task = $(
        `<td class="align-middle"></td>`
    );
    task.append(textArea);
    // Create 3rd column with save button 
    let save = $(
        `<td class="align-middle"><i class="far fa-save fa-3x saveBtn" data-hour="${dataHour}"></i></td>`
    );
    // Append table data to a row
    tRow.append(hourRow, task, save);
    // Append the table row to the table body
    $('.container').append(tRow);
}


// // Make time blocks color coded, for each time frame of the day 
$.each($(".time-block"), function (index, value) {
    let dataHour = $(value).children()[0].firstChild.getAttribute("data-hour");
    if (Number(dataHour) === now.hour()) {
        $(this).find("textarea").addClass('present');

    } else if (Number(dataHour) < now.hour()) {
        $(this).find("textarea").addClass('past');
    } else {
        $(this).find("textarea").addClass('future');
    }
});

// // Save event in local storage

$(".saveBtn").on('click', function (event) {
    event.preventDefault();
    // grab exisitng ones in the local storange
    let input = $(event.target).parent().siblings()[1].firstChild.value;
    let dataHour = $(event.target).parent().siblings()[0].firstChild.getAttribute('data-hour');
    // localStorage.setItem("taskText", input);
    localStorage.setItem("taskText" + dataHour, input);

});



