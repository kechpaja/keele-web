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
    function addLinkTable(id, items, getName, getClickFunction) {
        var linkTable = document.createElement("table");
        linkTable.id = id;

        items.forEach(function(item, index) {
            linkTable.appendChild(createLink(getName(item, index),
                                             getClickFunction(item, index)));
        });

        anchor().appendChild(linkTable);
    }

    function setTitle(title) {
        document.getElementById("title").innerHTML = title;
        document.getElementById("title-container").style.display = "block";
    }

    function anchor() {
        return document.getElementById("anchor");
    }

    function clearAnchor() {
        anchor().innerHTML = "";
    }

    // This one hides the title as well
    function clearPage() {
        clearAnchor();
        document.getElementById("title-container").style.display = "none";
    }

    return {
        addLinkTable: addLinkTable,
        anchor: anchor,
        clearAnchor: clearAnchor,
        clearPage: clearPage,
        setTitle: setTitle
    }
})();
