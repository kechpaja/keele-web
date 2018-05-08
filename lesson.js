lesson = (function () {

    var lessonData = [];

    // Returns a table row containing a link
    function createLinkToSection(name, onclick) {
        var link = utils.createElement("a", name);
        var column = utils.createElement("td");
        var row = utils.createElement("tr");
        
        link.onclick = onclick;
        column.appendChild(link);
        row.appendChild(column);

        return row;
    }

    function init() {
        // TODO cache this, or at least only do it if it hasn't alreay happened
        fetch("test-lesson.json")
            .then(function(response) {
                return response.json();
            }).then(function(data) {
                lessonData = data;
            });

        var anchor = utils.getAnchor();

        anchor.appendChild(utils.createElement("h1", lessonData["title"]));

        // TODO localize name
        anchor.appendChild(createLinkToSection("Waterfall", function () {
            waterfall.init(); // TODO will probably have to pass arg in future
        }));

    }

    return {
        init: init
    };
})();
