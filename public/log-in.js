var Users = function(userName, passWord, score) {
  this.userName = userName;
  this.passWord = passWord;
  this.score = 0;
};

var userAry = [];

var createNewUser = document.getElementById('user-input');
createNewUser.addEventListener('submit', function(e) {
  e.preventDefault();
  if (!(createNewUser.elements[0].value && createNewUser.elements[1].value)) {
    return;
  } else {
    var userName = createNewUser.elements[0].value;
    var passWord = createNewUser.elements[1].value;
    userAry.push(new Users(userName, passWord, 0));
    console.dir(userName);
    console.dir(userAry);
    document.getElementById('user-input') = "";
  }
});

// Users(document.getElementById('user-name'), document.getElementById('pass-word'), 0);
