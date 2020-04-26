var julia = {
  width: 400,
  height: 400,
  power: 2,
  x: [-1.5, 1.5],
  y: [-1.5, 1.5],
  c: [-1.5, 1.5],
  max: 2,
  blocked: false,
  iteration: 200,
  paint: function(){
    $("#p_j_4")[0].innerHTML = "[" + this.x[0] + "," + this.x[1] + "]";
    $("#p_j_5")[0].innerHTML = "[" + this.y[0] + "," + this.y[1] + "]";
    $("#p_j_6")[0].innerHTML = this.iteration;

    var canvas = $("#julia");
    canvas[0].width  = this.width;
    canvas[0].height = this.height;

    var ctx = canvas[0].getContext('2d');
    ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
    var id = ctx.getImageData(0, 0, this.width, this.height);
    var pixels = id.data;

    var x_resize = (julia.x[1]-julia.x[0])/canvas[0].width;
    var y_resize = (julia.y[1]-julia.y[0])/canvas[0].height;

    for(i=0; i<=canvas[0].width; i++){
      for(j=0; j<=canvas[0].height; j++){
        point = [i*x_resize+julia.x[0], -(j*y_resize+julia.y[0])]
        iterations = is_of_julia(point, julia.c, julia.max, julia.iteration, julia.power)
        colour_point2(iterations, julia.iteration, pixels,
          (j*id.width+i)*4)
      }
    }
    ctx.putImageData(id, 0, 0);
  },
  reset: function(){
    $("#blocking")[0].innerHTML = "Unblocked";
		julia.blocked = false;
    julia.x = [-1.5, 1.5];
  	julia.y = [-1.5, 1.5];
  	julia.iteration = 200;
  	julia.c = [-1.5, 1.5];
  	julia.paint();
  }
}

var is_of_julia = function(x, c, max, iteration, p){
  if(x[0]*x[0]+x[1]*x[1] >= max){ return 1; }
  for(ii=0; ii<iteration; ii++){
    x = sum(power(x,p), c);
    if(x[0]*x[0]+x[1]*x[1] >= 2){ return ii+1; }
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
