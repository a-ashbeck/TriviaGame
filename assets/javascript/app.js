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

var questionUp = {};
var questions = [questionOne, questionTwo, questionThree];
var questionSelector = 0;
var correctResponses = 0;
var wrongAnswers = 0;
var countdownClock = 40;
var reviewClock = 4;
var reviewCounter;
var questionCounter;

function questionTimer() {
    questionCounter = setInterval(decrementCountdown, 1000);
}

function reviewTimer() {
	reviewCounter = setInterval(decrementReview, 1000);
}

function decrementCountdown(){
    countdownClock--;
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
        if (questionSelector === 3) {
        	endGame();
        } else {
        	refreshQuestion();
        }
    }
}

function questionStop() {
    clearInterval(questionCounter);
}

function reviewStop() {
    clearInterval(reviewCounter);
}

function selectQuestion() {
	questionUp = questions[questionSelector];
	questionSelector++;
}



// jQuery functions
function generateBaseHtml() {
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

	$('.container').html(
		'<div class="row"></div>'
	);

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

	$('#display').hide();
}

function displayStats() {
	$('#countdown-clock').html('<h4>Time left: ' + countdownClock + '</h4>');
	$('#correct-answers').html(
		'<h4>Correct Answers: ' + correctResponses + '</h4>'
	);
	$('#wrong-answers').html('<h4>Wrong Answers: ' + wrongAnswers + '</h4>');
}

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

function loadResponseOptions() {
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

function questionAnswerReport() {
	$('#display').append(
		'<p>Question: <strong>' + questionUp.question +
		'</strong></p>' +
		'<p>The correct answer is: <strong>' + 
		questionUp.correctAnswer  + '</strong></p>'
	);
}

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

function ifAnswerClicked() {
	$('body').on('click', '.answer-option', function() {
		var btnTextHolder = $(this).html();
		questionStop();
	    generateReviewPanel(btnTextHolder);
	    reviewTimer();
	});
}

function ifTimeRunsOut() {
	if (countdownClock === 0) {
		generateReviewPanel();
		reviewTimer();
	}
}

function freshBoard() {
	questionUp = {};
	questionSelector = 0;
	correctResponses = 0;
	wrongAnswers = 0;
	refreshQuestion();
}

function refreshQuestion() {
	countdownClock = 40;
	reviewClock = 4;
	displayStats();
	selectQuestion();
	generateDisplay();
	questionTimer();
}

function setBoard() {
	$('#start').on('click', function() {
		freshBoard();
	});
}

function startGame() {
	generateBaseHtml();
	setBoard();
	ifAnswerClicked();
}

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

function restartGame() {
	$('#restart').on('click', function() {
		freshBoard();
	});
}


$(document).ready(function() {
	startGame();
});





