var pages = pages || {};

(function () {
    function assemblePage(data) {
        utils.clearAnchor();

        utils.setTitle(data.title);

        // TODO vocab page and other games
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

    function init(course, lesson) {
        load.load(assemblePage, course, lesson);
    }

    pages.lesson = init;
})();
