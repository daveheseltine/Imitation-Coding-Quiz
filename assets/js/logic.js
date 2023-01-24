// # Define Data:
// ## Sound Effects
var sfxCorrect = new Audio("assets/sfx/correct.wav");
var sfxIncorrect = new Audio("assets/sfx/incorrect.wav");


// # Define Global Variables
var highscores;
var inputInitials;
var scoreCount;
var quizStage;
var timerCount = 0;


// # Define HTML Elements
// ## Define "End-screen" element:
document.querySelector("#initials").setAttribute("maxlength", 3);
document.querySelector("#initials").setAttribute("style", "text-transform:uppercase");


// # Define Functions
// ## Function to show the feedback message for 1.5s:
function feedback(text) {
  document.querySelector("#feedback").textContent = text;
  document.querySelector("#feedback").setAttribute("class", "feedback");
  setTimeout(function() {
    document.querySelector("#feedback").setAttribute("class", "feedback hide");
  },
  1500);
}
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
  if (document.querySelector("#initials").value === "") {
    feedback("Please enter your initials!")
  } else {
    inputInitials = (document.querySelector("#initials").value).slice(0, 3).toUpperCase();
    highscoresUpload();
    highscoresCalculate();
    document.querySelector("#end-screen").setAttribute("class", "hide");
    window.location.href="highscores.html";
  }
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
// ## Function to calculate and save new highscores to local:
function highscoresCalculate() {
  var userScore = 
  {
    initials: inputInitials,
    score: timerCount
  }
  highscores.push(userScore);
  highscores.sort((i, j) => j.score - i.score);
  highscores = highscores.slice(0, 5);
  highscores = JSON.stringify(highscores);
  localStorage.setItem("highscores", highscores);
}
// ## Function to check for and upload highscores from local:
function highscoresUpload() {
  if (localStorage.getItem("highscores") !== null) {
    highscores = JSON.parse(localStorage.getItem("highscores"));
  }
}
// ## Function to get the current question text, based on the quiz stage:
function questionsGetText() {
  document.querySelector("#question-title").textContent = questions[quizStage].question;
  document.querySelector("#btnAnswer0").textContent = questions[quizStage].answer0;
  document.querySelector("#btnAnswer1").textContent = questions[quizStage].answer1;
  document.querySelector("#btnAnswer2").textContent = questions[quizStage].answer2;
  document.querySelector("#btnAnswer3").textContent = questions[quizStage].answer3
}
// ## Function to resolve the current question, and update to the next stage of the quiz:
function questionsResolve(guess) {
  if (guess === questions[quizStage].correctAnswer) {
    feedback("Correct!")
    sfxCorrect.play();
    scoreCount++;
  } else {
    feedback("Wrong!")
    sfxIncorrect.play();
    timerCount = timerCount - 10;
    document.querySelector("#time").textContent = timerCount;
  }
  quizStage++
  if (quizStage > questions.length - 1) {
    goEndScreen()
  } else {
    questionsGetText()
  }
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
// ## Answer buttons:
document.querySelector("#btnAnswer0").addEventListener("click", function(event) {
  event.preventDefault();
  questionsResolve(0)
});
document.querySelector("#btnAnswer1").addEventListener("click", function(event) {
  event.preventDefault();
  questionsResolve(1)
});
document.querySelector("#btnAnswer2").addEventListener("click", function(event) {
  event.preventDefault();
  questionsResolve(2)
});
document.querySelector("#btnAnswer3").addEventListener("click", function(event) {
  event.preventDefault();
  questionsResolve(3);
});
// ## "End-screen" button and Enter key functionality:
document.querySelector("#submit").addEventListener("click", function(event) {
  event.preventDefault();
  goHighscores()
});
document.querySelector("#initials").addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    goHighscores()
  }
});