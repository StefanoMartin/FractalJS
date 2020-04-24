var build = function(){
	similar.height = parseInt($(".box_fix").children()[0].children[1].value);
	similar.width = parseInt($(".box_fix").children()[1].children[1].value);
	similar.size_square = parseInt($(".box_fix").children()[2].children[1].value);
	similar.repetition = parseInt($(".box_fix").children()[3].children[1].value);
	similar.only_last = $("#only_last")[0].checked;
	similar.colored = $("#colored")[0].checked;

	similar.iteration = [];
	$.each($(".boxes").children(), function(index, value){
		similar.add_iteration(
			parseInt(value.children[0].children[1].value),
			parseInt(value.children[1].children[1].value),
			parseInt(value.children[2].children[1].value),
			parseFloat(value.children[3].children[1].value),
		);
	});

	similar.build();
	similar.paint();
}

var randomBuild = function(){
	$.each($(".boxes").children(), function(index, value){ value.remove(); });
	var number_obj = Math.floor(Math.random() * 5) + 1;
	for (let i = 0; i < number_obj; i++){ add_fractal(); }
	$(".box_fix").children()[0].children[1].value = 1000
	$(".box_fix").children()[0].children[2].value = $(".box_fix").children()[0].children[1].value;
	$(".box_fix").children()[1].children[1].value = 1000
	$(".box_fix").children()[1].children[2].value = $(".box_fix").children()[1].children[1].value;
	$(".box_fix").children()[2].children[1].value = Math.floor(Math.random() * 200) + 50;
	$(".box_fix").children()[2].children[2].value = $(".box_fix").children()[2].children[1].value;
	$(".box_fix").children()[3].children[1].value = 12 - number_obj;
	$(".box_fix").children()[3].children[2].value = $(".box_fix").children()[3].children[1].value;
	$.each($(".boxes").children(), function(index, value){
		value.children[0].children[1].value = Math.floor(Math.random() * 600) - 300;
		value.children[0].children[2].value = value.children[0].children[1].value;
		value.children[1].children[1].value = Math.floor(Math.random() * 600) - 300;
		value.children[1].children[2].value = value.children[1].children[1].value;
		value.children[2].children[1].value = Math.floor(Math.random() * 360);
		value.children[2].children[2].value = value.children[2].children[1].value;
		value.children[3].children[1].value = Math.random();
		value.children[3].children[2].value = value.children[3].children[1].value;
	});
	build();
}

var clickEvents = function(){
	$("body").on("input", ".slider", change_value);
	$("body").on("input", ".number_slide", change_value_slide);
	$("body").on("mouseup", ".myButton", delete_fractal);
	$(".addButton").on("mouseup", add_fractal);
	$(".buildButton").on("mouseup", build);
	$(".randomButton").on("mouseup", randomBuild);
	$("#only_last").on("input", build);
	$("#colored").on("input", build);
}

var change_value = function(eventObject){
	eventObject.target.parentElement.children[1].value = eventObject.target.value;
	build();
}

var change_value_slide = function(eventObject){
	eventObject.target.parentElement.children[2].value = eventObject.target.value;
	build();
}

var delete_fractal = function(eventObject){
	eventObject.target.parentElement.remove();
	build();
}

var add_fractal = function(){
	var m = `<div class="box_iteration">
			<div class="slidecontainer">
				<label>X: </label> <input class="number_slide" type="number" value="100"> <input type="range" min="-300" max="300" value="100" class="slider">
			</div>

			<div class="slidecontainer">
				<label>Y: </label> <input class="number_slide" type="number" value="100"> <input type="range" min="-300" max="300" value="100" class="slider">
			</div>

			<div class="slidecontainer">
				<label>Rotation: </label> <input class="number_slide" type="number" value="45"> <input type="range" min="0" max="360" value="45" class="slider">
			</div>

			<div class="slidecontainer">
				<label>Size: </label> <input class="number_slide" type="number" value="0.5" step="0.01"> <input type="range" min="0" max="1" value="0.5" class="slider" step="0.01">
			</div>

			<a href="#" class="myButton">Remove</a>
		</div>`

	$(".boxes").append(m);
	build();
}

$(document).ready(function(){
		build();
		clickEvents();
	}
);
