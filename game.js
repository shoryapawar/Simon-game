var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];

var userClickedPattern = [];

var level = 0;

var started = false;
$(document).keydown(function() {

  if (!started) {
    $("#level-title").text("Level " + level);
    nextsequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id"); // it stores the id of btn that got clicked
  userClickedPattern.push(userChosenColour);

  playsound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) { //USER doing fine .

     if (userClickedPattern.length === gamePattern.length) {
       setTimeout(function() {
       nextsequence();
        }, 1000);
      }
  } else { // User get wrong

    playsound("wrong");
    $("body").addClass("game-over");

    setTimeout(function() {
      $("body").removeClass("game-over");
     }, 200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startover();

  }
}

function nextsequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  playsound(randomChosenColour);

}
//function to Play sound
function playsound(name) {
  var audio = new Audio("sounds/" + name + ".mp3")
  audio.play();
}
//ANIMATION
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
//Function to Restart the game.
function startover() {
  level = 0;
  started = false;
  gamePattern = [];
}
