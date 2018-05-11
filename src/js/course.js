var pages = pages || {};

(function () {
    function assemblePage(data) {
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

    function init(course) {
        load.load(assemblePage, course);
    }

    pages.course = init;
})();
