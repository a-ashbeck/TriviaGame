//  Objects for game questions
var questionOne = {
	question: 'What... is your name?',
	answers: ['Bob', 'Sir Lancelot of Camelot', 'Sir Galahad', 'John Cleese'],
	correctAnswer: 'Sir Lancelot of Camelot',
	video: 'https://www.youtube.com/embed/cV0tCphFMr8?start=62&end=81'
};

var questionTwo = {
	question: 'What... is your quest?',
	answers: [
		'To seek the Holy Grail',
		'To seek the airspeed velocity of an unladen swallow',
		'To get across this bridge...',
		'To seek an African, or a European, swallow'
	],
	correctAnswer: 'To seek the Holy Grail',
	video: 'https://www.youtube.com/embed/cV0tCphFMr8?start=83&end=86'
};

var questionThree = {
	question: 'What... is your favorite colour?',
	answers: ['Red', 'Blue', 'Yellow', 'Blue. NO..AUUUGHHHHH'],
	correctAnswer: 'Blue',
	video: 'https://www.youtube.com/embed/cV0tCphFMr8?start=87&end=90'
};

// Empty object fro current question
var questionUp = {};
// Array of the question objects
var questions = [questionOne, questionTwo, questionThree];
// Iterator for questions array
var questionSelector = 0;
// Counter for correct responses
var correctResponses = 0;
//  Counter for wrong and no responses
var wrongAnswers = 0;
// Countdown timer for question session
var countdownClock = 40;
// Countdown clock for review page after each question
var reviewClock = 4;
// Question and review sections counters for setInterval functions
var reviewCounter;
var questionCounter;

// Interval functions for question sequence and review sequence
function questionTimer() {
    questionCounter = setInterval(decrementCountdown, 1000);
}

function reviewTimer() {
	reviewCounter = setInterval(decrementReview, 1000);
}

// Decrement functions for question and review pages
function decrementCountdown(){
    countdownClock--;
    // updates timer display in DOM
    $('#countdown-clock').html('<h4>Time left: ' + countdownClock + '</h4>');

    if (countdownClock === 0){
        questionStop();
        ifTimeRunsOut();
    }
}

function decrementReview(){
    reviewClock--;
    
    if (reviewClock === 0){
        reviewStop();
        if (questionSelector === questions.length) {
        	endGame();
        } else {
        	refreshQuestion();
        }
    }
}

//  Functions to stop the intervals for question and review pages
function questionStop() {
    clearInterval(questionCounter);
}

function reviewStop() {
    clearInterval(reviewCounter);
}

// Function for setting the questionUp object to the next question object
function selectQuestion() {
	questionUp = questions[questionSelector];
	// Increases the question selection iterator
	questionSelector++;
}

// jQuery functions

// Function to generate all base HTML
function generateBaseHTML() {
	setBodyHTML();
	setContainerHTML();
	setRowHTML();

	$('#display').hide();
}

// Dynamically generates Jumbotron and Container
function setBodyHTML() {
	$('body').html(
		'<div class="jumbotron">' +
			'<h1 class="text-center">' +
				'Bridge Troll Trivia!' +
			'</h1>' +
			'<p class="text-center">' +
				'<strong>Stop! Who would cross the Bridge of Death ' +
				'must answer me these questions three, ' +
				'ere the other side he see...</strong>' +
			'</p>' +
		'</div>' +
		'<div class="container"></div>'
	);
}

// Generates bootstrap row
function setContainerHTML() {
	$('.container').html(
		'<div class="row"></div>'
	);
}

//  Sets the HTML of the row
function setRowHTML() {
	$('.row').html(
		'<div id="status-panel" class="col-md-3 col-sm-12 col-xs-12">' +
			'<div class="panel panel-info">' +
				'<div class="panel-heading">' +
				'	<h3 class="panel-title">Stats</h3>' +
				'</div>' +
				'<div class="panel-body">' +
					'<div id="countdown-clock"></div>' +
					'<div id="correct-answers"></div>' +
					'<div id="wrong-answers"></div>' +
				'</div>' +
			'</div>' +
		'</div>' +

		'<div id="display-well" class="col-md-8 col-sm-12 col-xs-12 ' +
		'pull-right">' +
			'<div class="well well-lg">' +
				'<div id="start-panel">' +
					'<div class="text-center alert alert-success">' +
						'<h4>' +
							'If you would like to cross this bridge, ' +
							'answer the bridge-man\'s 3 questions.' +
						'</h4>' +
						'<h4>' +
							'For some context, play the video segment ' +
							'for each question!' +
						'</h4>' +
					'</div>' +
					'<button id="start" class="btn btn-info btn-lg ' +
					'center-block">' +
						'Start Game!' +
					'</button>' +
				'</div>' +
				'<div id="display"></div>' +
			'</div>' +
		'</div>'
	);
}

// Function to display game stats and countdown clock
function displayStats() {
	$('#countdown-clock').html('<h4>Time left: ' + countdownClock + '</h4>');
	$('#correct-answers').html(
		'<h4>Correct Answers: ' + correctResponses + '</h4>'
	);
	$('#wrong-answers').html('<h4>Wrong Answers: ' + wrongAnswers + '</h4>');
}

// Loads questions to the display in DOM
function generateDisplay() {
	$('#start-panel').hide();
	$('#display').show();
    $('#display').html(
        '<div class="panel panel-primary">' +
        	'<div class="panel-heading">' +
        		'<h2>Question:</h2>' +
    		'</div>' +
        '<div class="panel-body">' +
        	'<h4>' + questionUp.question + '</h4>' +
        	'<div class="embed-responsive embed-responsive-16by9">' +
	        	'<iframe class="embed-responsive-item" ' +
	        	'width="640" height="360" src="' + questionUp.video +
	        	'" frameborder="0" allowfullscreen></iframe>' +
	        '</div>' +
        '</div>' +
        '<div class="panel-footer"></div>'
    );
    loadResponseOptions();
}

// Loads trivia question and response to the DOM
function loadResponseOptions() {
	// utilization of for loop to append response options to DOM
	for (var i = 0; i < questionUp.answers.length; i++) {
		$('.panel-footer').append(
			'<p>' +
				'<button class="btn btn-success btn-lg ' +
				'btn-block answer-option">' +
	        		questionUp.answers[i] +
	        	'</button>' +
	        '</p>'
	    );
	}
}

// Reports the current question and the correct answer
function questionAnswerReport() {
	$('#display').append(
		'<p>Question: <strong>' + questionUp.question +
		'</strong></p>' +
		'<p>The correct answer is: <strong>' + 
		questionUp.correctAnswer  + '</strong></p>'
	);
}

// This dynamically generates the content of the review page
function generateReviewPanel(textOfClickedBtn) {
	if (textOfClickedBtn === questionUp.correctAnswer) {
		$('#display').html('<h3 class="text-success">Correct!</h3>');
		correctResponses++;
	} else if (textOfClickedBtn !== questionUp.correctAnswer) {
		$('#display').html('<h3 class="text-danger">Wrong!</h3>');
		wrongAnswers++;
	} else {
		$('#display').html('<h3 class="text-danger">Time\'s up!</h3>');
		wrongAnswers++;
	}
	
	questionAnswerReport();
}

// Handles clicks on an answer choice
function ifAnswerClicked() {
	$('body').on('click', '.answer-option', function() {
		// Utilization of 'this'
		var btnTextHolder = $(this).html();
		questionStop();
	    generateReviewPanel(btnTextHolder);
	    reviewTimer();
	});
}

// Handles the events of a clock timeout
function ifTimeRunsOut() {
	if (countdownClock === 0) {
		generateReviewPanel();
		reviewTimer();
	}
}

// This resets the board and loads the next question
function freshBoard() {
	questionUp = {};
	questionSelector = 0;
	correctResponses = 0;
	wrongAnswers = 0;
	refreshQuestion();
}

// This resets the game for the new question
function refreshQuestion() {
	countdownClock = 40;
	reviewClock = 4;
	displayStats();
	selectQuestion();
	generateDisplay();
	questionTimer();
}

// This sets the board upon clicking the start button
function setBoard() {
	$('#start').on('click', function() {
		freshBoard();
	});
}

// This function sets for all the functions of the game
function startGame() {
	generateBaseHTML();
	setBoard();
	ifAnswerClicked();
}

// Handles the end-game display and reset option
function endGame() {
	displayStats();
	$('#display').html(
		'<h3>Game Over!</h3>' +
		'<p>You answered ' + correctResponses + ' correctly out of 3!</p>' +
		'<button id="restart" class="btn btn-info btn-lg center-block">' +
			'Restart Game!' +
		'</button>'
	);
	restartGame();	
}

// Handles the restart of the game on clicking the restart button
function restartGame() {
	$('#restart').on('click', function() {
		freshBoard();
	});
}

// jQuery document.ready function
$(document).ready(function() {
	startGame();
});





