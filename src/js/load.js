var load = (function () {
    var data = {};

    function wrapAssemblePage(callback, pageData) {
        utils.setTitle(pageData.title || "Keelek"); // TODO loc?
        callback(pageData);
    }

    // TODO do we need a spinner when loading? 
    // The generalized version
    function load(callback, course, lesson) {
        var url, whichData;

        // TODO try and re-write this in fewer lines, but later. 
        if (lesson) {
            url = "data/" + course + "/lessons/" + lesson + "/lesson.json";
            whichData = "lesson";
        } else if (course) {
            url = "data/" + course + "/index.json";
            whichData = "course";
        } else {
            // Set title pre-emptively, as this is the one case where it
            // is not going to be handled elsewhere. 
            utils.setTitle("Keelek"); // TODO loc this?
            url = "data/index.json";
            whichData = "home";
        }

        if (data[whichData] && (!course || course === data[whichData].course)
                            && (!lesson || lesson === data[whichData].lesson)) {
            wrapAssemblePage(callback, data[whichData]);
        } else {
            // TODO we still have to do error checking here...
            fetch(url).then(function(response) {
                        return response.json();
                    }).then(function(jsonData) {
                        data[whichData] = jsonData;
                        wrapAssemblePage(callback, data[whichData]);
                    });
        }
    }

    function loadPage(course, lesson, section) {
        utils.clearAnchor(); // XXX here? Clear anchor as soon as we know that
                             // we're navigating somewhere else.

        if (lesson) {
            // TODO change this to easier way when waterfall has been updated
            // games[section] || pages[section] || pages.lesson
            if (section in games) {
                games[section](course, lesson);
            } else {
                load(pages[section] || pages.lesson, course, lesson);
            }
            return;
        }

        if (course) {
            load(pages.course, course);
            return;
        }

        load(pages.home);
    }

    return {
        loadPage: loadPage
    }
})();
