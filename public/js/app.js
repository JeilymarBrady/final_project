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
    //Pushes picture links from pics to cards_array
    var Picture = function(path){
      this.path = path;
      this.flipped = false;
      // this.clicks;
      this.img = document.createElement('img');
      this.img.src = this.path;
      this.front = document.createElement('div');
      this.front.src = 'logo.png';
      this.render = function(){
        var container = document.getElementById('board');
        container.appendChild(this.front);
      };
      // $('container').on('click', this.flipPicture);
    };
    var cards_array = [];
    function pullFromImgur() {
      for(var i = 0; i < 2; i++){
        for(var j = 0; j < pics.length; j++){
          cards_array.push(new Picture(pics[j].link));
          if(i<10){
            cards_array[j].render();
          } else {
            cards_array[j+10].render();
          }
        }
      }
    }
    pullFromImgur();
    // $('board').on('click', flipPicture);
    /////////////////////////////////////////////////////////////////////
    var contain = document.getElementById('board').childNodes;
    console.log(contain);
    contain[contain.length -1].addEventListener('click', function(e) {
      e.preventDefault();
      console.log('yo');
    }, false);
    /////////////////////////////////////////////////////////////////////
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
    cards_array.shuffle();

    //window.addEventListener for load of game (newBoard());
    function flipPicture(){
      console.log("fliptile");

    // if(tile.innerHTML === "" && values.length < 2){
    //     tile.style.background = '#FFF'; //not needed with image
    //     tile.innerHTML = '<img src=\'' + cards_array[0].path + '\'/>';//change val to img
    //     if(values.length === 0 ){
    //       values.push(val);
    //       ids.push(tile.id);
    //       clicks++;
    //     } else if(values.length == 1){
    //       values.push(val);
    //       ids.push(tile.id);
    //       clicks++;
    //       if(values[0] === values[1]){
    //         flipped += 2;
    //         values = [];
    //         ids = [];
    //         if(flipped == cards_array.length){ //game is over, user won
    //           document.getElementById('board').innerHTML = "";
    //           newBoard();//create new board
    //         } else {
    //             console.log('flip');
    //             values = [];
    //             ids = [];
    //         }
    //       }
    //       setTimeout(flip, 100);
    //     }
    //   }
    }
})
  .fail(function(err) {
    console.log(err);
  });
});
