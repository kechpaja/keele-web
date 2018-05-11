var navigate = (function () {
    function to(course, lesson, section) {
        var destination = Array.prototype.slice.call(arguments);

        // TODO replace that null?
        history.pushState(destination, null, destination.join("/"));
        load(course, lesson, section);
    }


    function loadCurrentPage() {
        var currentPath = location.pathname.replace(/(\/?keelek)?\//, "");
        var currentPathSplit = currentPath.split("/");

        // TODO something in place of that null?
        history.replaceState(currentPathSplit, null, currentPath);
        load.apply(this, currentPathSplit); 
    }

    // Set up the popstate handler
    window.addEventListener('popstate', function(e) {
        if (e.state) {
            load.apply(this, e.state);
        }
    });


    return {
        loadCurrentPage: loadCurrentPage,
        to: to
    }
})();

// Take us to the page specified by the url
navigate.loadCurrentPage();
