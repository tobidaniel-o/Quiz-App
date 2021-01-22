

const app = {}
let questionPosition = 0, ans, score = 0, answerToQUiz = [], wrongAnswer = [], checkClick

const quizes = [
  {
    id: 1,
    question: 'How many states are there in the United States of America?',
    answerList: [25, 50, 20, 40],
    answer: 50
  },

  {
    id: 2,
    question: 'What is a group of lions called?',
    answerList: ['pack', 'pride', 'streak', 'ambush'],
    answer: 'pride'
  },

  {
    id: 3,
    question: 'What is the capital of Cambodia?',
    answerList: ['phinum no', 'Naypyitaw' ,'phnom penh' , 'Hanoi'],
    answer: 'phnom penh'
  },

  {
    id: 4,
    question: 'Where is Colombia located?',
    answerList: ['South America', 'Asia', 'Africa', 'North America'],
    answer: 'South America'
  },

  { 
    id: 5,
    question: 'How many provinces are there in canada?',
    answerList: [10, 13, 8, 14],
    answer: 10
  }
]

app.displayQuiz = () => {
  // displays the quiz on page load and next
    const htmlQuiz = `
      <div class="main">
        <form action="#" id="formId">
          <div class="quiz">
            <div>
              <span class="quesNum">Question ${quizes[questionPosition].id}<span>
            </div>  
            <p>${quizes[questionPosition].question}</p>
          
            <div class="posAns">
              <input type="radio" name="answer" value="${quizes[questionPosition].answerList[0]}">
              <label for="answer">${quizes[questionPosition].answerList[0]}</label>
            </div>
            <div class="posAns">
              <input type="radio" name="answer" value="${quizes[questionPosition].answerList[1]}">
              <label for="answer">${quizes[questionPosition].answerList[1]}</label>
            </div>
            <div class="posAns">
              <input type="radio" name="answer" value="${quizes[questionPosition].answerList[2]}">
              <label for="answer">${quizes[questionPosition].answerList[2]}</label>
            </div>
            <div class="posAns">
              <input type="radio" name="answer" value="${quizes[questionPosition].answerList[3]}">
              <label for="answer">${quizes[questionPosition].answerList[3]}</label>
            </div>
          </div>
        </form>
      </div>`

    $('.container').append(htmlQuiz).append($('.buttons').css('display', 'flex').css('justify-content', 'space-between'))

    checkClick = $('#formId input').on('change', function(){
      ans = $('input[name=answer]:checked', '#formId').val();
    })
}


// Checks if answer is correct or wrong
app.checkAnswer = () => {       
    if(ans == quizes[questionPosition].answer){
      // updates the score by 10 points
      $('.score').text(score += 10) 
    } else {
      // score remains the same
      $('.score').text(score) 
      wrongAnswer.push(quizes[questionPosition])
    }
    questionPosition++ // catches the next question
}

app.answersToWrongAnswer = (answers) => {
  answers.forEach((answer) => {
    const answerHtml = `
        <div class="main">
          <form action="#" id="formId">
            <div class="posAns">
              <div><p><span>Question:<span> ${answer.question}</p><div>
              <div><p><span>Answer:</span> ${answer.answer}</p></div>
            </div>
          </form>
        </div>
      `
      $('.container').append(answerHtml)
  })
}

app.hide = () => {
  $('.main').hide()
  $('.submit').hide()
}

// Prevents user from moving on before answering the current quiz
// Arggh!!! I couldn't fix this logic :(
app.holdOn = () => {
    const answer = $('#formId input').on('change', function(){
      $('input[name=answer]:checked', '#formId').val()
    })

    $('.next').on('click', function(){
      if(!answer){
        alert('Choose an answer before moving on.')
      }
    })
}

// Displays the next quiz
app.displayNextQuiz = () => {
  $('.next').on('click', function(){  
    app.checkAnswer()
    if(questionPosition < quizes.length){      
      $('.main').empty()
      app.displayQuiz()
    }

    if(questionPosition === quizes.length - 1){
      $('.next').hide()
      $('.submit').show()
      $('.submit').on('click', function(){

      app.checkAnswer()

      if(score == 50){
        $('.currentScore').text(`Final score: Congratulations!!! You scored ${score} out of 50`)
        app.hide()
        $('body').attr('id', 'balloon-container')
        $('body').append(createBalloons(100))
      } else {
          $('.currentScore').text(`Final score: ${score} out of 50`)
          app.hide()
          app.answersToWrongAnswer(wrongAnswer)
      }
    })
    }
  })
}

// Initialize function
app.init = () => {
  app.displayNextQuiz()
  app.displayQuiz()
}

// document ready
$(document).ready(function(){
  // call init method
  app.init()
})




/* Credit to https://codepen.io/Jemimaabu/pen/vYEYdOy */
/* Code displays animated balloons when all questions are answered correctly */

function random(num) {
  return Math.floor(Math.random()*num)
}

function getRandomStyles() {
  var r = random(255);
  var g = random(255);
  var b = random(255);
  var mt = random(200);
  var ml = random(50);
  var dur = random(5)+5;
  return `
  background-color: rgba(${r},${g},${b},0.7);
  color: rgba(${r},${g},${b},0.7); 
  box-shadow: inset -7px -3px 10px rgba(${r-10},${g-10},${b-10},0.7);
  margin: ${mt}px 0 0 ${ml}px;
  animation: float ${dur}s ease-in infinite
  `
}

function createBalloons(num) {
  var balloonContainer = document.getElementById("balloon-container")
  for (var i = num; i > 0; i--) {
  var balloon = document.createElement("div");
  balloon.className = "balloon";
  balloon.style.cssText = getRandomStyles();           
  balloonContainer.append(balloon);
  }
}


