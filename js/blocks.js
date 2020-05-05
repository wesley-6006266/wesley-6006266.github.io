// JavaScript Document

//Game is volledig responsive (na reloaden pagina) ;)
window.onload = function(){
	var canvas = document.getElementById('myCanvas');
	var ctx = canvas.getContext("2d");
	ctx.font = "2rem Righteous , Arial";
	canvas.width = 1000;
	canvas.height = 500;
	
	//player
	var up = false;
	var down = false;
	var right = false;
	var left = false;
	var playerX = 10;
	var playerY = 10;
	var squareWidth = 40;
	var squareHeight = 40;
	var player_speed = 6;
	var img2 = new Image();
	img2.src = "img/woezel.png";
	var points = 0;
	var lives = 3;
	
	//item
	var itemWidth = 40;
	var itemHeight = 40;
	var itemX = Math.floor(Math.random() * canvas.width-itemWidth)+1;
	var itemY = Math.floor(Math.random() * canvas.height-itemHeight)+1;
	var img = new Image();
	img.src = "img/bier-icon.png";
	
	//enemy
	var enemyX = canvas.width - 50;
	var enemyY = canvas.height - 50;
	var enemyWidth = squareWidth;
	var enemyHeight = squareHeight;
	var enemy_speed = 3;
	var img3 = new Image();
	img3.src = "img/man.png";
	
	//Misc
	var started = false;
	
	//Intervals
	var draw_loop;
	var move_loop;
	var iCollision_loop;
	var eMove_loop;
	var eCollision_loop;
	
	//WinScreen
	var confetti = new Image();
	confetti.src = "img/confetti.png";
	
	function draw(){
	
		ctx.fillStyle = "#666666";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(img2, playerX, playerY, squareWidth, squareHeight);
		ctx.drawImage(img, itemX, itemY, itemWidth, itemHeight);
		ctx.drawImage(img3, enemyX, enemyY, squareWidth, squareHeight);
		ctx.textAlign="start";
		ctx.font = "2rem Righteous, Arial";
		ctx.fillStyle="gold";
		ctx.fillText("Bier: "+ points, canvas.width*0.01, canvas.height*0.95);
		ctx.fillText("Levens: "+ lives, canvas.width*0.80, canvas.height*0.95);
	}
	
	window.addEventListener("keydown", function(e){
		if(e.keyCode == 87){up = true}
		if(e.keyCode == 83){down = true}
		if(e.keyCode == 65){left = true}
		if(e.keyCode == 68){right = true}
		if(e.keyCode == 32 && !started){init();}
	})
	window.addEventListener("keyup", function(e){
		if(e.keyCode == 87){up = false}
		if(e.keyCode == 83){down = false}
		if(e.keyCode == 65){left = false}
		if(e.keyCode == 68){right = false}
	})

	function move() {
		if(up == true) { playerY -= player_speed}
		if(down == true) { playerY += player_speed}
		if(left == true) { playerX -= player_speed}
		if(right == true) { playerX += player_speed}
	}
	
	function itemCollision() {
		if ((playerX + squareWidth >= itemX && playerX <= itemX + itemWidth) && (playerY + squareHeight >= itemY && playerY <= itemY + itemHeight)) {
			itemX = Math.floor(Math.random() * canvas.width - itemWidth) +1;
			itemY = Math.floor(Math.random() * canvas.height - itemHeight) +1;
			points++;
			enemy_speed += 0.15;
			if (points == 24) {
				win();
			}
		}
	}
	function enemyMove() {
		if (playerX > enemyX) {enemyX += enemy_speed}
		if (playerX < enemyX) {enemyX -= enemy_speed}
		if (playerY > enemyY) {enemyY += enemy_speed}
		if (playerY < enemyY) {enemyY -= enemy_speed}
	}
	
	function enemyCollision() {
		if ((enemyX + enemyWidth >= playerX && enemyX <= playerX + squareWidth) && (enemyY + enemyHeight >= playerY && enemyY <= playerY + squareHeight)) {
			playerX = 10;
			playerY = 10;
			enemyX = canvas.width - 50;
			enemyY = canvas.height - 50;
			enemy_speed = 4;
			lives -= 1;
			itemX = Math.floor(Math.random() * canvas.width - itemWidth) +1;
			itemY = Math.floor(Math.random() * canvas.height - itemHeight) +1;
		}
		if (lives == 0) {
			gameOver();
		}
	}
	
	function gameOver() {
		loserScreen();
		stop_init();
	}
	
	function win() {
		winnerScreen();
		stop_init();
	}
	
	function startScreen(){
		ctx.fillStyle = "rgb(102, 102, 102)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.font = "2rem Righteous, Arial";
		ctx.fillStyle = "Gold";
		ctx.textAlign= "center";
		ctx.fillText("Welkom bij DE MAN MET DE HAMER", canvas.width/2, canvas.height*0.1);
		ctx.fillText("Woezel heeft dorst. Beweeg met de toetsen W A S D", canvas.width/2, canvas.height*0.2);
		ctx.fillText("TIP: beweeg schuin om uit te lopen op de man met de hamer.", canvas.width/2, canvas.height*0.3);
		ctx.fillText("Heb jij 24 punten? Dan heb je gewonnen! maar pas op:", canvas.width/2, canvas.height*0.4);
		ctx.fillText("De man met de hamer gaat steeds sneller...", canvas.width/2, canvas.height*0.5);
		ctx.fillText("Ben je 3 keer gepakt? Dan ben je af!", canvas.width/2, canvas.height*0.6);
		ctx.fillText("Om te beginnen met spelen, druk op 'Spatie'", canvas.width/2, canvas.height*0.7);
	}
	
	if(!started){
		startScreen();
	}
	
	function loserScreen() {
		ctx.fillStyle = "rgb(32, 32, 32, 0.8)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.font = "2rem Righteous, Arial";
		ctx.fillStyle="gold";
		ctx.textAlign="center";
		ctx.fillText("Helaas, niet gewonnen", canvas.width/2, 75);
		ctx.fillText("Woezel heeft maar " + points + " bier op!", canvas.width/2, 150);
		ctx.fillText("Druk op spatie om opnieuw te spelen", canvas.width/2, 225);
	}
	
	function winnerScreen() {
		ctx.fillStyle = "rgb(32, 32, 32, 0.8)";
		ctx.fillRect(0, 0, canvas.width, canvas.height);
		ctx.drawImage(confetti, 0, 0, canvas.width, canvas.height);
		ctx.font = "30px Righteous, Arial";
		ctx.fillStyle="gold";
		ctx.textAlign="center";
		ctx.fillText("GEFELICITEERD!", canvas.width/2, canvas.height*0.6);
		ctx.fillText("Woezel heeft " + points + " bier op!",canvas.width/2, canvas.height*0.7);
		ctx.fillText("", canvas.width/2, canvas.height*0.8);
		ctx.fillText("Druk op spatie om opnieuw te spelen", canvas.width/2, canvas.height*0.9);
	}
	
	function init(){
		started = true;
		draw_loop = setInterval(draw, 30);
		move_loop = setInterval(move, 30);
		iCollision_loop = setInterval(itemCollision, 30);
		eMove_loop = setInterval(enemyMove, 30);
		eCollision_loop = setInterval(enemyCollision, 30);
		playerX = 10;
		playerY = 10;
		enemyX = canvas.width - 50;
		enemyY = canvas.height - 50;
		itemX = Math.floor(Math.random() * canvas.width - itemWidth) +1;
		itemY = Math.floor(Math.random() * canvas.height - itemHeight) +1;
		lives = 3;
		points = 0;
	}
	
	function stop_init() {
		clearInterval(draw_loop);
		clearInterval(move_loop);
		clearInterval(iCollision_loop);
		clearInterval(eMove_loop);
		clearInterval(eCollision_loop);
		started = false;
	}
}


	