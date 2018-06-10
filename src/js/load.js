var load = (function () {
    var data = {};

    function wrapAssemblePage(callback, pageData) {
        utils.setTitle(pageData.title || "Keelek"); // TODO loc?
        callback(pageData);
    }

    // TODO do we need a spinner when loading? 
    function load(course, lesson, section) {
        utils.hideAll();

        var callback, url, whichData;

        // TODO try and re-write this in fewer lines, but later. 
        if (lesson) {
            if (section in games) {
                games[section](course, lesson);
                return; // Nothing more to do here, for now at least
            } else {
                callback = pages[section] || pages.grammar;
            }

            url = "data/" + course + "/lessons/" + lesson + ".json";
            whichData = "lesson";
        } else if (course) {
            callback = pages.course;
            url = "data/" + course + "/index.json";
            whichData = "course";
        } else {
            // Set title pre-emptively, as this is the one case where it
            // is not going to be handled elsewhere when there is data to load. 
            utils.setTitle("Keelek"); // TODO loc this?

            callback = pages.home;
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

    return load;
})();
