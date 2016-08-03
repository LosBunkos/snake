snake = new Snake(20); // 15 = Size (15x15)
snakeSpeed = 150; // 150 == speed (lower = faster)
board = snake.board;

var headColor = '#7EF752';
var bodyColor = '#3B7A23';

divTemplate = function(x, y) {
  return "<div data-x='" + x +
            "' data-y='" + y + 
            "'class='square'>" +
         "</div>";
}

renderBoard = function() {
  var tempBoard = ''; // For performance
  $('#board').empty();
  for (var i = 0; i < board.height; i++) {
    for (var j = 0; j < board.width; j++) {
      tempBoard += divTemplate(j, i);     
    }
  }
  $('#board').append(tempBoard);

  $('[data-x="' + snake.body.head.x + '"][data-y="' + snake.body.head.y + '"]').css('background-color', headColor);
  $('.square').css('width',((100 / board.width) + '%'));
  $('.square').css('height',((100 / board.height) + '%'));

}

renderChanges = function() {
  // var $current = $('[data-x="' + board.x + '"][data-y="' + board.y + '"]').css('background-color', headColor);
  // var $previous = $('[data-x="' + board.prevX + '"][data-y="' + board.prevY + '"]').css('background-color', bodyColor);
  snake.updateUI(bodyColor, headColor);
}

var direction = 'd';
var keyToDirection = {
  'w' : 'up',
  's' : 'down',
  'a' : 'left',
  'd' : 'right',
  'p' : 'pause'
}

handleClicks = function() {  
  $(document).keypress(function(e) {
    var tempDirection = String.fromCharCode(e.which); // Ignore non-'WASD' keys
    if(keyToDirection.hasOwnProperty(tempDirection)) {
      console.log('Notice: got keystroke: ' + direction);
      direction = tempDirection;
    }
  });
}
    // snake.go(keyToDirection[direction]);
    // renderChanges();


renderBoard();
handleClicks();

var interval = setInterval(function() {
  if(snake.go(keyToDirection[direction]) !== 'lost' && direction !== 'p') {
    snake.updateUI(bodyColor, headColor);
    snakeSpeed+=100;
  } else {
    clearInterval(interval);
  }
}, snakeSpeed);


