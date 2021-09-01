function createSVG() {
  var svg = document.getElementById("svg-canvas");
  if (null == svg) {
    svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("id", "svg-canvas");
    svg.setAttribute("style", "position:absolute;top:0px;left:0px");
    svg.setAttribute("width", document.body.clientWidth);
    svg.setAttribute("height", document.body.clientHeight);
    svg.setAttributeNS(
      "http://www.w3.org/2000/xmlns/",
      "xmlns:xlink",
      "http://www.w3.org/1999/xlink"
    );
    document.body.appendChild(svg);
  }
  return svg;
}
function drawCircle(x, y, radius, color) {
  var svg = createSVG();
  var shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
  shape.setAttributeNS(null, "cx", x);
  shape.setAttributeNS(null, "cy", y);
  shape.setAttributeNS(null, "r", radius);
  shape.setAttributeNS(null, "fill", "#ffffff00");
  svg.appendChild(shape);
}
function findAbsolutePosition(htmlElement) {
  var x = htmlElement.offsetLeft;
  var y = htmlElement.offsetTop;
  for (var x = 0, y = 0, el = htmlElement; el != null; el = el.offsetParent) {
    x += el.offsetLeft;
    y += el.offsetTop;
  }
  return {
    x: x,
    y: y
  };
}
function connectDivs(leftId, rightId, color, tension) {
  var left = document.getElementById(leftId);
  var right = document.getElementById(rightId);

  var leftPos = findAbsolutePosition(left);
  var x1 = leftPos.x;
  var y1 = leftPos.y;
  x1 += left.offsetWidth;
  y1 += left.offsetHeight / 2;

  var rightPos = findAbsolutePosition(right);
  var x2 = rightPos.x;
  var y2 = rightPos.y;
  y2 += right.offsetHeight / 2;

  var width = x2 - x1;
  var height = y2 - y1;

  drawCircle(x1, y1, 3, color);
  drawCircle(x2, y2, 3, color);
  drawCurvedLine(x1, y1, x2, y2, color, tension);
}
function drawCurvedLine(x1, y1, x2, y2, color, tension) {
    var svg = createSVG();
    var shape = document.createElementNS("http://www.w3.org/2000/svg", 
                                         "path");
    var delta = (x2-x1)*tension;
    var hx1=x1+delta;
    var hy1=y1;
    var hx2=x2-delta;
    var hy2=y2;
    var path = "M "  + x1 + " " + y1 + 
               " C " + hx1 + " " + hy1 
                     + " "  + hx2 + " " + hy2 
               + " " + x2 + " " + y2;
    shape.setAttributeNS(null, "d", path);
    shape.setAttributeNS(null, "fill", "none");
    shape.setAttributeNS(null, "stroke", color);
    shape.setAttributeNS(null, "id", "hello");
    svg.appendChild(shape);
}

connectDivs("js-trips","js-supps","#000000", 0.1);
connectDivs("js-engines","js-supps","#000000", 0.1);