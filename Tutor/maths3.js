const question=document.querySelector('#question');
const choices=Array.from(document.getElementsByClassName('choice-text')); 
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progressBarFull');
let currentQuestion = {}
let acceptingAnswers = true
let score=0
let questionCounter = 0
let availableQuestions = []
let questions =[
{
question: "What is 13+4 and 13x4? <br><img src='img1.jpg'/></br>",
choice1:"17,52",
choice2:"52,17",
choice3:"none of the above",
choice4:"53,17", 
answer:2,
},
{
question:'if there are 19 chocolates out of 6 was given to jack and 6 were given to nick ,how many are left out ?',
choice1: '8',
choice2: '7',
choice3: '6',
choice4: '5',
answer: 1,
},
{
question: 'What is 91+16?',
choice1: '109',
choice2: '105',
choice3: '107',
choice4: '106',
answer: 3,
},
{
    question:' What is 86+91?',
    choice1: '175',
    choice2: '157',
    choice3: '105',
    choice4: '150',
    answer: 1,
    },
    {
        question:' What is 96+69?',
        choice1: '156',
        choice2: '165',
        choice3: '166',
        choice4: '155',
        answer: 2,
    },
        {
question:'What is 12-6 and 12/6 and 12+6 and 12*6?',
choice1: '6,2,18,72',
choice2: '6,18,2,73',
choice3: '6,6,19,73',
choice4: '19,6,6,72',
answer: 1,
        },
        {
question:'What is 16-9 and 16+9 ?',
choice1: '7,25',
choice2: '25,7',
choice3: '13,25',
choice4: '25,13',
answer: 1,
        },
        {
question:'12-14+16/8*2',
choice1: '6',
choice2: '2',
choice3: '8',
choice4: '7',
answer: 2,
        },
    {
question:'give the count of 2 from the given "1223226227228762"',
choice1: '7',
choice2: '6',
choice3: '8',
choice4: '9',
answer: 1,
    },
    {
question:'a=12+96 and b=17+23 select the correct relation between them?',
choice1: 'a>b',
choice2: 'a<b',
choice3: 'a=b',
choice4: 'a',
answer: 1,
    }
];
const SCORE_POINTS=10
const MAX_QUESTIONS =10

startGame = () => {
questionCounter = 0
score = 0
availableQuestions=[...questions]
console.log(availableQuestions)
getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0|| questionCounter >= MAX_QUESTIONS ){
        localStorage.setItem( 'mostRecentScore', score)

        return window.location.assign('end.html')
    }
    questionCounter++
progressText.innerText = `Question ${questionCounter}/ ${MAX_QUESTIONS}`
console.log(questionCounter/MAX_QUESTIONS)
progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) *100}%`
const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
currentQuestion = availableQuestions[questionsIndex]
question.innerText = currentQuestion.question

choices.forEach(choice =>{
    const number=choice.dataset['number']
    choice.innerText=currentQuestion['choice'+number]
});


availableQuestions.splice(questionsIndex,1)
console.log(availableQuestions)
acceptingAnswers = true
};
choices.forEach(choice => {
choice.addEventListener('click', e => {
     if(!acceptingAnswers) return
acceptingAnswers = false
const selectedChoice = e.target

const selectedAnswer = selectedChoice.dataset['number']
let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

if(classToApply === 'correct') {
incrementScore(SCORE_POINTS)
//getNewQuestion()
//questionCounter++
}
//if(classToApply==='incorrect'){
  //  getNewQuestion()
    //questionCounter--
//}
selectedChoice.parentElement.classList.add(classToApply)

setTimeout(()=>{ 

selectedChoice.parentElement.classList.remove(classToApply)
getNewQuestion()

}, 1000)

});
});
incrementScore=num =>{
    score +=num
    scoreText.innerText=score
}

startGame();