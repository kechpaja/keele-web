var pages = pages || {};

(function () {
    function createImage(src) {
        var image = document.createElement("img");
        image.src = "data/" + src;
        image.className = "vocab-image-class";

        // TODO any other important fields?

        return image;
    }

    function assemblePage(data) {

        // TODO some larger structure to put all of the items into? List?

        data.items.forEach(function(item) {
            var div = document.createElement("div");
            div.className = "vocab-item-container";

            // Item as heading
            var heading = document.createElement("h2");
            heading.innerHTML = item.item;
            div.appendChild(heading);
           
            // Translation in following paragraph
            // TODO part-of-speech information?
            var translation = document.createElement("p");
            // TODO joining with commas will work for words, but what
            // about longer phrases? Perhaps we can encase them in <em> tags
            // or something like that at some point. 
            translation.innerHTML = item.translations.join(", ");
            div.appendChild(translation);

            // Add all images in their own container
            var imageContainer = document.createElement("div");
            imageContainer.className = "vocab-image-container";
            item.images.forEach(function(imageUrl) {
                imageContainer.appendChild(createImage(imageUrl));
            });
            div.appendChild(imageContainer);

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
