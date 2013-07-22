exports.command = function (cssSelector, waitForMilliseconds, callback) {

    var self = this;
    var first = true;
    var startTimer = 0;

    console.log(waitForMilliseconds);

    function checkElement() {

        self.element("css selector", cssSelector, function(err, result) {

            if (first) {
                startTimer = Date.now();
                first = false;
            }

            var now = Date.now();

            if(err === null) {
                self.elementIdDisplayed(result.value.ELEMENT, function(err, result) {
                    if (typeof callback === "function") {
                        if (false === result.value) {
                            callback(err, result.value);
                        } else {
                            if (now - startTimer < waitForMilliseconds.timeout) {
                                checkElement();
                            } else {
                                callback({
                                    message: "Time exceeded."
                                }, true);
                            }
                        }
                    }
                });
            } else {
                if (now - startTimer < waitForMilliseconds.timeout) {
                    checkElement();
                } else if (typeof callback === "function") {
                    callback(err, result);
                }

            }

        });

    }

    checkElement();

    return "test";
};