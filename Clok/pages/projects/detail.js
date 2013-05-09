// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/projects/detail.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            var $this = this;

            fillDataList(clientList, simpleList);

            var fields = WinJS.Utilities.query("#projectDetailForm input, "
                + "#projectDetailForm textarea, "
                + "#projectDetailForm select");

            fields.listen("focus", function (e) {
                $this.showAppBar();
            }, false);
            fields.listen("change", function (e) {
                $this.enableAppBarCommand(saveProjectCommand);
            }, false);
            projectStatus.addEventListener("change", function (e) {
                $this.enableAppBarCommand(saveProjectCommand);
            }, false);



            saveProjectCommand.addEventListener("click", function (e) {
                if (projectDetailForm.checkValidity()) {
                    console.log("valid");
                }
            }, false);
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        },

        showAppBar: function () {
            projectDetailAppBar.winControl.show();
        },

        enableAppBarCommand: function (cmd) {
            cmd.winControl.disabled = false;
        },

        disableAppBarCommand: function (cmd) {
            cmd.winControl.disabled = true;
        },
    });


    var simpleList = ["Seattle", "Las Vegas", "New York", "Salt lake City"];
    var complexList = [{ value: 1, text: "Seattle" }, { value: 2, text: "Las Vegas" }, { value: 3, text: "New York" }, { value: 4, text: "Salt lake City" }];

    function fillDataList(listElement, options) {
        var len = options.length;

        if (len > 0) {
            for (var i = 0; i < len; i += 1) {
                var option = document.createElement('option');
                if (options[i].value && options[i].text) {
                    option.value = options[i].value;
                    option.text = options[i].text;
                } else {
                    option.value = options[i];
                    option.text = options[i];
                }
                listElement.appendChild(option);
            }
        }
    }
})();
