var pages = pages || {};

(function () {
    
    var data = {};

    function assemblePage() {
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
        // TODO error handling: fall back to nearest lesson page?
        fetch("data/" + language + "/lessons/" + lesson + "/grammar.json")
            .then(function(response) {
                return response.json();
            }).then(function(jsonData) {
                data = jsonData;
                assemblePage();
            });
    }

    pages.grammar = init;
})();
