(function () {

    var lessonData = [];

    // Returns a table row containing a link
    function createLinkToSection(name, href) {
        var row = document.createElement("tr");
        row.innerHTML = "<td><a href=\"" + href + "\">" + name + "</a></td>";
        return row;
    }



    function assemblePage() {
        var anchor = document.getElementById("anchor");
        anchor.innerHTML = "";

        var title = document.createElement("h1");
        title.id = "title";
        title.innerHTML = lessonData["title"];
        anchor.appendChild(title);

        var lessonList = document.createElement("table");
        lessonList.id = "lesson-list";
        anchor.appendChild(lessonList);

        // TODO vocab page and other games
        //
        // TODO localize page name
        if (lessonData["grammar"]) {
            var href = "grammar.html?data=" + lessonData["grammar"];
            lessonList.appendChild(createLinkToSection("Grammar", href));
        }
       
       // TODO localize page name
        if (lessonData["waterfall"]) {
            var href = "waterfall.html?data=" + lessonData["waterfall"];
            lessonList.appendChild(createLinkToSection("Waterfall", href));
        }
    }

    function init() {
        // TODO cache this, or at least only do it if it hasn't alreay happened
        //
        // Fetch data url from query string
        // TODO this is *very* hacky. Write something nicer later. 
        var unsafeUrl = location.href.split("?")[1].split("=")[1];

        // TODO error handling
        fetch("data/" + decodeURIComponent(unsafeUrl))
            .then(function(response) {
                return response.json();
            }).then(function(data) {
                lessonData = data;
                assemblePage();
            });

        // TODO show a spinner or something
    }

    init();
})();
