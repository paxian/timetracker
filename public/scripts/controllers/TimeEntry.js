(function() {
  'use strict';
  angular
    .module('timeTracker')
    .controller('TimeEntry', TimeEntry);

  function TimeEntry(time) {
    // vm is our capture variable
    var vm = this;
    vm.timeentries = [];
    vm.totalTime = {};

    // Initialize the clockIn and clockOut times to the current time.
    vm.clockIn = new Date();
    vm.clockOut = new Date();

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

      vm.timeentries.push({
        "user_id": 1,
        "user_firstname": "Ryan",
        "user_lastname": "Chenkie",
        "start_time": vm.clockIn,
        "end_time": vm.clockOut,
        "loggedTime": time.getTimeDiff(vm.clockIn, vm.clockOut),
        "comment": vm.comment
      });

      updateTotalTime(vm.timeentries);

      vm.comment = "";
    }

  }

})();
