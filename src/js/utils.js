var utils = (function () {
    // getName and getOnClick get name and click function from each element 
    // in items. They each receive both item and index as arguments.
    function addLinkTable(id, items, getName, getOnClick) {
        var linkTable = getCleared(id);
        items.forEach(function(item, index) {
            var li = document.createElement("li");

            // TODO eventually "getName(item, index)" will just be item.title
            li.innerHTML += "<a href='javascript:void(0);'>"
                                               + getName(item, index) + "</a>";
            li.onclick = getOnClick(item, index);
            linkTable.appendChild(li);
        });
    }

    function setTitle(title) {
        document.getElementById("title").innerHTML = title;
        document.getElementById("title-container").style.display = "block";
    }

    function get(element) {
        if (typeof element === "object") {
            return element;
        }
        return document.getElementById(element);
    }

    function getCleared(element) {
        var elem = get(element);
        show(elem);
        elem.innerHTML = "";
        return elem;
    }

    function show(element) {
        get(element).style.display = "block";
    }

    function hide(element) {
        get(element).style.display = "none";
    }

    function hideAll() {
        ["course-anchor", "grammar-anchor", "home-anchor", "vocab-anchor", 
         "waterfall-anchor"].forEach(hide);
    }

    function hideHeader() {
        hide("title-container"); // TODO expand as there is more header to hide
    }

    return {
        addLinkTable: addLinkTable,
        get: get,
        getCleared: getCleared,
        hide: hide,
        hideAll: hideAll,
        hideHeader: hideHeader,
        setTitle: setTitle,
        show: show
    }
})();
