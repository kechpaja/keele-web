utils = (function () {
    // Get the anchor tag from the DOM
    function getAnchor() {
        return document.getElementById("anchor");
    }


    // Create an arbitrary element
    function createElement(tag, contents) {
        var element = document.createElement(tag);

        if (contents) {
            element.innerHTML = contents
        }

        return element;
    }


    return {
        createElement: createElement,
        getAnchor: getAnchor
    }
})();
