const questions = [
    {
        question: "Qual é a capital do Japão?",
        answers: ["Pequim", "Tóquio", "Seul", "Bangkok"],
        correctAnswer: 1
    },
    {
        question: "Qual é o maior planeta do Sistema Solar?",
        answers: ["Terra", "Saturno", "Júpiter", "Netuno"],
        correctAnswer: 2
    },
    {
        question: "Qual é a fórmula química da água?",
        answers: ["CO₂", "O₂", "H₂O", "NaCl"],
        correctAnswer: 2
    },
    {
        question: "Em qual continente fica o Egito?",
        answers: ["África", "Europa", "Ásia", "Oceania"],
        correctAnswer: 0
    },
    {
        question: "Qual planeta é conhecido como Planeta Vermelho?",
        answers: ["Vênus", "Marte", "Mercúrio", "Urano"],
        correctAnswer: 1
    },
    {
        question: "Quantos lados tem um hexágono?",
        answers: ["Cinco", "Seis", "Sete", "Oito"],
        correctAnswer: 1
    },
    {
        question: "Qual é o maior oceano da Terra?",
        answers: ["Atlântico", "Índico", "Ártico", "Pacífico"],
        correctAnswer: 3
    },
    {
        question: "Quem pintou a Mona Lisa?",
        answers: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Claude Monet"],
        correctAnswer: 2
    },
    {
        question: "Qual é o idioma mais falado no Brasil?",
        answers: ["Espanhol", "Português", "Inglês", "Francês"],
        correctAnswer: 1
    },
    {
        question: "Quantos minutos há em uma hora?",
        answers: ["30", "45", "60", "100"],
        correctAnswer: 2
    }
];

const quizElement = document.querySelector("#quiz");
const questionElement = document.querySelector("#question");
const questionCountElement = document.querySelector("#question-count");
const scoreElement = document.querySelector("#score");
const progressTrack = document.querySelector("#progress-track");
const progressBar = document.querySelector("#progress-bar");
const answersElement = document.querySelector("#answers");
const feedbackElement = document.querySelector("#feedback");
const nextButton = document.querySelector("#next-button");
const resultElement = document.querySelector("#result");
const resultTitle = document.querySelector("#result-title");
const resultMessage = document.querySelector("#result-message");
const restartButton = document.querySelector("#restart-button");

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswer = null;
let answerChecked = false;

function showQuestion() {
    const currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;
    questionCountElement.textContent =
        `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
    scoreElement.textContent = `Acertos: ${score}`;
    progressTrack.setAttribute("aria-valuenow", String(currentQuestionIndex + 1));
    progressBar.style.width =
        `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
    feedbackElement.textContent = "";
    feedbackElement.className = "feedback";
    selectedAnswer = null;
    answerChecked = false;
    nextButton.disabled = true;
    nextButton.textContent = "Conferir resposta";
    answersElement.replaceChildren();

    currentQuestion.answers.forEach((answer, answerIndex) => {
        const answerButton = document.createElement("button");
        answerButton.type = "button";
        answerButton.className = "answer-button";
        answerButton.textContent = answer;
        answerButton.setAttribute("aria-pressed", "false");
        answerButton.addEventListener("click", () => {
            selectedAnswer = answerIndex;
            nextButton.disabled = false;

            answersElement.querySelectorAll(".answer-button").forEach((button, index) => {
                button.setAttribute("aria-pressed", String(index === answerIndex));
            });
        });
        answersElement.append(answerButton);
    });
}

function checkAnswer() {
    const currentQuestion = questions[currentQuestionIndex];
    const answerButtons = answersElement.querySelectorAll(".answer-button");
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    answerChecked = true;

    if (isCorrect) {
        score += 1;
        feedbackElement.textContent = "Muito bem! Você acertou.";
        feedbackElement.classList.add("correct");
    } else {
        feedbackElement.textContent =
            `Não foi dessa vez. A resposta certa é: ${currentQuestion.answers[currentQuestion.correctAnswer]}.`;
        feedbackElement.classList.add("incorrect");
    }

    answerButtons.forEach((button, index) => {
        button.disabled = true;

        if (index === currentQuestion.correctAnswer) {
            button.classList.add("correct");
        } else if (index === selectedAnswer) {
            button.classList.add("incorrect");
        }
    });

    scoreElement.textContent = `Acertos: ${score}`;
    nextButton.textContent =
        currentQuestionIndex === questions.length - 1 ? "Ver resultado" : "Próxima pergunta";
}

function showResult() {
    quizElement.hidden = true;
    resultElement.hidden = false;
    resultTitle.textContent = `Você acertou ${score} de ${questions.length}!`;

    if (score === questions.length) {
        resultMessage.textContent = "Incrível! Você acertou todas as perguntas.";
    } else if (score >= questions.length / 2) {
        resultMessage.textContent = "Muito bom! Você sabe bastante sobre conhecimentos gerais.";
    } else {
        resultMessage.textContent = "Boa tentativa! Que tal fazer o quiz mais uma vez?";
    }
}

nextButton.addEventListener("click", () => {
    if (!answerChecked) {
        checkAnswer();
        return;
    }

    if (currentQuestionIndex === questions.length - 1) {
        showResult();
        return;
    }

    currentQuestionIndex += 1;
    showQuestion();
});

restartButton.addEventListener("click", () => {
    currentQuestionIndex = 0;
    score = 0;
    resultElement.hidden = true;
    quizElement.hidden = false;
    showQuestion();
});

showQuestion();
