/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;

init();



//create an anonymous function only in the action
document.querySelector('.btn-roll').addEventListener('click', function() {
  if(gamePlaying){
    //1. random number
    var dice = Math.floor(Math.random() * 6) + 1;

    //2. display result
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';


    //3. update raound score if roller number was not 1
    //check equality without type coersion in case it is diff data type !==

    if (dice !== 1) {
      //add score
      //use the += method to add to itself
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      //next player
      //user ternary operator instead of if statement
      nextPlayer();
    }
  }


});

document.querySelector('.btn-hold').addEventListener('click', function() {

  if(gamePlaying) {
    //add current score to global score
    scores[activePlayer] += roundScore;

    //update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    //check if player has won the game (got over 100 points)

    if (scores[activePlayer] >= 20) {
      document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
      document.querySelector('.dice').style.display = 'none';
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
  document.querySelector('.dice').style.display = 'none';

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


/*
 1. if player rolls two 6, hten you lose everything
 2. change total for score
 3. add a secocnd dice ot the game, lose current score when one of them is a 1

*/
