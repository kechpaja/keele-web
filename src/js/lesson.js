var pages = pages || {};

(function () {

    var data = {};

    var ids = {
        sectionList: "section-list",
        title: "lesson-title"
    };

    // Returns a table row containing a link
    function createLink(name, onclick) {
        var link = document.createElement("a");
        link.onclick = onclick;
        link.innerHTML = name;
        link.href = "javascript:void(0);";

        var column = document.createElement("td");
        column.appendChild(link);

        var row = document.createElement("tr");
        row.appendChild(column);
        return row;
    }

    function assemblePage() {
        utils.clearAnchor();

        utils.anchor().appendChild(utils.createTitle(ids.title, data["title"]));

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
        // TODO cache this, or at least only do it if it hasn't alreay happened
        // TODO error handling
        fetch("data/" + language + "/lessons/" + lesson + "/lesson.json")
            .then(function(response) {
                return response.json();
            }).then(function(jsonData) {
                data = jsonData;
                data.language = language;
                data.lesson = lesson;
                assemblePage();
            });

        // TODO show a spinner or something
    }

    pages.lesson = init;
})();
