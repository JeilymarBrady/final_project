var Users = function(userName, passWord, score) {
  this.userName = userName;
  this.passWord = passWord;
  this.score = 0;
};

var userAry = [];

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
      console.dir(userName);
      console.dir(userAry);
    }
  }
});

function checkForDoubles(userName, userAry) {
  for (var i = 0; i < userAry.length; i++) {
    if (userName == userAry[i].userName) return true;
  }
  return false;
}




// Users(document.getElementById('user-name'), document.getElementById('pass-word'), 0);
