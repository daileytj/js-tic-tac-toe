var WINNING_CONDITIONS = [
    ["tl", "tm", "tr"],
    ["ml", "mm", "mr"],
    ["bl", "bm", "br"],
    ["tl", "ml", "bl"],
    ["tm", "mm", "bm"],
    ["tr", "mr", "br"],
    ["tl", "mm", "br"],
    ["tr", "mm", "bl"]
];

var used_blocks = [];

// Player counter used to determine current player - odd for player one, even for player 2
var player_counter = 0;

function display_board(jqueryElement) {
    renderedHTML = "";
    renderedHTML += "<div class = 'row'>";
    renderedHTML += "<div class = 'tl block'></div>";
    renderedHTML += "<div class = 'tm block'></div>";
    renderedHTML += "<div class = 'tr block'></div>";
    renderedHTML += "</div>";
    renderedHTML += "<div class = 'row'>";
    renderedHTML += "<div class = 'ml block'></div>";
    renderedHTML += "<div class = 'mm block'></div>";
    renderedHTML += "<div class = 'mr block'></div>";
    renderedHTML += "</div>";
    renderedHTML += "<div class = 'row'>";
    renderedHTML += "<div class = 'bl block'></div>";
    renderedHTML += "<div class = 'bm block'></div>";
    renderedHTML += "<div class = 'br block'></div>";
    renderedHTML += "</div>";
    jqueryElement.html(renderedHTML);
}

// variables used to test winning conditions
var object_x = ["X"];
var object_o = ["O"];

function playTicTacToe() {
    $(".block").on('click', $(".gameboard"), function() {
        var clicked_button = $(this)[0];

        if (used_blocks.indexOf(clicked_button) < 0 && $(".display_next_move").html() !== object_x[0] + " Wins!" &&
    $(".display_next_move").html() !== object_o[0] + " Wins!" ) {
            playerMove($(this));
            player_counter += 1;
            used_blocks.push(clicked_button);

        }
    });
}

function playerMove(block) {
    if (player_counter % 2 === 0) {
        placePlayerOneCounter(block);
        displayNextMove($(".display_next_move"));
        var classNameX = (block).attr('class').split(" ");
        object_x.push(classNameX[0]);
        isWin(object_x);
    } else {
        placePlayerTwoCounter(block);
        displayNextMove($(".display_next_move"));
        var classNameO = (block).attr('class').split(" ");
        object_o.push(classNameO[0]);
        isWin(object_o);
    }
}

function placePlayerOneCounter(jqueryElement) {
    jqueryElement.html("<img src='images/x.png'/>");
}

function placePlayerTwoCounter(jqueryElement) {
    jqueryElement.html("<img src='images/o.png'/>");
}

function displayNextMove(jqueryElement) {
    var next_move = "X";
    if (player_counter % 2 === 0) {
        next_move = "O";
    } else {
        next_move = "X";
    }
    jqueryElement.html("It Is " + next_move + "'s Turn");
}

function isWin(object) {
    for (var i = 0; i < WINNING_CONDITIONS.length; i += 1){
    if (object.indexOf(WINNING_CONDITIONS[i][0]) > 0 && object.indexOf(WINNING_CONDITIONS[i][1]) > 0 &&
object.indexOf(WINNING_CONDITIONS[i][2]) > 0) {
        $(".display_next_move").html(object[0] + " Wins!");
    }
}
}

$(document).ready(function() {
    display_board($(".game_board"));
    $(".display_next_move").html("It Is X's turn");
    playTicTacToe();

    $(".reset").on('click', function() {
        player_counter = 0;
        object_x = ["X"];
        object_o = ["O"];
        display_board($(".game_board"));
        $(".display_next_move").html("It Is X's turn");
        playTicTacToe();
    });
});
