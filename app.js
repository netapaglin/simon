const playButton = document.getElementById('play');
const button1 = document.getElementById('1');
const button2 = document.getElementById('2');
const button3 = document.getElementById('3');
const button4 = document.getElementById('4');
const end = document.getElementById('end');
const endMessage = document.getElementById("message");
const audio1 = new Audio('/assets/111.wav');
const audio2 = new Audio('/assets/222.wav');
const audio3 = new Audio('/assets/333.wav');
const audio4 = new Audio('/assets/444.wav');
const gameOver = new Audio('/assets/gameOver.wav');

const compArr = [];
const userArr = [];

setDisableButton(true)


function setDisableButton(bollean) {
  button1.disabled = bollean;
  button2.disabled = bollean;
  button3.disabled = bollean;
  button4.disabled = bollean;
}


function pushNumber() {
  const generateNumber = () => Math.floor(Math.random() * 4) + 1;
  compArr.push(generateNumber());
  console.log("compArr: " + compArr);
  play();
}

function changeColor(num) {
  setTimeout(() => {
    if (num === 1) {
      button1.style.backgroundColor = 'rgb(0,40,75)';
      audio1.play();
    } else if (num === 2) {
      button2.style.backgroundColor = 'rgb(0,40,75)';
      audio2.play();
    } else if (num === 3) {
      button3.style.backgroundColor = 'rgb(0,40,75)';
      audio3.play();
    } else {
      button4.style.backgroundColor = 'rgb(0,40,75)';
      audio4.play();
    }
  }, 100);

  button1.style.backgroundColor = 'rgb(248,215,253)';
  button2.style.backgroundColor = 'rgb(205,252,255)';
  button3.style.backgroundColor = 'rgb(255,252,205)';
  button4.style.backgroundColor = 'rgb(192,188,255)';

}

function play() {
  let interval = 1500;
  compArr.forEach(function (el, index) {
    console.log(index)
    setTimeout(function () {
      changeColor(el);
    }, index * interval);

  });

}

function pushUserNum(num) {
  userArr.push(num);
  console.log("userArr:  " + userArr);
  earlyMistake(compArr, userArr);
  compareArrays(compArr, userArr);
}

function userType() {
  button1.addEventListener('click', function () {
    pushUserNum(1);
    audio1.play();
  });
  button2.addEventListener('click', function () {
    pushUserNum(2);
    audio2.play();
  });
  button3.addEventListener('click', function () {
    pushUserNum(3);
    audio3.play();
  });
  button4.addEventListener('click', function () {
    pushUserNum(4);
    audio4.play();
  });

}
userType();

function earlyMistake(compArr, userArr) {
  for (let i = 0; i < compArr.length; i++) {
    if (userArr[i] === undefined) {
      continue;
    } else if (userArr[i] !== compArr[i]) {
      mistake();
    }
  }

}

function compareArrays(compArr, userArr) {
  if (userArr.length === compArr.length) {
    for (let i = 0; i < compArr.length; i++) {
      if (compArr[i] !== userArr[i]) {
        mistake();
        return;
      }
    }
    pushNumber();
    userArr.splice(0, userArr.length);
  }
}

function mistake() {
  endGame();
  userArr.splice(0, userArr.length);
  compArr.splice(0, compArr.length);

}

function endGame() {
  gameOver.play()
  end.style.display = 'block';
  if (userArr.length <= 3) {
    endMessage.innerHTML = ` you remember ${(userArr.length) - 1} clicks`;
  } else if (userArr.length <= 6) {
    endMessage.innerHTML = `Nice,</br> you remember ${(userArr.length) - 1} clicks`;
  } else if (userArr.length <= 9) {
    endMessage.innerHTML = `Very good,</br> you remember ${(userArr.length) - 1} clicks`;
  } else if (userArr.length > 9) {
    endMessage.innerHTML = `You are a genius ,</br> you remember ${(userArr.length) - 1} clicks`;
  }
  end.addEventListener('click', () => {
    end.style.display = 'none';
  });
}

playButton.addEventListener("click", function () {
  setDisableButton(false)
  userArr.splice(0, userArr.length);
  compArr.splice(0, compArr.length);
  pushNumber();


});
