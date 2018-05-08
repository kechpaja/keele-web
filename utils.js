utils = (function () {
    // Sleep function from https://stackoverflow.com/a/39914235
    // Caller must be async
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


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
        getAnchor: getAnchor,
        sleep: sleep
    }
})();
