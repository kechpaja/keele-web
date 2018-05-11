var utils = (function () {
    function create(tagName, innerHTML) {
        var element = document.createElement(tagName);
        element.innerHTML = innerHTML;
        return element;
    }

    function createDiv(className, id) {
        var element = document.createElement("div");
        element.className = className || "";
        element.id = id || "";
        return element;
    }

    function createImage(src, className, id) {
        var image = document.createElement("img");
        image.src = src || "";
        image.className = className || "";
        image.id = id || "";
        return image;
    }

    // getName and getClickFunction get name and click function from each 
    // element in items. They each receive both item and index as arguments.
    function addLinkTable(id, items, getName, getClickFunction) {
        var linkTable = document.createElement("ul");
        linkTable.id = id;

        items.forEach(function(item, index) {
            var link = create("a", getName(item, index));
            link.href = "javascript:void(0);";
            link.onclick = getClickFunction(item, index);

            var row = document.createElement("li");
            row.appendChild(link);
            linkTable.appendChild(row);
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
        create: create,
        createDiv: createDiv,
        createImage: createImage,
        setTitle: setTitle
    }
})();
