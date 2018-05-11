var pages = pages || {};

(function () {

    var data = {}

    var ids = {
        lessonList: "lesson-list",
    };

    function assemblePage() {
        utils.clearAnchor();

        utils.setTitle(data["title"]);

        utils.anchor().appendChild(
            utils.createLinkTable(
                ids.lessonList,
                data["lessons"],
                function (item) { return item["title"]; },
                function (item) {
                    var id = item["id"];
                    return function () { navigate.to(data.language, id); } 
                }));
                                                            
    }

    function init(language) {
        // TODO error checking, caching, etc.
        fetch("data/" + language + "/index.json")
            .then(function(response) {
                return response.json();
            }).then(function(jsonData) {
                data = jsonData;
                data.language = language;
                assemblePage();
            });
    }

    pages.course = init;
})();
