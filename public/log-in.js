var Users = function(userName, passWord, score) {
  this.userName = userName;
  this.passWord = passWord;
  this.score;
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

var userScore = [];
var getUserScore = function(userAry) {
  for (var i = 0; i < userAry.length; i++) {
    userScore.push(userAry[i].score);
  }
  userScore.sort(function(a, b) {
      return a - b;
    }
  );
  return userScore;
};
// getUserScore(userAry);
// console.log(userScore);
// console.dir(userScore[3]);

var renderScore = function() {
  getUserScore(userAry);
  var main = document.getElementById('score-board');
  var addRow = document.createElement('tr');
  var addUser = document.createElement('th');
  addUser.innerHTML = userAry[0].userName;
  addRow.appendChild(addUser);

    for (var i = 0; i < 4; i++) {
      var addScore = document.createElement('td');
      addScore.innerHTML = userScore[i]
      addRow.appendChild(addScore);
      main.appendChild(addRow);
      }
  console.log(addRow);
};
renderScore();
console.log(userScore);
console.dir(userScore[3]);
if(!(localStorage.getItem("userAry"))){
  saveLocalData();
} else {
  var newArray = JSON.parse(localStorage.getItem('userAry'));
  for(var i = 0; i < newArray.length; i++){
    userAry[i] = newArray[i];
  }
};
