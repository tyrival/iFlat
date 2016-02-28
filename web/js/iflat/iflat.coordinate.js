document.onmousemove = mouseMove;

function mouseMove(ev) {
    var mousePos = mousePosition(ev);
    var x = mousePos.x < 260 ? 0 : mousePos.x - 260;
    var y = mousePos.x < 260 ? 0 : mousePos.y;
    document.getElementById("position").innerHTML = '座标 X: ' + x + '&nbsp&nbspY: ' + y;
}

function mousePosition(evt) {
    var xPos, yPos;
    evt = evt || window.event;
    if(evt.pageX) {
        xPos = evt.pageX;
        yPos = evt.pageY;
    } else {
        xPos = evt.clientX + document.body.scrollLeft - document.body.clientLeft;
        yPos = evt.clientY + document.body.scrollTop - document.body.clientTop;
    }
    return {x:xPos, y:yPos};
}