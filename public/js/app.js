var cards_array = ['A', 'A', 'B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L', 'M', 'M', 'N', 'N', 'O', 'O', 'P', 'P', 'Q', 'Q', 'R', 'R', 'S', 'S', 'T', 'T', 'U', 'U', 'V', 'V', 'W', 'W', 'X', 'X', 'Y', 'Y', 'Z', 'Z'];
var values = [];
var ids = [];
var flipped = 0;
Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  while(--i> 0){
    j = Math.floor(Math.random() * (i+1));
    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  }
  // console.log('j: ' + j);
  // console.log('temp: ' + temp);
};
function newBoard(){
  flipped = 0;
  var msg = '';
  cards_array.shuffle();
  for(var i = 0; i < cards_array.length; i++){
    msg += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+cards_array[i]+'\')"></div>';
  }
  document.getElementById('board').innerHTML = msg;
}
//window.addEventListener for load of game (newBoard());
function flipTile(tile, val){
  if(tile.innerHTML === "" && values.length < 2){
    tile.style.background = '#FFF'; //not needed with image
    tile.innerHTML = val; //change val to img
    if(values.length === 0){
      values.push(val);
      ids.push(tile.id);
    } else if(values.length == 1){
      values.push(val);
      ids.push(tile.id);
      if(values[0] === values[1]){
        flipped += 2;
        values = [];
        ids = [];
        if(flipped === cards_array.length){
          //game is over, user won
          //create new board
        } else {
          function flip(){
            var card_1 = document.getElementById(ids[0]);
            var card_2 = document.getElementById(ids[1]);
            card_1.style.background = 'url (title_bg.jpg) no repeat'; //change to new Jose image
            card_1.innerHTML = '';
            card_2.style.background = 'url (title_bg.jpg) no repeat';
            card_2.innerHTML = '';
            values = [];
            ids = [];
          }
          setTimeout(flip, 2000);
        }
      }
    }
  }
}
