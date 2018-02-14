// // JS code goes here

var winPlayer1 = 0;
var winPlayer2 = 0;
var lostPlayer1 = 0;
var lostPlayer2 = 0;
var turnCount = 0;

function startGame() {
	for (var i = 0; i < 9; i++) {
		restartGame(i);
		turnCount = 0;
	}
	document.turn = "X";
	document.winner = null;
	setStatus(document.turn + " get's to start");
}

function setStatus(msg) {
	document.getElementById("message").innerText = msg;
}

function play(square) {
	if (document.winner != null) {
		if (document.turn == "X") {
			setStatus("Player 1 already won!");
		} else {
			setStatus("Player 2 already won!");
		}
	} else if (square.innerText == "") {
		square.innerText = document.turn;
		switchTurn();
	} else if (turnCount >= 9 && document.winner == null) {
		setStatus("Match draw");
	} else {
		setStatus("You can't pick this box")
	}
}

function switchTurn() {
	turnCount++;
	console.log(turnCount);
	if (checkWinner(document.turn)) {
		if (document.turn == "X") {
			setStatus("Congrats! Player 1 has won!");
		} else if (document.turn == "Y") {
			setStatus("Congrats! Player 2 has won!");
		}
		document.winner = document.turn;
	} else if (document.turn == "X") {
		document.turn = "O";
		setStatus("It's " + document.turn + " turn now");
	} else if (document.turn == "O") {
		document.turn = "X";
		setStatus("It's " + document.turn + " turn now");
	} else if(!checkWinner(document.turn)) {
		setStatus("Draw");
	}
}

function checkWinner(move) {
	var result = false;
	if (checkRow(0,1,2,move) ||
		checkRow(3,4,5,move) ||
		checkRow(6,7,8,move) ||
		checkRow(0,3,6,move) ||
		checkRow(1,4,7,move) ||
		checkRow(2,5,8,move) ||
		checkRow(0,4,8,move) ||
		checkRow(2,4,6,move)) {
		result = true;
		if (document.turn == "X") {
			winPlayer1++;
			lostPlayer2++;
			document.getElementById("winP1").innerText = winPlayer1;
			document.getElementById("lostP2").innerText = lostPlayer2;
		} else {
			winPlayer2++;
			lostPlayer1++;
			document.getElementById("winP2").innerText = winPlayer2;
			document.getElementById("lostP1").innerText = lostPlayer1;
		}
	} else {
		result = false;
		return result;
	}
	
	return result;
}

function checkRow(a, b, c, move) {
	var result = false;
	if(getBox(a) == move && getBox(b) == move && getBox(c) == move) {
		result = true;
	}

	return result;
}

function getBox(number) {
	return document.getElementById(number).innerText;
}

function restartGame(number) {
	document.getElementById(number).innerText = "";
}