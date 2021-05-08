// DOM Access
const GALLERIES = document.querySelectorAll(".card-gallery");
const GALLERIES_LEFT_BTTNS = document.querySelectorAll(".card-gallery-left-bttn");
const GALLERIES_RIGHT_BTTNS = document.querySelectorAll(".card-gallery-right-bttn");
const GALLERIES_CONTENTS = document.querySelectorAll(".card-gallery-content");


// Gallery auto infinite scrolling
const DEFAULT_SCROLL_SPEED = 0.05;
const MAX_SCROLL_SPEED = 5;
const DEFAULT_SCROLL_VECTOR = 1;  // This number must always be positive for card gallery buttons to work as intended

if (GALLERIES.length !== GALLERIES_CONTENTS.length ||
    GALLERIES_LEFT_BTTNS.length !== GALLERIES.length ||
    GALLERIES_RIGHT_BTTNS.length !== GALLERIES.length
) {
    console.log("ERROR: Card gallery elements does not match each other");
} else {
    // Duplicate the contents of card gallery for infinite scrolling effect, only if that card gallery overflows
    let scrollables = [];
    for (let index = 0; index < GALLERIES_CONTENTS.length; index++) {
        if (GALLERIES_CONTENTS[index].clientWidth < GALLERIES_CONTENTS[index].scrollWidth) {
            scrollables.push(true);
            GALLERIES_CONTENTS[index].childNodes.forEach(function (item) {
                let cloneItem = item.cloneNode(true);
                GALLERIES_CONTENTS[index].appendChild(cloneItem);
            });
        } else {
            scrollables.push(false);
            GALLERIES_LEFT_BTTNS[index].setAttribute("style", "display: none;");
            GALLERIES_RIGHT_BTTNS[index].setAttribute("style", "display: none;");
        }
    }

    // Scrolling implementation
    let scrollVector = DEFAULT_SCROLL_VECTOR;
    let scrollStatus = [];
    let scrollFastStatus = [];
    let scrollPositions = [];
    for (let index = 0; index < GALLERIES.length; index++) {
        if (!scrollables[index]) {
            scrollStatus.push(null);
            scrollFastStatus.push(null);
            scrollPositions.push(null);
        } else {
            // Initializations
            scrollStatus.push(true);
            scrollFastStatus.push(false);
            scrollPositions.push(0);

            // Auto scrolling
            setInterval(function () {
                if (scrollStatus[index]) {
                    GALLERIES_CONTENTS[index].scroll(scrollPositions[index], 0);
                    scrollPositions[index] += scrollVector;
                }
            }, 1 / DEFAULT_SCROLL_SPEED);

            // Stop scrolling on mouseover and touch events
            GALLERIES_CONTENTS[index].addEventListener("mouseenter", function () {
                scrollStatus[index] = false;
            });

            GALLERIES_CONTENTS[index].addEventListener("touchstart", function () {
                scrollStatus[index] = false;
            });

            GALLERIES_CONTENTS[index].addEventListener("mouseleave", function () {
                scrollStatus[index] = true;
            });

            GALLERIES_CONTENTS[index].addEventListener("touchend", function () {
                setTimeout(function () {
                    scrollStatus[index] = true;
                    scrollPositions[index] = GALLERIES_CONTENTS[index].scrollLeft;
                }, 300);  // Smooth scrolling buffer duration of 300ms
            });

            GALLERIES_LEFT_BTTNS[index].addEventListener("mouseenter", function () {
                scrollStatus[index] = false;
            });

            GALLERIES_LEFT_BTTNS[index].addEventListener("mouseleave", function () {
                scrollStatus[index] = true;
            });

            GALLERIES_RIGHT_BTTNS[index].addEventListener("mouseenter", function () {
                scrollStatus[index] = false;
            });

            GALLERIES_RIGHT_BTTNS[index].addEventListener("mouseleave", function () {
                scrollStatus[index] = true;
            });

            // Gallery buttons behaviors
            setInterval(function () {
                if (scrollFastStatus[index] && scrollPositions[index] >= 0) {
                    GALLERIES_CONTENTS[index].scroll(scrollPositions[index], 0);
                    scrollPositions[index] += scrollVector;
                }
            }, 1 / MAX_SCROLL_SPEED);

            GALLERIES_LEFT_BTTNS[index].addEventListener("mousedown", function () {
                scrollFastStatus[index] = true;
                scrollVector = -DEFAULT_SCROLL_VECTOR * MAX_SCROLL_SPEED;
            });

            GALLERIES_LEFT_BTTNS[index].addEventListener("mouseup", function () {
                scrollFastStatus[index] = false;
                scrollVector = DEFAULT_SCROLL_VECTOR;
            });

            GALLERIES_RIGHT_BTTNS[index].addEventListener("mousedown", function () {
                scrollFastStatus[index] = true;
                scrollVector = DEFAULT_SCROLL_VECTOR * MAX_SCROLL_SPEED;
            });

            GALLERIES_RIGHT_BTTNS[index].addEventListener("mouseup", function () {
                scrollFastStatus[index] = false;
                scrollVector = DEFAULT_SCROLL_VECTOR;
            });

            // Infinite scrolling
            setInterval(function () {
                if (scrollPositions[index] < 0) {
                    scrollPositions[index] = GALLERIES_CONTENTS[index].scrollWidth / 2;
                } else if (scrollPositions[index] > GALLERIES_CONTENTS[index].scrollWidth / 2) {
                    scrollPositions[index] = 0;
                }
            }, 1 / MAX_SCROLL_SPEED);
        }
    }
}
