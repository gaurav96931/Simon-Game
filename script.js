var buttonColours = ["red", "blue", "green", "yellow"];
var pattern = [];
var gameLevel = 1;
var started = false;
var itr = 0;

$(".button").click(function () {
    var buttonColor = $(this).attr("id");
    blink(buttonColor);
    if (started) {
        if (buttonColor != pattern[itr++]) {
            gameOver();
        } else {
            if (itr === pattern.length) {
                gameLevel++;
                $("#level").text("Level " + gameLevel);
                itr = 0;
                setTimeout(nextSequence, 500);
            }
        }
    } else {
        wrong();
    }
});

$(document).keypress(function () {
    if (!started) {
        gameStart();
    }
});

function gameStart() {
    pattern = [];
    gameLevel = 1;
    itr = 0;
    started = true;
    $("#level").text("Level " + gameLevel);
    setTimeout(nextSequence, 300);
}

function nextSequence() {
    var randomItr = Math.floor(Math.random() * 4);
    var randomColour = buttonColours[randomItr];
    pattern.push(randomColour);

    setTimeout(blink(randomColour), 200);
}

function gameOver() {
    started = false;
    $("#level").text("Game Over!!! Press any key to restart");
    wrong();
}

function wrong() {
    $("body").addClass("red");
    setTimeout(function () {
        $("body").removeClass("red");
    }, 100);
    playSound("wrong");
}

function blink(buttonColor) {
    $("#" + buttonColor).addClass("pressed");
    setTimeout(function () {
        $("#" + buttonColor).removeClass("pressed");
    }, 100);
    playSound(buttonColor);
}

function playSound(name) {
    var audio = new Audio("./sounds/" + name + ".mp3");
    audio.play();
}
