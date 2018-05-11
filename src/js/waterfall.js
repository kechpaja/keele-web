var games = games || {};

(function () {
    var tickSize = 0.05; // Percentage of page height
    var tickLength = 5; // Milliseconds

    // TODO figure out how to do away with this
    var imageHeight = 25; // Percentage of page height

    var ids = {
        answerField: "waterfall-answer-field",
        startButton: "waterfall-start-button",
        tileContainer: "waterfall-tile-container"
    };

    var lessonData = [];

    function setupTiles() {
        var div = utils.getCleared(ids.tileContainer);

        // TODO scramble tiles beforehand
        for (var i = 0; i < lessonData.length; i++) {
            // Currently, we depend on the style.bottom attribute of the tile 
            // being set in order to advance it. It's been set in CSS, but
            // we'll set it again here for now. Maybe there will be some
            // workaround at some point. 
            utils.add(div, "<img src='data/" + lessonData[i].image
                            + "' style='bottom: 100%' id='" + i + "'></img>");
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
        utils.hide(ids.startButton);

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
    function init(course, lesson) {
        utils.hideHeader();

        utils.show("waterfall-anchor");
        
        var startButton = utils.get(ids.startButton);
        utils.show(startButton);
        // TODO localize!
        startButton.getElementsByTagName("div")[0].innerHTML = "Start";
        startButton.onclick = runWaterfall;

        document.getElementById(ids.answerField).onkeypress = checkAnswer;

        // TODO error checking if resource doesn't exist
        // TODO add additional logic to convert data in lesson to waterfall
        // data. Currently, we store both separately on the server. 
        fetch("data/" + course + "/lessons/" + lesson + "/waterfall.json")
            .then(function(response) {
                return response.json();
            }).then(function(data) {
                lessonData = data;
                setupTiles();
            });
    }

    games.waterfall = init;
})();
