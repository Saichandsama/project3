const quizData = [
    {
        type: "single",
        question: "Which language is used for web development?",
        options: ["Python", "HTML", "C", "Java"],
        answer: "HTML"
    },
    {
        type: "multi",
        question: "Select JavaScript frameworks:",
        options: ["React", "Django", "Vue", "Flask"],
        answer: ["React", "Vue"]
    },
    {
        type: "fill",
        question: "Fill in the blank: CSS stands for ______ Style Sheets.",
        answer: "Cascading"
    },
    {
        type: "single",
        question: "Which company developed Java?",
        options: ["Microsoft", "Sun Microsystems", "Google", "Apple"],
        answer: "Sun Microsystems"
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const fillBlankContainer = document.getElementById("fill-blank-container");
const nextBtn = document.getElementById("next-btn");
const resultEl = document.getElementById("result");
const scoreEl = document.getElementById("score");

function loadQuestion() {
    clearContainers();

    const currentQuiz = quizData[currentQuestion];
    questionEl.innerText = currentQuiz.question;

    if (currentQuiz.type === "single") {
        currentQuiz.options.forEach(option => {
            const button = document.createElement("button");
            button.innerText = option;
            button.classList.add("option");
            button.onclick = () => checkSingleAnswer(option);
            optionsEl.appendChild(button);
        });
    }

    else if (currentQuiz.type === "multi") {
        currentQuiz.options.forEach(option => {
            const div = document.createElement("div");
            div.classList.add("checkbox-option");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.value = option;

            const label = document.createElement("label");
            label.innerText = option;
            label.style.marginLeft = "10px";

            div.appendChild(checkbox);
            div.appendChild(label);
            optionsEl.appendChild(div);
        });
    }

    else if (currentQuiz.type === "fill") {
        const input = document.createElement("input");
        input.type = "text";
        input.id = "fill-answer";
        input.placeholder = "Type your answer here";

        fillBlankContainer.appendChild(input);
    }
}

function clearContainers() {
    optionsEl.innerHTML = "";
    fillBlankContainer.innerHTML = "";
}

function checkSingleAnswer(selected) {
    const correct = quizData[currentQuestion].answer;

    if (selected === correct) {
        score++;
    }

    nextQuestion();
}

nextBtn.addEventListener("click", () => {
    const currentQuiz = quizData[currentQuestion];

    if (currentQuiz.type === "multi") {
        const checkedOptions = document.querySelectorAll("input[type='checkbox']:checked");
        const answers = Array.from(checkedOptions).map(option => option.value);

        if (
            answers.length === currentQuiz.answer.length &&
            answers.every(ans => currentQuiz.answer.includes(ans))
        ) {
            score++;
        }

        nextQuestion();
    }

    else if (currentQuiz.type === "fill") {
        const userAnswer = document.getElementById("fill-answer").value.trim();

        if (
            userAnswer.toLowerCase() ===
            currentQuiz.answer.toLowerCase()
        ) {
            score++;
        }

        nextQuestion();
    }
});

function nextQuestion() {
    currentQuestion++;

    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("question-container").classList.add("hidden");
    nextBtn.classList.add("hidden");
    resultEl.classList.remove("hidden");

    scoreEl.innerText = `Your Score: ${score} / ${quizData.length}`;
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;

    resultEl.classList.add("hidden");
    document.getElementById("question-container").classList.remove("hidden");
    nextBtn.classList.remove("hidden");

    loadQuestion();
}

loadQuestion();
