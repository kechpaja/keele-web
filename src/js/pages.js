var pages = pages || {};

(function () {

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

    pages.course = function (course) {
        load.load(displayCourse, course);
    }




    function displayGrammar(lessonData) {
        var data = lessonData.grammar;

        var sections = document.createElement("div");
        sections.id = "grammar-sections";
        utils.anchor().appendChild(sections);

        data.sections.forEach(function(sec) {
            var div = document.createElement("div");
            div.innerHTML = "<h2>" + sec.heading + "</h2>" + sec.content;
            sections.appendChild(div);
        });
    }

    pages.grammar = function (course, lesson) {
        load.load(displayGrammar, course, lesson);
    };



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

    pages.home = function () {
        load.load(displayHome);
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

    pages.lesson = function (course, lesson) {
        load.load(displayLesson, course, lesson);
    }

})();
