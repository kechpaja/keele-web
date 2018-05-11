var pages = pages || {};

(function () {
    var tickSize = 0.05; // Percentage of page height
    var tickLength = 5; // Milliseconds

    var imageHeight = 25; // Percentage of page height

    var ids = {
        answerField: "answer-field",
        startButton: "start-button",
        startButtonText: "start-button-text",
        tileContainer: "tile-container"
    };

    var lessonData = [];

    // Function to create image tile
    function createImageTile(src, id) {
        var image = document.createElement("img");
        image.src = "data/" + src; // TODO some better way?
        image.id = id; 
        image.style.position = "absolute";
        image.style.left = "50%";
        image.style.bottom = "100%";
        image.style.transform = "translate(-50%, 0)";
        image.style["max-height"] = imageHeight + "%";
        image.style["min-height"] = imageHeight + "%";
        return image;
    }

    function setupTiles() {
        var imageContainer = document.getElementById(ids.tileContainer);

        // TODO scramble tiles beforehand
        for (var i = 0; i < lessonData.length; i++) {
            var tile = createImageTile(lessonData[i]["image"], i);
            imageContainer.appendChild(tile);
        }
    }

    // Function to advance a tile by one tick
    function advanceTile(tile, nextTile) {
        var stoppingPoint = 0;

        if (nextTile !== null) {
            stoppingPoint = parseFloat(nextTile.style.bottom) + imageHeight
        }

        var tileBottomPosition = parseFloat(tile.style.bottom);
        if (tileBottomPosition > stoppingPoint) {
            tile.style.bottom = (tileBottomPosition - tickSize) + "%";
            return true;
        }

        return false;
    }

    // Sleep function from https://stackoverflow.com/a/39914235
    // Caller must be async
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function runWaterfall() {
        // Get rid of the start button
        document.getElementById(ids.startButton).remove();

        // Focus the answer field
        document.getElementById(ids.answerField).focus();

        // TODO set up win/lose conditions for while loop
        var imageContainer = document.getElementById(ids.tileContainer);
        while (true) {
            var tiles = imageContainer.getElementsByTagName("img");
            var lastTile = null;
            for (var i = 0; i < tiles.length; i++) {
                if (advanceTile(tiles[i], lastTile)) {
                    break;
                }

                lastTile = tiles[i];
            }

            await sleep(tickLength);
        }
    }


    /*
     * Scripts for removing a tile when the correct answer is given
     */

    function checkAnswer(e) {
        if (e.keyCode == 13 || e.which == 13) {
            var answerElement = document.getElementById(ids.answerField);
            var text = answerElement.value;
            answerElement.value = "";

            // Remove tile if answer is correct
            var container = document.getElementById(ids.tileContainer);
            var tiles = container.getElementsByTagName("img");
            if (lessonData[tiles[0].id]["answers"].indexOf(text) > -1) {
                tiles[0].remove();
            }
        }
    }


    // Called when switching context to waterfall
    function init(language, lesson) {
        utils.clearPage();

        var tileContainer = document.createElement("div");
        tileContainer.id = ids.tileContainer
        anchor.appendChild(tileContainer);


        var startButton = document.createElement("button");
        startButton.id = ids.startButton;
        startButton.innerHTML = "<div id=\"" + ids.startButtonText + "\">"
                                   + "Start" + "</div>"; // TODO localize
        startButton.onclick = runWaterfall;
        anchor.appendChild(startButton);

        var answerField = document.createElement("input");
        answerField.type = "text";
        answerField.id = ids.answerField;
        answerField.onkeypress = checkAnswer;
        anchor.appendChild(answerField);

        // TODO error checking if resource doesn't exist
        // TODO add additional logic to convert data in lesson to waterfall
        // data. Currently, we store both separately on the server. 
        fetch("data/" + language + "/lessons/" + lesson + "/waterfall.json")
            .then(function(response) {
                return response.json();
            }).then(function(data) {
                lessonData = data;
                setupTiles();
            });
    }

    pages.waterfall = init;
})();
