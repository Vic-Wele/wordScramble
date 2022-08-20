//collecting the id's of elements and tags to be manipulated in the DOM ====================================================>
const wordText = document.getElementById("word");
const wordHint = document.querySelector(".hint span");
const inputField = document.getElementById("input-el");
const timerHint = document.querySelector(".timer-hint b");
const refreshBtn = document.getElementById("refresh-word");
const checkBtn = document.getElementById("check-word");
let correctWord, timer;

//this function is to set the time to countdown from 30s and refresh word on time out =======================================>
const initTimer = (maxTime) => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      return (timerHint.innerText = maxTime);
    }
    // this part clears the timer and displays a pop up with the correct answer -==============================================>
    clearInterval(timer);
    alert(
      `TIME OUT! ${correctWord.toLocaleLowerCase()} WAS THE CORRECT ANSWER`
    );
    initGame();
  }, 1000);
};

// this function  first calls the initTimer function, iterates through the
//word array randomly, splits each word on each iteration,
//grabs the innnertext of the paragraph and wordHint and sets their
//value accordingly, then refreshes the input field or sets it's value to null
//==================================================================================================================>

function initGame() {
  initTimer(30);
  let randomObj = words[Math.floor(Math.random() * words.length)];
  let wordArray = randomObj.word.split("");
  for (let i = 0; i < wordArray.length; i++) {
    let j = Math.floor(Math.random() * i);
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  wordText.textContent = wordArray.join("");
  wordHint.textContent = randomObj.hint;
  correctWord = randomObj.word;
  inputField.value = "";
  inputField.setAttribute("maxlength", correctWord.length);
}
initGame();

//this function checks each word put in the input field
//and compares against the word in the array to check
//if it's correct ====================================================================================================>

function checkWord() {
  let userWord = inputField.value.toLocaleLowerCase();
  if (!userWord) {
    return alert(`PLEASE ENTER A WORD`);
  }
  if (userWord !== correctWord) {
    return alert(
      `Oops!! 🙂 ${userWord.toUpperCase()} Is Not Correct, TRY AGAIN`
    );
  } else {
    alert(`Congratulations!!!🎉🎊 ${userWord.toUpperCase()} Is Correct`);
  }
  initGame();
}

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);
