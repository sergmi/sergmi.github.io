let body_conteiner = document.getElementById("bodyConteiner");
let	player_image_conteiner = document.getElementById("playerImageConteiner");
let	enemy_image_conteiner = document.getElementById("enemyImageConteiner");
let fieldset_conteiner = document.getElementById("fieldsetHighscores");
let message_conteiner = document.getElementById("messageConteiner");

let correct_message = document.getElementById("correctMessage");
let incorrect_message = document.getElementById("incorrectMessage");

let enemy_name = document.getElementById("enemyName");
let	enemy_image = document.getElementById("enemyImage");
let	weapon_image = document.getElementById("weaponImage");

let	player_influence_image = document.getElementById("playerInfluenceImage");
player_influence_image.addEventListener("animationend", removePlayerInfluence, false);

let	enemy_influence_image = document.getElementById("enemyInfluenceImage");
enemy_influence_image.addEventListener("animationend", removeEnemyInfluence, false);

let player_form = document.getElementById("player-form");
player_form.addEventListener("submit", subFunc, false);

let weapon_field = document.getElementById("weapon_field");
weapon_field.addEventListener("click", switchToTask, false);

let game_final_field = document.getElementById("gameFinalField");

let modal_dialog_field = document.getElementById("modalDialogField");
let modal_dialog_conteiner = document.getElementById("modalDialogConteiner");

let task_field = document.getElementById("taskField");
let task_conteiner = document.getElementById("taskConteiner");

let table_field = document.getElementById("table_field");
let table_conteiner = document.getElementById("table_conteiner");

let highscores;
let player_health;
let enemy_health;
let enemy_influence_class;
let weapon_name;
let player_count;
let figures;
let task_operator;

let enemy_definitions = ["sunny","cloudy","rainy","snowy","firely"];
let enemy_instances = ["doctor","driver","teacher","cook","pilot"];
let enemy_names = ["Volt","Nick","Baks","Azia","Yuka"];
let enemy_classes = ["enemy-1","enemy-2","enemy-3","enemy-4"];
let weapon_classes = ["weapon-1","weapon-2","weapon-3","weapon-4"];

let player_bar = new Nanobar( {target: document.getElementById('playerDiv')} );
let enemy_bar = new Nanobar( {target: document.getElementById('enemyDiv')} );

let weapon_choise = document.getElementById("weaponChoise");
weapon_choise.addEventListener("click", loadModalDialog, false);

let player_fail_button = document.getElementById("playerFailButton");
player_fail_button.addEventListener("click", changeTaskToGame, false);

let play_button_field = document.getElementById("playButtonField");
play_button_field.addEventListener("click", changeOpacityHighscores, false);

let player_reply = document.getElementById("player-reply");

let screen_keyboard = document.getElementById("screenKeyboard");
screen_keyboard.addEventListener("click", insertFigure, false);

function hideRulesAndInfo(){
	let rules_field = document.getElementById("rulesField");
	rules_field.className = "deleted";
	let form_field = document.getElementById("formField");
	form_field.className = "deleted";
	let player_name = document.getElementById("playerName");
	player_name.textContent = player_form.firstname.value;
}
			
function subFunc(){
	hideRulesAndInfo();
	createGameField();
	startCounter();
}

function startCounter(){
	player_count = 0;
}

function createGameField(){
	player_health = 99.99;
	player_bar.go( player_health ); // size player bar 100%
	enemy_health = 99.99;
	enemy_bar.go( 100-enemy_health ); // size enemy bar 100%
	enemy_name.textContent = enemy_definitions.sort(() => {return Math.random()-0.5})[0]+" "+enemy_instances.sort(() => {return Math.random()-0.5})[0]+" "+enemy_names.sort(() => {return Math.random()-0.5})[0];
	
	
	enemy_image.className = "enemy-image " + enemy_classes.sort(() => {return Math.random()-0.5})[0];
	weapon_image.className = weapon_classes.sort(() => {return Math.random()-0.5})[0];
	switch(weapon_image.className){
		case "weapon-1": enemy_influence_class = "enemy-influence-1";
			break;		
		case "weapon-2": enemy_influence_class = "enemy-influence-2";
			break;
		case "weapon-3": enemy_influence_class = "enemy-influence-3";
			break;		
		case "weapon-4": enemy_influence_class = "enemy-influence-4";
			break;		
	}
	enemy_influence_class += " enemy-influence-image";
	
	showNewGameField();
}

function showNewGameField(){
	body_conteiner.className="upstairs-content-body";
	game_final_field.className = "game-final";
	player_image_conteiner.className = "conteiner-visible";
	enemy_image_conteiner.className = "conteiner-visible";
}

function showGameField(){
	body_conteiner.className="upstairs-content-body";
	game_final_field.className = "game-final";
}

function loadModalDialog(){
	modal_dialog_field.className = "modal-dialog";
	body_conteiner.addEventListener('keydown', requestToReduce, false);
	body_conteiner.addEventListener('click', requestToReduce, false);
}

function requestToReduce(){
	if(event.target.className==="fa fa-times"||event.target.id==="modalDialogField"||event.keyCode===27){
		body_conteiner.removeEventListener('keydown', requestToReduce, false);
		body_conteiner.removeEventListener('click', requestToReduce, false);
		reduceModalDialog();
	}
}

function closeModalDialog(){
	modal_dialog_conteiner.removeEventListener("animationend", closeModalDialog, false);
	modal_dialog_conteiner.className = "modal overlay";
	modal_dialog_field.className = "deleted";
}

function reduceModalDialog(){
	modal_dialog_conteiner.addEventListener("animationend", closeModalDialog, false);
	modal_dialog_conteiner.className = "reduce-overlay";
}

function switchToTask(){
	if(event.target.className == "struggle-weapon-1"||event.target.className == "struggle-weapon-2"){
		weapon_name = event.target.className;
		modal_dialog_conteiner.addEventListener("animationend", changeGameToTask, false);
		modal_dialog_conteiner.className = "reduce-overlay";
	}
}

function changeGameToTask(){
	modal_dialog_conteiner.removeEventListener("animationend", changeGameToTask, false);
	closeModalDialog();
	hideGame();
	showTask();
}

function changeOpacityHighscores(){
	table_field.addEventListener("animationend", reloadGame, false);
	table_field.className += " opacity-decrease";
	play_button_field.className += " opacity-decrease";
}

function reloadGame(){
	table_field.removeEventListener("animationend", reloadGame, false);
	removeTableHighscores();
	play_button_field.className = "deleted";
	createGameField();
}

function showPlayerInfluence(){
	player_influence_image.className = "player-influence-image";
}

function removePlayerInfluence(){
	player_influence_image.className = null;
}

function showEnemyInfluence(){
	enemy_influence_image.className = enemy_influence_class;
}

function removeEnemyInfluence(){
	enemy_influence_image.className = null;
}

function applyPlayerWeapon(){
	if(weapon_name === "struggle-weapon-1"){
		showPlayerInfluence();
		
		enemy_health -= 20;
		if(enemy_health<1){
			enemy_health = 0.01;
			enemy_bar.go( 100-enemy_health );
			player_count += 1;
			createGameField();
		}
		enemy_bar.go( 100-enemy_health );
	};
	
	if(weapon_name === "struggle-weapon-2"){
		player_health += 20;
		if(player_health>99){player_health = 99.99;}
		player_bar.go( player_health );
	};	
}

function applyEnemyWeapon(){
	showEnemyInfluence();
	player_health -= 15;
	if(player_health<1){
		player_health = 0.01;
		player_bar.go( player_health );
		if(player_count > 0){	//  condition
			saveCurrentScore();	
			startCounter();
		}
		hidePlayerImage();
	}
	player_bar.go( player_health );
}

function showTask(){
	player_reply.addEventListener("submit", showResult, false);
	
	figures = [];
	figures.push(createOperand());
	figures.push(createOperand());
	figures.sort((a,b)=>b-a);
	
	task_operator = createOperator();
	task_conteiner.textContent = figures[0] + task_operator + figures[1] + " = ";
	
	body_conteiner.className = "center-content-body";
	
	task_field.className = "task";
}

function createOperand(){
	let temp = player_form.age.value;
	if(!temp||temp<7){return Math.floor(Math.random() * 10);}
	else if(temp == 7){return Math.floor(Math.random() * 10 + Math.random() * 10);}
	else{return Math.floor(Math.random() * 10 + Math.random() * 10 + Math.random() * 10);}
}

function createOperator(result){
	Math.floor(Math.random()* 10)<5?result = " + ":result = " - ";
	return result;
}

function insertFigure(){
	switch(event.target.id){
		case "oneButton": player_reply.answer.value += "1";
			break;		
		case "twoButton": player_reply.answer.value += "2";
			break;
		case "threeButton": player_reply.answer.value += "3";
			break;		
		case "fourButton": player_reply.answer.value += "4";
			break;
		case "fiveButton": player_reply.answer.value += "5";
			break;		
		case "sixButton": player_reply.answer.value += "6";
			break;
		case "sevenButton": player_reply.answer.value += "7";
			break;		
		case "eightButton": player_reply.answer.value += "8";
			break;
		case "nineButton": player_reply.answer.value += "9";
			break;		
		case "zeroButton": player_reply.answer.value += "0";
			break;
		case "clearButton": player_reply.answer.value = null;
			break;
	}
}

function showResult(){
	player_reply.removeEventListener("submit", showResult, false);
	task_field.addEventListener("animationend", changeTaskToGame, false);
	message_conteiner.className = "message-conteiner-visible";
	
	if(player_reply.answer.value == eval(figures[0]+task_operator+figures[1])){
		correct_message.className = "message";
	}else{
		incorrect_message.className = "message";
	}
}

function changeTaskToGame(){
	hideTask();
	showGameField();
}

function hideTask(){
	message_conteiner.className = "deleted";
	task_field.removeEventListener("animationend", changeTaskToGame, false);
	let temp = document.getElementsByClassName("message")[0];
	
	if(temp){
		temp.className = "deleted";
	}
	
	task_field.className = "deleted";
	
	if(player_reply.answer.value == eval(figures[0]+task_operator+figures[1])){applyPlayerWeapon();}
	else{applyEnemyWeapon();}
	player_reply.answer.value = null;
}

function saveCurrentScore(){
	let winner = {'firstname': player_form.firstname.value, 'lastname': player_form.lastname.value, 'age': player_form.age.value, 'score': player_count};
	
	highscores = JSON.parse(localStorage.getItem('battleGameHighscores'));
	
	if(!highscores){
		highscores = {'player':[]};
		highscores.player.push(winner);
	}
	else{highscores.player.forEach((x,j) => {				
			if(player_count > x.score){				
				highscores.player.splice(j,0,winner);
				player_count = 0;
			}			
		});
		if(player_count > 0){highscores.player.push(winner);}	//	condition
		if(highscores.player.length > 10){highscores.player.length = 10;}		
	}
	localStorage.setItem('battleGameHighscores', JSON.stringify(highscores));
}

function hidePlayerImage(){
	player_image_conteiner.addEventListener("animationend", endGame, false);
	player_image_conteiner.className = "player-defeated";
}

function endGame(){
	hideGame();
	insertTableHighscores();
}

function hideGame(){
	game_final_field.className = "deleted";
	player_image_conteiner.removeEventListener("animationend", endGame, false);
	player_image_conteiner.className = null;
}

function insertTableHighscores(){
	highscores = JSON.parse(localStorage.getItem('battleGameHighscores'));
	
	let table_body = document.createElement("tbody");
	table_body.setAttribute("id","table_body");
	highscores.player.forEach(function(item,i,arr){
			let table_tr = document.createElement("tr");
			let table_td_1 = document.createElement("td");
			table_td_1.textContent = highscores.player[i].firstname;
			let table_td_2 = document.createElement("td");
			table_td_2.textContent = highscores.player[i].lastname;
			let table_td_3 = document.createElement("td");
			table_td_3.textContent = highscores.player[i].age;
			let table_td_4 = document.createElement("td");
			table_td_4.textContent = highscores.player[i].score;
			
			table_tr.appendChild(table_td_1);
			table_tr.appendChild(table_td_2);
			table_tr.appendChild(table_td_3);
			table_tr.appendChild(table_td_4);
				
			table_body.appendChild(table_tr);
	});			
	
	table_conteiner.appendChild(table_body);
	
	body_conteiner.className = "center-content-body";
	table_field.className = "table";
	play_button_field.className = "play-button-field";

	animate({
			duration: 3000,
			timing: bounceEaseOut,
			draw: function(progress) {
			  fieldset_conteiner.style.top = progress * 400 + 'px';
			}
	});
}

function removeTableHighscores(){
	table_field.className = "deleted";
	let table_body = document.getElementById("table_body");
	if(table_body){table_conteiner.removeChild(table_body);}
	
}

function animate({timing, draw, duration}) {

	let start = performance.now();

	requestAnimationFrame(function animate(time) {
		let timeFraction = (time - start) / duration;
		
		if(timeFraction > 1){
			timeFraction = 1;
		}
		
		let progress = timing(timeFraction);
		draw(progress);

		if(timeFraction < 1){
			requestAnimationFrame(animate);
		}
	});
}	

let bounceEaseOut = makeEaseOut(bounce);
	
function makeEaseOut(timing){
	return function(timeFraction) {
		return 1 - timing(1 - timeFraction);
	}
}

function bounce(timeFraction){
	let a, b;
	for(a = 0, b = 1; 1; a += b, b /= 2){
		if(timeFraction >= (7 - 4 * a) / 11){
			return - Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
		}
	}
}