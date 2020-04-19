var similar = {
  initialpoint: [[0.0,0.0], [1.0,0.0], [1.0,1.0], [0.0,1.0]],
  points: [],
  new_points: [],
  size_square: 200,
  repetition: 10,
  width: 1000,
  height: 1000,
  iteration: [],
  add_iteration: function(x,y,rotation, size){
    rotation = rotation*Math.PI/180.0
    this.iteration.push([[x,y], [Math.cos(rotation), Math.sin(rotation)], size])
  },
  number_point: function(){
    return (1-this.repetition**this.iteration.length)/(1-this.repetition)
  },
  build: function(){
    this.new_points = [];
    this.points = [];
    $.each(this.initialpoint, function(index, ip){
      similar.new_points.push([ip[0]*similar.size_square, ip[1]*similar.size_square])
    });
    this.points = this.points.concat(this.new_points);

    for(i=0; i<this.repetition; i++){
      new_points = [];
      $.each(similar.iteration, function(index, si){
        $.each(similar.new_points, function(index2, po){
          new_points.push([
            si[2] * (si[1][0]*po[0]-si[1][1]*po[1]) + si[0][0],
            si[2] * (si[1][1]*po[0]+si[1][0]*po[1]) + si[0][1]
          ])
        })
      })
      similar.points = similar.points.concat(new_points)
      similar.new_points = new_points
    }
  },
  paint: function(){
    var canvas = $("#similar_canvas");
    var square = [];
    canvas[0].width  = this.width; // in pixels
    canvas[0].height = this.height;
    var half_width = this.width/2;
    var half_height = this.height/2;
    var ctx = canvas[0].getContext('2d');
    ctx.clearRect(0, 0, canvas[0].width, canvas[0].height);
    for(i=0; i<similar.points.length; i += 4){
      ctx.fillStyle = '#f00';
      ctx.beginPath();
      ctx.moveTo(similar.points[i][0]+half_width,
        -similar.points[i][1]+half_height);
      ctx.lineTo(similar.points[i+1][0]+half_width,
        -similar.points[i+1][1]+half_height);
      ctx.lineTo(similar.points[i+2][0]+half_width,
        -similar.points[i+2][1]+half_height);
      ctx.lineTo(similar.points[i+3][0]+half_width,
        -similar.points[i+3][1]+half_height);
      ctx.closePath();
      ctx.stroke();
    }
  }
}
