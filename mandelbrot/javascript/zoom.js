$(window).on("load",function() {
  //VARS===================================================
  var zoom = {
    zoomboxLeft:null, zoomboxTop:null, //zoombox
    cursorStartX:null, cursorStartY:null, //cursor
    canvasStartLeft:null, canvasStartTop:null, //image
    minDragLeft:null,maxDragLeft:null, minDragTop:null,maxDragTop:null
  };

  //RESET IMAGE SIZE=======================================
  $(".reset").on("click",function() {
    mandelbrot.x = [-1.5, 1.5];
    mandelbrot.y = [-1.5, 1.5];
    mandelbrot.iteration = 200;
    mandelbrot.paint();
  }).click();

  //ZOOM&DRAG-EVENTS=======================================
  //MOUSEDOWN----------------------------------------------
  $(".zoombox canvas").mousedown(function(e) {
    e.preventDefault();
    x = getPoint(e);
    console.log("MOUSEDOWN: " + x)
    mandelbrot.temp_x[0] = x[0];
    mandelbrot.temp_y[1] = x[1];
    $(".zoombox canvas").addClass("moving");
    var selector = $(this).next();
    var zoombox = $(this).parent();
    $(zoombox).addClass("active");

    //store zoombox left&top
    zoom.zoomboxLeft = $(zoombox).offset().left + parseInt($(zoombox).css("border-left-width").replace(/\D+/,""));
    zoom.zoomboxTop = $(zoombox).offset().top + parseInt($(zoombox).css("border-top-width").replace(/\D+/,""));

    //store starting positions of cursor (relative to zoombox)
    zoom.cursorStartX = e.pageX - zoom.zoomboxLeft;
    zoom.cursorStartY = e.pageY - zoom.zoomboxTop;

    zoom.minDragLeft = 0;
    zoom.maxDragLeft = $(zoombox).width();
    zoom.minDragTop = 0;
    zoom.maxDragTop = $(zoombox).height();

    $(selector).css({"display":"block", "width":0, "height":0, "left":zoom.cursorStartX, "top":zoom.cursorStartY});
  });

  //MOUSEMOVE----------------------------------------------
  $(document).mousemove(function(e) {
    if ($(".zoombox canvas").hasClass("moving")) {
      //calculate selector width and height (relative to zoombox)
      var width = (e.pageX-zoom.zoomboxLeft)-zoom.cursorStartX;
      var height = (e.pageY-zoom.zoomboxTop)-zoom.cursorStartY;

      //prevent dragging in prohibited areas (relative to zoombox)
      if (e.pageX-zoom.zoomboxLeft <= zoom.minDragLeft) {width = zoom.minDragLeft - zoom.cursorStartX;} else
      if (e.pageX-zoom.zoomboxLeft >= zoom.maxDragLeft) {width = zoom.maxDragLeft - zoom.cursorStartX;}
      if (e.pageY-zoom.zoomboxTop <= zoom.minDragTop) {height = zoom.minDragTop - zoom.cursorStartY;} else
      if (e.pageY-zoom.zoomboxTop >= zoom.maxDragTop) {height = zoom.maxDragTop - zoom.cursorStartY;}

      //update zoom-selector
      var selector = $(".zoombox.active .selector")[0];
      $(selector).css({"width":Math.abs(width), "height":Math.abs(height)});
      if (width<0) {$(selector).css("left",zoom.cursorStartX-Math.abs(width));}
      if (height<0) {$(selector).css("top",zoom.cursorStartY-Math.abs(height));}
    }
  });

  //MOUSEUP------------------------------------------------
  $(document).mouseup(function(e) {
    e.preventDefault();
    var x = getPoint(e);
    if ($(".zoombox canvas").hasClass("moving")) {
      console.log("MOUSEUP: " + x)
      mandelbrot.temp_x[1] = x[0];
      mandelbrot.temp_y[0] = x[1];
      mandelbrot.readapt()
      mandelbrot.y = mandelbrot.temp_y;
    	mandelbrot.iteration *= 1.2;
    	mandelbrot.paint();

      var selector = $(".zoombox.active .selector")[0];
      $(selector).css({"display":"none", "width":0, "height":0, "left":0, "top":0});
      $(".zoombox canvas").removeClass("moving");
      $(".zoombox.active").removeClass("active");
    }
  });
});
