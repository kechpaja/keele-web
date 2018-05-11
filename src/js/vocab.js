var pages = pages || {};

(function () {
    function assemblePage(data) {

        // TODO some larger structure to put all of the items into? List?

        data.items.forEach(function(item) {
            var div = utils.createDiv("vocab-item-container");

            // Item as heading
            div.appendChild(utils.create("h2", item.item));
           
            // Translation in following paragraph
            // TODO part-of-speech information?
            // TODO joining with commas will work for words, but what
            // about longer phrases? Perhaps we can encase them in <em> tags
            // or something like that at some point. 
            div.appendChild(utils.create("p", item.translations.join(",")));

            // Add all images in their own container
            var container = utils.createDiv("vocab-image-container");
            item.images.forEach(function(imageUrl) {
                container.append(utils.createImage("data/" + imageUrl,
                                                   "vocab-image-class"));
            });
            div.appendChild(container);

            // TODO Add all audio items (when they are ready), again
            // probably in their own container

            utils.anchor().appendChild(div);
        })
    }

    function init(course, lesson) {
        load.load(assemblePage, course, lesson); 
    }

    pages.vocab = init;
})();
