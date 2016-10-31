			//An object to represent locations in the game
			function gameLocation(numCode,wasExplored,color,areaDescription){
				this.code = numCode;
				this.explored = wasExplored;
				this.bgColor = color;
				this.description = areaDescription;
			}		
			
			var score = 0; //The player gains 5 points every time they enter an area for the first time
			var currentArea = 0; //holds the number that represents the area player is currently in
			var commandText = "";
			var commandList = "north, south, east, west, area, help, inventory";
			var badDirection = "";
			var inventory = [];
						
			//all of the locations in the game
			var gameLocation0 = new gameLocation(0,true,"#f3e19a","You have entered the desert,  a desolate plain devoid of life save for a few insects and some scarce cacti throughout the land.  The scorching sun makes drudging through the desert a truly miserable experience.");
			var gameLocation4 = new gameLocation(4,false,"#7c5768", "You have entered the wastelands.  The land is filled with ashes, and you are overwhelmed by the strong smell given off by the burning brimstone.");
			var gameLocation7 = new gameLocation(7,false,"#616b65","You have entered the swamp.  There's a strong stench of death and decay.  The trees are all covered in fungi, and large mushrooms are growing all over the land along the stagnant water.");
			var gameLocation8 = new gameLocation(8,false,"#207843","You have entered the forest.  The towering trees create a canopy that blocks all but a few scattered rays of sunlight.  The forest is mysteriously quiet, and you feel as though you are being watched.");
			var gameLocation10 = new gameLocation(10,false,"#6b5076","You have entered the graveyard.  It appears to have been abandoned long ago, most of the grave markers are broken and the inscriptions have faded.");
			var gameLocation14 = new gameLocation(14,false,"#a24ad3","You pass through a small tunnel and end up in a strange land.  The dirt is a strange shade of purple and the plants are like none you have ever seen.  This land seems almost otherworldly, maybe that tunnel acts as a portal between two different worlds.");
			var gameLocation15 = new gameLocation(15,false,"#c7f78c","You have entered the grasslands.  Knee high yellowy-green grass stretches out in every direction as far as the eye can see.  There are small yew trees throughout the land, and you can hear many birds singing simultaneously.");
			var gameLocation16 = new gameLocation(16,false,"#208182","You have entered the valley.  The valley is over a mile wide and half a mile below the surrounding hills.  A small river runs down the center of the valley, you can see and hear abundant wildlife in the area.  The river water is crystal-clear, and there are bountiful bushes filled with ripe berries along the side of the river.");
			var gameLocation18 = new gameLocation(18,false,"#97c2c2","You have entered the tundra.  A layer of snow and ice covers the ground, there are small sections of dense evergreen trees creating small forests, you can see some reindeer grazing.  You feel as though you're being hunted, perhaps there are wolves nearby.");
			var gameLocationN4 = new gameLocation(-4,false,"#bbc135","You have entered the ruins.  It's an ancient city with a large citadel atop a hill in the center.  The citadel has steep walls, and the center tower stands a hundred feet tall with sturdy walls that haven't submitted to the forces of nature despite the rest of the citadel being overgrown and reduced to rubble.");
			var gameLocationN7 = new gameLocation(-7,false,"#18a0d7","You have entered the shoreline, a sandy beach stretching fore miles in either direction presses against the beautiful blue ocean.  You can see an abandoned boat tied to a nearby tree.  It looks damaged from years of being battered by the waves, perhaps you can repair it.");
			var gameLocationN8 = new gameLocation(-8,false,"#1540a8","You have entered the island.  It appears to be a very small island with many trees and a large hill toward the northern end.  You can see the shoreline you from the continent you left to reach this island, it's about half a mile away.  Besides that there's only a few miniscule islands with little to no vegetation within sight.  ");
			var gameLocationN10 = new gameLocation(-10,false,"#7f9295","You have entered the cave, it's very damp as smells of rotting vegetation.  Your face is barraged by water droplets as they come down from the stalactites.  There is very little light coming from the cave entrance, you're not sure how deep the cave goes. ");
			var gameLocationN14 = new gameLocation(-14,false,"#d4d0d2","You have entered the quarries, there are massive pits stretched throughout the land.  Looking around you see many rocks that still contain gems, emeralds rubies and sapphires that have been left behind.  Those who mined these quarries may have delved too deep and awoken a terrible beast, which as legend states has happened in the past.");
			var gameLocationN15 = new gameLocation(-15,false,"#ad2626","You have entered the mountain.  A steep, treacherous mountain pass winds up the eastern side, what is to be found on the other side of the mountain you do not know.  The path looks like it hasn't been used in decades, and certain parts of the path have crumbled making it only 1 foot wide at some points, leading to a sudden and deadly drop.");
			var gameLocationN16 = new gameLocation(-16,false,"#d0fad0","You have entered the peninsula.  The peninsula is about 12 feet above sea level, with a rocky dropoff around the edges.  The unrelenting sea waves bash against the rocky coast, and hard rain drenches the land.  As the rain washes the soil away, a nearby tree suddenly lurches forward, some of its deeper roots just barely preventing it from falling into the sea.");
			var gameLocationN18 = new gameLocation(-18,false,"#ecc03c","You have entered the plateau.  There's a stream coming from the nearby mountain which dwarfs the plateau in comparison.  The stream crosses the top of the platuea from the eastern side to the northern side, and there it turns into a waterfall.  At the base of the waterfall you can see the stream continues going north-east.");
			
			//array that holds all of the gameLocations.
			var listLocations = [];
			listLocations.push(gameLocation0,gameLocation4,gameLocation7,gameLocation8,gameLocation10,gameLocation14,gameLocation15,gameLocation16,gameLocation18,gameLocationN4,gameLocationN7,gameLocationN8,gameLocationN10,gameLocationN14,gameLocationN15,gameLocationN16,gameLocationN18);
						
			
			//this will represent the location where the user can currently be found
			var currentLocation = gameLocation0;
			
			
			//only enables directional buttons that point to a valid area
			function checkAreas(){
				document.getElementById("northButton").disabled = true;
				document.getElementById("eastButton").disabled = true;
				document.getElementById("southButton").disabled = true;
				document.getElementById("westButton").disabled = true;
					for(i=0; i < listLocations.length; i++){
						if (listLocations[i].code == (currentArea + 1) || currentArea == 0 || currentArea == -7 ){
							document.getElementById("northButton").disabled = false;
						}
						if (listLocations[i].code == (currentArea + 3) || currentArea == 0 || currentArea == -15){
							document.getElementById("eastButton").disabled = false;
						}
						if (listLocations[i].code == (currentArea - 1) || currentArea == 0 || currentArea == 7){
							document.getElementById("southButton").disabled = false;
						}
						if (listLocations[i].code == (currentArea - 3) || currentArea == 0 || currentArea == 15){
							document.getElementById("westButton").disabled = false;
						}	
					
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
				for (i = 0; i < listLocations.length; i++){
					currentLocation = listLocations[i];
					if (currentLocation.code == currentArea){
						break;
					}
				}
				
				if (currentLocation.explored == false){
					currentLocation.explored = true;
					score += 5;
				}
				//set background color for current area
				document.body.style.backgroundColor = currentLocation.bgColor;
				
				//sets text in the text area to tell the user about the are they're in
				var targetTextArea = document.getElementById("taMain");
				targetTextArea.value = currentLocation.description;
				
				//call function to disable or enable buttons depending on where you can move
				checkAreas();
				
				//update score
				document.getElementById("scoreDisplay").innerHTML = "Your Score: " + score;
			}
			
			//directional commands to move to new areas.  There's a large jump in value when going to or leaving the starting area to prevent jumping to another area you shouldn't be able to reach from your current location
			function moveNorth() {
				if (currentArea == 0 || currentArea == -7){
					currentArea += 7;
				}
				else if (document.getElementById("northButton").disabled == false){
					currentArea++;					
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
				if (currentArea == 0 || currentArea == 15){
					currentArea += -15;
				}
				else if (document.getElementById("westButton").disabled == false){
					currentArea += -3;
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
				if (currentArea == 0 || currentArea == -15){
					currentArea += 15;
				}
				else if (document.getElementById("eastButton").disabled == false){
					currentArea += 3;
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
				if (currentArea == 0 || currentArea == 7){
					currentArea += -7;
				}
				else if (document.getElementById("southButton").disabled == false){
					currentArea += -1;
				}	
				else{
					badDirection="You cannot go South from this location.";
					var targetTextArea = document.getElementById("taMain");
					targetTextArea.value = badDirection;
					return;
				}
				updateDisplay();
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
						targetTextArea = document.getElementById("taMain");
						targetTextArea.value = "You are currently holding: " + inventory;
						break;
					
					default:
						targetTextArea = document.getElementById("taMain");
						targetTextArea.value = "Invalid command entered, type help for a list of valid commands.";
						
						
				}
			}