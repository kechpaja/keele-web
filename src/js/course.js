var pages = pages || {};

(function () {
    function assemblePage(data) {
        utils.clearAnchor();

        utils.setTitle(data.title);

        utils.addLinkTable(
            "lesson-list",
            data.lessons,
            function (item) { return item.title; },
            function (item) {
                var id = item.id;
                return function () { navigate.to(data.course, id); }
            });
                                                            
    }

    function init(course) {
        load.load(assemblePage, course);
    }

    pages.course = init;
})();
