// TODO:
// 1. Clear only past location with each iteration - not entire board.
// 2. CLEAN THIS SHIT UP
// 3. Implement this.win()
// 4. fix a bug where going inside yourself doesn't result in a loss.
// 5. Better UI: add score, highscore (using localStorage), Status messages

var Snake = function(size) {
  this.board = new Board(size);
  this.board.init(0,0);
  this.food = {x:Math.floor(Math.random() * this.board.width), y: Math.floor(Math.random() * this.board.height)}
  this.len = 1;
  this.body = {
    head: {x:0, y:0},
    body: [],
  };

  this._isInBody = function(coorObj) {
    if (typeof coorObj.x === 'undefined' || typeof coorObj.y === 'undefined') {
      console.log('Error - got an invalid argument. (_isInBody())')
    }
    else {
      for(var i = 0; i < this.len; i++) {
        if(this.body.head.x === this.body.body[i].x && 
           this.body.head.y === this.body.body[i].y) {
          return true;
        }
      }
    return false;
    }
  }

  this._updateBody = function() {
    this.body.head =  {x: this.board.x, y: this.board.y};
    console.log('head is ', this.body.head);
    // Extract body coordinates. -1 because head is counted in len.
    this.body.body = this.board.prev.slice((-1 * this.len) - 1);
    console.log('body is ', this.body.body);
  }

  this.updateUI = function(bodyColor, headColor, foodColor) {
    console.log("updateUI called")
    if(typeof bodyColor === 'undefined') {
      var bodyColor = 'grey';
    }
    if(typeof headColor === 'undefined') {
      var hradColor = 'black';
    }
    if(typeof foodColor === 'undefined') {
      var foodColor = 'red'
    }
    var selectorTemp = function(x,y) {
        return $('[data-x="' + x + '"][data-y="' + y + '"]');
    }
    $('.square').css('background-color', 'white');

    console.log('head', this.body.head);
    console.log('length', this.len);
    selectorTemp(this.food.x, this.food.y).css('background-color', foodColor);
    for (var i = 0; i < this.body.body.length; i++) {
      selectorTemp(this.body.body[i].x, this.body.body[i].y).css('background-color', bodyColor);
    }
    selectorTemp(this.body.head.x, this.body.head.y).css('background-color', headColor);
  }

  this.go = function(direction) {
    var okWithWalls = this.board.go(direction);
    console.log('OWW', okWithWalls);
    this._updateBody();
    //check whether losing
    if(this.lost(okWithWalls)) {
      return 'lost';
    };
    // whether snake just ate
    if(this.body.head.x === this.food.x && this.body.head.y === this.food.y) {
      this.eat();
      // whether snake is at full size (win)
      if(this.len === (this.board.width * this.board.height)) {
        console.log('YOU WON!!!');
      }
    }
    return true;
  }

  this.eat = function() {
    this.len++;
    this._updateBody();
    this._genNewFood();
  }

  this.lost = function(opt) {
      // whether snake hits the wall
    if(!opt) {
      this.lose("Lost! You Hit The Wall!");
      return true;
    }

    // whether snake hit itself
    var isAutoCannibal = this._isInBody(this.body.head);
    console.log('isAutoCannibal', isAutoCannibal);
    if(isAutoCannibal) {
      this.lose("Lost! Shameless autocannibalism!");
      return true;
    }
    return false;
  }

  this.lose = function(message) {
    console.log(message);
  }

  this._genNewFood = function() {
    this.food.x = Math.floor(Math.random() * this.board.width);
    this.food.y = Math.floor(Math.random() * this.board.height);
    
    // Don't generate food on the snake's body
    if(this._isInBody(this.food)) { 
      console.log('generating new food!!! <-----')
      this._genNewFood();
    }
  }
}