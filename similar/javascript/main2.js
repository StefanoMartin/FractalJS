var build = function(){
	similar.size_square = parseInt($("#size_square")[0].value);
	similar.repetition  = parseInt($("#repetition")[0].value);
	similar.only_last   = $("#only_last")[0].checked;
	similar.colored     = $("#colored")[0].checked;
	// similar.centered    = !($("#uncentered")[0].checked);

	similar.iteration = [];
	$.each($(".boxes").children(), function(index, value){
		similar.add_iteration(
			parseInt(value.children[0].children[1].children[0].value),
			parseInt(value.children[1].children[1].children[0].value),
			parseInt(value.children[2].children[1].children[0].value),
			parseFloat(value.children[3].children[1].children[0].value),
		);
	});

	similar.build();
	similar.paint();
}

var randomBuild = function(){
	$.each($(".boxes").children(), function(index, value){ value.remove(); });
	var number_obj = Math.floor(Math.random() * 3) + 1;
	for (let i = 0; i < number_obj; i++){ add_fractal(); }
	$("#size_square")[0].value = Math.floor(Math.random() * 200) + 50;
	$("#size_square")[0].parentElement.parentElement.children[2].children[0].value = $("#size_square")[0].value;
	$("#repetition")[0].value = 12 - number_obj;
	$("#repetition")[0].parentElement.parentElement.children[2].children[0].value = $("#repetition")[0].value;
	$.each($(".boxes").children(), function(index, value){
		number = Math.floor(Math.random() * 600) - 300;
		value.children[0].children[1].children[0].value = number
		value.children[0].children[2].children[0].value = number
		number = Math.floor(Math.random() * 600) - 300;
		value.children[1].children[1].children[0].value = number
		value.children[1].children[2].children[0].value = number
		number = Math.floor(Math.random() * 360);
		value.children[2].children[1].children[0].value = number
		value.children[2].children[2].children[0].value = number
		number = Math.random();
		value.children[3].children[1].children[0].value = number
		value.children[3].children[2].children[0].value = number
	});
	build();
}

var clickEvents = function(){
	$("body").on("input", ".slider", change_value);
	$("body").on("input", ".number_slide", change_value_slide);
	$("body").on("mouseup", "#removeButton", delete_fractal);
	$("#addButton").on("mouseup", add_fractal);
	$("#randomButton").on("mouseup", randomBuild);
	$("#only_last").on("input", build);
	$("#colored").on("input", build);
	// $("#uncentered").on("input", build);
}

var change_value = function(eventObject){
	eventObject.target.parentElement.parentElement.children[1].children[0].value = eventObject.target.value;
	build();
}

var change_value_slide = function(eventObject){
	eventObject.target.parentElement.parentElement.children[2].children[0].value = eventObject.target.value;
	build();
}

var delete_fractal = function(eventObject){
	eventObject.target.parentElement.remove();
	build();
}

var add_fractal = function(){
	var m = `<div class="box_iteration">
		<div class="row">
			<div class="col-3">X</div>
			<div class="col-3">
				<input class="number_slide" type="number" value="100">
			</div>
			<div class="col-4">
				<input type="range" min="-300" max="300" value="100" class="slider">
			</div>
		</div>

		<div class="row">
			<div class="col-3">Y</div>
			<div class="col-3">
				<input class="number_slide" type="number" value="100">
			</div>
			<div class="col-4">
				<input type="range" min="-300" max="300" value="100" class="slider">
			</div>
		</div>

		<div class="row">
			<div class="col-3">Rotation</div>
			<div class="col-3">
				<input class="number_slide" type="number" value="45">
			</div>
			<div class="col-4">
				<input type="range" min="0" max="360" value="45" class="slider">
			</div>
		</div>

		<div class="row">
			<div class="col-3">Size</div>
			<div class="col-3">
				<input class="number_slide" type="number"  value="0.5" step="0.01">
			</div>
			<div class="col-4">
				<input type="range" min="0" max="1" value="0.5" class="slider" step="0.01">
			</div>
		</div>
		<a href="#" class="myButton">Remove</a>
		<hr/>
	</div>`

	$(".boxes").append(m);
	build();
}

$(document).ready(function(){
		build();
		clickEvents();
	}
);
