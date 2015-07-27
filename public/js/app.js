var cards_array = ['A', 'A', 'B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L', 'M','M','N','N','O','O','P','P','Q','Q','R','R','S','S','T','T','U','U','V','V','W','W','X','X','Y','Y','Z','Z'];
console.dir(cards_array);
var values = [];
var id = [];
var flips = 0;
Array.prototype.memory_tile_shuffle = function(){
    var i = this.length, j, temp;
    while(--i > 0){
        j = Math.floor(Math.random() * (i+1));
        temp = this[j];
        this[j] = this[i];
        this[i] = temp;
    }
};
function newBoard(){
  tiles_flipped = 0;
  var output = '';
    cards_array.memory_tile_shuffle();
  for(var i = 0; i < cards_array.length; i++){
    output += '<div id="tile_'+i+'" onclick="memoryFlipTile(this,\''+cards_array[i]+'\')"></div>';
  }
  document.getElementById('memory_board').innerHTML = output;
};
