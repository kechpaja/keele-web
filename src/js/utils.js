var utils = (function () {
    // TODO let this take an object as innerHTML?
    function create(tagName, innerHTML, properties) {
        var element = document.createElement(tagName);
        element.innerHTML = innerHTML || "";
        for (var property in properties) {
            element[property] = properties[property];
        }
        return element;
    }

    function createDiv(className, id) {
        return create("div", "", {className: className, id: id});
    }

    // getName and getOnClick get name and click function from each element 
    // in items. They each receive both item and index as arguments.
    function addLinkTable(id, items, getName, getOnClick) {
        var linkTable = getCleared(id);

        items.forEach(function(item, index) {
            var li = document.createElement("li");

            // TODO eventually "getName(item, index)" will just be item.title
            li.innerHTML = "<a href='javascript:void(0);'>" 
                                                + getName(item, index) + "</a>";
            li.onclick = getOnClick(item, index);
            add(linkTable, li);
        });
    }

    function add(target, element) {
        if (typeof element === "object") {
            get(target).appendChild(element);
        } else {
            get(target).innerHTML += element;
        }
    }

    function setTitle(title) {
        document.getElementById("title").innerHTML = title;
        document.getElementById("title-container").style.display = "block";
    }

    function anchor() {
        return document.getElementById("anchor");
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

    function hideAll(element) {
        anchor().innerHTML = "";
        hide("course-anchor");
        hide("grammar-anchor");
        hide("home-anchor");
        hide("lesson-anchor");
        hide("vocab-anchor");
        hide("waterfall-anchor");
    }

    function hideHeader() {
        hide("title-container"); // TODO expand as there is more header to hide
    }

    return {
        add: add,
        addLinkTable: addLinkTable,
        createDiv: createDiv,
        get: get,
        getCleared: getCleared,
        hide: hide,
        hideAll: hideAll,
        hideHeader: hideHeader,
        setTitle: setTitle,
        show: show
    }
})();
