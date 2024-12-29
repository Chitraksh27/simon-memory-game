// Variables to store game data
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
let debounce = false; // To prevent multiple triggers on a single event

// Start game on title click or touch
$("#level-title").on("pointerdown", function () {
    if (!started) {
        startGame();
    }
});

// Function to initialize and start the game
function startGame() {
    level = 0;  
    gamePattern = [];  
    userClickedPattern = [];  
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;  
}

// Generate the next sequence
function nextSequence() {
    userClickedPattern = [];  
    level++;  
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour)
        .fadeIn(100)
        .fadeOut(100)
        .fadeIn(100);  
    playSound(randomChosenColour);  
}

// Handle button clicks or taps
$(".btn").on("pointerdown", function () {
    if (debounce || !started) return;
    debounce = true;
    setTimeout(() => debounce = false, 200); // Prevent double triggers

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);  

    playSound(userChosenColour);  
    animatePress(userChosenColour);  

    checkAnswer(userClickedPattern.length - 1);  
});

// Play sound for a given color
function playSound(name) {
    var sound = new Audio("sounds/" + name + ".mp3");
    sound.play().catch((error) => {
        console.error("Audio playback failed:", error);
    });
}

// Animate button press
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

// Check the user's answer
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {  
            setTimeout(function () {
                nextSequence();  
            }, 1000);
        }
    } else {
        playSound("wrong");  

        $("body").addClass("game-over");  
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Tap Here to Restart");  
        startOver();  
    }
}

// Reset the game
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;  
}