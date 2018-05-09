var pages = pages || {};

(function () {

    var data = [];

    // Returns a table row containing a link
    function createLinkToSection(name, onclick) {
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
        var anchor = document.getElementById("anchor");
        anchor.innerHTML = "";

        var title = document.createElement("h1");
        title.id = "title";
        title.innerHTML = data["title"];
        anchor.appendChild(title);

        var lessonList = document.createElement("table");
        lessonList.id = "lesson-list";
        anchor.appendChild(lessonList);

        // TODO vocab page and other games
        // TODO load these pages using JS, not links! Use history API!
        // TODO localize page name
        if (data["grammar"]) {
            //var href = data.language + "/" + data.lesson + "/grammar";
            lessonList.appendChild(createLinkToSection("Grammar", function() {
                navigate.to(data.language, data.lesson, "grammar");
            }));
        }
       
       // TODO localize page name
        if (data["waterfall"]) {
            var href = data.language + "/" + data.lesson + "/waterfall";
            lessonList.appendChild(createLinkToSection("Waterfall", function() {
                navigate.to(data.language, data.lesson, "waterfall");
            }));
        }
    }

    function init(language, lesson) {
        // TODO cache this, or at least only do it if it hasn't alreay happened
        //
        // Fetch data url from query string
        // TODO this is *very* hacky. Write something nicer later. 
        //var unsafeUrl = location.href.split("?")[1].split("=")[1];

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
