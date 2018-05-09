var pages = pages || {};

var navigate = (function () {

    function getCurrentPath() {
        return location.pathname.replace(/(\/?keele)?\//, "");
    }

    function getCurrentPathSplit() {
        return getCurrentPath().split("/");
    }

    function concatPath(language, lesson, section) {
        return language + "/" + lesson + "/" + section;
    }

    function loadPage(language, lesson, section) {
        if (language && lesson) {
            (pages[section] || pages["lesson"])(language, lesson);
        } 

        // TODO handle cases without lesson or language
    }

    function to(language, lesson, section) {
        history.pushState(getCurrentPathSplit(), 
                          null, 
                          concatPath(language, lesson, section));

        loadPage(language, lesson, section); // TODO push state here
    }


    function loadCurrentPage() {
        loadPage.apply(this, getCurrentPathSplit());

        // TODO do we need to replace state here? 
    }

    // Set up the popstate handler
    window.addEventListener('popstate', function(e) {
        if (e.state) {
            loadPage.apply(this, history.state);
        }
    });


    return {
        loadCurrentPage: loadCurrentPage,
        to: to
    }
})();

// Take us to the page specified by the url
navigate.loadCurrentPage();
