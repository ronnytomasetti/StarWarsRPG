/*
* Star Wars RPG
* Ronny Tomasetti
* 2016 UCF Coding Bootcamp
*/

/* HOMEWORK INSTRUCTIONS:
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
* -------------------------------------------------------------------------------------
* ADDITIONAL NOTES:
* Characters have three attributes: health points, attack power, counter-attack power.
*    - include XP to store the number of times the character has attacked and multiply by attack power.
*      example: first attack 6, second attack 12, third ...
* ------------------------------------------------------------------------------------- */

var characters = [];
var player;
var cpu;

$( document ).ready( function() {

	function retrieveCharacters() {
		
		$.getJSON( 'assets/js/characters.json', function( data )
		{	
			characters = $( data.characters );
		  
		  $.each( data.characters, function( index, value )
		  {
		  	var $characterName = $( '<p>' ).addClass( 'name text-center' )
		  																 .html( data.characters[ index ].name );

		  	var $characterImg = $( '<img>' ).addClass( 'img-character' )
		  																	.attr( 'src', 'assets/img/' + data.characters[index].img );

		  	var $characterHP = $( '<p>' ).addClass( 'hp text-center' )
		  															 .html( data.characters[index].hp );

		  	var $newCharacter = $( '<div>' ).addClass( 'character' )
		  																	.attr( 'data-id', index )
						  													.append( $characterName )
						  													.append( $characterImg )
						  													.append( $characterHP )
						  													.one( 'click', newPlayerSelection );

		  	$( '#characters-select' ).append( $newCharacter );
		  }); // END .each()
		}); // END $.getJSON()
	} // END retrieveCharacters()

	function newPlayerSelection( event )
	{
		player = characters[ $( this ).attr( 'data-id' ) ];

		$( this ).appendTo( '#player-character' )
						 .addClass( 'player' );

		$( '#characters-select' ).children()
														 .unbind( 'click', newPlayerSelection );

		$( '#characters-select' ).children()
														 .appendTo( '#enemy-select' )
														 .addClass( 'enemy' )
														 .one( 'click', newEnemySelected );

		var $attackButton = $( '<button>' ).addClass( 'button disabled' )
																			 .text( 'ATTACK!' );

		$( '#player-character').append($attackButton);
		$( '.action-console' ).html( 'Select an enemy to battle!' );
	} // END newPlayerSelection()

	function newEnemySelected( event )
	{
		cpu = characters[ $( this ).attr( 'data-id' ) ];

		$( this ).appendTo( '#cpu-character' )
						 .addClass( 'defender' );

		$( '#enemy-select' ).children()
												.unbind( 'click', newEnemySelected );

		$( '.button' ).removeClass('disabled')
									.on( 'click', playerAttacking );

		$( '.action-console' ).html( 'Press ATTACK! to fight ' + cpu.name );
	} // End newEnemySelected()

	function playerAttacking()
	{
		player.xp++; // Player experience points increased by 1 every time they strike.
		cpu.hp -= player.ap * player.xp; // Calculate cpu taking hit by player attack power.

		if ( cpu.hp <= 0 )
		{
			postBattle( true );
			return;
		}

		player.hp -= cpu.cap; // Calculate player taking hit by cpu counter attack power.

		// Update hp variables.
		$( '#player-character .player .hp' ).html( player.hp );
		$( '#cpu-character .defender .hp' ).html( cpu.hp );

		$( '.action-console' ).html( 'You attacked ' + cpu.name + ' for ' + player.ap * player.xp + ' damage!' + '<br>'
																	+ cpu.name + ' attacked you back for ' + cpu.cap + ' damage!' );

		if ( player.hp <= 0 )
		{
			postBattle( false );
		}
	} // End playerAttacking()

	function postBattle( withWin )
	{
		$( '.button' ).addClass( 'disabled' )
									.unbind( 'click', playerAttacking );

		if (withWin)
		{
			$( '#cpu-character .defender' ).remove();

			if ( $( '#enemy-select' ).has( '.enemy' ).length == 0 )
			{
				endGameWith( true );
				return;
			}

			$( '#enemy-select' ).children()
													.one( 'click', newEnemySelected );

			$( '.action-console' ).html( 'You have defeated ' + cpu.name + '!<br>Choose your next opponent...' );
		}
		else
		{
			$( '#player-character .player' ).remove();
			$( '.action-console' ).html( "You've been defeated by " + cpu.name + ".<br>GAME OVER!!!" );
			endGameWith( false );
		}
	} // End postBattle()

	function endGameWith( playerWin )
	{
		if ( playerWin )
		{
			$( '.action-console' ).html( 'YOU WIN!!!<br>Game Over!' );
		}

		$( '.button' ).removeClass( 'disabled' )
									.text( 'Restart Game' );

		$( '.button' ).one( 'click', function() { location.reload() });
	} // END endGameWith()

	/* --------------------------------------------------------
	 BEGIN GAME FLOW BY CALLING retrieveCharacters() FUNCTION 
	-------------------------------------------------------- */
	retrieveCharacters();

}); // END $(document).ready()
