var i = 0;
//Firebase initialization code
var config = {
  apiKey: "AIzaSyCKSrH0SiVvktWkBz02vVd3Oaf4W5gwVYY",
  authDomain: "train-schedule-4b4e6.firebaseapp.com",
  databaseURL: "https://train-schedule-4b4e6.firebaseio.com",
  projectId: "train-schedule-4b4e6",
  storageBucket: "train-schedule-4b4e6.appspot.com",
  messagingSenderId: "559824584786"
};
firebase.initializeApp(config);


// declares a database variable, and connects it to the firebase database
var database = firebase.database();

//tells the code to be ready for the following commads and functions
$(document).ready(function () {


//Tells the code to run when the add-row button is clicked
  $(".add-row").click(function () {

    //Creates a variable that relates to the current year
    var year = moment().year();
    console.log(year);

    //Creates a variable that relates to the current month
    var month = moment().month();
    console.log(month);

    //Creates a variable that relates to the current date
    var date = moment().date();
    console.log(date);


    //Creates a variable and sets its value to what the user inputs in the tname text field
    var tname = $("#tname").val().trim();

    //Creates a variable and sets its value to what the user inputs in the dest text field
    var dest = $("#dest").val().trim();

    //Creates a variable and sets its value to what the user inputs in the first_train text field
    //Also uses moment.js to format it to hours and minutes
    var firstTrainTime = moment($("#first_train").val().trim(), "HH:mm").format("HH:mm");

    //Creates a variable and sets its value to what the user inputs in the frequency text field
    var freq = $("#frequency").val().trim();


    //creates a new object called "newTrain", with values from the above user input fields
    var newTrain = {

      name: tname,
      destination: dest,
      first_train: firstTrainTime,
      frequency: freq
    }

    //Pushes the newTrain object into the firebase database
    database.ref().push(newTrain);

    //resets the values of the text fields to blank, so that new data can easily be entered
    $("#tname").val("");
    $("#dest").val("");
    $("#first_train").val("");
    $("#frequency").val("");

    return false;

  });

});



//API Section:---------------------------------------------------

//tells the code to retrieve specific information from the firebase database
database.ref().on("child_added", function (childSnapshot) {
  console.log(childSnapshot.val());


  //creates four new variables and sets them to equal the appropriate value that is stored in the database
  var tname = childSnapshot.val().name;
  var dest = childSnapshot.val().destination;
  var firstTrainTime = childSnapshot.val().first_train;
  var freq = childSnapshot.val().frequency;

  //take the value stored in the firstTrainTime variable and converts it to moment.js in hours and minutes format
  var firstTimeConverted = moment(firstTrainTime, "HH:mm");

  //creates a variable equal to the current time right now
  var timeNow = moment().format("HH:mm");

  //creates a variable equal to the time right now minus the firstTimeConverted variable, which is equal to the time the first train of the day is set to arrive
  var timeDifference = moment().diff(moment(firstTimeConverted), "minutes");
  console.log(("Time Difference: ") + timeDifference);

  //creates a variable that finds the remiander between timeDifference and freq
  var remainderMinutes = timeDifference % freq;

  //creates a variable that equals the number of minutes between each iteration of the train minus remainderMinutes
  var trainArrival = freq - remainderMinutes;

  //takes the trainArrival variable and converts it to moment.js in hours and minutes format
  var nextTrain = moment().add(trainArrival, "minutes").format("HH:mm");

  //creates an if / else statement
  //if the time of day is past the time when the first train arrives, the following code runs, showing the number of minutes until the next iteration of train arrivals
  if (timeDifference > 0) {
    console.log("First Train Has Already Arrived");
    $("#table>tbody").append("   <tr><td><input type='checkbox' </td><td>" + tname + "</td><td>" + dest + "</td><td>" + firstTrainTime + "</td><td>" + freq + "</td><td>" + trainArrival + "</td></tr>");
  }

  //otherwise, the followind code runs, showing how long until the first train arrives
  else {
    console.log("First Train Has Not Yet Arrived");
    $("#table>tbody").append("   <tr><td><input type='checkbox' </td><td>" + tname + "</td><td>" + dest + "</td><td>" + firstTrainTime + "</td><td>" + freq + "</td><td>" + (timeDifference * (-1)) + "</td></tr>");

  }

 });


















