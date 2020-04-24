var build = function(){
	mandelbrot.paint();
	julia.paint();
}

// var zoom = function(e){
// 	var value = e.originalEvent.deltaY/20;
// 	if(value < 0){
// 		new_length = (mandelbrot.x[0] - mandelbrot.x[1])/value;
// 	}else{
// 		new_length = value*(mandelbrot.x[1] - mandelbrot.x[0]);
// 	}
//
// 	var x = getPoint(e);
// 	mandelbrot.x = [x[0]-new_length,x[0]+new_length];
// 	mandelbrot.y = [x[1]-new_length,x[1]+new_length];
// 	mandelbrot.iteration += 10*(-value);
// 	mandelbrot.paint();
// }

var zoom = function(e){
	x = getPoint(e);
	distance = (mandelbrot.x[1]-mandelbrot.x[0])/10
	mandelbrot.x = [x[0]-distance, x[0]+distance]
	mandelbrot.y = [-x[1]-distance, -x[1]+distance]
	mandelbrot.iteration += 500;
	mandelbrot.paint();
}

var create_julia = function(e){
	x = getPoint(e);
	console.log(x[0] + "+i(" + x[1] + ")");
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

var clickEvents = function(){
	$("#mandelbrot").on("mousemove", select_point);
	$("#mandelbrot").on("mousemove", create_julia);
	$("#mandelbrot").on("dblclick", zoom);
	$(".reset").on("click",function() {
    mandelbrot.x = [-1.5, 1.5];
    mandelbrot.y = [-1.5, 1.5];
    mandelbrot.iteration = 200;
    mandelbrot.paint();
  }).click();
	// $("#mandelbrot").on("wheel", zoom);
}

$(document).ready(function(){
		build();
		clickEvents();
	}
);
