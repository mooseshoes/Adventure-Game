			/* Here is a map of all the areas in my game, each number represents the 'area code' for that area
 
					  (3)
					   |
				     (2)===(1)===(4)	
					   |
					   |
	       			(16)       |     (6)
			         |	   |	   |
			(15)===(13)=========(0)=========(5)===(7)
		    		|	   |	   |
			      (14)	   |   	  (8)
					   |
					   |
				    (12)===(9)===(10)
					   |
					  (11)
		
				*/
			
			//items that can be picked up and used by the player.
			function item(name){
				this.name = name;
				this.func = function(){setItemFunc(name)};
				this.id;
				this.equipped = false;
			}
			
			//Enemy constructor, will attack the player when they come across them
			function enemy(type,itemName){
				this.hp = 0;
				this.fullHp = 0;
				this.item = null;
				this.damage = 0;
				this.name = type;
				this.alive = true;
				this.pic = null;
				//holds an item if one was specified in the creation of the location object.
				if(itemName != null){
					this.item = new item(itemName);
				}
				//Different 'types' of enemies have different hp(health points)	and different damage
				if (type === "goblin"){
					this.hp = 12;
					this.damage = 5;
					this.pic = document.getElementById("goblinImage");

				}
				if (type === "balrog"){
					this.hp = 36;
					this.damage = 7;
					this.pic = document.getElementById("balrogImage");
				}
				if (type === "wolf"){
					this.hp = 8;
					this.damage = 6;
					this.pic = document.getElementById("wolfImage");
				}
				if (type === "orc"){
					this.hp = 20;
					this.damage = 6;
					this.pic = document.getElementById("orcImage");
				}
				//set the max hp for the enemy, this way they can be healed if the user escapes with the amulet.
				this.fullHp = this.hp;
			}
			
			//An object to represent locations in the game, For the location links I decided to go clockwise starting north.
			function gameLocation(numCode,wasExplored,north,east,south,west,areaItem,areaEnemy,x,y,color,areaDescription){
				this.id = numCode;
				this.explored = wasExplored;
				this.northLink = north;				
				this.eastLink = east;
				this.southLink = south;
				this.westLink = west;
				//areaX and areaY will determine the position of the player icon on the map when the player is in that location.
				this.areaX = x;
				this.areaY = y;
				this.bgColor = color;
				this.description = areaDescription;	
				//if there's an enemy in the area, create an enemy object using the enemy constructor
				if (areaEnemy != null){
					//If the area also has an item, the enemy will hold the item.  The item can only be acquired once the enemy is vanquished.
					this.enemy = new enemy(areaEnemy,areaItem)
					areaItem = null;
				}
				//create an item for the location if there's supposed to be an item there and no enemy to hold it.
				if (areaItem != null){
					this.item = new item(areaItem);
				}				
			}	
			
			//Enables or disables invisibility, activated and deactivated by cheat code 'god mode'
			function shield(amount){
				if(dmgReduction == 0){
					dmgReduction = amount;
				}
				else{
					dmgReduction = 0;
				}
			}
			
			//Heals the player for the amount specified, the player can go up to 20 health max
			function heal(amount){
				health += amount;
				if (health > 20){
					health = 20;
				}
			}
			
			//teleports the player to the location specified, the amulet always brings you to location 0
			function teleport(newLocation){
				if (currentEnemy.alive === true){
					currentEnemy.hp = currentEnemy.fullHp;
					currentLocation.enemy = currentEnemy;
				}
				currentEnemy = noEnemy;
				paintEnemy();
				currentLocation = newLocation;
				updateDisplay();
			}
			
			// Sets the player's damage to a certain amount.
			function changeDmg(amount){
				damage = amount;
			}
			
			//reduces incoming damage by amount, lasts for 1 move
			function blockDmg(amount){
				shieldReduction = amount;
			}
			
			//unlocks the entrance to the last location
			function unlock(){
				if (currentLocation.id === 8){
					gateLocked = false;
					checkAreas();
					targetTextArea = document.getElementById("taMain");
					targetTextArea.value = "You try to use the key on the stone gateway, and to your delight it works.  As you turn the key the doors swing open, revealing a shimmering blue portal.";
				}
			}
			
			function setItemFunc(itemName){
				if (itemName === "Gold Ring"){
					this.id = 0;
					return shield(1);
				}
				if (itemName === "Iron Mace"){
					this.id = 1;
					return changeDmg(6);
				}
				if (itemName === "Elvish Sword"){
					this.id = 2;
					return changeDmg(8);
				}
				if (itemName === "Shield"){
					this.id = 3;
					return blockDmg(3);
				}
				if(itemName === "Bandage"){
					this.id = 4;
					return heal(maxHealth/2);
				}
				if(itemName === "Amulet"){
					this.id = 5;
					return teleport(gameLocation0);
				}
				if(itemName === "Key"){
					this.id = 6;
					return unlock();
				}
				if(itemName === "Well"){
					this.id = 7;
					return heal(maxHealth);
				}
			}
			
			//all of the locations in the game
			var gameLocation0 = new gameLocation(0,true,null,null,null,null,"Well",null,127,106,"#f3e19a","You have entered the desert,  a desolate plain devoid of life save for a few insects and some scarce cacti throughout the land.  The scorching sun makes drudging through the desert a truly miserable experience.");
			var gameLocation1 = new gameLocation(1,false,null,null,gameLocation0,null,"Gold Ring",null,127,46,"#616b65","You have entered the swamp.  There's a strong stench of death and decay.  The trees are all covered in fungi, and large mushrooms are growing all over the land alongside the stagnant water.  As you step forward, you see a rat scurrying away.  The rat is the size of a large dog, which seems to be quite an unusual size for a rodent.");
			var gameLocation2 = new gameLocation(2,false,null,gameLocation1,null,null,"Iron Mace","goblin",91,46, "#7c5768","You have entered the wastelands.  The land is filled with ashes, and you are overwhelmed by the strong smell given off by the burning brimstone.  Although it is day, the sunlight has faded as if the air itself is a veil, shrouding the land in darkness.");
			var gameLocation3 = new gameLocation(3,false,null,null,gameLocation1,null,"Bandage",null,127,14,"#207843","You have entered the forest.  The towering trees create a canopy that blocks all but a few scattered rays of sunlight.  The forest is mysteriously quiet, and you feel as though you are being watched.");
			var gameLocation4 = new gameLocation(4,false,null,null,null,gameLocation1,null,"wolf",166,46,"#6b5076","You have entered the graveyard.  It appears to have been abandoned long ago, most of the grave markers are broken and the inscriptions have faded.  The grass tall and masks the roots of the grey, twisted trees so that you stumble whenever you try to move.");			
			var gameLocation5 = new gameLocation(5,false,null,null,null,gameLocation0,"Elvish Sword","goblin",190,106,"#c7f78c","You have entered the grasslands.  Knee high yellowy-green grass stretches out in every direction as far as the eye can see.  There are small yew trees throughout the land, and you can hear many birds singing simultaneously.");
			var gameLocation6 = new gameLocation(6,false,null,null,gameLocation5,null,null,null,190,78,"#208182","You have entered the valley.  The valley is over a mile wide and half a mile below the surrounding hills.  A small river runs down the center of the valley, you can see and hear abundant wildlife in the area.  The river water is crystal-clear, and there are bountiful bushes filled with ripe berries along the side of the river.");
			var gameLocation7 = new gameLocation(7,false,null,null,null,gameLocation5,null,"goblin",227,106,"#97c2c2","You have entered the tundra.  A layer of snow and ice covers the ground, there are small sections of dense evergreen trees creating small forests, you can see some reindeer grazing.  You feel as though you're being hunted, perhaps there are wolves nearby.");
			var gameLocation8 = new gameLocation(8,false,gameLocation5,null,null,null,"Amulet",null,190,137,"#a24ad3","You hav entered the unknown.  You passed through a small tunnel and ended up in a strange land.  The dirt is a deep shade of purple and the plants are like none you have ever seen.  This land seems otherworldly, that tunnel may even act as a portal between two worlds.  As you walk through the rocky terrain you find at giant gateway with stone doors, it has a small keyhole in the center.");			
			var gameLocation9 = new gameLocation(9,false,gameLocation0,null,null,null,"Bandage","goblin",127,164,"#18a0d7","You have entered the shoreline, a sandy beach stretching fore miles in either direction presses against the beautiful blue ocean.  You can see an abandoned boat tied to a nearby tree.  It looks damaged from years of being battered by the waves, perhaps you can repair it.");
			var gameLocation10 = new gameLocation(10,false,null,null,null,gameLocation9,"Shield","orc",164,164,"#bbc135","You have entered the ruins.  It's an ancient city with a large citadel atop a hill in the center.  The center tower stands a hundred feet tall with sturdy walls that haven't submitted to the forces of nature despite the rest of the citadel being overgrown and reduced to rubble.");
			var gameLocation11 = new gameLocation(11,false,gameLocation9,null,null,null,"Bandage","orc",127,196,"#1540a8","You have entered the island.  It appears to be a very small island with many trees and a large hill toward the northern end.  You can see the shoreline you set out from to reach this island, it's about half a mile away.  Other than the main continent, there's nothing in sight other than blue ocean waves.  ");
			var gameLocation12 = new gameLocation(12,false,null,gameLocation9,null,null,null,null,89,164,"#7f9295","You have entered the cave, it's very damp and smells of rotting vegetation.  Your face is barraged by water droplets as they come down from the stalactites.  There is very little light coming from the cave entrance, you're not sure how deep the cave goes. ");			
			var gameLocation13 = new gameLocation(13,false,null,gameLocation0,null,null,null,"goblin",66,106,"#ad2626","You have entered the mountain.  A steep, treacherous mountain pass winds up the eastern side, what is to be found on the other side of the mountain you do not know.  The path looks like it hasn't been used in decades, and certain parts of the path have crumbled making it very rought and narrow, one misstep will lead to a sudden and deadly drop.");
			var gameLocation14 = new gameLocation(14,false,gameLocation13,null,null,null,"Bandage","wolf",66,134,"#d0fad0","You have entered the peninsula.  The peninsula is high above the sea, with steep rocky cliffs constantly being battered by the unrelenting sea waves.  As the hard rain washes the soil away, a nearby tree suddenly lurches forward, some of its deeper roots just barely preventing it from falling into the sea.  You back away from the edge as a feeling of uneasiness washes over you.");
			var gameLocation15 = new gameLocation(15,false,null,gameLocation13,null,null,null,null,28,106,"#ecc03c","You have entered the plateau.  There's a stream coming from the nearby mountain which crosses the top of the platuea from the eastern side to the northern side, and there it turns into a waterfall.  At the base of the waterfall you can see the stream continues going north-east.  There's nothing else around you worth noting other than a solitary vulture, circling above.");
			var gameLocation16 = new gameLocation(16,false,null,null,gameLocation13,null,"Key","balrog",66,76,"#d4d0d2","You have entered the quarries, there are massive pits stretched throughout the land.  Looking around you see many rocks that still contain gems, emeralds rubies and sapphires that have been left behind.  Those who mined these quarries must have delved too deep, and suffered the same fate as the dwarves of Moria.");
			
			//add the location links.
			gameLocation0.northLink = gameLocation1;
			gameLocation0.eastLink = gameLocation5;
			gameLocation0.southLink = gameLocation9;
			gameLocation0.westLink = gameLocation13;
			
			gameLocation1.northLink = gameLocation3;
			gameLocation1.eastLink = gameLocation4;
			gameLocation1.westLink = gameLocation2;
			
			gameLocation5.northLink = gameLocation6;
			gameLocation5.eastLink = gameLocation7;
			gameLocation5.southLink = gameLocation8;
			
			gameLocation9.eastLink = gameLocation10;
			gameLocation9.southLink = gameLocation11;
			gameLocation9.westLink = gameLocation12;
			
			gameLocation13.northLink = gameLocation16;
			gameLocation13.southLink = gameLocation14;
			gameLocation13.westLink = gameLocation15;
			
