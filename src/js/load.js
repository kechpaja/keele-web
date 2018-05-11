var load = (function () {
    var data = {};

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
            url = "data/index.json";
            whichData = "home";
        }

        if (data[whichData] && (!course || course === data[whichData].course)
                            && (!lesson || lesson === data[whichData].lesson)) {
            callback(data[whichData]);
        } else {
            // TODO we still have to do error checking here...
            fetch(url).then(function(response) {
                        return response.json();
                    }).then(function(jsonData) {
                        data[whichData] = jsonData;
                        callback(data[whichData]);
                    });
        }
    }

    return {
        load: load
    }
})();
