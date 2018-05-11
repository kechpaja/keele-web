var pages = pages || {};

(function () {
    
    function assemblePage(data) {
        utils.clearAnchor();

        utils.setTitle(data["title"]);

        var sections = document.createElement("div");
        sections.id = "grammar-sections";
        anchor.appendChild(sections);

        data["sections"].forEach(function(sec) {
            var div = document.createElement("div");
            div.innerHTML = "<h2>" + sec["heading"] + "</h2>" + sec["content"];
            sections.appendChild(div);
        });
    }


    function init(language, lesson) {
        load.lesson(language, lesson, function (data) {
            assemblePage(data["grammar"])
        });
    }

    pages.grammar = init;
})();
