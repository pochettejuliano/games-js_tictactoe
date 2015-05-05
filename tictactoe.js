var CELL_COUNT_COL_ROW = 3;
var COMBOS = [ 7, 56, 448, 73, 146, 292, 273, 84 ];

var SYMBOL_X = "X";
var SYMBOL_O = "O";

var cellCount = 0;
var clickCount = 0;


function onTileOver () {
  $( this ).css( "background-color", "darkolivegreen" );
}

function onTileOut () {
  $( this ).css( "background-color", "" );
}

function onTileClick () {
  var xSum = 0, oSum = 0;
  var gameEnd = false;

  // display the symbol, disable the click, and update the click count
  $( this ).text( clickCount == 0 || clickCount % 2 == 0 ? SYMBOL_X : SYMBOL_O );
  $( this ).off( "click" ).off( "mouseenter" ).off( "mouseleave" );
  clickCount++;

  // accumulate the binary values
  $( "td" ).each( function () {
    if ( $( this ).text() == SYMBOL_X ) {
      xSum = xSum | parseInt( $( this ).attr( "name" ).split( "_" )[ 1 ] );
    } else if ( $( this ).text() == SYMBOL_O ) {
      oSum = oSum | parseInt( $( this ).attr( "name" ).split( "_" )[ 1 ] );
    }
  } );

  if ( checkForWin( xSum ) ) {
    // check if win for X
    $( "body" ).append( "<h2>X Wins! Reload the page to play again.</h2" );
    gameEnd = true;
  } else if ( checkForWin( oSum ) ) {
    // check if win for O
    $( "body" ).append( "<h2>O Wins! Reload the page to play again.</h2" );
    gameEnd = true;
  } else if ( clickCount == cellCount ) {
    // check if draw
    $( "body" ).append( "<h2>It's a tie! Reload the page to play again.</h2" );
    gameEnd = true;
  }

  // clean up: remove listeners
  if ( gameEnd ) {
    $( "td" ).off( "click" ).off( "mouseenter" ).off( "mouseleave" );
  }
}

function checkForWin ( valueToCheck ) {
  for ( var i = 0; i < COMBOS.length; i++ ) {
    if ( ( valueToCheck & COMBOS[ i ] ) == COMBOS[ i ] ) {
      return true;
    }
  }

  return false;
}

function createBoard () {
  var tableRow, tableData;
  var table = document.createElement( "table" );

  for ( var i = 0; i < CELL_COUNT_COL_ROW; i++ ) {
    tableRow = document.createElement( "tr" );

    for ( var j = 0; j < CELL_COUNT_COL_ROW; j++ ) {
      tableData  = document.createElement( "td" )
      tableData.setAttribute( "name", "tile_" + Math.pow( 2, cellCount++ ) );

      tableRow.appendChild( tableData );
    }

    table.appendChild( tableRow );
  }

  $( "body" ).append( table );
}

// STARTING POINT //
$( document ).ready( function () {
  createBoard();
  $( "td" ).click( onTileClick ).mouseenter( onTileOver ).mouseleave( onTileOut );
} );
