var pages = (function () {
    function displayCourse(data) {
        utils.addLinkTable(
            "lesson-list",
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
        data.grammar.sections.forEach(function(section) {
            var insides = "<h2>" + section.title + "</h2>" + section.content;
            utils.add(utils.create("div", insides));
        });
    }

    function displayHome(data) {
        utils.addLinkTable(
            "home-course-list",
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
        // TODO other games
        // TODO localize page names
        // TODO Or just replace with icons? Or get names from titles.
        var pageNames = {
            "grammar" : "Grammar",
            "vocab" : "Vocabulary",
            "waterfall" : "Waterfall"
        };

        utils.addLinkTable(
            "section-list",
            data.activities,
            function (item) { return pageNames[item]; },
            function (item) {
                return function () {
                    navigate.to(data.course, data.lesson, item);
                };
            });
    }


    function displayVocab(data) {
        // TODO some larger structure to put all of the items into? List?

        data.items.forEach(function(item) {
            var div = utils.createDiv("vocab-item-container");
            div.appendChild(utils.create("h2", item.item));
           
            // Translation in following paragraph
            // TODO part-of-speech information?
            // TODO joining with commas will work for words, but what
            // about longer phrases? Perhaps we can encase them in <em> tags
            // or something like that at some point. 
            div.appendChild(utils.create("p", item.translations.join(",")));

            var container = utils.createDiv("vocab-image-container");
            item.images.forEach(function(imageUrl) {
                container.append(utils.createImage("data/" + imageUrl,
                                                   "vocab-image-class"));
            });
            div.appendChild(container);

            // TODO Add all audio items (when they are ready), again
            // probably in their own container

            utils.add(div);
        })
    }

    return {
        course: displayCourse,
        grammar: displayGrammar,
        home: displayHome,
        lesson: displayLesson,
        vocab: displayVocab
    }
})();
