// $(document).ready(function() {
//   var pics = [];
//   $.ajax({
//     url: 'https://api.imgur.com/3/album/b8p29#0.json',
//     method: 'GET',
//     headers: {
//       'Authorization': 'Client-ID fc919a2e4fa23ab'
//     }
//   })
//   .done(function(res) {
//     pics = res.data.images;
//     //Pushes picture links from pics to cards_array
//     //var cards_array = [];
//     function pullFromImgur() {
//       for(var i = 0; i < 2; i++){
//         for(var j = 0; j < pics.length; j++){
//           cards_array.push(pics[j].link);
//         }
//         console.dir(cards_array);
//       }
//     }
    //pullFromImgur();
//game code
var cards_array = ['A', 'A', 'B','B','C','C','D','D','E','E','F','F','G','G','H','H','I','I','J','J','K','K','L','L'];
var values = [];
var ids = [];
var flipped = 0;
var clicks = 0;
Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  while(--i> 0){
    j = Math.floor(Math.random() * (i+1));
    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  }
};
function newBoard(){
  //console.log("clicks done: " + clicks);
  clicks = 0;
  flipped = 0;
  var msg = '';
  cards_array.shuffle();
  for(var i = 0; i < cards_array.length; i++){
    msg += '<div id="tile_'+i+'" onclick="flipTile(this,\''+cards_array[i]+'\')"></div>';
  }
  document.getElementById('board').innerHTML = msg;
}
//window.addEventListener for load of game (newBoard());
function flipTile(tile, val){
  if(tile.innerHTML === "" && values.length < 2){
    tile.style.background = '#FFF'; //not needed with image
    tile.innerHTML = val; //change val to img
    if(values.length === 0 ){
      values.push(val);
      ids.push(tile.id);
      clicks++;
    } else if(values.length == 1){
      values.push(val);
      ids.push(tile.id);
      clicks++;
      if(values[0] === values[1]){
        flipped += 2;
        values = [];
        ids = [];
        if(flipped == cards_array.length){ //game is over, user won
          document.getElementById('board').innerHTML = "";
          newBoard();//create new board
        } else {
          function flip(){
            var card_1 = document.getElementById(ids[0]);
            var card_2 = document.getElementById(ids[1]);
            card_1.style.background = 'url(logo.png) no-repeat';
            card_2.style.background = 'url(logo.png) no-repeat';
            card_1.style.backgroundSize = 'cover';
            card_2.style.backgroundSize = 'cover';
            card_1.style.backgroundPosition = 'center';
            card_2.style.backgroundPosition = 'center';
            card_1.innerHTML = '';
            card_2.innerHTML = '';
            values = [];
            ids = [];
          }//http://imgur.com/lA0KNNt
        }
      }
      setTimeout(flip, 100);
    }
  }
}
newBoard();
//   })
//   .fail(function(err) {
//     console.log(err);
//   });
// });
