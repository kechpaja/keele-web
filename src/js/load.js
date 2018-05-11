var load = (function () {

    var lessonData = null;

    // TODO consider showing a spinner here when necessary
    function lesson(language, lesson, callback) {
         if (lessonData && lessonData.language === language 
                        && lessonData.lesson === lesson) {
            callback(lessonData);
         } else {
            // TODO error checking and all that jazz
            fetch("data/" + language + "/lessons/" + lesson + "/lesson.json")
                .then(function(response) {
                    return response.json();
                }).then(function(jsonData) {
                    lessonData = jsonData;

                    // TODO perhaps these fields should come from server?
                    lessonData.language = language;
                    lessonData.lesson = lesson;
                    callback(lessonData);
                });
         }
    }

    return {
        lesson: lesson
    }
})();
