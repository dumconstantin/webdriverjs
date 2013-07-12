exports.command = function (cssSelector, waitForMilliseconds, callback) {

    var self = this;
    var first = true;
    var startTimer = 0;

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
                        callback(err, result.value);
                    }
                });

            } else {

                if (now - startTimer < waitForMilliseconds) {
                    checkElement();
                    //setTimeout(checkElement, 50); // for some reason, this doesnt work
                } else if (typeof callback === "function") {
                    callback(err, result);
                }

            }

        });

    }

    checkElement();

};