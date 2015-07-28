var Card = function(x, y, face){
  this.x = x;
  this.y = y;
  this.face = face;
  this.width = 70;
};

Card.prototype.drawFaceDown = function(){
  fill(214, 247, 202);
  strokeWeight(2);
  rect(this.x, this.y, this.width, this.width, 10);
  image(getImage("../logo.png"), this.x, this.y, this.width, this.width);
  this.isFaceUp = false;
};

Card.prototype.drawFaceUp = function(){
  fill(214, 247, 202);
  strokeWeight(2);
  rect(this.x, this.y, this.width, this.width);
  this.isFaceUp = true;
};

Card.prototype.cardChosen = function(x, y){
  return x >= this.x && x <= this.x + this.width;
};

//global
var cols = 5; //max
var rows = 4; //max

//array of faces
var cards_array = [];
cards_array = ['A', 'B','C','D','E','F','G','H','I','J'];
//  cards_array = [
//   getImage("bunch/alice.png"),
//   getImage("bunch/bobby.png"),
//   getImage("bunch/carol.png"),
//   getImage("bunch/cindy.png"),
//   getImage("bunch/greg.png"),
//   getImage("bunch/jan.png"),
//   getImage("bunch/marcia.png"),
//   getImage("bunch/mike.png"),
//   getImage("bunch/peter.png"),
//   getImage("bunch/tiger.png")
// ];

//array w/ 2 of each
var possibleFaces = cards_array.slice(0);
var selected = [];
for(var i = 0; i < (cols * rows)/2; i++){
  //randomly pick one from the array of remaining faces
  var random = Math.floor(Math.random(possibleFaces.length));
  var face = possibleFaces[random];
  //push twice
  selected.push(face);
  selected.push(face);
  //remove
  possibleFaces.splice(random, 1);
}

//randomize
selected.sort(function(){
  return 0.5 - Math.random();
});

//create tiles
var cards = [];
for(var i = 0; i < cols; i++){
  for(var j = 0; j < rows; j++){
    cards.push(new Card(i * 78 + 10, j * 78 + 40, selected.pop()));
  }
}

//background(255, 255, 255);

var tableContainer = document.getElementById('board');
var table = document.createElement('table');
tableContainer.innerHTML = table;

firstDrawFaceDown = function(cardArray){
  var deck = cardArray;
  console.log(deck);
  console.dir(deck);
  //rect(this.x, this.y, this.width, this.width, 10);
  //image(getImage("../logo.png"), this.x, this.y, this.width, this.width);
  for (var i = 0; i < cols; i++) {
    console.log("columns");
    for (var j = 0; j < rows; j++) {
      console.log("rows");
      var tr = table.insertRow();
      // tr.id = "";
      var cellData = "<img src=\'"+'../logo.png'+"\'>";
      // rect(this.x, this.y, this.width, this.width);
      tr.append('cellData');
      table.appendChild('tr');
      // '<div id="tile_'+i+'" onclick="flipTile(this,\''+cards_array[i]+'\')"></div>';
    }
  }
  this.isFaceUp = false;
};

firstDrawFaceDown(cards);

var flipped = [];
var delayStartFC = null;
var numTries = 0;

clicks = function() {
  for(var i = 0; i < cards.length; i++){
    if(cards[i].cardChosen(mouseX, mouseY)){
      if(flipped.length < 2 && !cards[i].isFaceUp){
        cards[i].drawFaceUp();
        flipped.push(cards[i]);
        if(flipped.length === 2){
          numTries++;
        if(flipped[0].face === flipped[1].face){
          flipped[0].isMatch = true;
          flipped[1].isMatch = true;
        }
        delayStartFC = frameCount;
        loop();
        }
      }
    }
    var foundAllMatches = true;
    for(var i = 0; i < cards.length; i++){
      foundAllMatches = foundAllMatches && cards[i].isMatch;
    }
    if(foundAllMatches){
      fill(0, 0, 0);
      textSize(20);
      text("You found them all in " + numTries + " tries!", 20, 375);
    }
  }
};

draw = function(){
  if(delayStartFC && (frameCount - delayStartFC) > 30){
    for (var i = 0; i < cards.length; i++) {
      if(!cards[i].isMatch){
        cards[i].drawFaceDown();
      }
    }
    flippedTiles = [];
    delayStartFC = null;
    noLoop();
  }
};













