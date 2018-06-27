This is a partially completed assignemnt.  I created a train schedule site/program that allows a user to enter information about the schedule for a train station.  By filling out the form and clicking "Add Row," the user can enter the name of the train, its destination, the exact time the first train will arrive that day, and how often it will arrive after that.  Further, the user has the power to delete any rows that have been checked off.

Still to be completed: the schedule needs to be connected to a firebase database that will store the appropriate information.  The website will then need to be able to display stored data regardless of whether the page has been refreshed or not.  Lastly, moment.js will need to be used in a way that causes the "Minutes Away" field to display how long it will be before the next train arrives.




*Update: Connected the page to a firebase database.  Entries written will now remain on the page until they are removed manually from the databse itself.  Currently the delete button serves now purpose.  Tasks that remain include "Minutes Away" field to accurately display how long until the next train arrives.