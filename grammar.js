(function () {
    
    var data = [];


    function assemblePage() {
        document.getElementById("title").innerHTML = data["title"];

        var sections = document.getElementById("grammar-sections");
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
        fetch(decodeURIComponent(unsafeUrl))
            .then(function(response) {
                return response.json();
            }).then(function(jsonData) {
                data = jsonData;
                assemblePage();
            });
    }

    init();
})();
