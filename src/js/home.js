var pages = pages || {};

(function () {
    function assemblePage(data) {
        utils.clearAnchor();

        // TODO should we loc that string?
        utils.setTitle("Keelek");

        utils.addLinkTable(
            "home-course-list",
            data,
            function (item) { return item.title; },
            function (item) { return function () { navigate.to(item.id); }; });
    }

    function init() {
        load.load(assemblePage);
    }

    pages.home = init;
})();
