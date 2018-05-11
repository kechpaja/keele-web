var pages = pages || {};

(function () {

    var ids = {
        courseList: "home-course-list",
        title: "home-page-title" // TODO should probably have a common title?
    };

    function assemblePage(data) {
        utils.clearAnchor();

        // TODO should we loc that string?
        utils.anchor().appendChild(utils.createTitle(ids.title, "Keelek"));

        utils.anchor().appendChild(
            utils.createLinkTable(
                ids.courseList,
                data,
                function (item) { return item["title"]; },
                function (item) {
                    return function () { 
                        navigate.to(item["id"]);
                    };
                }));
    }

    function init() {
        load.home(assemblePage);
    }

    pages.home = init;
})();
