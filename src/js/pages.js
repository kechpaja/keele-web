var pages = (function () {
    function displaySectionsBar(data) {
        ["grammar", "vocab", "games", "texts"].forEach(function(buttonName) {
            utils.get(buttonName + "-button").onclick = function () {
                navigate.to(data.course, data.lesson, buttonName);
            }
        });
    }

    function displayCourse(data) {
        utils.addLinkTable(
            "course-anchor",
            data.lessons,
            function (item) { return item.title; },
            function (item) {
                return function () {
                    utils.setTitle(item.title); // Change title ASAP
                    navigate.to(data.course, item.id); 
                };
            });
    }

    function displayGrammar(data) {
        displaySectionsBar(data);

        var div = utils.getCleared("grammar-anchor");
        data.grammar.sections.forEach(function(section) {
            div.innerHTML += "<div><h2>" + section.title + "</h2>" 
                                         + section.content + "</div>";
        });
    }

    function displayHome(data) {
        utils.addLinkTable(
            "home-anchor",
            data,
            function (item) { return item.title; },
            function (item) { 
                return function () { 
                    utils.setTitle(item.title);
                    navigate.to(item.id); 
                }; 
            });
    }

    function displayLesson(data) {
        displaySectionsBar(data);

        // TODO other games
        // TODO localize page names
        // TODO Or just replace with icons? Or get names from titles.
        var pageNames = {
            "grammar" : "Grammar",
            "vocab" : "Vocabulary",
            "waterfall" : "Waterfall"
        };

        utils.addLinkTable(
            "lesson-anchor",
            data.activities,
            function (item) { return pageNames[item]; },
            function (item) {
                return function () {
                    navigate.to(data.course, data.lesson, item);
                };
            });
    }


    function displayVocab(data) {
        displaySectionsBar(data);

        var anchor = utils.getCleared("vocab-anchor");

        // TODO some larger structure to put all of the items into? List?

        data.items.forEach(function(item) {
            var div = "<div><h2>" + item.item + " (" + item.pos + ")</h2>";

            div += "<p>" + item.translations.join(",") + "</p>";

            div += "<div class='vocab-image-container'>";
            item.images.forEach(function(imgUrl) {
                div += "<img src='data/" + imgUrl + "'></img>";
            });
            div += "</div>";

            // TODO Add all audio items (when they are ready), again
            // probably in their own container

            anchor.innerHTML += div + "</div>";
        });
    }

    return {
        course: displayCourse,
        grammar: displayGrammar,
        home: displayHome,
        lesson: displayLesson,
        vocab: displayVocab
    };
})();
