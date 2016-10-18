var score = 0; //The player gains 5 points every time they enter an area for the first time
			var currentArea = 0; //holds the number that represents the area player is currently in
			// message contains the message saying which area the player is in
			var message = "Your adventure starts in a desert.  Perhaps you should search the surrounding areas for more habitable lands.";
			var bgColor = ""; //contains the code for the background color for the current area
			var commandText = "";
			var commandList = "n, s, e, w, north, south, east, west, area, help";
			
			//Booleans to record which areas have been explored
			var visit4 = false;
			var visit7 = false;
			var visit8 = false;
			var visit10 = false;
			var visit14 = false;
			var visit15 = false;
			var visit16 = false;
			var visit18 = false;
			var visitNeg4 = false;
			var visitNeg7 = false;
			var visitNeg8 = false;
			var visitNeg10 = false;
			var visitNeg14 = false;
			var visitNeg15 = false;
			var visitNeg16 = false;
			var visitNeg18 = false;
			
			//an array that holds all if the area codes
			var listAreas = [0,4,7,8,10,14,15,16,18,-4,-7,-8,-10,-14,-15,-16,-18,];
								
			//only enables directional buttons that point to a valid area
			function checkAreas(){
			document.getElementById("northButton").disabled = true;
			document.getElementById("eastButton").disabled = true;
			document.getElementById("southButton").disabled = true;
			document.getElementById("westButton").disabled = true;
				for(i=0; i < listAreas.length; i++){
					if (listAreas[i] == (currentArea + 1) || currentArea == 0 || currentArea == -7 ){
						document.getElementById("northButton").disabled = false;
					}
					if (listAreas[i] == (currentArea + 3) || currentArea == 0 || currentArea == -15){
						document.getElementById("eastButton").disabled = false;
					}
					if (listAreas[i] == (currentArea - 1) || currentArea == 0 || currentArea == 7){
						document.getElementById("southButton").disabled = false;
					}
					if (listAreas[i] == (currentArea - 3) || currentArea == 0 || currentArea == 15){
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
					
			//Sets the message depending on which area you have entered, and changes the background color to fit the area.  Also updates score and which directions the user can go.
			function updateDisplay() {				
				switch(currentArea){
					case 0:
						message = "You have entered the desert,  a desolate plain devoid of life save for a few insects and some scarce cacti throughout the land.  The scorching sun makes drudging through the desert a truly miserable experience.";
						bgColor = "#f3e19a";
						break;
						
					case 4:
						if (visit4 == false){
							visit4 = true;
							score += 5;
						}
						message = "You have entered the wastelands.  The land is filled with ashes, and you are overwhelmed by the strong smell given off by the burning brimstone.";
						bgColor = "#7c5768";
						break;
						
					case 7:
						if (visit7 == false){
							visit7 = true;
							score += 5;
						}
						message = "You have entered the swamp.  There's a strong stench of death and decay.  The trees are all covered in fungi, and large mushrooms are growing all over the land along the stagnant water.";
						bgColor = "#616b65";
						break;
					
					case 8:
						if (visit8 == false){
							visit8 = true;
							score += 5;
						}
						message = "You have entered the forest.  The towering trees create a canopy that blocks all but a few scattered rays of sunlight.  The forest is mysteriously quiet, and you feel as though you are being watched.";
						bgColor = "#207843";
						break;
					
					case 10:
						if (visit10 == false){
							visit10 = true;
							score += 5;
						}
						message = "You have entered the graveyard.  It appears to have been abandoned long ago, most of the grave markers are broken and the inscriptions have faded.";
						bgColor = "#6b5076";
						break;
						
					case 14:
						if (visit14 == false){
							visit14 = true;
							score += 5;
						}
						message = "You pass through a small tunnel and end up in a strange land.  The dirt is a strange shade of purple and the plants are like none you have ever seen.  This land seems almost otherworldly, maybe that tunnel acts as a portal between two different worlds.";
						bgColor = "#a24ad3";
						break;
					case 15:
						if (visit15 == false){
							visit15 = true;
							score += 5;
						}
						message = "You have entered the grasslands.  Knee high yellowy-green grass stretches out in every direction as far as the eye can see.  There are small yew trees throughout the land, and you can hear many birds singing simultaneously.";
						bgColor = "#c7f78c";
						break;
						
					case 16:
						if (visit16 == false){
							visit16 = true;
							score += 5;
						}
						message = "You have entered the valley.  The valley is over a mile wide and half a mile below the surrounding hills.  A small river runs down the center of the valley, you can see and hear abundant wildlife in the area.  The river water is crystal-clear, and there are bountiful bushes filled with ripe berries along the side of the river.";
						bgColor = "#208182";
						break;
						
					case 18:
						if (visit18 == false){
							visit18 = true;
							score += 5;
						}
						message = "You have entered the tundra.  A layer of snow and ice covers the ground, there are small sections of dense evergreen trees creating small forests, you can see some reindeer grazing.  You feel as though you're being hunted, perhaps there are wolves nearby.";
						bgColor = "#97c2c2";
						break;
					
					case -4:
						if (visitNeg4 == false){
							visitNeg4 = true;
							score += 5;
						}
						message = "You have entered the ruins.  It's an ancient city with a large citadel atop a hill in the center.  The citadel has steep walls, and the center tower stands a hundred feet tall with sturdy walls that haven't submitted to the forces of nature despite the rest of the citadel being overgrown and reduced to rubble.";
						bgColor = "#bbc135";
						break;
					
					case -7:
						if (visitNeg7 == false){
							visitNeg7 = true;
							score += 5;
						}
						message = "You have entered the shoreline, a sandy beach stretching fore miles in either direction presses against the beautiful blue ocean.  You can see an abandoned boat tied to a nearby tree.  It looks damaged from years of being battered by the waves, perhaps you can repair it.";
						bgColor = "#18a0d7";
						break;
						
					case -8:
						if (visitNeg8 == false){
							visitNeg8 = true;
							score += 5;
						}
						message = "You have entered the island.  It appears to be a very small island with many trees and a large hill toward the northern end.  You can see the shoreline you from the continent you left to reach this island, it's about half a mile away.  Besides that there's only a few miniscule islands with little to no vegetation within sight.  ";
						bgColor = "#1540a8";
						break;
						
					case -10:
						if (visitNeg10 == false){
						visitNeg10 = true;
						score += 5;
					}
					message = "You have entered the cave, it's very damp as smells of rotting vegetation.  Your face is barraged by water droplets as they come down from the stalactites.  There is very little light coming from the cave entrance, you're not sure how deep the cave goes. ";
					bgColor = "#7f9295";
					break;
					
					case -14:
						if (visitNeg14 == false){
							visitNeg14 = true;
							score += 5;
						}
						message = "You have entered the quarries, there are massive pits stretched throughout the land.  Looking around you see many rocks that still contain gems, emeralds rubies and sapphires that have been left behind.  Those who mined these quarries may have delved too deep and awoken a terrible beast, which as legend states has happened in the past.";
						bgColor = "#d4d0d2";
						break;
						
					case -15:
						if (visitNeg15 == false){
							visitNeg15 = true;
							score += 5;
						}
						message = "You have entered the mountain.  A steep, treacherous mountain pass winds up the eastern side, what is to be found on the other side of the mountain you do not know.  The path looks like it hasn't been used in decades, and certain parts of the path have crumbled making it only 1 foot wide at some points, leading to a sudden and deadly drop.";
						bgColor = "#ad2626";
						break;
						
					case -16:
						if (visitNeg16 == false){
							visitNeg16 = true;
							score += 5;
						}
						message = "You have entered the peninsula.  The land of the peninsula is about 12 feet above sea level, with a rocky dropoff around the edges.  The unrelenting sea waves bash against the rocky coast, and hard rain drenches the land.  As the rain washes the soil away, a nearby tree suddenly lurches forward, some of its deeper roots just barely preventing it from falling into the sea.";
						bgColor = "#d0fad0";
						break;
						
					case -18:
						if (visitNeg18 == false){
							visitNeg18 = true;
							score += 5;
						}
						message = "You have entered the plateau.  There's stream coming from the nearby mountain which dwarfs the plateau in comparison.  The stream crosses the top of the platuea from the eastern side to the northern side, and there it turns into a waterfall.  At the base of the waterfall you can see the stream continues going north-east.";
						bgColor = "#ecc03c";
						break;
				}
				
				//set background color for current area
				document.body.style.backgroundColor = bgColor;
				
				//sets text in the text area to tell the user about the are they're in
				var targetTextArea = document.getElementById("taMain");
				targetTextArea.value = message;
				
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
				updateDisplay();				
			}
			function moveWest() {
				if (currentArea == 0 || currentArea == 15){
					currentArea += -15;
				}
				else if (document.getElementById("westButton").disabled == false){
					currentArea += -3;
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
				updateDisplay();
			}
			function moveSouth() {
				if (currentArea == 0 || currentArea == 7){
					currentArea += -7;
				}
				else if (document.getElementById("southButton").disabled == false){
					currentArea += -1;
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
					
					//area displays the contents of message in the main text field, which contains information on the current area
					case "area":
						targetTextArea = document.getElementById("taMain");
						targetTextArea.value = message;
						break;
						
					case "help":
						targetTextArea = document.getElementById("taMain");
						targetTextArea.value = "Available commands are: " + commandList;
						break;
					
					default:
						targetTextArea = document.getElementById("taMain");
						targetTextArea.value = "Invalid command entered, type help for a list of valid commands.";
						
						
				}
			}