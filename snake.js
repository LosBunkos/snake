var Snake = function() {
  this.board = new Board();
  this.board.init(0,0);
  this.food = _genNewFood();
  this.len = 1;
  this.body = {
    head: {x:0, y:0},
    body: [],
  };


  this._updateBody = function() {
    this.body.head =  {x: board.x, y: board.y};
    // Extract body coordinates. -1 because head is counted in len.
    this.body.body = this.board.prev.slice((-1 * this.len) - 1);
  }

  this.go = function(direction) {
    this._updateBody();
    //check whether losing
    // whether snake hits the wall
    if(!this.board.go(direction)) {
      this.lose("Lost! You Hit The Wall!");
    };
    // whether snake hit itself
    var isAutoCannibal = this.body.filter(function(section) {
      return this.body.head.x === section.x &&\
             this.body.head.y === section.y;
    }).length > 0;
    if(isAutoCannibal) {
      this.lose("Lost! Shameless autocannibalism!");
      return;
    }

    // whether snake just ate
    if(this.head.x === this.food.x && this.head.y === this.food.y) {
      this.len++;
      this._updateBody();
      // whether snake is at full size (win)
      if(this.len === (this.board.width * this.board.height)) {
        this.win();
      }
    }


    //check whether eating
    //else - just move
  }

  this.eat = function() {
    // TODO
  }

  this.lose = function(message) {

  }

  this._genNewFood = function() {

  }
}