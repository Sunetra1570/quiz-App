const questions = [
  {
  question: "Which planet is known as the Red Planet?",
  options: ["Earth", "Mars", "Jupiter", "Venus"],
  answer: "Mars"
},
{
  question: "Who wrote the play 'Romeo and Juliet'?",
  options: ["William Shakespeare", "Charles Dickens", "Jane Austen", "Mark Twain"],
  answer: "William Shakespeare"
},
{
  question: "What is the largest mammal in the world?",
  options: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
  answer: "Blue Whale"
}

  // Add more questions up to 10
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 30;
let totalTimeTaken = 0;
let answered = Array(questions.length).fill(false);

const quizCard = document.getElementById('quiz-card');
const resultMsg = document.getElementById('result');
const finalScore = document.getElementById('final-score');

document.getElementById('prevBtn').addEventListener('click', showPreviousQuestion);
document.getElementById('nextBtn').addEventListener('click', showNextQuestion);
document.getElementById('submitBtn').addEventListener('click', submitAnswer);

function startTimer() {
  clearInterval(timer);
  timeLeft = 30;
  updateTimerDisplay();

  timer = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timer);
      autoSubmitOnTimeout();
    }
  }, 1000);
}

function updateTimerDisplay() {
  const timerEl = document.getElementById('timer');
  if (timerEl) timerEl.textContent = `Time left: ${timeLeft}s`;
}

function loadQuestion(index) {
  const q = questions[index];

  let optionsHTML = q.options.map((opt, i) => `
    <label>
      <input type="radio" name="option" value="${opt}"> ${opt}
    </label>
  `).join('');

  quizCard.innerHTML = `
    <div class="timer" id="timer">Time left: ${timeLeft}s</div>
    <h2>Question ${index + 1} of ${questions.length}</h2>
    <p>${q.question}</p>
    <div class="options">${optionsHTML}</div>
  `;

  resultMsg.textContent = '';
  resultMsg.className = 'result-msg';
  startTimer();
}

function showPreviousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    loadQuestion(currentQuestion);
  }
}

function showNextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    loadQuestion(currentQuestion);
  }
}

function submitAnswer() {
  clearInterval(timer);
  const selected = document.querySelector('input[name="option"]:checked');
  const correctAnswer = questions[currentQuestion].answer;

  if (!selected) {
    alert("Please select an option before submitting.");
    return;
  }

  const userAnswer = selected.value;

  if (userAnswer === correctAnswer) {
    resultMsg.textContent = "Correct!";
    resultMsg.className = "result-msg correct";

    if (!answered[currentQuestion]) {
      score += 10;
      answered[currentQuestion] = true;
    }
  } else {
    resultMsg.textContent = "Incorrect!";
    resultMsg.className = "result-msg incorrect";
  }

  totalTimeTaken += (30 - timeLeft);

  if (answered.every(Boolean)) {
    showFinalScore();
  }
}

function autoSubmitOnTimeout() {
  resultMsg.textContent = "Time's up!";
  resultMsg.className = "result-msg incorrect";
  totalTimeTaken += 30;

  if (answered.every(Boolean)) {
    showFinalScore();
  }
}

function showFinalScore() {
  finalScore.innerHTML = `
    🎉 Quiz Complete!<br>
    Your Score: ${score} / ${questions.length * 10}<br>
    Time Taken: ${totalTimeTaken} seconds
  `;
}

// Start the quiz
loadQuestion(currentQuestion);
