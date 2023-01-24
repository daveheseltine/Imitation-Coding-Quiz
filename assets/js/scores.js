// # Define Functions
// ## Function to go to the "Start-Screen" element:
function goStartScreen() {
  window.location.href="index.html";
  document.querySelector("#start-screen").setAttribute("class", "visible");
}
// ## Function to clear the highscores and save to local:
function highscoresClear() {
  highscores = [];
  highscores = JSON.stringify(highscores);
  localStorage.setItem("highscores", highscores);
}
// ## Function to generate the list of Highscores, with a dynamic length:
function highscoresGenerate() {
  var highscoresLi = [];
  for (var i = 0; i < highscores.length; i++) {
    highscoresLi[i] = document.createElement("li");
    document.querySelector("#highscores").appendChild(highscoresLi[i]);
    highscoresLi[i].textContent = highscores[i].initials + " - " + highscores[i].score;
    highscoresLi[i].style.fontWeight = "bold";
  }
}
// ## Function to check for and upload highscores from local:
function highscoresUpload() {
  if (localStorage.getItem("highscores") !== null) {
    highscores = JSON.parse(localStorage.getItem("highscores"));
  }
}


// # Define Buttons
// ## "Clear" button:
document.querySelector("#clear").addEventListener("click", function(event) {
  event.preventDefault();
  highscoresClear();
  location.reload();
});
// ## "Go Back" button:
document.querySelector("a").addEventListener("click", function(event) {
  event.preventDefault();
  goStartScreen()
});


// # Initialise
// ## Check for local data:
highscoresUpload();
// ## Generate "Highscores" element:
highscoresGenerate();