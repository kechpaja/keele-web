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

    function displayGames(data) {
        displaySectionsBar(data);

        utils.addLinkTable(
            "games-anchor",
            ["waterfall"], // TODO localize next line
            function (item) { return {"waterfall" : "Waterfall"}[item]; },
            function (item) {
                return function () {
                    utils.setTitle(item.title); // TODO Maybe not?
                    navigate.to(data.course, data.lesson, "waterfall");
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
        games: displayGames,
        grammar: displayGrammar,
        home: displayHome,
        vocab: displayVocab
    };
})();
