var canvas = document.querySelector( '#canvas' );
var context = canvas.getContext( '2d' );
var linePoints = [];

context.strokeStyle = "#000000";
context.lineWidth = 5;
context.lineJoin = "round";
context.lineCap = "round";

canvas.addEventListener( 'mousedown', draw );
window.addEventListener( 'mouseup', stop );

function draw( e ) {
  if ( e.which === 1 ) {
    window.addEventListener( 'mousemove', draw );
    var mouseX = e.pageX - canvas.offsetLeft;
    var mouseY = e.pageY - canvas.offsetTop;
    var mouseDrag = e.type === 'mousemove';
    linePoints.push( { x: mouseX, y: mouseY, drag: mouseDrag } );
    updateCanvas();
  }
}

function stop( e ) {
  if ( e.which === 1 ) {
    window.removeEventListener( 'mousemove', draw );
  }
}

function updateCanvas() {
  context.clearRect( 0, 0, canvas.width, canvas.height );
  renderLine();
}

function renderLine() {
  for ( var i = 0, length = linePoints.length; i < length; i++ ) {
    if ( !linePoints[i].drag ) {
      context.stroke();
      context.beginPath();
      context.moveTo( linePoints[i].x, linePoints[i].y );
      context.lineTo( linePoints[i].x + 0.5, linePoints[i].y + 0.5 );
    } else {
      context.lineTo( linePoints[i].x, linePoints[i].y );
    }
  }
  context.stroke();
}