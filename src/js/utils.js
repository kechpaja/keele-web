var utils = (function () {

    function createLink(name, onclick) {
        var link = document.createElement("a");
        link.onclick = onclick;
        link.innerHTML = name;
        link.href = "javascript:void(0);";

        var column = document.createElement("td");
        column.appendChild(link);

        var row = document.createElement("tr");
        row.appendChild(column);
        return row;
    }

    // getName and getClickFunction get name and click function from each 
    // element in items. They each receive both item and index as arguments.
    function createLinkTable(id, items, getName, getClickFunction) {
        var linkTable = document.createElement("table");
        linkTable.id = id;

        items.forEach(function(item, index) {
            linkTable.appendChild(createLink(getName(item, index),
                                             getClickFunction(item, index)));
        });

        return linkTable;
    }

    function createTitle(id, title) {
        var titleElement = document.createElement("h1");
        titleElement.id = id;
        titleElement.innerHTML = title;
        return titleElement;
    }

    function anchor() {
        return document.getElementById("anchor");
    }

    function clearAnchor() {
        anchor().innerHTML = "";
    }

    return {
        anchor: anchor,
        clearAnchor: clearAnchor,
        createLinkTable: createLinkTable,
        createTitle: createTitle
    }
})();
