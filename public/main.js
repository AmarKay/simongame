$(document).ready(() => {
  // game level is hidden on page load
  $("main>h2:nth-child(2)").hide();

  let level = 0;
  let targetSequence = [];
  let userSequence = [];

  // starting the game
  $("button").on("click", (e) => {
    gameOver = false;
    if (level === 0) {
      // starting the game
      let randomNum = generateRandomNumber();
      animateButton(randomNum.toString());
      targetSequence.push(randomNum);
      level++;
      console.log("gameStarted() => level: " + level + " targetSequence: " + targetSequence + " userSequence: " + userSequence);
      $("button").text("Restart");
      $("main>h2:first-child").hide();
      $("main>h2:nth-child(2)").show();
      $("main>h2:nth-child(2)>#level").text(level);
    } else {
      // reset progress
      level = 0;
      targetSequence = [];
      userSequence = [];
      console.log("resetProgress() => level: " + level + " targetSequence: " + targetSequence + " userSequence: " + userSequence);
      $("button").text("Start");
      $("main>h2:nth-child(2)").hide();
      $("main>h2:first-child").show();
      // initializing first move after reset
      let randomNum = generateRandomNumber();
      animateButton(randomNum.toString());
      targetSequence.push(randomNum);
      level++;
      console.log("restarted() => level: " + level + " targetSequence: " + targetSequence + " userSequence: " + userSequence);
      $("button").text("Restart");
      $("main>h2:first-child").hide();
      $("main>h2:nth-child(2)").show();
      $("main>h2:nth-child(2)>#level").text(level);
    }
  });

  let roundFinished = false;
  let gameOver = false;
  if (!roundFinished) {
    console.log("roundFinished: " + roundFinished);
    $(".box").on("click", (e) => {
      if (level > 0) {
        if (!gameOver) {
          animateButton(e.target.classList[0]);
          userSequence.push(e.target.classList[0]);
          console.log("userInput() => buttonPressed: " + e.target.classList[0] + " level: " + level + " targetSequence: " + targetSequence + " userSequence: " + userSequence);
        }
        let targetSequenceSliced = targetSequence.slice(0, userSequence.length);
        // user sequence matches with target sequence so far
        if (userSequence.toString() === targetSequenceSliced.toString()) {
          if (targetSequence.length === userSequence.length) {
            userSequence = [];
            // next move
            setTimeout(() => {
              let randomNum = generateRandomNumber();
              animateButton(randomNum.toString());
              targetSequence.push(randomNum);
              level++;
              console.log("restarted() => level: " + level + " targetSequence: " + targetSequence + " userSequence: " + userSequence);
              $("button").text("Restart");
              $("main>h2:first-child").hide();
              $("main>h2:nth-child(2)").show();
              $("main>h2:nth-child(2)>#level").text(level);
            }, 500);
            roundFinished = true;
          }
        }
        // user sequence does not match with target sequence
        else {
          gameOver = true;
          playSound("wrong");
          console.log("resetProgress() => level: " + level + " targetSequence: " + targetSequence + " userSequence: " + userSequence);
          $("main>h2:nth-child(2)").hide();
          $("main>h2:first-child").show().text("Game Over: click on Restart to play again");
          roundFinished = true;
        }
      }
    });
  }
});

function animateButton(buttonPressed) {
  playSound(buttonPressed);
  blinkPressedButton(buttonPressed);
}

function playSound(buttonPressed) {
  let red = new Audio("./assets/sounds/red.mp3");
  let green = new Audio("./assets/sounds/green.mp3");
  let blue = new Audio("./assets/sounds/blue.mp3");
  let yellow = new Audio("./assets/sounds/yellow.mp3");
  let wrong = new Audio("./assets/sounds/wrong.mp3");
  switch (buttonPressed) {
    case "1":
      red.play();
      break;
    case "2":
      green.play();
      break;
    case "3":
      blue.play();
      break;
    case "4":
      yellow.play();
      break;
    default:
      wrong.play();
      break
  }
  console.log("playSound() => forButton: " + buttonPressed);
}

function generateRandomNumber() {
  let randomNum = Math.random() * 4;
  randomNum = Math.ceil(randomNum);
  return randomNum;
}

function blinkPressedButton(buttonPressed) {
  $("." + buttonPressed + ".box").toggleClass("pressed");
  setTimeout(() => {
    $("." + buttonPressed + ".box").toggleClass("pressed");
  }, 100);
  console.log("blinkPressedButton() => forButton: " + buttonPressed);
}

/*
1. create and start game level from 1
2. Generate a random number between 1 - 4
  a. Add that number into a target sequence array
  b. animate the corresponding box
3. record user's click sequence
  a. match with the target sequence
  b. if whole array matched
    i. increase game level
    ii. clear user's clicked array
    iii. repeat 2.
  c. else if array didn't match, restart the game
*/
