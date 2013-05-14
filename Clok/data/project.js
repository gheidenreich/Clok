(function () {
    "use strict";

    var projectClass = WinJS.Class.define(
        function constructor() {

            // define and initialize properties
            this.id = (new Date()).getTime();
            this.name = "";
            this.projectNumber = "";
            this.status = statuses.Active;
            this.description = "";
            this.startDate = new Date("12/1/2012");
            this.dueDate = new Date();
            this.clientName = "";
            this.contactName = "";
            this.address1 = "";
            this.address2 = "";
            this.city = "";
            this.region = "";
            this.postalCode = "";
            this.email = "";
            this.phone = "";
        },
        {
            // instance members
        },
        {
            // static members
            createProject: function (name, projectNumber, clientName, otherProperties) {
                var newProject = new projectClass();
                newProject.id = (otherProperties && otherProperties.id) || newProject.id;
                newProject.name = name;
                newProject.projectNumber = projectNumber;
                newProject.clientName = clientName;

                if (otherProperties) {
                    Object.keys(otherProperties).forEach(function (key) {
                        if ((key !== "id") && (key !== "name") && (key !== "projectNumber") && (key !== "clientName")) {
                            newProject[key] = otherProperties[key];
                        }
                    });
                }

                return newProject;
            }
        }
    );


    // clockModes is an enum(eration) of the different ways our clock control can behave
    var statuses = Object.freeze({
        Active: "active",
        Inactive: "inactive",
        Deleted: "deleted",
    });

    var projectStatusToCheckedState = WinJS.Binding.converter(function (status) {
        return (status === Clok.Data.ProjectStatuses.Active);
    });



    WinJS.Namespace.define("Clok.Data", {
        Project: projectClass,
        ProjectStatuses: statuses,
        ProjectStatusToCheckedConverter: projectStatusToCheckedState,
    });

})();

