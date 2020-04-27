var mandelbrot = {
  width: 400,
  height: 400,
  power: 2,
  x: [-2, 2],
  y: [-2, 2],
  temp_coordinate: [0,0],
  iteration: 200,
  paint: function(){
    $("#loading_m")[0].innerHTML = "Loading...";
    setTimeout(function() {
      $("#p_m_2")[0].innerHTML = "[" + mandelbrot.x[0] + "," + mandelbrot.x[1] + "]";
      $("#p_m_3")[0].innerHTML = "[" + mandelbrot.y[0] + "," + mandelbrot.y[1] + "]";
      $("#p_m_4")[0].innerHTML = mandelbrot.iteration;

      var canvas = $("#mandelbrot");
      canvas[0].width  = mandelbrot.width;
      canvas[0].height = mandelbrot.height;

      var ctx = canvas[0].getContext('2d');
      ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
      var id = ctx.getImageData(0, 0, mandelbrot.width, mandelbrot.height);
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
      $("#loading_m")[0].innerHTML = "";
    }, 0);
  },
  reset: function(){
    mandelbrot.x = [-2, 2];
  	mandelbrot.y = [-2, 2];
  	mandelbrot.iteration = 200;
  	mandelbrot.paint();
  },
  move: function(keyCode){
    let distance = mandelbrot.x[1] - mandelbrot.x[0]
    switch(keyCode) {
      case 87: //up
        mandelbrot.y[0] -= distance/2;
        mandelbrot.y[1] -= distance/2;
        break;
      case 65: //left
        mandelbrot.x[0] -= distance/2;
        mandelbrot.x[1] -= distance/2;
        break;
      case 83: //down
        mandelbrot.y[0] += distance/2;
        mandelbrot.y[1] += distance/2;
        break;
      case 68: //right
        mandelbrot.x[0] += distance/2;
        mandelbrot.x[1] += distance/2;
        break;
      default:
        break;
    }
    mandelbrot.paint();
  }
}

var colour_point = function(i, iterations, pix, ppos){
  if (i == 0) {
    pix[ppos] = 255;
    pix[ppos + 1] = 255;
    pix[ppos + 2] = 200;
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
  if(c[0]*c[0]+c[1]*c[1] >= 4){ return 1; }
  for(ii=0; ii<iteration; ii++){
    x = sum(power(x,p), c);
    if(x[0]*x[0]+x[1]*x[1] >= 4){ return ii+1; }
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
