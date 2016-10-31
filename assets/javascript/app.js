var questionOne = {
	question: 'What is your name?',
	answers: [
		['Bob', 'no'],
		['Sir Lancelot of Camelot', 'yes'],
		['Sir Galahad', 'no'],
		['John Cleese', 'no']
	]
};

var questionTwo = {
	question: 'What is your quest?',
	answers: [
		['To seek the Holy Grail', 'yes'],
		['To find the airspeed of an unladen swallow', 'no'],
		['To get across this bridge...', 'no'],
		['An African or a European swallow?', 'no']
	]
};

var questionThree = {
	question: 'What is your favorite color?',
	answers: [
		['Red', 'no'],
		['Blue', 'yes'],
		['Yellow', 'no'],
		['Blue. NO..AUUUGHHHHH', 'no']
	]
};

var questionUp = {};
var questions = [questionOne, questionTwo, questionThree];
var questionSelector = 0;
var correctAnswers = 0;
var wrongAnswers = 0;
var countdownClock = 15;
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
    $('#countdown-clock').html('<h4>' + countdownClock + '</h4>');

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
		'<div id="countdown-clock"></div>' +
		'<div id="correct-answers"></div>' +
		'<div id="wrong-answers"></div>' +
		'<div id="start-panel"><button id="start">Start Game!</button></div>' +
		'<div id="display"></div>'
	);

	$('#display').hide();
}

function displayStats() {
	$('#countdown-clock').html('<h4>' + countdownClock + '</h4>');
	$('#correct-answers').html('<h4>' + correctAnswers + '</h4>');
	$('#wrong-answers').html('<h4>' + wrongAnswers + '</h4>');
}

function generateDisplay() {
	$('#start-panel').hide();
	$('#display').show();
    $('#display').html(
        '<div class="panel panel-primary"><div class="panel-heading"><h2>Question:</h2></div>' +
        '<div class="panel-body"><h3>' + questionUp.question + '</h3></div>' +
        '<div class="panel-footer"><p><button class="answer-option" correct="' + questionUp.answers[0][1] + '">' + questionUp.answers[0][0] +
        '</button></p><p><button class="answer-option" correct="' + questionUp.answers[1][1] + '">' + questionUp.answers[1][0] + '</button></p><p><button class="answer-option" correct="' + questionUp.answers[2][1] + '">' +
        questionUp.answers[2][0] + '</button></p><p><button class="answer-option" correct="' + questionUp.answers[3][1] + '">' +
        questionUp.answers[3][0] + '</button></p></div></div>'
    );
}

function generateReviewPanel(attributeOfClickedBtn) {
	if (attributeOfClickedBtn === 'yes') {
		$('#display').html('<p>Correct!</p>');
		correctAnswers++;
	} else if (attributeOfClickedBtn === 'no') {
		$('#display').html('<p>Wrong!</p>');
		wrongAnswers++;
	} else {
		$('#display').html('<p>Time\'s up!</p>');
		wrongAnswers++;
	}
}

function ifAnswerClicked() {
	$('body').on('click', '.answer-option', function() {
		var attributeHolder = $(this).attr('correct');
		questionStop();
	    generateReviewPanel(attributeHolder);
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
	correctAnswers = 0;
	wrongAnswers = 0;
	refreshQuestion();
}

function refreshQuestion() {
	countdownClock = 15;
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
		'<p>You answered ' + correctAnswers + ' correctly out of 3!</p>' +
		'<button id="restart">Restart Game!</button>'
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





