/*
 1. if player rolls two 6, hten you lose everything
 2. change total for score
 3. add a secocnd dice ot the game, lose current score when one of them is a 1

*/

var scores, roundScore, activePlayer, gamePlaying;

init();

var lastDice;

//create an anonymous function only in the action
document.querySelector('.btn-roll').addEventListener('click', function() {
  if(gamePlaying){
    //1. random number
    var dice1 = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    //2. display result
    //var diceDOM = document.querySelector('.dice');
    //document.getElementById('dice-1').style.dislpay = 'block';
    document.getElementById('dice-1').style.display = 'block';

    //document.getElementById('dice-2').style.dislpay = 'block';
    document.getElementById('dice-2').style.display = 'block';

    //diceDOM.style.display = 'block';
    document.getElementById('dice-1').src = 'dice-' + dice1 + '.png';
    document.getElementById('dice-2').src = 'dice-' + dice2 + '.png';

    //3. update round score if roller number was not 1


    if (dice1 !== 1 && dice2 !== 1) {
      //add score
      //use the += method to add to itself
      roundScore += dice1 + dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      //next player
      //user ternary operator instead of if statement
      nextPlayer();
    }

    //check equality without type coersion in case it is diff data type !==
    // if (dice === 6 && lastDice === 6 ) {
    //   //player lose the score
    //   scores[activePlayer] = 0;
    //   document.querySelector('#score-' + activePlayer).textContent = '0';
    //   nextPlayer();
    // } else {
    //   if (dice !== 1) {

    //     //add score
    //     //use the += method to add to itself
    //     roundScore += dice;
    //     document.querySelector('#current-' + activePlayer).textContent = roundScore;
    //   } else {
    //     //next player
    //     //user ternary operator instead of if statement
    //     nextPlayer();
    //   }
    // }


    // lastDice = dice;

  }


});

document.querySelector('.btn-hold').addEventListener('click', function() {

  if(gamePlaying) {
    //add current score to global score
    scores[activePlayer] += roundScore;

    //update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector('.final-score').value;
    var winningScore;

    // undefined, 0,null, or "" are coreced to false
    //anything else is coerced to true
    if(input) {
      var winningScore = input;
    } else {
      winningScore = 20;
    }

    //check if player has won the game (got over 100 points)


    if (scores[activePlayer] >= winningScore ) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      //document.querySelector('.dice').style.display = 'none';
      document.getElementById('dice-1').style.dislpay = 'none';
      document.getElementById('dice-2').style.dislpay = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('winner');
      gamePlaying = false;
    } else {
      nextPlayer();
    }

  }


});

//can call the function directly in teh even listenter
document.querySelector('.btn-new').addEventListener('click', init);


function init() {
  scores = [0, 0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  //document.querySelector('.dice').style.display = 'none';
  document.getElementById('dice-1').style.dislpay = 'none';
  document.getElementById('dice-2').style.dislpay = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

}

function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;

    // //same as this
    // if(activePlayer === 0) {
    //   activePlayer = 1;
    // } else {
    //   activePlayer = 0;
    // }

    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // document.querySelector('.player-0-panel').classList.remove('active');
    // document.querySelector('.player-1-panel').classList.add('active');
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.display = 'none';
}
//dice = Math.floor(Math.random() * 6) + 1;

//document.querySelector('#current-' + activePlayer).textContent = dice;

//document.querySelector('#current-' + activePlayer).innerHTML = '<em>' + dice + '</em>'

// var x = document.querySelector('#score-0').textContent;
// console.log(x);



// function btn() {
//   //do something
// }

//call the function directly
//btn();

//call the btn function wihtout the () as a callback function
//document.querySelector('.btn-roll').addEventListener('click', btn);



