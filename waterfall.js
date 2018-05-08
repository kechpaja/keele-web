// TODO create <div id="waterfall-tile-container"></div>
//
//
// TODO TODO TODO clean up this file!


waterfall = (function () {
    var tickSize = 0.05; // Percentage of page height
    var tickLength = 5; // Milliseconds

    var imageMaxHeight = 25; // Percentage of page height

   // var imageContainer = document.getElementById("waterfall-tile-container");

    // Function to create image tile
    function createImageTile(src, id) { /// TODO will eventually take src as base64-encoded img, right?
        var image = document.createElement("img");
        image.src = src; //"img/horn.jpg";
        image.id = id; 
        image.style = "position: absolute; left: 50%; bottom: 100%; transform: translate(-50%, 0)";
        image.style["max-height"] = imageMaxHeight + "%";
        return image;
    }

    //imageContainer.appendChild(image);

    function setupTiles() { // TODO fetch data from somewhere, eh?
        var imageContainer = document.getElementById("waterfall-tile-container");
        for (var i = 0; i < 2; i++) {
            imageContainer.appendChild(createImageTile("img/horn.jpg", "horn" + i));
        }
    }


    //while (parseInt(image.style.top) < 100) {
    //    image.style.top = (parseInt(image.style.top) + 5) + "%";
    //}

    // XXX sleep function from https://stackoverflow.com/a/39914235
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    // Function to advance a tile by one tick
    function advanceTile(tile, nextTile) {
        var stoppingPoint = 0; // TODO top of nextTile if nextTile is not null, otherwise 0

        if (nextTile !== null) {
            stoppingPoint = parseFloat(nextTile.style.bottom) + imageMaxHeight
        }

        var tileBottomPosition = parseFloat(tile.style.bottom);
        if (tileBottomPosition > stoppingPoint) {
            tile.style.bottom = (tileBottomPosition - tickSize) + "%";
            return true;
        }

        return false;
    }

    async function runWaterfall() {
        // TODO set up win/lose conditions for while loop
        var imageContainer = document.getElementById("waterfall-tile-container");
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

    //runWaterfall();


    /*
     * Scripts for removing a tile when the correct answer is given
     */

    function checkAnswer(e) {
        if (e.keyCode == 13 || e.which == 13) {
            var answerElement = document.getElementById("waterfall-answer-field");
            var text = answerElement.value;
            answerElement.value = "";

            // Remove tile if answer is correct
            var container = document.getElementById("waterfall-tile-container");
            var tiles = container.getElementsByTagName("img");
            if (tiles[0].id === text) { // TODO look up actual answers using ID
                tiles[0].remove();
            }
        }
    }


    // Called when switching context to waterfall
    function init() {
        var anchorElement = document.getElementById("anchor");
        anchorElement.innerHTML = "";

        var waterfallTileContainer = document.createElement("div");
        waterfallTileContainer.id = "waterfall-tile-container";
        anchorElement.appendChild(waterfallTileContainer);

        var startButton = document.createElement("button");
        startButton.innerHTML = "Start"; // TODO localize
        startButton.onclick = runWaterfall; // XXX does this work?
        anchorElement.appendChild(startButton);

        var answerField = document.createElement("input");
        answerField.type = "text";
        answerField.id = "waterfall-answer-field";
        answerField.onkeypress = checkAnswer; // XXX does this work?
        anchorElement.appendChild(answerField);


       setupTiles();
    }

    return {
        init: init()
    }
})();


// TODO create <button onclick="javascript:runWaterfall()">Start</button>

// TODO create <input type="text" id="waterfall-answer-field" onkeypress="javascript:checkAnswer(event)" />
