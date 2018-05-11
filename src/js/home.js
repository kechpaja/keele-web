var pages = pages || {};

(function () {
    function assemblePage(data) {
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

    function init() {
        load.load(assemblePage);
    }

    pages.home = init;
})();
