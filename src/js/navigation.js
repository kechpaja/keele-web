(function () {
    
    var urlsubpath = location.pathname.replace(/(\/?keele)?\//, "");

    // Language, lesson, section
    
    var stateArray = urlsubpath.split("/");

    if (stateArray.length >= 3) {
        if (stateArray[2] === "grammar") {
            grammar.init(stateArray[0], stateArray[1]);
            return;
        }

        if (stateArray[2] === "waterfall") {
            waterfall.init(stateArray[0], stateArray[1]);
            return;
        }
    }

    // No section was given, but we have a language and lesson
    if (stateArray.length >= 2) {
        lesson.init(stateArray[0], stateArray[1]);
        return;
    }

    // TODO handle cases with one and zero


})();
