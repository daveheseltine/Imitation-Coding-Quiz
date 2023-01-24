// # Define Global Variables
var scoreCount;
var quizStage;
var timerCount = 0;


// # Define Functions
// ## Function to go to the "End-Screen" element:
function goEndScreen() {
  clearInterval(timer);
  if (timerCount <= 0) {
    timerCount = 0;
  }
  document.querySelector("#time").textContent = timerCount;
  document.querySelector("#final-score").textContent = timerCount + ", with " + scoreCount + " out of " + questions.length + " correct answers!";
  document.querySelector("#questions").setAttribute("class", "hide");
  document.querySelector("#end-screen").setAttribute("class", "visible");
}
// ## Function to go to the "Highscores" element:
function goHighscores() {
  document.querySelector("#end-screen").setAttribute("class", "hide");
  window.location.href="highscores.html";
}
// ## Function to go to the "Questions" element:
function goQuestions() {
  scoreCount = 0;
  quizStage = 0;
  questionsGetText();
  document.querySelector("#start-screen").setAttribute("class", "hide");
  document.querySelector("#questions").setAttribute("class", "visible");
  timerStart();
}
// ## Function to get the current question text, based on the quiz stage:
function questionsGetText() {
  document.querySelector("#question-title").textContent = questions[quizStage].question;
  document.querySelector("#btnAnswer0").textContent = questions[quizStage].answer0;
  document.querySelector("#btnAnswer1").textContent = questions[quizStage].answer1;
  document.querySelector("#btnAnswer2").textContent = questions[quizStage].answer2;
  document.querySelector("#btnAnswer3").textContent = questions[quizStage].answer3
}
// Function to activate the timer at 45s:
function timerStart() {
  timerCount = 45;
  document.querySelector("#time").textContent = timerCount;
  timer = setInterval(function() {
    timerCount--;
    document.querySelector("#time").textContent = timerCount;
    if (timerCount <= 0) {
      goEndScreen();
    }
  }, 1000);
}


// # Define Buttons
// ## "Start Quiz" button:
document.querySelector("#start").addEventListener("click", function(event) {
  event.preventDefault();
  goQuestions()
});