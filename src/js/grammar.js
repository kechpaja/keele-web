(function () {
    
    var data = [];


    function assemblePage() {
        // Create title and grammar-sections elements
        var anchor = document.getElementById("anchor");
        anchor.innerHTML = "";
        
        var title = document.createElement("h1");
        title.id = "title";
        title.innerHTML = data["title"];
        anchor.appendChild(title);

        var sections = document.createElement("div");
        sections.id = "grammar-sections";
        anchor.appendChild(sections);

        data["sections"].forEach(function(sec) {
            var div = document.createElement("div");
            div.innerHTML = "<h2>" + sec["heading"] + "</h2>" + sec["content"];
            sections.appendChild(div);
        });
    }


    function init() {
        // TODO find a better way to do this!
        var unsafeUrl = location.href.split("?")[1].split("=")[1];

        // TODO error handling
        fetch("data/" + decodeURIComponent(unsafeUrl))
            .then(function(response) {
                return response.json();
            }).then(function(jsonData) {
                data = jsonData;
                assemblePage();
            });
    }

    init();
})();
