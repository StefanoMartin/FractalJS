var mandelbrot = {
  width: 400,
  height: 400,
  power: 2,
  x: [-1.5, 1.5],
  y: [-1.5, 1.5],
  temp_x: [0,0],
  temp_y: [0,0],
  iteration: 200,
  paint: function(){
    $("#p_m_2")[0].innerHTML = "[" + this.x[0].toPrecision(2) + "," + this.x[1].toPrecision(2) + "]";
    $("#p_m_3")[0].innerHTML = "[" + this.y[0].toPrecision(2) + "," + this.y[1].toPrecision(2) + "]";
    $("#p_m_4")[0].innerHTML = this.iteration;

    var canvas = $("#mandelbrot");
    canvas[0].width  = this.width;
    canvas[0].height = this.height;

    var ctx = canvas[0].getContext('2d');
    ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
    var id = ctx.getImageData(0, 0, this.width, this.height);
    var pixels = id.data;

    var x_resize = (mandelbrot.x[1]-mandelbrot.x[0])/canvas[0].width;
    var y_resize = (mandelbrot.y[1]-mandelbrot.y[0])/canvas[0].height;

    for(i=0; i<=canvas[0].width; i++){
      for(j=0; j<=canvas[0].height; j++){
        point = [i*x_resize+mandelbrot.x[0], -(j*y_resize+mandelbrot.y[0])]
        iterations = is_of_mandelbrot(point, mandelbrot.iteration, mandelbrot.power)
         colour_point(iterations, mandelbrot.iteration, pixels,
          (j*id.width+i)*4)
      }
    }
    ctx.putImageData(id, 0, 0);
  }
}

var colour_point = function(i, iterations, pix, ppos){
  if (i == 0) {
    pix[ppos] = 0;
    pix[ppos + 1] = 0;
    pix[ppos + 2] = 0;
  } else {
    var c = 3 * Math.log(i+1) / Math.log(iterations+1);
    if (c < 1) {
      pix[ppos] = 255 * c;
      pix[ppos + 1] = 0;
      pix[ppos + 2] = 0;
    }
    else if ( c < 2 ) {
      pix[ppos] = 255;
      pix[ppos + 1] = 255 * (c - 1);
      pix[ppos + 2] = 0;
    } else {
      pix[ppos] = 255;
      pix[ppos + 1] = 255;
      pix[ppos + 2] = 255 * (c - 2);
    }
  }
  pix[ppos+3]=255
}

var is_of_mandelbrot = function(c, iteration, p){
  var x = [0,0];
  if(c[0]*c[0]+c[1]*c[1] >= 2){ return 1; }
  for(ii=0; ii<iteration; ii++){
    x = sum(power(x,p), c);
    if(x[0]*x[0]+x[1]*x[1] >= 2){ return ii+1; }
  }
  return 0
}

var power = function(x,n,p=[1,0]){
  if(n == 0){return p}
  else{
    p = [p[0]*x[0]-p[1]*x[1], p[1]*x[0]+p[0]*x[1]]
    return power(x, n-1, p)
  }
}

var sum = function(a,b){
  return [a[0]+b[0], a[1]+b[1]];
}

var rgbToHex = function (rgb) {
  var hex = Number(rgb).toString(16);
  if(hex.length < 2) {hex = "0" + hex;}
  return hex;
};

var fullColorHex = function(r,g,b) {
  var red = rgbToHex(r);
  var green = rgbToHex(g);
  var blue = rgbToHex(b);
  return "#"+red+green+blue;
};
