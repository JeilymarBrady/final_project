var Users = function(userName, passWord, score) {
  this.userName = userName;
  this.passWord = passWord;
  this.score = 0;
};

var userAry = [];
var logInStatus = false
var createNewUser = document.getElementById('user-input');
createNewUser.addEventListener('submit', function(e) {
  e.preventDefault();
  var userName = createNewUser.elements[0].value;
  var passWord = createNewUser.elements[1].value;
  if (!(userName && passWord)) {
    return;
  } else {
      if (!(checkForDoubles(userName, userAry))) {
      userAry.push(new Users(userName, passWord, 0));
      console.dir(userAry);
      saveLocalData();
    }
  }
});

function checkForDoubles(userName, userAry) {
  for (var i = 0; i < userAry.length; i++) {
    if (userName == userAry[i].userName) return true;
  }
  return false;
};

function checkForPassword(passWord, userAry) {
  for (var i = 0; i < userAry.length; i++) {
    if (passWord == userAry[i].passWord) return true;
  }
  return false;
};

var logIn = document.getElementById('user-input-login');
logIn.addEventListener('submit', function(e) {
  e.preventDefault();
  var userName = logIn.elements[0].value;
  var passWord = logIn.elements[1].value;
  if (!(userName && passWord)) {
    return;
  } else {
    if(checkForDoubles(userName, userAry)){
      if(checkForPassword(passWord, userAry)) {
      logInStatus = true;
      console.log(logInStatus);
    } else {
      alert("Wrong PassWord or User name");
    }
    } else {
      alert("Wrong PassWord or User name");
    }
  }
});

var saveLocalData = function() {
  localStorage.setItem("userAry", JSON.stringify(userAry));
  // localStorage.setItem("righty", JSON.stringify(photoAry));
  console.log(userAry);
  console.log('hello from save local data')
};

if(!(localStorage.getItem("userAry"))){
  saveGame();
} else {
  var newArray = JSON.parse(localStorage.getItem('userAry'));
  for(var i = 0; i < newArray.length; i++){
    userAry[i] = newArray[i];
  }
};


var getUserScore = function() {
var userScore = [];
  for (var i = 0; i < userAry.length; i++) {
    userScore.push(userAry[i].score);
  }
  userScore.sort(function(a, b) {
      return a - b;
    }
  );
  return userScore;
  console.log(userScore);
};
console.log(getUserScore());



// Users(document.getElementById('user-name'), document.getElementById('pass-word'), 0);
