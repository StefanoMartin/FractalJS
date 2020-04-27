var julia = {
  width: 400,
  height: 400,
  power: 2,
  x: [-2, 2],
  y: [-2, 2],
  c: [-2, 2],
  temp_coordinate: [0,0],
  blocked: false,
  iteration: 200,
  paint: function(){
    $("#loading_j")[0].innerHTML = "Loading...";
      setTimeout(function() {
      $("#p_j_4")[0].innerHTML = "[" + julia.x[0] + "," + julia.x[1] + "]";
      $("#p_j_5")[0].innerHTML = "[" + julia.y[0] + "," + julia.y[1] + "]";
      $("#p_j_6")[0].innerHTML = julia.iteration;

      var canvas = $("#julia");
      canvas[0].width  = julia.width;
      canvas[0].height = julia.height;

      var ctx = canvas[0].getContext('2d');
      ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
      var id = ctx.getImageData(0, 0, julia.width, julia.height);
      var pixels = id.data;

      var x_resize = (julia.x[1]-julia.x[0])/canvas[0].width;
      var y_resize = (julia.y[1]-julia.y[0])/canvas[0].height;

      for(i=0; i<=canvas[0].width; i++){
        for(j=0; j<=canvas[0].height; j++){
          point = [i*x_resize+julia.x[0], -(j*y_resize+julia.y[0])]
          iterations = is_of_julia(point, julia.c, julia.iteration, julia.power)
          colour_point2(iterations, julia.iteration, pixels,
            (j*id.width+i)*4)
        }
      }
      ctx.putImageData(id, 0, 0);
      $("#loading_j")[0].innerHTML = "";
    }, 0);
  },
  reset: function(){
    $("#blocking")[0].innerHTML = "Unblocked";
		julia.blocked = false;
    julia.x = [-2, 2];
  	julia.y = [-2, 2];
  	julia.iteration = 200;
  	julia.c = [-2, 2];
  	julia.paint();
  },
  move: function(keyCode){
    let distance = julia.x[1] - julia.x[0]
    switch(keyCode) {
      case 38: //up
        julia.y[0] -= distance/2;
        julia.y[1] -= distance/2;
        break;
      case 37: //left
        julia.x[0] -= distance/2;
        julia.x[1] -= distance/2;
        break;
      case 40: //down
        julia.y[0] += distance/2;
        julia.y[1] += distance/2;
        break;
      case 39: //right
        julia.x[0] += distance/2;
        julia.x[1] += distance/2;
        break;
      default:
        break;
    }
    julia.paint();
  }
}

var is_of_julia = function(x, c, iteration, p){
  if(x[0]*x[0]+x[1]*x[1] >= 4){ return 1; }
  for(ii=0; ii<iteration; ii++){
    x = sum(power(x,p), c);
    if(x[0]*x[0]+x[1]*x[1] >= 4){ return ii+1; }
  }
  return 0
}

var colour_point2 = function(i, iterations, pix, ppos){
  if (i == 0) {
    pix[ppos] = 255;
    pix[ppos + 1] = 255;
    pix[ppos + 2] = 255;
  } else {
    var c = 3 * Math.log(i+1) / Math.log(iterations+1);
    if (c < 1) {
      pix[ppos] = 0;
      pix[ppos + 1] = 0;
      pix[ppos + 2] = 255 * c;
    }
    else if ( c < 2 ) {
      pix[ppos + 1] = 255 * (c - 1);
      pix[ppos] = 0;
      pix[ppos + 2] = 255;
    } else {
      pix[ppos + 1] = 255;
      pix[ppos] = 255 * (c - 2);
      pix[ppos + 2] = 255;
    }
  }
  pix[ppos+3]=255
}
