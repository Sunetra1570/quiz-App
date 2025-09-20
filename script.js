/**
 * KAUN BANEGA QUIZ MASTER
 * A comprehensive KBC-style quiz application with all features
 * Version: 2.0
 */

console.log('🎯 Loading Kaun Banega Quiz Master...');

// Game Configuration
const CONFIG = {
    TOTAL_QUESTIONS: 15,
    TIME_PER_QUESTION: 30,
    PRIZE_AMOUNTS: [1000, 5000, 10000, 20000, 40000, 80000, 125000, 250000, 500000, 1000000, 4000000, 8000000, 16000000, 32000000, 70000000],
    SAFE_HAVENS: [5, 10], // Question numbers where prize is guaranteed
    TIMER_WARNING_TIME: 10, // Seconds when timer turns red
    SOUNDS: {
        TIMER: 'timer-sound',
        CORRECT: 'correct-sound',
        WRONG: 'wrong-sound'
    }
};

// Comprehensive Question Database
const QUESTION_BANK = [
    // Easy Questions (1-5)
    {
        question: "What is the capital of India?",
        options: ["Mumbai", "New Delhi", "Kolkata", "Chennai"],
        correct: 1,
        difficulty: "easy",
        category: "Geography"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1,
        difficulty: "easy",
        category: "Science"
    },
    {
        question: "How many days are there in a leap year?",
        options: ["365", "366", "367", "364"],
        correct: 1,
        difficulty: "easy",
        category: "General Knowledge"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correct: 1,
        difficulty: "easy",
        category: "Science"
    },
    {
        question: "In which year did India gain independence?",
        options: ["1945", "1946", "1947", "1948"],
        correct: 2,
        difficulty: "easy",
        category: "History"
    },
    
    // Medium Questions (6-10)
    {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correct: 2,
        difficulty: "medium",
        category: "Science"
    },
    {
        question: "Who wrote the famous novel 'Pride and Prejudice'?",
        options: ["Jane Austen", "Charlotte Bronte", "Emily Dickinson", "Virginia Woolf"],
        correct: 0,
        difficulty: "medium",
        category: "Literature"
    },
    {
        question: "Which is the longest river in the world?",
        options: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
        correct: 1,
        difficulty: "medium",
        category: "Geography"
    },
    {
        question: "Who painted the famous artwork 'The Starry Night'?",
        options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Claude Monet"],
        correct: 1,
        difficulty: "medium",
        category: "Arts"
    },
    {
        question: "What is the smallest country in the world?",
        options: ["Monaco", "San Marino", "Vatican City", "Liechtenstein"],
        correct: 2,
        difficulty: "medium",
        category: "Geography"
    },
    
    // Hard Questions (11-15)
    {
        question: "Who developed the theory of relativity?",
        options: ["Isaac Newton", "Albert Einstein", "Galileo Galilei", "Stephen Hawking"],
        correct: 1,
        difficulty: "hard",
        category: "Science"
    },
    {
        question: "Which element has the atomic number 1?",
        options: ["Helium", "Hydrogen", "Lithium", "Carbon"],
        correct: 1,
        difficulty: "hard",
        category: "Science"
    },
    {
        question: "In which city was Shakespeare born?",
        options: ["London", "Manchester", "Stratford-upon-Avon", "Birmingham"],
        correct: 2,
        difficulty: "hard",
        category: "Literature"
    },
    {
        question: "What is the hardest natural substance on Earth?",
        options: ["Gold", "Iron", "Diamond", "Platinum"],
        correct: 2,
        difficulty: "hard",
        category: "Science"
    },
    {
        question: "Which vitamin is produced when skin is exposed to sunlight?",
        options: ["Vitamin A", "Vitamin B12", "Vitamin C", "Vitamin D"],
        correct: 3,
        difficulty: "hard",
        category: "Science"
    },
    
    // Additional Questions for variety
    {
        question: "What is the currency of Japan?",
        options: ["Yuan", "Yen", "Won", "Ringgit"],
        correct: 1,
        difficulty: "easy",
        category: "General Knowledge"
    },
    {
        question: "Who is known as the 'Father of the Nation' in India?",
        options: ["Jawaharlal Nehru", "Mahatma Gandhi", "Subhas Chandra Bose", "Sardar Patel"],
        correct: 1,
        difficulty: "easy",
        category: "History"
    },
    {
        question: "Which ocean is the largest?",
        options: ["Atlantic Ocean", "Indian Ocean", "Pacific Ocean", "Arctic Ocean"],
        correct: 2,
        difficulty: "easy",
        category: "Geography"
    },
    {
        question: "How many bones are there in an adult human body?",
        options: ["206", "205", "207", "208"],
        correct: 0,
        difficulty: "medium",
        category: "Science"
    },
    {
        question: "Which gas makes up the majority of Earth's atmosphere?",
        options: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        correct: 1,
        difficulty: "medium",
        category: "Science"
    }
];

// Game State Management
class QuizGame {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.timeLeft = CONFIG.TIME_PER_QUESTION;
        this.timerInterval = null;
        this.gameQuestions = [];
        this.selectedAnswer = null;
        this.isAnswerLocked = false;
        this.lifelines = {
            fiftyFifty: false,
            audiencePoll: false,
            phoneAFriend: false
        };
        
        this.initializeElements();
        this.attachEventListeners();
        this.initializeGame();
    }
    
    initializeElements() {
        // Screen elements
        this.screens = {
            start: document.getElementById('start-screen'),
            quiz: document.getElementById('quiz-screen'),
            result: document.getElementById('result-screen')
        };
        
        // Control elements
        this.startBtn = document.getElementById('start-btn');
        this.lockBtn = document.getElementById('lock-answer');
        this.nextBtn = document.getElementById('next-question');
        this.playAgainBtn = document.getElementById('play-again');
        this.shareBtn = document.getElementById('share-result');
        
        // Quiz elements
        this.questionText = document.getElementById('question-text');
        this.options = document.querySelectorAll('.option');
        this.currentQuestionEl = document.getElementById('current-question');
        this.totalQuestionsEl = document.getElementById('total-questions');
        this.currentPrizeEl = document.getElementById('current-prize');
        this.timeLeftEl = document.getElementById('time-left');
        this.timerCircle = document.getElementById('timer-circle');
        
        // Lifeline elements
        this.lifeline5050 = document.getElementById('lifeline-5050');
        this.lifelineAudience = document.getElementById('lifeline-audience');
        this.lifelinePhone = document.getElementById('lifeline-phone');
        
        // Result elements
        this.correctAnswersEl = document.getElementById('correct-answers');
        this.wrongAnswersEl = document.getElementById('wrong-answers');
        this.accuracyEl = document.getElementById('accuracy');
        this.finalPrizeEl = document.getElementById('final-prize-amount');
        this.performanceMessageEl = document.getElementById('performance-message');
        
        // Answer explanation
        this.answerExplanationEl = document.getElementById('answer-explanation');
        
        // Prize ladder
        this.prizeItems = document.querySelectorAll('.prize-item');
        
        // Audio elements
        this.sounds = {
            timer: document.getElementById(CONFIG.SOUNDS.TIMER),
            correct: document.getElementById(CONFIG.SOUNDS.CORRECT),
            wrong: document.getElementById(CONFIG.SOUNDS.WRONG)
        };
        
        console.log('✅ All DOM elements initialized');
    }
    
    attachEventListeners() {
        this.startBtn?.addEventListener('click', () => this.startQuiz());
        this.lockBtn?.addEventListener('click', () => this.lockAnswer());
        this.nextBtn?.addEventListener('click', () => this.nextQuestion());
        this.playAgainBtn?.addEventListener('click', () => this.restartGame());
        this.shareBtn?.addEventListener('click', () => this.shareResult());
        
        // Option click handlers
        this.options.forEach((option, index) => {
            option.addEventListener('click', () => this.selectOption(index));
        });
        
        // Lifeline handlers
        this.lifeline5050?.addEventListener('click', () => this.use5050());
        this.lifelineAudience?.addEventListener('click', () => this.useAudiencePoll());
        this.lifelinePhone?.addEventListener('click', () => this.usePhoneAFriend());
        
        console.log('✅ Event listeners attached');
    }
    
    initializeGame() {
        this.totalQuestionsEl.textContent = CONFIG.TOTAL_QUESTIONS;
        this.showScreen('start');
        this.setupPrizeLadder();
        console.log('🎮 Game initialized');
    }
    
    setupPrizeLadder() {
        this.prizeItems.forEach((item, index) => {
            const level = CONFIG.TOTAL_QUESTIONS - index;
            const prizeAmount = CONFIG.PRIZE_AMOUNTS[level - 1];
            if (prizeAmount) {
                item.textContent = `₹${this.formatPrize(prizeAmount)}`;
                item.dataset.level = level;
                
                if (CONFIG.SAFE_HAVENS.includes(level)) {
                    item.classList.add('safe-haven');
                }
            }
        });
    }
    
    formatPrize(amount) {
        if (amount >= 10000000) return `${amount / 10000000} Crore`;
        if (amount >= 100000) return `${amount / 100000} Lakh`;
        if (amount >= 1000) return `${amount / 1000}K`;
        return amount.toString();
    }
    
    showScreen(screenName) {
        Object.values(this.screens).forEach(screen => screen?.classList.remove('active'));
        this.screens[screenName]?.classList.add('active');
        
        // Add screen transition effect
        const activeScreen = this.screens[screenName];
        if (activeScreen) {
            activeScreen.style.animation = 'none';
            activeScreen.offsetHeight; // Force reflow
            activeScreen.style.animation = 'slideIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        }
    }
    
    startQuiz() {
        console.log('🚀 Starting quiz...');
        this.currentQuestion = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.resetLifelines();
        this.gameQuestions = this.shuffleArray([...QUESTION_BANK]).slice(0, CONFIG.TOTAL_QUESTIONS);
        this.showScreen('quiz');
        this.loadQuestion();
    }
    
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }
    
    resetLifelines() {
        this.lifelines = { fiftyFifty: false, audiencePoll: false, phoneAFriend: false };
        [this.lifeline5050, this.lifelineAudience, this.lifelinePhone].forEach(lifeline => {
            if (lifeline) {
                lifeline.classList.remove('used');
                lifeline.disabled = false;
            }
        });
        
        // Clear any audience poll results from all options
        if (this.options) {
            this.options.forEach(option => {
                const pollResult = option.querySelector('.poll-result');
                if (pollResult) {
                    pollResult.remove();
                }
            });
        }
    }
    
    loadQuestion() {
        if (this.currentQuestion >= CONFIG.TOTAL_QUESTIONS) {
            this.endQuiz();
            return;
        }
        
        const question = this.gameQuestions[this.currentQuestion];
        const questionNumber = this.currentQuestion + 1;
        
        console.log(`📝 Loading question ${questionNumber}: ${question.question}`);
        
        // Update question info
        this.currentQuestionEl.textContent = questionNumber;
        this.currentPrizeEl.textContent = this.formatPrize(CONFIG.PRIZE_AMOUNTS[this.currentQuestion]);
        
        // Update prize ladder
        this.updatePrizeLadder();
        
        // Display question
        this.questionText.textContent = question.question;
        
        // Display options
        this.options.forEach((option, index) => {
            const optionText = option.querySelector('.option-text');
            if (optionText) {
                optionText.textContent = question.options[index];
            }
            option.classList.remove('selected', 'correct', 'incorrect', 'disabled');
            option.style.visibility = 'visible';
            
            // Clear any existing poll results from previous questions
            const existingPoll = option.querySelector('.poll-result');
            if (existingPoll) {
                existingPoll.remove();
            }
        });
        
        // Reset state
        this.selectedAnswer = null;
        this.isAnswerLocked = false;
        this.lockBtn.style.display = 'none';
        this.nextBtn.style.display = 'none';
        
        // Start timer
        this.startTimer();
    }
    
    updatePrizeLadder() {
        this.prizeItems.forEach((item, index) => {
            const level = parseInt(item.dataset.level);
            item.classList.remove('current');
            
            if (level === this.currentQuestion + 1) {
                item.classList.add('current');
            }
        });
    }
    
    startTimer() {
        this.timeLeft = CONFIG.TIME_PER_QUESTION;
        this.updateTimerDisplay();
        this.playSound('timer');
        
        this.timerInterval = setInterval(() => {
            this.timeLeft--;
            this.updateTimerDisplay();
            
            if (this.timeLeft <= 0) {
                this.timeUp();
            }
        }, 1000);
    }
    
    updateTimerDisplay() {
        this.timeLeftEl.textContent = this.timeLeft;
        
        // Update circular progress
        const circumference = 2 * Math.PI * 45; // radius = 45
        const progress = (CONFIG.TIME_PER_QUESTION - this.timeLeft) / CONFIG.TIME_PER_QUESTION;
        const offset = circumference * progress;
        
        if (this.timerCircle) {
            this.timerCircle.style.strokeDashoffset = offset;
        }
        
        // Warning state
        if (this.timeLeft <= CONFIG.TIMER_WARNING_TIME) {
            this.timerCircle?.style.setProperty('stroke', '#ff073a');
        } else {
            this.timerCircle?.style.setProperty('stroke', '#ffd700');
        }
    }
    
    timeUp() {
        console.log('⏰ Time up!');
        this.stopTimer();
        this.stopSound('timer');
        
        if (!this.isAnswerLocked) {
            this.isAnswerLocked = true;
            this.wrongAnswers++;
            
            // Show correct answer when time expires
            const question = this.gameQuestions[this.currentQuestion];
            this.options.forEach((option, index) => {
                option.classList.add('disabled');
                if (index === question.correct) {
                    option.classList.add('correct');
                    option.style.animation = 'correctAnswerPulse 2s ease-in-out';
                }
            });
            
            const correctOptionText = question.options[question.correct];
            this.showMessage('⏰ Time up! The correct answer was highlighted in green.', 'warning');
            this.playSound('wrong');
            
            // Show detailed explanation for timeout
            this.showAnswerExplanation(
                'Time Expired!',
                `Time ran out! The correct answer was "${correctOptionText}". Try to answer faster next time!`
            );
            
            // Show next button after showing correct answer
            setTimeout(() => {
                this.nextBtn.style.display = 'inline-flex';
                this.lockBtn.style.display = 'none';
            }, 3000);
        }
    }
    
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    selectOption(optionIndex) {
        if (this.isAnswerLocked) return;
        
        // Clear previous selection
        this.options.forEach(opt => opt.classList.remove('selected'));
        
        // Select current option
        this.options[optionIndex].classList.add('selected');
        this.selectedAnswer = optionIndex;
        
        // Show lock button
        this.lockBtn.style.display = 'inline-flex';
        
        console.log(`👆 Option ${optionIndex} selected`);
    }
    
    lockAnswer() {
        if (this.selectedAnswer === null) return;
        
        this.isAnswerLocked = true;
        this.stopTimer();
        this.stopSound('timer');
        
        const question = this.gameQuestions[this.currentQuestion];
        const isCorrect = this.selectedAnswer === question.correct;
        
        // Show result
        this.options.forEach((option, index) => {
            option.classList.add('disabled');
            
            if (index === question.correct) {
                option.classList.add('correct');
            } else if (index === this.selectedAnswer) {
                option.classList.add('incorrect');
            }
        });
        
        if (isCorrect) {
            this.handleCorrectAnswer();
        } else {
            this.handleIncorrectAnswer();
        }
        
        // Show next button
        setTimeout(() => {
            this.nextBtn.style.display = 'inline-flex';
            this.lockBtn.style.display = 'none';
        }, 1500);
    }
    
    handleCorrectAnswer() {
        console.log('✅ Correct answer!');
        this.correctAnswers++;
        this.score += CONFIG.PRIZE_AMOUNTS[this.currentQuestion];
        this.playSound('correct');
        this.showConfetti();
        
        const prizeWon = this.formatPrize(CONFIG.PRIZE_AMOUNTS[this.currentQuestion]);
        this.showMessage(`🎉 Correct! You won ${prizeWon}!`, 'success');
        
        // Update prize ladder
        this.updatePrizeLadder();
    }
    
    handleIncorrectAnswer() {
        console.log('❌ Incorrect answer!');
        this.wrongAnswers++;
        this.playSound('wrong');
        
        const question = this.gameQuestions[this.currentQuestion];
        const correctOptionText = question.options[question.correct];
        
        this.showMessage(`❌ Incorrect! The correct answer is: ${correctOptionText}`, 'error');
        
        // Add visual emphasis to the correct answer
        const correctOption = this.options[question.correct];
        correctOption.style.animation = 'correctAnswerPulse 2s ease-in-out';
        
        // Show detailed explanation
        this.showAnswerExplanation(
            'Correct Answer',
            `The correct answer is "${correctOptionText}". Take a moment to learn from this question!`
        );
    }
    
    nextQuestion() {
        this.currentQuestion++;
        this.loadQuestion();
    }
    
    endQuiz() {
        console.log('🏁 Quiz ended');
        this.stopTimer();
        this.stopSound('timer');
        this.calculateResults();
        this.showScreen('result');
        
        // Show final confetti
        if (this.correctAnswers >= CONFIG.TOTAL_QUESTIONS * 0.7) {
            setTimeout(() => this.showBigConfetti(), 500);
        }
    }
    
    calculateResults() {
        const accuracy = Math.round((this.correctAnswers / CONFIG.TOTAL_QUESTIONS) * 100);
        
        this.correctAnswersEl.textContent = this.correctAnswers;
        this.wrongAnswersEl.textContent = this.wrongAnswers;
        this.accuracyEl.textContent = `${accuracy}%`;
        this.finalPrizeEl.textContent = this.formatPrize(this.score);
        
        // Performance message
        let message, className;
        if (accuracy >= 90) {
            message = '🏆 Outstanding! You are a Quiz Master!';
            className = 'excellent';
        } else if (accuracy >= 75) {
            message = '🎉 Excellent! Great knowledge!';
            className = 'excellent';
        } else if (accuracy >= 60) {
            message = '👍 Good job! Keep learning!';
            className = 'good';
        } else {
            message = '📚 Keep studying and try again!';
            className = 'average';
        }
        
        this.performanceMessageEl.textContent = message;
        this.performanceMessageEl.className = `performance-message ${className}`;
    }
    
    // Lifeline Functions
    use5050() {
        if (this.lifelines.fiftyFifty || this.isAnswerLocked) return;
        
        console.log('🎯 Using 50:50 lifeline');
        this.lifelines.fiftyFifty = true;
        this.lifeline5050.classList.add('used');
        this.lifeline5050.disabled = true;
        
        const question = this.gameQuestions[this.currentQuestion];
        const correctIndex = question.correct;
        const incorrectIndices = [0, 1, 2, 3].filter(i => i !== correctIndex);
        
        // Hide 2 incorrect options
        const toHide = this.shuffleArray(incorrectIndices).slice(0, 2);
        toHide.forEach(index => {
            this.options[index].style.visibility = 'hidden';
        });
        
        this.showMessage('50:50 used! Two incorrect answers removed.', 'info');
    }
    
    useAudiencePoll() {
        if (this.lifelines.audiencePoll || this.isAnswerLocked) return;
        
        console.log('👥 Using Audience Poll lifeline');
        this.lifelines.audiencePoll = true;
        this.lifelineAudience.classList.add('used');
        this.lifelineAudience.disabled = true;
        
        const question = this.gameQuestions[this.currentQuestion];
        const percentages = this.generateAudiencePoll(question.correct);
        
        // Display percentages
        this.options.forEach((option, index) => {
            const pollResult = document.createElement('span');
            pollResult.className = 'poll-result';
            pollResult.textContent = ` (${percentages[index]}%)`;
            
            const existingPoll = option.querySelector('.poll-result');
            if (existingPoll) {
                existingPoll.remove();
            }
            
            option.appendChild(pollResult);
        });
        
        this.showMessage('Audience Poll results displayed!', 'info');
    }
    
    generateAudiencePoll(correctIndex) {
        const percentages = [0, 0, 0, 0];
        
        // Give correct answer 40-70% of votes
        const correctPercentage = Math.floor(Math.random() * 31) + 40;
        percentages[correctIndex] = correctPercentage;
        
        // Distribute remaining percentage
        let remaining = 100 - correctPercentage;
        const otherIndices = [0, 1, 2, 3].filter(i => i !== correctIndex);
        
        otherIndices.forEach((index, i) => {
            if (i === otherIndices.length - 1) {
                percentages[index] = remaining;
            } else {
                const percentage = Math.floor(Math.random() * (remaining / 2));
                percentages[index] = percentage;
                remaining -= percentage;
            }
        });
        
        return percentages;
    }
    
    usePhoneAFriend() {
        if (this.lifelines.phoneAFriend || this.isAnswerLocked) return;
        
        console.log('📞 Using Phone a Friend lifeline');
        this.lifelines.phoneAFriend = true;
        this.lifelinePhone.classList.add('used');
        this.lifelinePhone.disabled = true;
        
        const question = this.gameQuestions[this.currentQuestion];
        const advice = this.generateExpertAdvice(question);
        
        this.showMessage(`Expert says: "${advice}"`, 'info', 5000);
    }
    
    generateExpertAdvice(question) {
        const correctOption = question.options[question.correct];
        const confidence = Math.random() > 0.2 ? 'confident' : 'uncertain';
        
        const adviceTemplates = {
            confident: [
                `I'm quite sure the answer is ${correctOption}.`,
                `Based on my knowledge, I believe it's ${correctOption}.`,
                `I'm confident the correct answer is ${correctOption}.`
            ],
            uncertain: [
                `I think it might be ${correctOption}, but I'm not entirely sure.`,
                `My best guess would be ${correctOption}.`,
                `I'm leaning towards ${correctOption}, but you should double-check.`
            ]
        };
        
        const templates = adviceTemplates[confidence];
        return templates[Math.floor(Math.random() * templates.length)];
    }
    
    // Utility Functions
    playSound(soundType) {
        const sound = this.sounds[soundType];
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(() => {
                // Audio play failed, ignore silently
            });
        }
    }
    
    stopSound(soundType) {
        const sound = this.sounds[soundType];
        if (sound) {
            sound.pause();
        }
    }
    
    showMessage(text, type = 'info', duration = 3000) {
        // Create or update message element
        let messageEl = document.querySelector('.game-message');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.className = 'game-message';
            document.body.appendChild(messageEl);
        }
        
        messageEl.textContent = text;
        messageEl.className = `game-message ${type} show`;
        
        setTimeout(() => {
            messageEl.classList.remove('show');
        }, duration);
    }
    
    showConfetti() {
        if (typeof confetti !== 'undefined') {
            confetti({
                particleCount: 50,
                spread: 60,
                origin: { y: 0.7 }
            });
        }
    }
    
    showBigConfetti() {
        if (typeof confetti !== 'undefined') {
            const duration = 3000;
            const end = Date.now() + duration;
            
            const colors = ['#ffd700', '#ff6b35', '#f7931e'];
            
            (function frame() {
                confetti({
                    particleCount: 5,
                    angle: 60,
                    spread: 55,
                    origin: { x: 0 },
                    colors: colors
                });
                confetti({
                    particleCount: 5,
                    angle: 120,
                    spread: 55,
                    origin: { x: 1 },
                    colors: colors
                });
                
                if (Date.now() < end) {
                    requestAnimationFrame(frame);
                }
            }());
        }
    }
    
    showAnswerExplanation(title, text) {
        const explanationEl = document.getElementById('answer-explanation');
        const titleEl = explanationEl.querySelector('.explanation-title');
        const textEl = explanationEl.querySelector('.explanation-text');
        
        if (explanationEl && titleEl && textEl) {
            titleEl.textContent = title;
            textEl.textContent = text;
            
            explanationEl.style.display = 'block';
            explanationEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            
            // Hide explanation when moving to next question
            setTimeout(() => {
                explanationEl.style.display = 'none';
            }, 8000);
        }
    }
    
    restartGame() {
        console.log('🔄 Restarting game...');
        this.currentQuestion = 0;
        this.score = 0;
        this.correctAnswers = 0;
        this.wrongAnswers = 0;
        this.selectedAnswer = null;
        this.isAnswerLocked = false;
        this.stopTimer();
        this.resetLifelines();
        this.showScreen('start');
    }
    
    shareResult() {
        const text = `I just scored ${this.correctAnswers}/${CONFIG.TOTAL_QUESTIONS} in Kaun Banega Quiz Master and won ₹${this.formatPrize(this.score)}! Can you beat my score?`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Kaun Banega Quiz Master',
                text: text,
                url: window.location.href
            }).catch(err => console.log('Share failed:', err));
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(text).then(() => {
                this.showMessage('Result copied to clipboard!', 'success');
            }).catch(() => {
                this.showMessage('Unable to share result', 'error');
            });
        }
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('🎮 DOM loaded, initializing Quiz Master...');
    
    // Add custom styles for messages
    const messageStyles = `
        .game-message {
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%) translateY(-100px);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 15px 30px;
            border-radius: 25px;
            font-weight: 600;
            z-index: 10000;
            transition: all 0.3s ease;
            opacity: 0;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .game-message.show {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
        }
        
        .game-message.success {
            border-color: #00ff41;
            box-shadow: 0 0 20px rgba(0, 255, 65, 0.3);
        }
        
        .game-message.error {
            border-color: #ff073a;
            box-shadow: 0 0 20px rgba(255, 7, 58, 0.3);
        }
        
        .game-message.warning {
            border-color: #ffa500;
            box-shadow: 0 0 20px rgba(255, 165, 0, 0.3);
        }
        
        .game-message.info {
            border-color: #ffd700;
            box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = messageStyles;
    document.head.appendChild(styleSheet);
    
    // Start the game
    window.quizGame = new QuizGame();
    console.log('🎯 Kaun Banega Quiz Master is ready to play!');
});
