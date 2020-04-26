var build = function(){
	mandelbrot.paint();
	julia.paint();
}

var zoom_mandelbrot = function(e){
	x = getPoint(e);
	distance = (mandelbrot.x[1]-mandelbrot.x[0])/10
	mandelbrot.x = [x[0]-distance, x[0]+distance]
	mandelbrot.y = [-x[1]-distance, -x[1]+distance]
	mandelbrot.iteration += 200;
	mandelbrot.paint();
}

var zoom_out_mandelbrot = function(){
	distance = mandelbrot.x[1]-mandelbrot.x[0]
	new_distance = distance*2.5
	center_point = mandelbrot.x[0] + distance/2;
	mandelbrot.x = [center_point-new_distance, center_point+new_distance]
	center_point = mandelbrot.y[0] + distance/2;
	mandelbrot.y = [center_point-new_distance, center_point+new_distance]
	mandelbrot.iteration -= 200;
	if(mandelbrot.iteration < 200){mandelbrot.iteration = 200}
	mandelbrot.paint();
}

var zoom_julia = function(e){
	x = getPointJulia(e);
	distance = (julia.x[1]-julia.x[0])/10
	julia.x = [x[0]-distance, x[0]+distance]
	julia.y = [-x[1]-distance, -x[1]+distance]
	julia.iteration += 200;
	julia.paint();
}

var zoom_out_julia = function(){
	distance = julia.x[1]-julia.x[0]
	new_distance = distance*2.5
	center_point = julia.x[0] + distance/2;
	julia.x = [center_point-new_distance, center_point+new_distance]
	center_point = julia.y[0] + distance/2;
	julia.y = [center_point-new_distance, center_point+new_distance]
	julia.iteration -= 200;
	if(julia.iteration < 200){julia.iteration = 200}
	julia.paint();
}

var create_julia = function(e){
	if(julia.blocked){ return; }
	x = getPoint(e);
	$("#p_j_2")[0].innerHTML = x[0];
	$("#p_j_3")[0].innerHTML = x[1];
	julia.c = x;
	julia.paint();
}

var select_point = function(e){
	x = getPoint(e);
  console.log(x[0] + "+i(" + x[1] + ")");
}

var getPoint = function(e){
	var canvas = $("#mandelbrot")[0]
	let rect = canvas.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
	x = x*(mandelbrot.x[1]-mandelbrot.x[0])/canvas.width+mandelbrot.x[0]
	y = -(y*(mandelbrot.y[1]-mandelbrot.y[0])/canvas.height+mandelbrot.y[0])
	return [x,y];
}

var getPointJulia = function(e){
	var canvas = $("#julia")[0]
	let rect = canvas.getBoundingClientRect();
  let x = e.clientX - rect.left;
  let y = e.clientY - rect.top;
	x = x*(julia.x[1]-julia.x[0])/canvas.width+julia.x[0]
	y = -(y*(julia.y[1]-julia.y[0])/canvas.height+julia.y[0])
	return [x,y];
}

var reset_fractals = function(){
	mandelbrot.reset();
	julia.reset();
}

var space_press = function(e){
	if(e.keyCode != 32){ return; }
	unblock_julia();
}

var unblock_julia = function(){
	if(julia.blocked){
		$("#blocking")[0].innerHTML = "Unblocked";
		julia.blocked = false;
	}else{
		$("#blocking")[0].innerHTML = "Blocked";
		julia.blocked = true;
	}
}

var change_power = function(eventObject){
	value = eventObject.target.value;
	mandelbrot.power = value;
	julia.power = value;
	$("#p_j_1")[0].innerHTML = value;
	$("#p_m_1")[0].innerHTML = value;
	build();
}

var clickEvents = function(){
	$("#mandelbrot").on("mousemove", create_julia);
	$("#mandelbrot").on("dblclick", zoom_mandelbrot);
	$("#julia").on("dblclick", zoom_julia);
	$("#reset").on("click", reset_fractals);
	$("#reset_m").on("click", mandelbrot.reset);
	$("#reset_j").on("click", julia.reset);
	$("#zoom_out_m").on("click", zoom_out_mandelbrot);
	$("#zoom_out_j").on("click", zoom_out_julia);
	$("#blocking").on("click", unblock_julia);
	$("body").on("keyup", space_press);
	$("body").on("input", ".number_slide", $.debounce(1000, change_power));
}

$(document).ready(function(){
		build();
		clickEvents();
	}
);
