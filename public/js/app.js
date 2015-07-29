$(document).ready(function() {
  var pics;
  $.ajax({
    url: 'https://api.imgur.com/3/album/b8p29#0.json',
    method: 'GET',
    headers: {
      'Authorization': 'Client-ID fc919a2e4fa23ab'
    }
  })
  .done(function(res) {
    pics = res.data.images;
    pullFromImgur(pics);
})
  .fail(function(err) {
    console.log(err);
  });
});

var Picture = function(path){
  this.flipped = false;
  this.img = document.createElement('img');
  this.img.visited = false;
  this.img.logo = 'logo.png';
  this.img.path = path;
  this.img.src = this.img.logo;
  this.img.addEventListener('click', function(e) {
    e.preventDefault();
    console.dir(e.target);
    gameTime(e.target);
  }, true);
  this.render = function(){
    var container = document.getElementById('board');
    container.appendChild(this.img);
  };
};

Array.prototype.shuffle = function() {
  var i = this.length, j, temp;
  while(--i> 0){
    j = Math.floor(Math.random() * (i+1));
    temp = this[j];
    this[j] = this[i];
    this[i] = temp;
  }
};

var cards_array;
function pullFromImgur(picsArray) {
  var pics = picsArray;
  cards_array = [];
  for(var i = 0; i < 2; i++){
    for(var j = 0; j < pics.length; j++){
      cards_array.push(new Picture(pics[j].link));
    }
  }
  cards_array.shuffle();
  for (var k = 0; k < cards_array.length; k++) {
    cards_array[k].render();
  }
  console.dir(cards_array);
}

//Global variables
var values = [];
var ids = [];
var flipped = 0;
var clicks = 0;

function gameTime(e){
  var pic = e;
  if(!(pic.visited) && values.length < 2){
    pic.visited = true;
    pic.src = pic.path;
    console.log(pic.visited);
    if(values.length===0){
      values.push(pic);
      ids.push(pic);
      clicks++;
    } else if (values.length === 1){
      values.push(pic);
      ids.push(pic);
      clicks++;
      if(values[0].path===values[1].path){
        console.log('match');
        flipped+=2;
        values = [];
        ids = [];
        if(flipped === cards_array.length){
          alert("A new game has been started! You used " + clicks + " clicks to find all of the pairs.");
          document.getElementById('board').innerHTML = '';
          pullFromImgur();
        }
      } else {
        setTimeout(flip, 700);
      }
    }
  }
}

function flip(){
  console.log('flipBack');
  console.log(values[0]);
  values[0].src = values[0].logo;
  values[1].src = values[1].logo;
  values[0].visited = false;
  values[1].visited = false;
  values = [];
  ids = [];
}
