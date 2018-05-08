utils = (function () {
    // Sleep function from https://stackoverflow.com/a/39914235
    // Caller must be async
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    return {
        sleep: sleep
    }
})();
