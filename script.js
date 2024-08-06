const questions = [
  {
    question: "Choose the correct HTML element for the largest heading:",
    answers: [
      { text: "h6", correct: "false" },
      { text: "header", correct: "false" },
      { text: "h1", correct: "true" },
      { text: "head", correct: "false" },
    ],
  },
  {
    question: "Choose the correct HTML element to define important text",
    answers: [
      { text: "important", correct: "false" },
      { text: "strong", correct: "true" },
      { text: "b", correct: "false" },
      { text: "i", correct: "false" },
    ],
  },
  {
    question: "What does CSS stand for?",
    answers: [
      { text: "Computer Style Sheets", correct: "false" },
      { text: "Creative Style Sheets", correct: "false" },
      { text: "Colorful Style Sheets", correct: "false" },
      { text: "Cascading style sheets", correct: "true" },
    ],
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    answers: [
      { text: "styles", correct: "false" },
      { text: "style", correct: "true" },
      { text: "class", correct: "false" },
      { text: "font", correct: "false" },
    ],
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    answers: [
      { text: "js", correct: "false" },
      { text: "javaScript", correct: "false" },
      { text: "script", correct: "true" },
      { text: "java", correct: "false" },
    ],
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    answers: [
      { text: "alert('Hello World')", correct: "true" },
      { text: "console.log('Hello World')", correct: "false" },
      { text: "alertBox('Hello World')", correct: "false" },
      { text: "msgBox('Hello World')", correct: "false" },
    ],
  },
];

const questionsElement = document.getElementById("question");
const answerButton = document.getElementById("answer-btn");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestions();
}

function showQuestions() {
  resetQuiz();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNum = currentQuestionIndex + 1;
  questionsElement.innerHTML = questionNum + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetQuiz() {
  nextButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e) {
  const selectedbtn = e.target;
  const isCorrect = selectedbtn.dataset.correct === "true";
  if (isCorrect) {
    selectedbtn.classList.add("correct");
    score++;
  } else {
    selectedbtn.classList.add("inCorrect");
  }
  Array.from(answerButton.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

function showScore() {
  resetQuiz();
  questionsElement.innerHTML = `You Scored ${score} out of ${questions.length}!`;
  nextButton.inner = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestions();
  } else {
    showScore();
  }
}

startQuiz();
