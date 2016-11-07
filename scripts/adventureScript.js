			var score = 0; //The player gains 5 points every time they enter an area for the first time
			var commandText = ""; 
			var commandList = "north, south, east, west, area, help, inventory, find, pick up"; //list of viable commands, shown to user when they call for help
			var badDirection = ""; //Holds messages to inform the user when they can't go a direction
			var inventory = []; //Stores all items in the inventory
			var invList = ""; //string that lists items in the inventory
			var currentLocation = gameLocation0; //represents the player's current location
			var imgHolder;
						
			//only enables directional buttons that point to a valid area
			function checkAreas(){
						if (currentLocation.northLink == null){
							document.getElementById("northButton").disabled = true;
						}
						else{
							document.getElementById("northButton").disabled = false;
						}
						
						if (currentLocation.eastLink == null){
							document.getElementById("eastButton").disabled = true;
						}
						else{
							document.getElementById("eastButton").disabled = false;
						}
						
						if (currentLocation.southLink == null){
							document.getElementById("southButton").disabled = true;
						}
						else{
							document.getElementById("southButton").disabled = false;
						}
						
						if (currentLocation.westLink == null){
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
				if (currentLocation.explored == false){
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
			}
			
			//moves the stick figure as the player moves.
			function positionIcon(){
				imgHolder = document.getElementById("iconImg");
				imgHolder.style.top = currentLocation.areaY.toString() + "px";
				imgHolder.style.left = currentLocation.areaX.toString() + "px";
			}
			//directional commands to move to new areas, and inform the user when they can't go in the specified direction.
			function moveNorth() {
				if (currentLocation.northLink != null){
					currentLocation = currentLocation.northLink;
				}
				else{
					badDirection="You cannot go North from this location.";
					var targetTextArea = document.getElementById("taMain");
					targetTextArea.value = badDirection;
					return;
				}
				updateDisplay();
			}
			function moveWest() {
				if (currentLocation.westLink != null){
					currentLocation = currentLocation.westLink;
				}
				else{
					badDirection="You cannot go West from this location.";
					var targetTextArea = document.getElementById("taMain");
					targetTextArea.value = badDirection;
					return;
				}
				updateDisplay();
			}
			function moveEast() {
				if (currentLocation.eastLink != null){
					currentLocation = currentLocation.eastLink;
				}
				else{
					badDirection="You cannot go East from this location.";
					var targetTextArea = document.getElementById("taMain");
					targetTextArea.value = badDirection;
					return;
				}
				updateDisplay();
			}
			function moveSouth() {
				if (currentLocation.southLink != null){
					currentLocation = currentLocation.southLink;
				}	
				else{
					badDirection="You cannot go South from this location.";
					var targetTextArea = document.getElementById("taMain");
					targetTextArea.value = badDirection;
					return;
				}
				updateDisplay();
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
			
			//Checks input in the command text field for directional commands
			function checkInput(){
				//targets command text area and formats the text value of the box to check with commands
				var targetTextArea = document.getElementById("taCommand");
				commandText = targetTextArea.value;
				commandText = commandText.trim();
				commandText = commandText.toLowerCase();
				
				//clears command text area
				targetTextArea.value = "";
				
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
						targetTextArea.value = "Available commands are: " + commandList + ".  You can also type the first letter in each command (n = north, etc)";
						break;
					
					//lists items in the user's inventory
					case "i":
					case "inventory":
						listInventory();
						targetTextArea = document.getElementById("taMain");
						targetTextArea.value = "You are currently holding: " + invList + ".";
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
					
					//pick up will add any items in the area to the inventory.
					case "p":
					case "pick up":
						targetTextArea = document.getElementById("taMain");
						if(currentLocation.item != null){
							targetTextArea.value = "You have picked up " + currentLocation.item.name + ".";
							inventory.push(currentLocation.item);
							currentLocation.item = null;
						}						
						else{
							targetTextArea.value = "There was nothing to pick up.";
						}						
						break;
						
					//if an invalid command was entered, tell the player.	
					default:
						targetTextArea = document.getElementById("taMain");
						targetTextArea.value = "Invalid command entered, type help for a list of valid commands.";
						
						
				}
			}