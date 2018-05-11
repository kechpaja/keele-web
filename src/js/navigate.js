var pages = pages || {};

var navigate = (function () {

    function destinationArray(course, lesson, section) {
        if (!course) {
            return [];
        }

        if (!lesson) {
            return [course];
        }

        if (!section) {
            return [course, lesson];
        }

        return [course, lesson, section];
    }

    function loadPage(course, lesson, section) {
        if (lesson) {
            (pages[section] || pages["lesson"])(course, lesson);
            return;
        }

        if (course) {
            pages["course"](course);
            return;
        }

        pages["home"]();
    }

    function to(course, lesson, section) {
        var destination = destinationArray(course, lesson, section);

        // TODO replace that null?
        history.pushState(destination, null, destination.join("/"));
        loadPage(course, lesson, section);
    }


    function loadCurrentPage() {
        var currentPath = location.pathname.replace(/(\/?keelek)?\//, "");
        var currentPathSplit = currentPath.split("/");

        // TODO something in place of that null?
        history.replaceState(currentPathSplit, null, currentPath);
        loadPage.apply(this, currentPathSplit); 
    }

    // Set up the popstate handler
    window.addEventListener('popstate', function(e) {
        if (e.state) {
            loadPage.apply(this, e.state);
        }
    });


    return {
        loadCurrentPage: loadCurrentPage,
        to: to
    }
})();

// Take us to the page specified by the url
navigate.loadCurrentPage();
