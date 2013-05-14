/// <reference path="/data/data.js" />
// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    var storage = Clok.Data.Storage;

    WinJS.UI.Pages.define("/pages/projects/list.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            listView.addEventListener("iteminvoked", this.listView_itemInvoked, false);

            allProjectsButton.addEventListener("click", this.allStatusFilter_click, false);
            activeProjectsButton.addEventListener("click", this.activeStatusFilter_click, false);
            inactiveProjectsButton.addEventListener("click", this.inactiveStatusFilter_click, false);

        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element, viewState, lastViewState) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in viewState.
        },

        listView_itemInvoked: function (args) {
            var item = storage.nonDeletedGroupedProjects.getAt(args.detail.itemIndex);
            WinJS.Navigation.navigate("/pages/projects/detail.html", { id: item.id });
        },

        allStatusFilter_click: function (e) {
            setDataSource(Clok.Data.Storage.getGroupedProjectsByStatus([Clok.Data.ProjectStatuses.Active, Clok.Data.ProjectStatuses.Inactive]));
            setSelectedButton(allProjectsButton);
        },

        activeStatusFilter_click: function (e) {
            setDataSource(Clok.Data.Storage.getGroupedProjectsByStatus([Clok.Data.ProjectStatuses.Active]));
            setSelectedButton(activeProjectsButton);
        },

        inactiveStatusFilter_click: function (e) {
            setDataSource(Clok.Data.Storage.getGroupedProjectsByStatus([Clok.Data.ProjectStatuses.Inactive]));
            setSelectedButton(inactiveProjectsButton);
        },

    });

    var setDataSource = function (ds) {
        listView.winControl.itemDataSource = ds.dataSource;
        listView.winControl.groupDataSource = ds.groups.dataSource;
        zoomedOutListView.winControl.itemDataSource = ds.groups.dataSource;
    };

    var setSelectedButton = function (btnToSelect) {
        WinJS.Utilities.removeClass(allProjectsButton, "selected");
        WinJS.Utilities.removeClass(activeProjectsButton, "selected");
        WinJS.Utilities.removeClass(inactiveProjectsButton, "selected");

        WinJS.Utilities.addClass(btnToSelect, "selected");
    };

})();
