var pages = pages || {};

var navigate = (function () {

    function destinationArray(language, lesson, section) {
        if (!language) {
            return [];
        }

        if (!lesson) {
            return [language];
        }

        if (!section) {
            return [language, lesson];
        }

        return [language, lesson, section];
    }

    function loadPage(language, lesson, section) {
        if (lesson) {
            (pages[section] || pages["lesson"])(language, lesson);
            return;
        }

        if (language) {
            pages["course"](language);
            return;
        }

        pages["home"]();
    }

    function to(language, lesson, section) {
        var destination = destinationArray(language, lesson, section);

        // TODO replace that null?
        history.pushState(destination, null, destination.join("/"));
        loadPage(language, lesson, section);
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
