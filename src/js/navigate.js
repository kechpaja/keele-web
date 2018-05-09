var pages = pages || {};

var navigate = (function () {

    function loadPage(language, lesson, section) {
        if (language && lesson) {
            (pages[section] || pages["lesson"])(language, lesson);
        } 

        // TODO handle cases without lesson or language
        // TODO this will mean writing index pages
    }

    function to(language, lesson, section) {
        // TODO replace that null?
        history.pushState(arguments, null, arguments.join("/"));
        loadPage.apply(this, arguments);
    }


    function loadCurrentPage() {
        var currentPath = location.pathname.replace(/(\/?keele)?\//, "");
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
