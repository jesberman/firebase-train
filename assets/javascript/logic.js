var config = {
    apiKey: "AIzaSyCKSrH0SiVvktWkBz02vVd3Oaf4W5gwVYY",
    authDomain: "train-schedule-4b4e6.firebaseapp.com",
    databaseURL: "https://train-schedule-4b4e6.firebaseio.com",
    storageBucket: "train-schedule-4b4e6.appspot.com"
};
firebase.initializeApp(config);
// VARIABLES
// --------------------------------------------------------------------------------
// Get a reference to the database service
var database = firebase.database();








//--------------------------------






$(document).ready(function () {

    $(".add-row").click(function () {
        var tname = $("#tname").val().trim();

        var dest = $("#dest").val().trim();

        var firstTrainTime = $("#first-train").val().trim();

        var frequency = $("#frequency").val().trim();

        var markup = "<tr><td><input type='checkbox' name='record'></td><td>" + tname + "</td><td>" + dest + "</td>    <td>" + firstTrainTime + "</td>   <td>" + frequency + "</td>  <td>" + "Minutes Away" + "</td>  </tr>";


        var newTrain = {

            name: tname,
            destination: dest,
            first_train: firstTrainTime,
            frequncy: frequency
        }



        database.ref().push(newTrain);

        $("table tbody").append(markup);



        function deleteRow() {
            $("table tbody").find('input[name="record"]').each(function () {
                if ($(this).is(":checked")) {
                    $(this).parents("tr").remove();
                }
            });

        }

        // Find and remove selected table rows
        $(".delete-row").click(function () {

            deleteRow();



        });
    });
});















//API Section:---------------------------------------------------





// Setting initial value of our click counter variable to 0
var bigOne = document.getElementById('bigOne');

var dbRef = firebase.database().ref().child('text');
dbRef.on('value', snap => bigOne.innerText = snap.val());

var clickCounter = 0;




database.ref().once("value", function (snapshot) {
    // Then we console.log the value of snapshot
    // console.log(snapshot.val());



    // urlRef.once("value", function(snapshot) {
    snapshot.forEach(function (child) {

        var tname = child.val().name;

        var dest = child.val().destination;

        var firstTrainTime = child.val().first_train;

        var frequency = child.val().frequncy;

        var markup = "<tr><td><input type='checkbox' name='record'></td><td>" + tname + "</td><td>" + dest + "</td>    <td>" + firstTrainTime + "</td>   <td>" + frequency + "</td>  <td>" + "Minutes Away" + "</td>  </tr>";

        $("table tbody").append(markup);

        //   console.log(child.key+": "+child.val());
    });
    //   });




    // Then we change the html associated with the number.
    $("#click-value").text(snapshot.val().clickCount);
    // Then update the clickCounter variable with data from the database.
    clickCounter = snapshot.val().clickCount;
    // If there is an error that Firebase runs into -- it will be stored in the "errorObject"
    // Again we could have named errorObject anything we wanted.
}, function (errorObject) {
    // In case of error this will print the error
    console.log("The read failed: " + errorObject.code);
});

















