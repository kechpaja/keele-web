var pages = pages || {};

(function () {
    var ids = {
        lessonList: "lesson-list",
    };

    function assemblePage(data) {
        utils.clearAnchor();

        utils.setTitle(data["title"]);

        utils.anchor().appendChild(
            utils.createLinkTable(
                ids.lessonList,
                data["lessons"],
                function (item) { return item["title"]; },
                function (item) {
                    var id = item["id"];
                    return function () { navigate.to(data.course, id); } 
                }));
                                                            
    }

    function init(course) {
        load.load(assemblePage, course);
    }

    pages.course = init;
})();
