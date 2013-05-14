/// <reference path="//Microsoft.WinJS.1.0/js/base.js" />
/// <reference path="project.js" />

(function () {
    "use strict";

    var dataStorageClass = WinJS.Class.define(
        function constructor() {
            // define and initialize properties
        },
        {
            // instance members
        },
        {
            // static members

            projects: new WinJS.Binding.List([]),
            groupedProjects: {
                get: function() {
                    return dataStorageClass.projects.createFiltered(function (p) { return p.status !== Clok.Data.ProjectStatuses.Deleted; }).createGrouped(getProjectGroupKey, getProjectGroupData, compareProjectGroups);
                }
            },
            clients: {
                get: function () {
                    return dataStorageClass._updateClients();
                }
            },


            _updateClients: function () {
                return new WinJS.Binding.List(dataStorageClass.projects
                    .map(function (p) { return p.clientName; }) // make array of just client names
                    .sort()                                     // sort them
                    .reduce(function (prev, curr) {             // create a new array where each item is added only once
                        if (curr !== prev[prev.length - 1]) {
                            prev[prev.length] = curr;
                        }
                        return prev;
                    }, []));
            },
        }
    );


    function compareProjectGroups(left, right) {
        return left.toUpperCase().charCodeAt(0) - right.toUpperCase().charCodeAt(0);
    }

    function getProjectGroupKey(dataItem) {
        return dataItem.clientName.toUpperCase().charAt(0);
    }

    function getProjectGroupData(dataItem) {
        return {
            name: dataItem.clientName.toUpperCase().charAt(0)
        };
    }



    dataStorageClass.projects.getById = function (id) {
        if (id) {
            var matches = this.filter(function (p) { return p.id === id; });
            if (matches && matches.length === 1) {
                return matches[0];
            }
        }
        return undefined;
    };

    dataStorageClass.projects.save = function (p) {
        if (p && p.id) {
            var existing = dataStorageClass.projects.getById(p.id);
            if (!existing) {
                dataStorageClass.projects.push(p);
            } else {
                dataStorageClass.projects.notifyMutated(dataStorageClass.projects.indexOf(existing));
            }
        }
    };

    WinJS.Namespace.define("Clok.Data", {
        Storage: dataStorageClass,
    });

})();


// add temp data
(function () {

    Clok.Data.Storage.projects.push(Clok.Data.Project.createProject("Windows Store App", "2012-0003", "Northwind Traders", { id: 1368296808745, status: Clok.Data.ProjectStatuses.Inactive }));
    Clok.Data.Storage.projects.push(Clok.Data.Project.createProject("Mobile Website", "2012-0008", "Contoso Ltd.", { id: 1368296808746, status: Clok.Data.ProjectStatuses.Inactive }));
    Clok.Data.Storage.projects.push(Clok.Data.Project.createProject("Website Redesign", "2012-0011", "Northwind Traders", { id: 1368296808747, status: Clok.Data.ProjectStatuses.Inactive }));
    Clok.Data.Storage.projects.push(Clok.Data.Project.createProject("Windows Store App", "2012-0017", "AdventureWorks Cycles", { id: 1368296808748 }));
    Clok.Data.Storage.projects.push(Clok.Data.Project.createProject("Website Redesign", "2012-0018", "TailSpin Toys", { id: 1368296808749, status: Clok.Data.ProjectStatuses.Deleted }));
    Clok.Data.Storage.projects.push(Clok.Data.Project.createProject("Windows Store App", "2012-0023", "A. Datum Corporation", { id: 1368296808750, status: Clok.Data.ProjectStatuses.Inactive }));
    Clok.Data.Storage.projects.push(Clok.Data.Project.createProject("Website Redesign", "2012-0027", "Woodgrove Bank", { id: 1368296808751, status: Clok.Data.ProjectStatuses.Inactive }));
    Clok.Data.Storage.projects.push(Clok.Data.Project.createProject("Website Redesign", "2012-0030", "Fabrikam, Inc.", { id: 1368296808752, status: Clok.Data.ProjectStatuses.Inactive }));
    Clok.Data.Storage.projects.push(Clok.Data.Project.createProject("Website Redesign", "2012-0033", "AdventureWorks Cycles", { id: 1368296808753 }));
    Clok.Data.Storage.projects.push(Clok.Data.Project.createProject("Mobile Website", "2012-0039", "Northwind Traders", { id: 1368296808754, status: Clok.Data.ProjectStatuses.Inactive }));
    Clok.Data.Storage.projects.push(Clok.Data.Project.createProject("Employee Portal", "2012-0042", "AdventureWorks Cycles", { id: 1368296808755, status: Clok.Data.ProjectStatuses.Inactive }));
    Clok.Data.Storage.projects.push(Clok.Data.Project.createProject("Website Redesign", "2012-0050", "A. Datum Corporation", { id: 1368296808756, status: Clok.Data.ProjectStatuses.Inactive }));
    Clok.Data.Storage.projects.push(Clok.Data.Project.createProject("Windows Store App", "2012-0053", "TailSpin Toys", { id: 1368296808757, status: Clok.Data.ProjectStatuses.Inactive }));
    Clok.Data.Storage.projects.push(Clok.Data.Project.createProject("Mobile Website", "2013-0012", "A. Datum Corporation", { id: 1368296808758 }));
    Clok.Data.Storage.projects.push(Clok.Data.Project.createProject("Mobile Website", "2013-0013", "Fabrikam, Inc.", { id: 1368296808759 }));
    Clok.Data.Storage.projects.push(Clok.Data.Project.createProject("Employee Portal", "2013-0016", "Northwind Traders", { id: 1368296808760, status: Clok.Data.ProjectStatuses.Deleted }));
    Clok.Data.Storage.projects.push(Clok.Data.Project.createProject("Employee Portal", "2013-0017", "Woodgrove Bank", { id: 1368296808761 }));
    Clok.Data.Storage.projects.push(Clok.Data.Project.createProject("Website Redesign", "2013-0018", "Contoso Ltd.", { id: 1368296808762 }));


    

})();



/*

bind <select> contents: http://social.msdn.microsoft.com/Forums/en-US/winappswithhtml5/thread/83d8a271-bd6f-45d4-8db4-7bb3c45aa2b4/
WinJS.Binding.as(...): http://msdn.microsoft.com/en-us/library/windows/apps/br229801.aspx

Simple binding: http://msdn.microsoft.com/en-us/library/windows/apps/hh700358.aspx

List ctor {binding: true}: http://msdn.microsoft.com/en-us/library/windows/apps/hh700764.aspx

with mixins: http://msdn.microsoft.com/en-us/library/windows/apps/hh700355.aspx
    //WinJS.Class.mix(Clok.Data.Project,
    //    WinJS.Binding.mixin,
    //    WinJS.Binding.expandProperties({ name: "" }));

binding with templates: http://msdn.microsoft.com/en-us/library/windows/apps/hh700356.aspx


custom data source: http://msdn.microsoft.com/en-us/library/windows/apps/hh770849.aspx

soundex for search?

*/