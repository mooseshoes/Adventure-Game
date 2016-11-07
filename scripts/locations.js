			//items that can be picked up and used by the player.
			function item(name){
				this.name = name;
			}
			
			//An object to represent locations in the game, For the location links I decided to go clockwise starting north.
			function gameLocation(numCode,wasExplored,north,east,south,west,areaItem,x,y,color,areaDescription){
				this.code = numCode;
				this.explored = wasExplored;
				this.northLink = north;				
				this.eastLink = east;
				this.southLink = south;
				this.westLink = west;
				this.item = new item(areaItem);
				this.areaX = x;
				this.areaY = y;
				this.bgColor = color;
				this.description = areaDescription;
			}	
			
						
			//all of the locations in the game
			var gameLocation0 = new gameLocation(0,true,null,null,null,null,null,593,542,"#f3e19a","You have entered the desert,  a desolate plain devoid of life save for a few insects and some scarce cacti throughout the land.  The scorching sun makes drudging through the desert a truly miserable experience.");
			var gameLocation1 = new gameLocation(1,false,null,null,gameLocation0,null,"Gold Ring",593,482,"#616b65","You have entered the swamp.  There's a strong stench of death and decay.  The trees are all covered in fungi, and large mushrooms are growing all over the land along the stagnant water.");
			var gameLocation2 = new gameLocation(2,false,null,gameLocation1,null,null,null,557,482, "#7c5768","You have entered the wastelands.  The land is filled with ashes, and you are overwhelmed by the strong smell given off by the burning brimstone.");
			var gameLocation3 = new gameLocation(3,false,null,null,gameLocation1,null,null,593,450,"#207843","You have entered the forest.  The towering trees create a canopy that blocks all but a few scattered rays of sunlight.  The forest is mysteriously quiet, and you feel as though you are being watched.");
			var gameLocation4 = new gameLocation(4,false,null,null,null,gameLocation1,null,632,482,"#6b5076","You have entered the graveyard.  It appears to have been abandoned long ago, most of the grave markers are broken and the inscriptions have faded.");			
			var gameLocation5 = new gameLocation(5,false,null,null,null,gameLocation0,"Elvish Sword",656,542,"#c7f78c","You have entered the grasslands.  Knee high yellowy-green grass stretches out in every direction as far as the eye can see.  There are small yew trees throughout the land, and you can hear many birds singing simultaneously.");
			var gameLocation6 = new gameLocation(6,false,null,null,gameLocation5,null,null,656,514,"#208182","You have entered the valley.  The valley is over a mile wide and half a mile below the surrounding hills.  A small river runs down the center of the valley, you can see and hear abundant wildlife in the area.  The river water is crystal-clear, and there are bountiful bushes filled with ripe berries along the side of the river.");
			var gameLocation7 = new gameLocation(7,false,null,null,null,gameLocation5,null,693,542,"#97c2c2","You have entered the tundra.  A layer of snow and ice covers the ground, there are small sections of dense evergreen trees creating small forests, you can see some reindeer grazing.  You feel as though you're being hunted, perhaps there are wolves nearby.");
			var gameLocation8 = new gameLocation(8,false,gameLocation5,null,null,null,null,656,572,"#a24ad3","You pass through a small tunnel and end up in a strange land.  The dirt is a strange shade of purple and the plants are like none you have ever seen.  This land seems almost otherworldly, maybe that tunnel acts as a portal between two different worlds.");			
			var gameLocation9 = new gameLocation(9,false,gameLocation0,null,null,null,"Bandage",592,606,"#18a0d7","You have entered the shoreline, a sandy beach stretching fore miles in either direction presses against the beautiful blue ocean.  You can see an abandoned boat tied to a nearby tree.  It looks damaged from years of being battered by the waves, perhaps you can repair it.");
			var gameLocation10 = new gameLocation(10,false,null,null,null,gameLocation9,null,624,607,"#bbc135","You have entered the ruins.  It's an ancient city with a large citadel atop a hill in the center.  The citadel has steep walls, and the center tower stands a hundred feet tall with sturdy walls that haven't submitted to the forces of nature despite the rest of the citadel being overgrown and reduced to rubble.");
			var gameLocation11 = new gameLocation(11,false,gameLocation9,null,null,null,null,592,638,"#1540a8","You have entered the island.  It appears to be a very small island with many trees and a large hill toward the northern end.  You can see the shoreline you from the continent you left to reach this island, it's about half a mile away.  Besides that there's only a few miniscule islands with little to no vegetation within sight.  ");
			var gameLocation12 = new gameLocation(12,false,null,gameLocation9,null,null,null,560,606,"#7f9295","You have entered the cave, it's very damp as smells of rotting vegetation.  Your face is barraged by water droplets as they come down from the stalactites.  There is very little light coming from the cave entrance, you're not sure how deep the cave goes. ");			
			var gameLocation13 = new gameLocation(13,false,null,gameLocation0,null,null,"Amulet",527,541,"#ad2626","You have entered the mountain.  A steep, treacherous mountain pass winds up the eastern side, what is to be found on the other side of the mountain you do not know.  The path looks like it hasn't been used in decades, and certain parts of the path have crumbled making it only 1 foot wide at some points, leading to a sudden and deadly drop.");
			var gameLocation14 = new gameLocation(14,false,gameLocation13,null,null,null,null,527,571,"#d0fad0","You have entered the peninsula.  The peninsula is about 12 feet above sea level, with a rocky dropoff around the edges.  The unrelenting sea waves bash against the rocky coast, and hard rain drenches the land.  As the rain washes the soil away, a nearby tree suddenly lurches forward, some of its deeper roots just barely preventing it from falling into the sea.");
			var gameLocation15 = new gameLocation(15,false,null,gameLocation13,null,null,null,488,541,"#ecc03c","You have entered the plateau.  There's a stream coming from the nearby mountain which dwarfs the plateau in comparison.  The stream crosses the top of the platuea from the eastern side to the northern side, and there it turns into a waterfall.  At the base of the waterfall you can see the stream continues going north-east.");
			var gameLocation16 = new gameLocation(16,false,null,null,gameLocation13,null,null,528,515,"#d4d0d2","You have entered the quarries, there are massive pits stretched throughout the land.  Looking around you see many rocks that still contain gems, emeralds rubies and sapphires that have been left behind.  Those who mined these quarries may have delved too deep and awoken a terrible beast, which as legend states has happened in the past.");
			
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
			
