// # Define Global Variables
var quizStage;


// # Define Functions
// ## Function to go to the "End-Screen" element:
function goEndScreen() {
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
  quizStage = 0;
  questionsGetText();
  document.querySelector("#start-screen").setAttribute("class", "hide");
  document.querySelector("#questions").setAttribute("class", "visible");
}
// ## Function to get the current question text, based on the quiz stage:
function questionsGetText() {
  document.querySelector("#question-title").textContent = questions[quizStage].question;
  document.querySelector("#btnAnswer0").textContent = questions[quizStage].answer0;
  document.querySelector("#btnAnswer1").textContent = questions[quizStage].answer1;
  document.querySelector("#btnAnswer2").textContent = questions[quizStage].answer2;
  document.querySelector("#btnAnswer3").textContent = questions[quizStage].answer3
}


// # Define Buttons
// ## "Start Quiz" button:
document.querySelector("#start").addEventListener("click", function(event) {
  event.preventDefault();
  goQuestions()
});