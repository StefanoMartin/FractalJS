var similar = {
  initialpoint: [[0.0,0.0], [1.0,0.0], [1.0,1.0], [0.0,1.0]],
  points: [],
  new_points: [],
  size_square: 200,
  repetition: 10,
  width: 1000,
  height: 1000,
  iteration: [],
  only_last: false,
  colored: true,
  centered: true,
  add_iteration: function(x,y,rotation, size){
    rotation = rotation*Math.PI/180.0
    this.iteration.push([[x,y], [Math.cos(rotation), Math.sin(rotation)], size])
  },
  number_point: function(){
    return (1-this.repetition**this.iteration.length)/(1-this.repetition)
  },
  build: function(){
    var min_x = 0.0;
    var min_y = 0.0;
    var max_x = 1.0;
    var max_y = 1.0;
    this.new_points = [];
    this.points = [];
    var colour = fullColorHex(0, 255, 0);
    $.each(this.initialpoint, function(index, ip){
      point = [
        colour,
        ip[0]*similar.size_square,
        ip[1]*similar.size_square
      ]
      similar.new_points.push(point)
      if(similar.centered){
        if(min_x > point[1]){min_x = point[1];}
        if(min_y > point[2]){min_y = point[2];}
        if(max_x < point[1]){max_x = point[1];}
        if(max_y < point[2]){max_y = point[2];}
      }
    });

    this.points = this.points.concat(this.new_points);

    for(i=0; i<this.repetition; i++){
      colour = fullColorHex(parseInt(255/similar.repetition*(i+1)),
      255-parseInt(255/similar.repetition*(i+1)), 0);
      new_points = [];
      $.each(similar.iteration, function(index, si){
        $.each(similar.new_points, function(index2, po){
          point = [
            colour,
            si[2] * (si[1][0]*po[1]-si[1][1]*po[2]) + si[0][0],
            si[2] * (si[1][1]*po[1]+si[1][0]*po[2]) + si[0][1]
          ]
          new_points.push(point)
          if(similar.centered){
            if(min_x > point[1]){min_x = point[1];}
            if(min_y > point[2]){min_y = point[2];}
            if(max_x < point[1]){max_x = point[1];}
            if(max_y < point[2]){max_y = point[2];}
          }
        })
      })
      similar.points = similar.points.concat(new_points)
      similar.new_points = new_points
    }

    if(similar.only_last){
      similar.points = similar.new_points;
    }

    if(similar.centered){
      similar.width  = max_x - min_x + 20;
      similar.height = max_y - min_y + 20;
      new_points = [];
      $.each(similar.points, function(index, si){
        new_points.push([si[0], si[1]-min_x+10, si[2]-min_y+10]);
      });
      similar.points = new_points;
    }
  },
  paint: function(){
    var canvas = $("#similar_canvas");
    var square = [];
    canvas[0].width  = this.width; // in pixels
    canvas[0].height = this.height;
    if(similar.centered){
      var half_width = 0;
      var half_height = canvas[0].height;
    }else{
      var half_width = this.width/2;
      var half_height = this.height/2;
    }
    var ctx = canvas[0].getContext('2d');
    ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
    for(i=0; i<similar.points.length; i += 4){
      if(similar.colored){
        ctx.strokeStyle = similar.points[i][0];
      }
      ctx.beginPath();
      ctx.moveTo(similar.points[i][1]+half_width,
        -similar.points[i][2]+half_height);
      ctx.lineTo(similar.points[i+1][1]+half_width,
        -similar.points[i+1][2]+half_height);
      ctx.lineTo(similar.points[i+2][1]+half_width,
        -similar.points[i+2][2]+half_height);
      ctx.lineTo(similar.points[i+3][1]+half_width,
        -similar.points[i+3][2]+half_height);
      ctx.closePath();
      ctx.stroke();
    }
  }
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
