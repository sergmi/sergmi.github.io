let timeFunc = function(){										
	timerSetTimeout = setTimeout(function(){
		insertTip();
		addTextTip();
		clearTimeout(timerSetTimeout);					
	}, 5000);			
}

let changeEventTip = function(){
	if(localStorage.getItem("disable_tip_flag")!=="true"){localStorage.setItem("disable_tip_flag","true");}
	else{localStorage.setItem("disable_tip_flag","false");}
}

if(localStorage.getItem("disable_tip_flag")!=="true"){timeFunc();}

let insertTip = function(){
	let temp = document.getElementsByTagName("body")[0];
	temp.appendChild(createTip());
}

let createDomElement = function(value_0,value_1,value_2,value_3){
	let temp = document.createElement(value_0);
	temp.setAttribute("id",value_1);
	temp.setAttribute("class",value_2);
	temp.setAttribute("aria-hidden",value_3);
	return temp;
}

let createTip = function(){
	let elem_h5 = document.createElement("h5");
	elem_h5.textContent = "EMAIL TIP OF THE DAY";
	
	let elem_p = document.createElement("p");
	elem_p.setAttribute("id","text_place");
	
	let elem_div_1 = document.createElement("div");
	elem_div_1.appendChild(elem_h5);
	elem_div_1.appendChild(elem_p);
	
	let elem_i = createDomElement("i","hide_tip","fa fa-times","true");
	
	let elem_div_2 = document.createElement("div");
	elem_div_2.appendChild(elem_div_1);
	elem_div_2.appendChild(elem_i);
	
	let elem_i_0 = createDomElement("i","turn_left","fa fa-inverse fa-chevron-circle-left","true");
	
	let elem_i_1 = createDomElement("i","item_1","fa fa-circle","true");
	let elem_i_2 = createDomElement("i","item_2","fa fa-circle","true");
	let elem_i_3 = createDomElement("i","item_3","fa fa-circle","true");
	let elem_i_4 = createDomElement("i","item_4","fa fa-circle","true");
	let elem_i_5 = createDomElement("i","item_5","fa fa-circle","true");
	
	let elem_div_3 = document.createElement("div");
	elem_div_3.appendChild(elem_i_1);
	elem_div_3.appendChild(elem_i_2);
	elem_div_3.appendChild(elem_i_3);
	elem_div_3.appendChild(elem_i_4);
	elem_div_3.appendChild(elem_i_5);
	
	let elem_i_6 = createDomElement("i","turn_right","fa fa-inverse fa-chevron-circle-right","true");
	
	let elem_div_4 = document.createElement("div");
	elem_div_4.setAttribute("class","arrow-dot-conteiner");
	elem_div_4.appendChild(elem_i_0);
	elem_div_4.appendChild(elem_div_3);
	elem_div_4.appendChild(elem_i_6);
	
	let elem_input = document.createElement("input");
	elem_input.setAttribute("type","checkbox");
	elem_input.setAttribute("name","disable_checkbox");
	elem_input.addEventListener("change", changeEventTip, false);
	elem_input.textContent = "Disable tips";
	
	let elem_div_5 = document.createElement("div");
	elem_div_5.setAttribute("class","input-conteiner");
	elem_div_5.appendChild(elem_input);
	
	let elem_div_6 = document.createElement("div");
	elem_div_6.appendChild(elem_div_5);
	elem_div_6.appendChild(elem_div_4);
	
	let elem_div_7 = document.createElement("div");
	elem_div_7.setAttribute("id","conteiner");
	elem_div_7.setAttribute("class","conteiner_tips");
	elem_div_7.appendChild(elem_div_2);
	elem_div_7.appendChild(elem_div_6);
	
	return elem_div_7;
}

let addTextTip = function(){

	let data_massive = ["More than 10%","More than 20%","More than 30%","More than 40%","More than 50%"];
	let data_id = ["item_1","item_2","item_3","item_4","item_5"];

	let resetDot = function(){
		data_id.forEach(function(item,i,arr){let temp = document.getElementById(data_id[i]); temp.className = "fa fa-circle";});	
	}

	let setDot = function(k){
		let temp = document.getElementById(data_id[k]); temp.className += " pointer_dot";
	}

	let j = 0;
	let place_for_text = document.getElementById("text_place");
	place_for_text.textContent = data_massive[j];

	setDot(j);

	let element = document.getElementById("conteiner");

	let changeTip = function(){
		if(event.target.id==="turn_left"||event.keyCode===37){
			j -= 1; if(j === -1){j = data_massive.length - 1;}
			place_for_text.textContent = data_massive[j];
			resetDot();
			setDot(j);
		}
		
		if(event.target.id==="turn_right"||event.keyCode===39){
			j += 1; if(data_massive.length === j){j = 0;}
			place_for_text.textContent = data_massive[j];
			resetDot();
			setDot(j);
		}
		
		if(event.target.id==="hide_tip"){
			element.className = "hidden";
		}
	}

	element.addEventListener('click', changeTip, false);
	let temp = document.getElementsByTagName("body")[0];
	temp.addEventListener('keydown', changeTip, false);
}