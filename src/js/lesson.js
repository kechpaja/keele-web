var pages = pages || {};

(function () {

    var ids = {
        sectionList: "section-list"
    };

    function assemblePage(data) {
        utils.clearAnchor();

        utils.setTitle(data["title"]);

        // TODO vocab page and other games
        // TODO localize page names
        // TODO Or just replace with icons? Or get names from titles.
        var pageNames = {
            "grammar" : "Grammar",
            "vocab" : "Vocabulary",
            "waterfall" : "Waterfall"
        };

        utils.anchor().appendChild(
            utils.createLinkTable(
                ids.sectionList,
                data["activities"],
                function (item) { return pageNames[item]; },
                function (item) {
                    return function () { 
                        navigate.to(data.language, data.lesson, item);
                    };
                }));
    }

    function init(language, lesson) {
        load.lesson(language, lesson, assemblePage);
    }

    pages.lesson = init;
})();
