// Quiz Data
const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: ["Berlin", "London", "Paris", "Madrid"],
    correct: 2
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: 1
  },
  {
    question: "Who wrote 'Hamlet'?",
    answers: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Leo Tolstoy"],
    correct: 1
  }
];

let currentQuestionIndex = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");

// Load current question
function loadQuestion() {
  resetState();
  const currentQuestion = quizQuestions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;

  currentQuestion.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.addEventListener("click", () => selectAnswer(index));
    answersEl.appendChild(button);
  });
}

function resetState() {
  nextBtn.disabled = true;
  resultEl.classList.add("hidden");
  while (answersEl.firstChild) answersEl.removeChild(answersEl.firstChild);
}

function selectAnswer(selectedIndex) {
  const currentQuestion = quizQuestions[currentQuestionIndex];
  const buttons = answersEl.querySelectorAll("button");
  
  buttons.forEach((btn, index) => {
    btn.disabled = true;
    if (index === currentQuestion.correct) {
      btn.classList.add("correct");
    } 
    if (index === selectedIndex && selectedIndex !== currentQuestion.correct) {
      btn.classList.add("wrong");
    }
  });
  
  if (selectedIndex === currentQuestion.correct) {
    score++;
  }
  
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizQuestions.length) {
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult() {
  resetState();
  questionEl.textContent = `You scored ${score} out of ${quizQuestions.length}!`;
  resultEl.textContent = "Thanks for playing the quiz!";
  resultEl.classList.remove("hidden");
  nextBtn.style.display = "none";
}

loadQuestion();

// Joke API functionality
const jokeBtn = document.getElementById("fetch-joke-btn");
const jokeText = document.getElementById("joke-text");

jokeBtn.addEventListener("click", fetchJoke);

function fetchJoke() {
  jokeText.textContent = "Loading joke...";
  fetch("https://icanhazdadjoke.com/", {
    headers: { 'Accept': 'application/json' }
  })
    .then(response => response.json())
    .then(data => {
      jokeText.textContent = data.joke;
    })
    .catch(err => {
      jokeText.textContent = "Oops! Could not fetch a joke.";
      console.error(err);
    });
}
