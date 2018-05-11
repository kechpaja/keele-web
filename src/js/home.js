var pages = pages || {};

(function () {
    var ids = {
        courseList: "home-course-list"
    };

    function assemblePage(data) {
        utils.clearAnchor();

        // TODO should we loc that string?
        utils.setTitle("Keelek");

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
        load.load(assemblePage);
    }

    pages.home = init;
})();
