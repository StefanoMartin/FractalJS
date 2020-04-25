var build = function(){
	mandelbrot.paint();
	julia.paint();
}

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
	$("#p_j_2")[0].innerHTML = x[0].toPrecision(2);
	$("#p_j_3")[0].innerHTML = x[1].toPrecision(2);
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

var reset_fractals = function(){
	mandelbrot.x = [-1.5, 1.5];
	mandelbrot.y = [-1.5, 1.5];
	mandelbrot.iteration = 200;
	mandelbrot.paint();
	julia.x = [-1.5, 1.5];
	julia.y = [-1.5, 1.5];
	julia.iteration = 400;
	julia.c = [0,0];
	julia.paint();
}

var clickEvents = function(){
	$("#mandelbrot").on("mousemove", create_julia);
	$("#mandelbrot").on("dblclick", zoom);
	$("#reset").on("click", reset_fractals);
}

$(document).ready(function(){
		build();
		clickEvents();
	}
);
