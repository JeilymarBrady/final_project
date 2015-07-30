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
    window.pics = pics;
    pullFromImgur();
  })
  .fail(function(err) {
    console.log(err);
  });

  ///USERS
  var Users = function(userName, passWord, score) {
    this.userName = userName;
    this.passWord = passWord;
    this.score = [];
    this.loggedIn = true;
  };

  var userAry = [];

  if(document.getElementById('user-input')){
    var createNewUser = document.getElementById('user-input');
    createNewUser.addEventListener('submit', function(e) {
      e.preventDefault();
      setLoginStatusFalse(userAry);
      var userName = createNewUser.elements[0].value;
      var passWord = createNewUser.elements[1].value;
      if (!(userName && passWord)) {
        return;
      } else {
          if (!(checkForDoubles(userName, userAry))) {
          userAry.push(new Users(userName, passWord, 0));
          saveLocalData();
          }
      }
      createNewUser.elements[0].value = 'Logged in, try playing our game!';
      createNewUser.elements[1].value = '';
    });

    var logIn = document.getElementById('user-input-login');
    logIn.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log(userAry);
      console.log('listen');
      var userName = logIn.elements[0].value;
      var passWord = logIn.elements[1].value;
      if (!(userName && passWord)) {
        return;
      } else {
        setLoginStatusFalse(userAry);
          if(checkForPassword(userName, passWord, userAry)) {
            console.log('logInStatusTrue');
          } else {
            alert("Wrong Username or Password");
          }

      }
      logIn.elements[0].value = 'Logged in, try playing our game!';
      logIn.elements[1].value = '';
    });
  }

  function setLoginStatusFalse(userAry){
    console.log("function false running");
    for (var i = 0; i < userAry.length; i++) {
      // console.log("set to false");
      userAry[i].loggedIn = false;
      //console.dir(userAry[i].loggedIn);
    }
    // console.dir(userAry);
  }

  function checkForDoubles(userName, userAry) {
    for (var i = 0; i < userAry.length; i++) {
      if (userName == userAry[i].userName) return true;
      }
    return false;
  }

  function checkForPassword(userName, passWord, userAry) {
    for (var i = 0; i < userAry.length; i++) {
      if ((userName == userAry[i].userName) && (passWord == userAry[i].passWord)){
        console.log(userAry[i].loggedIn + " before");
        userAry[i].loggedIn = true;
        console.log(userAry[i].loggedIn + " after");
        saveLocalData();
        return true;
      }
    }
    return false;
  }

  var Picture = function(path){
    this.flipped = false;
    this.img = document.createElement('img');
    this.img.visited = false;
    this.img.logo = 'logo.png';
    this.img.path = path;
    this.img.src = this.img.logo;
    this.img.addEventListener('click', function(e) {
      e.preventDefault();
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

  //Global variables
  var cards_array;
  var values = [];
  var flipped = 0;
  var clicks = 0;

  function pullFromImgur() {
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
  }

  function gameTime(e){
    var pic = e;
    if(!(pic.visited) && values.length < 2){
      pic.visited = true;
      pic.src = pic.path;
    }
      values.push(pic);
      clicks++;
      if(values.length===2){
        if(values[0].path===values[1].path){
          flipped+=2;
          values = [];
          if(flipped === cards_array.length){
            alert("You won! You used " + clicks + " clicks to find all of the pairs.");
            updateScore(clicks);
            flipped = 0;
            clicks = 0;
            document.getElementById('board').innerHTML = '';
            pullFromImgur();
          }
        } else {
            setTimeout(flip, 700);
          }
      }

  }

  function updateScore(click){
    var totalClicks = click;
    for(var i = 0; i < userAry.length; i++){
      if(userAry[i].loggedIn){
        userAry[i].score.push(totalClicks);
        userAry[i].score.sort(function(a, b){
          return a - b;
        });
      }
    }
    saveLocalData();
    renderScore();
  }

  function flip(){
    for (var i = 0; i < values.length; i++) {
      values[i].src = values[i].logo;
      values[i].visited = false;
    }
    values = [];
  }

  ///LOCAL DATA
  var saveLocalData = function() {
    localStorage.setItem("userAry", JSON.stringify(userAry));
    console.log('hello from save local data');
  };

  var renderScore = function() {
    var main = document.getElementById('score-board');
    var addRow = document.createElement('tr');
    var addUser = document.createElement('td');


    for (var i = 0; i < userAry.length; i++) {
      if(userAry[i].loggedIn){
        addUser.innerHTML = userAry[i].userName;
        addRow.appendChild(addUser);
        var addScore = document.createElement('td');
        addScore.innerHTML = userAry[i].score;
        addRow.appendChild(addScore);
        main.appendChild(addRow);
      }
    }
  };

  if(!(localStorage.getItem("userAry"))){
    saveLocalData();
  } else {
    userAry = JSON.parse(localStorage.getItem('userAry'));
    //renderScore();
  }
});
