var pages = pages || {};

(function () {
    function assemblePage(data) {
        //utils.setTitle(data.title); // XXX this one needs this, but 
        // since we're getting rid of it 

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
                //var data = data;
                //var item = item;
                return function () {
                    //utils.setTitle(pageNames[item]);
                    navigate.to(data.course, data.lesson, item);
                };
            });
    }

    function init(course, lesson) {
        load.load(assemblePage, course, lesson);
    }

    pages.lesson = init;
})();
