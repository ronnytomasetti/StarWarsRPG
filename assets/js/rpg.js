/*
* Star Wars RPG
* Ronny Tomasetti
* 2016 UCF Coding Bootcamp
*/

/* 
* On load, player will choose one of four available characters.
* Player will be this same character throughout the entire game.
* Remaining players will move to an ENEMY area on the screen.
* Player will choose an opponent from the ENEMY area to fight against.
* ENEMY will move to the battle area to fight against player's character.
* Player will now have the ability to fight enemy using the attack button.
*   - Once player attacks, ENEMY will take hit and display losing HP below their image.
*   - ENEMY will counter attack, player will now take hit and display losing HP.
*   - REPEATS until player or ENEMY have no HP left to fight.
* If player wins fight, they can select another opponent.
*    Player wins game when all ENEMY are defeated.
* If ENEMY wins fight, player loses entire game and must start over.
* 
* Characters have three attributes: health points, attack power, counter-attack power.
*    - include XP to store the number of times the character has attacked and multiply by attack power.
*      example: first attack 6, second attack 12, third ...
*    
*/

window.onload = startNewGame();

	// Declare global character objects and functions.
	// Initialize character objects.
	// Display fresh game scene. (**NEW PLAYER SELECTION)
	// LISTEN and HANDLE on click when player selects a character.
	// Assign that character to the player for that round.
	// Set remaining characters as players enemy.
	// Move enemy players to enemy area.

	// REPEATS--------------
		// LISTEN and HANDLE player selecting character to fight.
		// Move enemy player to fight area.
		// LISTEN and HANDLE player attacking enemy. (FIGHTING LOGIC)
		// Process outcome of the battle round.
		// If user won round, repeat until user has no enemy left to defeat.
		// Else (**END ROUND) and display fresh game scene. (**NEW PLAYER SELECTION)
	// ---------------------

	// End current round.
	// Display fresh game scene. (**NEW PLAYER SELECTION)
function startNewGame() {
	console.log("New Game Started");
}