/// <reference path="/controls/js/clockControl.js" />

(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {

            toggleTimerMenuItem.onclick = this.toggleTimerMenuItem_click.bind(this);
            cameraMenuItem.onclick = this.cameraMenuItem_click.bind(this);
            projectsMenuItem.onclick = this.projectsMenuItem_click.bind(this);
            timesheetMenuItem.onclick = this.timesheetMenuItem_click.bind(this);

            project.onchange = this.project_change.bind(this);

            saveTimeButton.onclick = this.saveTimeButton_click.bind(this);
            discardTimeButton.onclick = this.discardTimeButton_click.bind(this);

            this.setupTimerRelatedControls();

            elapsedTimeClock.winControl.initialCounterValue = [0, 0, 0];
        },

        toggleTimerMenuItem_click: function (e) {
            this.toggleTimer();
            console.log("timer");
        },

        cameraMenuItem_click: function (e) {
            console.log("camera");
        },

        projectsMenuItem_click: function (e) {
            console.log("projects");
        },

        timesheetMenuItem_click: function (e) {
            console.log("timesheet");
        },

        project_change: function (e) {
            this.enableOrDisableButtons();
        },

        saveTimeButton_click: function (e) {
            // do something with the time entry
            this.resetTimer();
            console.log("save time");
        },

        discardTimeButton_click: function (e) {
            this.resetTimer();
            console.log("discard time");
        },

        toggleTimer: function () {
            this.timerIsRunning = !this.timerIsRunning;
            this.setupTimerRelatedControls();
        },

        resetTimer: function () {
            this.timerIsRunning = false;
            this.setupTimerRelatedControls();
            elapsedTimeClock.winControl.reset();
            project.selectedIndex = 0;
            timeNotes.value = "";
        },

        setupTimerRelatedControls: function () {
            if (this.timerIsRunning) {
                elapsedTimeClock.winControl.start();
                timerImage.src = "/images/Clock-Running.png";
                timerTitle.innerText = "Stop Clok";
            } else {
                elapsedTimeClock.winControl.stop();
                timerImage.src = "/images/Clock-Stopped.png";
                timerTitle.innerText = "Start Clok";
            }

            this.enableOrDisableButtons();
        },

        enableOrDisableButtons: function () {
            if ((project.value !== "") && (!this.timerIsRunning) && (elapsedTimeClock.winControl.counterValue > 0)) {
                saveTimeButton.disabled = false;
            } else {
                saveTimeButton.disabled = true;
            }

            discardTimeButton.disabled = (this.timerIsRunning) || (elapsedTimeClock.winControl.counterValue <= 0);
        },

        timerIsRunning: false,
    });
})();
