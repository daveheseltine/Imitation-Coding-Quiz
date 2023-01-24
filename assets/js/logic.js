// # Define Global Variables
var quizStage = 0;

// ## Function to get the current question text, based on the quiz stage:
function questionsGetText() {
  document.querySelector("#question-title").textContent = questions[quizStage].question;
  document.querySelector("#btnAnswer0").textContent = questions[quizStage].answer0;
  document.querySelector("#btnAnswer1").textContent = questions[quizStage].answer1;
  document.querySelector("#btnAnswer2").textContent = questions[quizStage].answer2;
  document.querySelector("#btnAnswer3").textContent = questions[quizStage].answer3
}

document.querySelector("#start-screen").setAttribute("class", "hide");
document.querySelector("#questions").setAttribute("class", "visible");

questionsGetText();