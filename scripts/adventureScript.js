			var score = 0; //The player gains 5 points every time they enter an area for the first time
			var commandText = ""; 
			var commandList = "north, south, east, west, area, help, inventory, find, take, use ring, use fists, use mace, use sword, use amulet, use bandage, use well, use gate, attack, tips, god mode"; //list of viable commands, shown to user when they call for help
			var badDirection = ""; //Holds messages to inform the user when they can't go a direction
			var inventory = []; //Stores all items in the inventory
			var invList = ""; //string that lists items in the inventory
			var currentLocation = gameLocation0; //represents the player's current location

			var health = 20;
			var damage = 4;
			var invisible = false;
			var dmgReduction = 0;
			var shieldReduction = 0;
			var stun = 0;
				
			var gateLocked = true;
			var gameLost = false;
			var gameWon = false;
			var hasItem = false;
			//usedTurn determines whether you should get attacked by an enemy or not.
			var usedTurn = false;
			
			var noEnemy = new enemy("nothing",null);
			noEnemy.alive = false;
			
			var currentEnemy = noEnemy;
			
			window.onload = function() {
				updateDisplay();
				checkAreas();
				var targetTextArea = document.getElementById("taMain");
				targetTextArea.value = "As you were heading home from work there was a sudden bright flash.  You suddenly wake up in a desert, you feel very disoriented, and a bit nauseous as well.  You have nothing on you besides the clothers on your back, even your phone is missing.  You don't know why you're here or how you got here, but there's one thing you're sure of: You want to find a location that's a bit more hospitable."
			}
				
			//only enables directional buttons that point to a valid area
			function checkAreas(){
						if (currentLocation.northLink === null){							
							document.getElementById("northButton").disabled = true;
						}
						else{
							if(currentLocation.id === 13 && score < 75){
								document.getElementById("northButton").disabled = true;
							}
							else{
								document.getElementById("northButton").disabled = false;
							}
						}	
							
						
						if (currentLocation.eastLink === null){
							document.getElementById("eastButton").disabled = true;
						}
						else{
							document.getElementById("eastButton").disabled = false;
						}
						
						if (currentLocation.southLink === null){
							document.getElementById("southButton").disabled = true;
						}
						else{
							if(currentLocation.id === 0 && score < 40){
								document.getElementById("southButton").disabled = true;
							}
							else{
								document.getElementById("southButton").disabled = false;
							}
						}
						
						if (currentLocation.westLink === null){
							document.getElementById("westButton").disabled = true;
						}
						else{
							document.getElementById("westButton").disabled = false;
						}
						
			
			} 
			
			//checks for the release of keys, will only do something with input from arrow keys
			window.addEventListener("keyup", function(event) {
				if (event.preventDefaulted) {
					return; // Exit if the event has been handled
				}
 
				switch(event.code) {
					case "ArrowDown":
						moveSouth();
						break;
					
					case "ArrowUp":
						moveNorth();
						break;
				
					case "ArrowLeft":
						moveWest();
						break;
				
					case "ArrowRight":
						moveEast();
						break;
				}
	
				refresh();
 
				// Don't handle the same event more than once
				event.preventDefault();
			}, true);
					
			//Sets user to correct location, then displays area description in text area, changes the background color to fit the area, updates score and updates enabled/disabled directions.
			function updateDisplay() {
				if (currentLocation.explored === false){
					currentLocation.explored = true;
					score += 5;
				}
				//set background color for current area
				document.body.style.backgroundColor = currentLocation.bgColor;
				
				//sets text in the text area to tell the user about the are they're in
				var targetTextArea = document.getElementById("taMain");
				targetTextArea.value = currentLocation.description;			
				
				positionIcon();
				
				//call function to disable or enable buttons depending on where you can move
				checkAreas();
				
				//update score
				document.getElementById("scoreDisplay").innerHTML = "Your Score: " + score;				
				
				if (currentLocation.enemy != null){					
					currentEnemy = currentLocation.enemy;
					currentLocation.enemy = noEnemy;
					paintEnemy();
				}
				if (currentEnemy.alive){
					targetTextArea.value = "You are being attacked by a " + currentEnemy.name;
				}
				
			}
			
			//sets the image of the enemy under their stats
			function paintEnemy(){
				
				var enemyHP = document.getElementById("enemyHPDisplay");
				var enemyDmg = document.getElementById("enemyDmgDisplay");
				var eCanvas = document.getElementById("enemyCanvas");
				var enemyPic = document.getElementById("enemyImg");
				var ctx = eCanvas.getContext("2d");
				var img = null;				
				enemyPic.style.display='none';
				if (currentEnemy.alive){
					enemyHP.innerHTML = "Enemy Health: " + currentEnemy.hp;
					enemyDmg.innerHTML = "Enemy Damage: " + currentEnemy.damage;
					
					if (currentEnemy.name === "wolf"){
						img = document.getElementById("wolfImage");
					}
					if (currentEnemy.name === "goblin"){
						img = document.getElementById("goblinImage");
					}
					if (currentEnemy.name === "balrog"){
						img = document.getElementById("balrogImage");
					}
					enemyPic = img;
					ctx.drawImage(enemyPic, 0, 0, 120, 100);
				}
				else{
					enemyHP.innerHTML = "";
					enemyDmg.innerHTML = "";		
					ctx.clearRect(0, 0, eCanvas.width, eCanvas.height);


				}			
			}
			
			//moves the stick figure as the player moves.
			function positionIcon(){
				var y = currentLocation.areaY;
				var x = currentLocation.areaX;
				var mCanvas = document.getElementById("mapCanvas");
				var ctx = mCanvas.getContext("2d");
				var img = document.getElementById("mapImg");
				ctx.drawImage(img, 0, 0, 270, 240);
				var img = document.getElementById("playerIcon");
				ctx.drawImage(img, x, y, (12), (15));				
			}
			//directional commands to move to new areas, and inform the user when they can't go in the specified direction.
			function moveNorth() {
			if (gameLost || gameWon){
					gameOver();
					return;
				}
				checkAreas();
				var targetTextArea = document.getElementById("taMain");
				if (document.getElementById("northButton").disabled === false){
					if (currentEnemy.alive){
						badDirection="You cannot change location as you are being attacked by a " + currentEnemy.name;					
						targetTextArea.value = badDirection;
						return;
					}
					else{
						currentLocation = currentLocation.northLink;						
						updateDisplay();
						return;
					}
				}
				badDirection="You cannot go North from this location.";					
				targetTextArea.value = badDirection;
				
			}
			
			function moveWest() {
				if (gameLost || gameWon){
					gameOver();
					return;
				}
				checkAreas();
				var targetTextArea = document.getElementById("taMain");
				if (document.getElementById("westButton").disabled === false){
					if (currentEnemy.alive){
						badDirection="You cannot change location as you are being attacked by a " + currentEnemy.name;					
						targetTextArea.value = badDirection;
						return;
					}
					else{
						currentLocation = currentLocation.westLink;
						updateDisplay();
						return;
					}
				}
					badDirection="You cannot go West from this location.";
					targetTextArea.value = badDirection;
			}
			
			function moveEast() {
				if (gameLost || gameWon){
					gameOver();
					return;
				}
				checkAreas();
				var targetTextArea = document.getElementById("taMain");
				if (document.getElementById("eastButton").disabled === false){
					if (currentEnemy.alive){
						badDirection="You cannot change location as you are being attacked by a " + currentEnemy.name;					
						targetTextArea.value = badDirection;
						return;
					}
					else{
						currentLocation = currentLocation.eastLink;
						updateDisplay();
						return;
					}
				}
				badDirection="You cannot go East from this location.";
				targetTextArea.value = badDirection;					
			}
			
			function moveSouth() {
				if (gameLost || gameWon){
					gameOver();
					return;
				}
				checkAreas();
				var targetTextArea = document.getElementById("taMain");
				if (document.getElementById("southButton").disabled === false){
					if (currentEnemy.alive){
						badDirection="You cannot change location as you are being attacked by a " + currentEnemy.name;					
						targetTextArea.value = badDirection;
						return;
					}
					else{
						currentLocation = currentLocation.southLink;
						updateDisplay();
						return;
					}
				}
				badDirection="You cannot go South from this location.";
				targetTextArea.value = badDirection;	
			}
			
			//adds the names of all items in the inventory to a string
			function listInventory(){
					invList = "";
				for (i = 0; i < inventory.length; i++){
					if (i > 0){
						invList += ", " + inventory[i].name;
					}
					else{
						invList += inventory[i].name;
					}
				}
			}
			
			function gameOver(){
				targetTextArea = document.getElementById("taMain");
				if (gameLost){
					targetTextArea.value = "You have lost the game.";
				}
				else{
					targetTextArea.value = "You step through the portal and find yourself in front of your home, you look back but the portal has disappeared.  As you enter through the front door your spouse says 'Welcome Home, how was work?'  It seems that no time has passed since you entered that strange realm, to everybody else it's as if you never left.  You have won the game!";
				}
			}
			
			//Checks input in the command text field for directional commands
			function checkInput(){
				//targets command text area and formats the text value of the box to check with commands
				var targetTextArea = document.getElementById("taCommand");
				commandText = targetTextArea.value;
				commandText = commandText.trim();
				commandText = commandText.toLowerCase();
				
				//clears command text area
				targetTextArea.value = "";
				if (gameLost || gameWon){
					gameOver();
					return;
				}
				//checks for known commands
				switch(commandText){
					case "n":
					case "north":
						moveNorth();
						break;
					
					case "s":
					case "south":
						moveSouth();
						break;
						
					case "w":
					case "west":
						moveWest();
						break;
					
					case "e":
					case "east":
						moveEast();
						break;
					
					//area displays the description for the current location
					case "a":
					case "area":
						targetTextArea = document.getElementById("taMain");
						targetTextArea.value = currentLocation.description;
						break;
					
					//help command, displays usable commands
					case "h":
					case "help":
						targetTextArea = document.getElementById("taMain");
						targetTextArea.value = "Available commands are: " + commandList + ".  You can also type the first letter in each command (n = north, use ring = ur, attack = at, etc)";
						break;
					
					//lists items in the user's inventory
					case "i":
					case "inventory":
						listInventory();
						targetTextArea = document.getElementById("taMain");
						targetTextArea.value = "You are currently holding: " + invList;
						break;
					
					//find will tell the user if there are any items in the area
					case "f":
					case "find":
						targetTextArea = document.getElementById("taMain");
						if(currentLocation.item != null){
							targetTextArea.value = "You have found a " + currentLocation.item.name + ", perhaps it could be useful.";
						}
						else{
							targetTextArea.value = "There doesn't seem to be an item here.";
						}
						break;
					
					//take will add any items in the area to the inventory.
					case "t":
					case "take":
						targetTextArea = document.getElementById("taMain");
						if(currentLocation.item != null  && currentLocation.item.name != "Well" ){							
							usedTurn = true;
							targetTextArea.value = "You have picked up " + currentLocation.item.name + ".";
							inventory.push(currentLocation.item);
							currentLocation.item = null;
						}						
						else{
							targetTextArea.value = "There was nothing to pick up.";
						}						
						break;
					
					case "ur":
					case "use ring":
						targetTextArea = document.getElementById("taMain");
						for (i = 0; i < inventory.length; i++){
							if (inventory[i].name === "Gold Ring"){
								hasItem = true;								
								usedTurn = true;
								inventory[i].func();
								inventory[i].equipped = !inventory[i].equipped;
								if (inventory[i].equipped){
									targetTextArea.value = "You put the ring on, and you are now shielded by its magic.  It reduces incoming damage by 1.";
								}
								else{
									targetTextArea.value = "You take off the ring, making you lose the damage reduction it granted.";
								}
							}
						}
						if (hasItem === false){
							targetTextArea.value = "You do not have a ring.";
						}
						hasItem = false;
						break;
					
					case "uf":
					case "use fists":
						targetTextArea = document.getElementById("taMain");
						damage = 4;
						document.getElementById("damageDisplay").innerHTML = "Your Damage: " + damage;
						targetTextArea.value = "You will fight with your fists.  Their damage = 4.";
						break;
					
					case "um":
					case "use mace":
						targetTextArea = document.getElementById("taMain");
						for (i = 0; i < inventory.length; i++){
							if (inventory[i].name === "Iron Mace"){
								hasItem = true;
								inventory[i].func();
								document.getElementById("damageDisplay").innerHTML = "Your Damage: " + damage;
								targetTextArea.value = "You have equipped the Iron Mace.  Its damage = 6.";
							}
						}
						if (hasItem === false){
							targetTextArea.value = "You do not have a mace.";
						}
						hasItem = false;
						break;
					
					case "us":
					case "use sword":
						targetTextArea = document.getElementById("taMain");
						for (i = 0; i < inventory.length; i++){
							if (inventory[i].name === "Elvish Sword"){
								hasItem = true;
								inventory[i].func();
								document.getElementById("damageDisplay").innerHTML = "Your Damage: " + damage;
								targetTextArea.value = "You have equipped the Evlish Sword.  Its damage = 8.";
							}
						}
						if (hasItem === false){
							targetTextArea.value = "You do not have a sword.";
						}
						hasItem = false;
						break;
						
					case "ush":
					case "use shield":
						targetTextArea = document.getElementById("taMain");
						for (i = 0; i < inventory.length; i++){
							if (inventory[i].name === "Shield"){
								hasItem = true;
								usedTurn = true;
								inventory[i].func();
								targetTextArea.value = "You raise your shield to block an incoming attack.  Your enemy will be stunned and incapable of attacking next turn. ";
								
							}
						}
						if (hasItem === false){
							targetTextArea.value = "You do not have a shield.";
						}
						hasItem = false;
						break;
						
					case "ub":
					case "use bandage":
						targetTextArea = document.getElementById("taMain");
						for (i = 0; i < inventory.length; i++){
							if (inventory[i].name === "Bandage"){
								hasItem = true;
								if (health < 20){
									usedTurn = true;
									inventory[i].func();
									targetTextArea.value = "You use the bandage to restore 1/2 of your max health.";
									inventory.splice(i,1);
									}
								break;
								}
							}
							
						
						if (hasItem === false){
							targetTextArea.value = "You do not have a bandage.";
						}
						hasItem = false;						
						break;
					
					case "ua":
					case "use amulet":
						targetTextArea = document.getElementById("taMain");
						for (i = 0; i < inventory.length; i++){
							if (inventory[i].name === "Amulet"){
								hasItem = true;								
								inventory[i].func();
							}
						}
						if (hasItem === false){
							targetTextArea.value = "You do not have an amulet.";
						}
						hasItem = false;
						break;
					
					case "uw":
					case "use well":
						targetTextArea = document.getElementById("taMain");
						if(currentLocation.item.name === "Well"){
							if (health < 20){																
								usedTurn = true;								
								currentLocation.item.func();
								targetTextArea.value = "Your health has been restored by the well.";
							}
							else{
								targetTextArea.value = "You are already at max health.";
							}
						}
						else{
							targetTextArea.value = "There is no well at this location.";
						}
						break;
					
					case "uk":
					case "use key":
					targetTextArea = document.getElementById("taMain");
						for (i = 0; i < inventory.length; i++){
							if (inventory[i].name === "Key"){
								hasItem = true;								
								inventory[i].func();
								if(gateLocked){
									targetTextArea.value = "What could this key possibly open?";
								}
							}
						}
						if (hasItem === false){
							targetTextArea.value = "You do not have a key.";
						}
						hasItem = false;
						break;
					
					case "ug":
					case "use gate":
						if(currentLocation.id === 8 && gateLocked === false){
							gameWon = true;
							gameOver();
						}
						else{
							targetTextArea = document.getElementById("taMain");
							if (currentLocation.id === 8){
								targetTextArea.value = "The great stone doors are locked."
							}
							else{
								targetTextArea.value = "There is no gate here."
							}
						}
						break;
						
					case "at":
					case "attack":
						targetTextArea = document.getElementById("taMain");
						if(currentEnemy.alive){
							currentEnemy.hp += -damage;
							usedTurn = true;
							targetTextArea.value = "You attack the " + currentEnemy.name + " for " + damage + " damage, and ";
							if (currentEnemy.hp < 1){
							targetTextArea.value = "You have slain the " + currentEnemy.name + ".";
								if(currentEnemy.item != null){
									currentLocation.item = currentEnemy.item;
									currentEnemy.item = null;
								}
								currentEnemy.alive = false;								
							}
						}
							else{
								targetTextArea.value = "There is no enemy to attack.";
							}						
						break;
						
					case "ti":
					case "tips":
						targetTextArea = document.getElementById("taMain");
						targetTextArea.value = "1) When you are engaged in combat, your move always goes first.  2) There is a well in the desert that can fully heal you and can be used infinite times.  3) If there's an area on the map that you can't reach, that means you need to explore more areas first, you might also want to gather some items.  4) Bandages are the only items that go away after use, so use them wisely.";
						break;
					
					//cheatCode to not get attacked
					case "god mode":
						invisible = !invisible;
						targetTextArea = document.getElementById("taMain");
						if(invisible){
							targetTextArea.value = "Invisibility Activated.";
						}
						else{
							targetTextArea.value = "Invisibility Deactivated.";
						}
						break;
						
					//if an invalid command was entered, tell the player.	
					default:
						targetTextArea = document.getElementById("taMain");
						targetTextArea.value = "Invalid command entered, type help for a list of valid commands.";
						
						
				}
				if (usedTurn){
					if(currentEnemy.alive === true && invisible === false && stun < 1){
						realDmg = currentEnemy.damage - (dmgReduction + shieldReduction);
						health += -realDmg;
						targetTextArea = document.getElementById("taMain");
						targetTextArea.value += currentEnemy.name + " attacks you for " + realDmg + ".";
						if(shieldReduction > 0){
							stun += 2;
						}
					}
					if(stun > 0){
						stun += -1;
					}
					document.getElementById("healthDisplay").innerHTML = "Your Health: " + health;
					if (health < 1){
						gameLost = true;
						gameOver();
					}					
						paintEnemy();
					shieldReduction = 0;
				}
				usedTurn = false;
			}