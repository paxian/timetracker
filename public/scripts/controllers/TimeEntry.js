(function() {
  'use strict';
  angular
    .module('timeTracker')
    .controller('TimeEntry', TimeEntry);

  function TimeEntry(time, user, $scope) {
    // vm is our capture variable
    var vm = this;

    vm.timeentries = [];
    vm.totalTime = {};
    vm.users = [];

    // Initialize the clockIn and clockOut times to the current time.
    vm.clockIn = moment();
    vm.clockOut = moment();

    // Grab all the time entries saved in the database.
    getTimeEntries();

    // Get the users from the database so we can select
    // who the time entry belongs to
    getUsers();

    function getUsers() {
      user.getUsers().then(function(result) {
          vm.users = result;
      }, function (error) {
        console.log(error);
      });
    }

    // Fetches the time entries and puts the results
    // on the vm.timeentries array
    function getTimeEntries() {
      time.getTime().then(function(results) {
        vm.timeentries = results;
          updateTotalTime(vm.timeentries);
          console.log(vm.timeentries);
      }, function(error) {
        console.log(error);
      });
    }

    // Fetches the time entries from the static JSON file
    // and puts results on the vm.timeentries array
    time.getTime().then(function(results){
      vm.timeentries = results;
      updateTotalTime(vm.timeentries);
      //console.log(vm.timeentries);
    }, function(error) {
      console.log(error);
    });

    // Updates the values in the total time box by calling the
    // getTotalTime method on the time service.
    function updateTotalTime(timeentries) {
      vm.totalTime = time.getTotalTime(timeentries);
    }

    // Submits the time entry that will be called
    // when we click the "Log Time" button.
    vm.logNewTime = function() {
      // Make sure that the clcok-in time in't After
      // the clock-out time!
      if(vm.clockOut < vm.clockIn) {
        alert("You can't clock out before you clock in!");
        return;
      }

      // Make sure the time entry is greate than zero
      if(vm.clockOut - vm.clokIn === 0) {
        alert("Your time entry has to be greater than zero!");
        return;
      }

      // Call to the saveTime method on the time service
      // to save the new time entry to the database.
      vm.saveTime({
        "user_id": vm.timeEntryUser.id,
        "start_time": vm.clockIn,
        "end_time": vm.clockOut,
        "comment": vm.comment
      }).then(function(success){
        getTimeEntries();
        console.log(success);
      }, function(error) {
        console.log(error);
      });

      getTimeEntries();

      // Reset clockIn and clockOut times to the current time.
      vm.clockIn = moment();
      vm.clocOut = moment();

      // Clear the current field
      vm.comment = "";

      // Deselect the user
      vm.timeEntryUser = "";

      //updateTotalTime(vm.timeentries);

    }

    // Specify the time entry to be deleted and pass it to the deleteTime method on the time service.
    vm.deleteTimeEntry = function(timeentry) {
      var id = timeentry.id;

      time.deleteTime(id).then(function(success) {
        getTimeEntries();
        console.log(success);
      }, function(error) {
        console.log(error);
      });
    }

    vm.updateTimeEntry = function(timeentry) {
      // Collect the data that will be passed to the updateTime method
      var updatedTimeEntry = {
        "id": timeentry.id,
        "user_id": timeentry.user.id,
        "start_time": timeentry.start_time,
        "end_time": timeentry.end_time,
        "comment": timeentry.comment
      }

      // Update the time entry and then refresh the list
      time.updateTime(updatedTimeEntry).then(function(success) {
        getTimeEntries();
        $scope.showEditDialog = false;
        console.log(success);
      }, function(error) {
        console.log(error);
      });
    }

  }

})();
