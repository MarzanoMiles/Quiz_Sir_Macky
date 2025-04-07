function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


const easyQuestions = [
    { question: "Kirstie has 2 apples, and her friend gave her 2 more. How many apples does Kirstie have now?", answers: ["3", "4", "5", "6"], correct: "4" },
    { question: "Hannah has 5 candies. She gives 3 to her friend. How many candies does Hannah have left?", answers: ["1", "2", "3", "4"], correct: "2" },
    { question: "If you have 10 pencils and you give 2 away, how many pencils do you have left?", answers: ["2", "5", "6", "8"], correct: "8" },
    { question: "There are 6 dogs in the park, and 3 more come in. How many dogs are there in total?", answers: ["8", "9", "10", "11"], correct: "9" },
    { question: "Miles has 9 marbles. He gives 4 to his friend. How many marbles does Miles have left?", answers: ["3", "4", "5", "6"], correct: "5" },
    { question: "Ross has 7 candies. She buys 5 more. How many candies does Ross have now?", answers: ["10", "11", "12", "13"], correct: "12" },
    { question: "There are 8 bananas. How many bananas do you have if you pick one more?", answers: ["6", "7", "8", "9"], correct: "9" },
    { question: "A shop has 15 toys. If 6 are sold, how many toys are left in the shop?", answers: ["7", "8", "9", "10"], correct: "9" },
    { question: "There are 4 boxes. Each box has 2 apples inside. How many apples are there in total?", answers: ["6", "7", "8", "9"], correct: "8" },
    { question: "You have 20 cookies. You give 4 to your friend. How many cookies do you have left?", answers: ["14", "15", "16", "17"], correct: "16" }
];


const mediumQuestions = [
    { question: "A baker makes 12 cakes and gives 3 to each customer. How many customers did the baker serve?", answers: ["3", "4", "5", "6"], correct: "4" },
    { question: "There are 7 packs of cards. Each pack has 3 cards. How many cards are there in total?", answers: ["19", "20", "21", "22"], correct: "21" },
    { question: "Lyncel has 14 toys and buys 8 more. How many toys does she have now?", answers: ["20", "22", "24", "26"], correct: "22" },
    { question: "Xandrei had 25 balloons. He gave 7 away. How many balloons does he have now?", answers: ["16", "17", "18", "19"], correct: "18" },
    { question: "A pack of pencils has 5 pencils in it. How many pencils are there in 6 packs?", answers: ["25", "30", "35", "40"], correct: "30" },
    { question: "If you have 9 bags of candy, and each bag contains 4 pieces, how many pieces of candy do you have?", answers: ["32", "34", "36", "38"], correct: "36" },
    { question: "You have 16 pieces of chocolate. You want to share them equally between 2 friends. How many pieces does each friend get?", answers: ["6", "7", "8", "9"], correct: "8" },
    { question: "JP buys 18 apples. He then buys 12 more. How many apples does he have now?", answers: ["28", "29", "30", "31"], correct: "30" },
    { question: "A pizza is cut into 8 slices. If you eat 7 slices, how many slices are left?", answers: ["1", "2", "3", "4"], correct: "1" },
    { question: "You buy 3 packs of markers. Each pack has 7 markers inside. How many markers do you have in total?", answers: ["21", "22", "23", "24"], correct: "21" }
];
const hardQuestions = [
    { question: "A box has 18 toys. Each toy costs $2. How much money is the box worth?", answers: ["$36", "$27", "$54", "$72"], correct: "$36" },
    { question: "A train travels 15 miles per hour. How far will it travel in 4 hours?", answers: ["40", "50", "55", "60"], correct: "60" },
    { question: "You have 24 candies. You give 4 candies to each of your 4 friends. How many candies will you have left?", answers: ["8", "9", "10", "11"], correct: "8" },
    { question: "There are 50 apples. You take away 5 apples each day. How many days will it take to take all apples?", answers: ["8", "9", "10", "11"], correct: "10" },
    { question: "You have 35 chocolate bars. If you give 7 chocolate bars to each of your 5 friends, how many chocolate bars will you have left?", answers: ["10", "12", "15", "18"], correct: "10" },
    { question: "Sarah has 8 bags of marbles. Each bag contains 9 marbles. How many marbles does Sarah have in total?", answers: ["45", "81", "54", "72"], correct: "72" },
    { question: "You have $50. You spend $12 on a toy and $15 on books. How much money do you have left?", answers: ["23", "25", "27", "30"], correct: "23" },
    { question: "A factory makes 72 toys every day. How many toys will be made in 4 days?", answers: ["208", "258", "288", "308"], correct: "288" },
    { question: "A train is traveling at 72 miles per hour. How long will it take the train to travel 360 miles?", answers: ["4 hours", "5 hours", "6 hours", "7 hours"], correct: "5 hours" },
    { question: "You have 90 pieces of candy. You want to divide them equally into 9 bags. How many pieces of candy will go into each bag?", answers: ["8", "9", "10", "11"], correct: "10" }
];



// other levels of questions remain the same...

// Don't modify code below this line
const userName = localStorage.getItem("quizUser") || "Player";
const level = localStorage.getItem("quizLevel") || "easy";
document.getElementById("user-name").textContent = `Player: ${userName}`;

let questions;
if (level === "easy") {
    questions = shuffle([...easyQuestions]);
} else if (level === "medium") {
    questions = shuffle([...mediumQuestions]);
} else {
    questions = shuffle([...hardQuestions]);
}


let currentQuestion = 0;
let score = 0;
let timer;
switch (level) {
    case "easy":
        timer = 3 * 60; // 3 minutes
        break;
    case "medium":
        timer = 4 * 60; // 4 minutes
        break;
    case "hard":
        timer = 5 * 60; // 5 minutes
        break;
    default:
        timer = 60; // fallback to 1 minute
}


const timerElement = document.getElementById("timer");

function startQuiz() {
    loadQuestion();
    const interval = setInterval(() => {
        timer--;
        timerElement.textContent = formatTime(timer);

        if (timer === 0) {
            clearInterval(interval);  // Stop the timer when it reaches 0
            timeUp();  // Display time's up message
        }
    }, 1000);
}
function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" + secs : secs}`;
}

function loadQuestion() {
    const question = questions[currentQuestion];
    document.getElementById("question-number").textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
    document.getElementById("question-text").textContent = question.question;
    const answersContainer = document.getElementById("answer-buttons");
    answersContainer.innerHTML = "";

    question.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.classList.add("btn-3d", "bg-white", "text-black", "border", "border-gray-400", "p-3", "rounded-lg", "transition", "duration-300");
        btn.textContent = answer;
        btn.onclick = () => checkAnswer(answer, btn);
        answersContainer.appendChild(btn);
    });
}

function checkAnswer(answer, selectedButton) {
    const answerButtons = document.getElementById("answer-buttons").children;
    const correctAnswer = questions[currentQuestion].correct;

    // Reset all buttons before applying correct/incorrect styles
    Array.from(answerButtons).forEach(button => {
        button.classList.remove("bg-green-500", "bg-red-500", "border-green-600", "border-red-600", "opacity-50", "border-50");
        button.disabled = true; // Disable all buttons after selection
    });

    // Add visual feedback for the selected button
    if (answer === correctAnswer) {
        selectedButton.classList.add("bg-green-500", "border-green-600", "border-50"); // Green for correct
        score++;
    } else {
        selectedButton.classList.add("bg-red-500", "border-red-600", "border-50"); // Red for incorrect
        // Find and highlight the correct answer
        Array.from(answerButtons).forEach(button => {
            if (button.textContent === correctAnswer) {
                button.classList.add("bg-green-500", "border-green-600");
            }
        });
    }

    // Wait 1 second before transitioning to the next question
    setTimeout(() => {
        nextQuestion();
    }, 1000);
}

function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        localStorage.setItem("quizScore", score);
        window.location.href = "results.html";
    }
}
function timeUp() {
    // Create a Time's Up message element
    const timeUpMessage = document.createElement("div");
    timeUpMessage.textContent = "Time's Up!";
    
    // Style the Time's Up message
    timeUpMessage.classList.add(
        "absolute", 
        "top-1/2", 
        "left-1/2", 
        "transform", 
        "-translate-x-1/2", 
        "-translate-y-1/2", 
        "bg-[#EC8305]", 
        "text-white", 
        "font-extrabold", 
        "text-4xl", 
        "p-6", 
        "rounded-lg", 
        "shadow-lg", 
        "z-20", 
        "drop-shadow-lg", 
        "transition", 
        "opacity-0", 
        "scale-0", 
        "duration-500", 
        "ease-in-out"
    );

    // Append the message to the body
    document.body.appendChild(timeUpMessage);

    // Animate the message to appear
    setTimeout(() => {
        timeUpMessage.classList.remove("opacity-0", "scale-0");
        timeUpMessage.classList.add("opacity-100", "scale-100");
    }, 10); // Allow time for the page to render the element first

    // After a short delay, redirect to results page
    setTimeout(() => {
        localStorage.setItem("quizScore", score);
        window.location.href = "results.html";
    }, 2000); // Wait for the message to be visible for 2 seconds before redirecting
}


startQuiz();
