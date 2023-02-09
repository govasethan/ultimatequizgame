const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');


let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []

// Questions and answers
let questions =[
    {
        question: "In HTML, colors can be specified using HSL value, which means",
        choice1: "Hue, Saturation, Light",
        choice2: "High, Static, Low",
        choice3: "High, Stable, Low",
        choice4: "HTML, Semantics, Language",
        answer: 1,
    },
    {
        question: "An array can be sorted in a reverse manner through the method",
        choice1: "sort()",
        choice2: "reverse()",
        choice3: "rev.length()",
        choice4: "sort.length()",
        answer: 2,
    },
    {
        question: "Application's data before HTML5 had to be stored in",
        choice1: "Local database",
        choice2: "Web server",
        choice3: "External database",
        choice4: "Cookies",
        answer: 4,
    },
    {
        question: "Which is the correct CSS syntax?",
        choice1: "body {color:black;}",
        choice2: "{body;color:black;}",
        choice3: "body:color=black;",
        choice4: "{body:color=black}",
        answer: 1,
    }
]

const SCORE_POINTS = 100
const MAX_QUESTIONS = 4

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion ()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('/end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`

    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return
        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}
startGame()