(function () {

    var lessonData = [];

    // Returns a table row containing a link
    function createLinkToSection(name, href) {
        var row = document.createElement("tr");
        row.innerHTML = "<td><a href=\"" + href + "\">" + name + "</a></td>";
        return row;
    }



    function assemblePage() {
        document.getElementById("title").innerHTML = lessonData["title"];

        var lessonList = document.getElementById("lesson-list");
       
       // TODO localize page name
        if (lessonData["waterfall"]) {
            var href = "waterfall.html?data=" + lessonData["waterfall"];
            lessonList.appendChild(createLinkToSection("Waterfall", href));
        }
    }

    function init() {
        // TODO cache this, or at least only do it if it hasn't alreay happened
        fetch("test-lesson.json")
            .then(function(response) {
                return response.json();
            }).then(function(data) {
                lessonData = data;
                assemblePage();
            });
    }

    init();
})();
