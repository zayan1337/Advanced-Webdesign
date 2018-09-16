var canvas = document.querySelector( '#canvas' );
var context = canvas.getContext( '2d' );
var linePoints = [];
var toolMode = 'draw'
var toolSize = 5;
var canvasState = [];
var undoButton = document.querySelector( '[data-action=undo]' );
var deleteButton = document.querySelector('[data-action=delete]');
var mouse = {x:0, y:0};
var imageSelected = false;






context.strokeStyle = "#000000";
context.lineWidth = 5;
context.lineJoin = "round";
context.lineCap = "round";

canvas.addEventListener( 'mousedown', draw);
window.addEventListener( 'mouseup', stop );
document.querySelector( '#tools' ).addEventListener( 'click', selectTool );



function draw( e ) {
  if ( e.which === 1 ) {
    
    window.addEventListener( 'mousemove', draw );
    mouse.x = e.pageX - canvas.offsetLeft;
    mouse.y = e.pageY - canvas.offsetTop;
    var mouseDrag = e.type === 'mousemove';
    if (e.type === 'mousedown') saveState();
    
    linePoints.push( { x: mouse.x, y: mouse.y, drag: mouseDrag, width: toolSize} );
    updateCanvas();
  }
}
function selectImage(image){
  
  img = image;
  context.drawImage(img,50,50);
  
}



function saveState(){
  undoButton.classList.remove( 'disabled' );

  canvasState.unshift(context.getImageData( 0, 0, canvas.width, canvas.height));
  console.log(canvasState[0]);
  if ( canvasState.length > 25 ) canvasState.length = 25;
  linePoints = [];
}

function stop( e ) {
  if ( e.which === 1 ) {
    window.removeEventListener( 'mousemove', draw );
  }
}


function updateCanvas() {
  context.clearRect( 0, 0, canvas.width, canvas.height );
  context.putImageData( canvasState[0] , 0, 0);
  renderLine();
}

function renderLine() {
  for ( var i = 0, length = linePoints.length; i < length; i++ ) {
    if ( !linePoints[i].drag ) {
      //context.stroke();
      context.beginPath();
      context.lineWidth = linePoints[i].width;
      context.moveTo( linePoints[i].x, linePoints[i].y );
      context.lineTo( linePoints[i].x + 0.5, linePoints[i].y + 0.5 );
    } else {
      context.lineTo( linePoints[i].x, linePoints[i].y );
    }
  }
  if (toolMode === 'erase' ){
    context.globalCompositeOperation = 'destination-out';
  } else {
    context.globalCompositeOperation = 'source-over';
  }
  context.stroke();
}



function selectTool( e ) {
  
  if ( e.target === deleteButton) clearCanvas();
  if ( e.target === undoButton ) undoState();
  if ( e.target === e.currentTarget ) return;
  if ( !e.target.dataset.action ) highlightButton( e.target );
  toolSize = e.target.dataset.size || toolSize;
  toolMode = e.target.dataset.mode || toolMode;
  
  console.log( e );
 }

function clearCanvas(){
  context.clearRect(0,0,canvas.width, canvas.height);
  canvasState = [];
  undoButton.classList.add( 'disabled' );

}

 function undoState() {
  context.putImageData( canvasState.shift(), 0, 0 );
  if ( !canvasState.length ) undoButton.classList.add( 'disabled' );

}


 function highlightButton( button ) {
  var buttons = button.parentNode.querySelectorAll( 'img' );
  buttons.forEach( function( element ){ element.classList.remove('active') } );
  button.classList.add( 'active' );
 }


 

