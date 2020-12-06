// Declaring global variables
var currentDay = moment().format('MMMM Do YYYY');
var currentHour = moment().format('H A');

// Function for current time clock
function clock() {
  $('#currentTime').html(moment().format('h:mm:ss a'));
}

setInterval(clock, 1000);

// Building array of objects for the timeblocks
var nineToFive = [
  {
    hour: "9 AM",
    plans: ""
  },
  {
    hour: "10 AM",
    plans: ""
  },
  {
    hour: "11 AM",
    plans: ""
  },
  {
    hour: "12 PM",
    plans: ""
  },
  {
    hour: "1 PM",
    plans: ""
  },
  {
    hour: "2 PM",
    plans: ""
  },
  {
    hour: "3 PM",
    plans: ""
  },
  {
    hour: "4 PM",
    plans: ""
  },
  {
    hour: "5 PM",
    plans: ""
  },
];

//Generating the scheduler
nineToFive.forEach(function(nineToFive, index) {
  var hour = nineToFive.hour;
  var plans = updateColor(hour);
  var hourSlots = `<form>
  <div class="time-block" id="${index}">
  <div class="row">
  <div class="col-sm-10 col-md-1 hour">${hour}</div>
  <textarea class="col-sm-10 col-md-10 ${plans}">${nineToFive.plans}</textarea>
  <div class="col-sm-10 col-md-1">
  <button class="saveBtn" type="submit"><i class="fas fa-save"></i></button>
  </div>
  </div>
  </div>
  </form>`;

  $(".container").append(hourSlots);
});

$(".saveBtn").on("click", saveInput);

//Function for changing the background color each time-block depending on if the block is in the future, current, or past
function updateColor(hour) {
  var current = moment(currentHour, 'H A');
  var currentTimeBlock = moment(hour, 'H A');
  if (current.isBefore(currentTimeBlock) === true) {
    return "future";
  } else if (current.isAfter(currentTimeBlock) === true) {
    return "past";
  } else {
    return "present";
  }
}

//Saving user input to localStorage
function saveInput(event) {
  event.preventDefault();
  var timeblockSaveID = parseInt($(this).closest(".time-block").attr("id"));
  var plansID = $.trim($(this).parents().siblings("textarea").val());
  nineToFive[timeblockSaveID].plans = plansID;

  localStorage.setItem("nineToFive", JSON.stringify(nineToFive));
}

//Retrieving user input from localStorage
function getInput() {
  var workDay = JSON.parse(localStorage.getItem("nineToFive"));
  if (workDay) return nineToFive = workDay;
}

// Displaying the current date and time
$("#currentDay").text(currentDay);
$("#currentTime").text(clock);

getInput();