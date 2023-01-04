var time = new Date();
time = time.getHours();
function createBackground(editModelMatrix, allVertices, DrawInfo) {
  var from = allVertices.length / 5.0;
  var colors = [
    [
      0.02, 0.03, 0.4,
      0.02, 0.03, 0.4,
      0.2, 0.3, 1.0,
      0.2, 0.3, 1.0,
      0.02, 1.0, 0.02,
      0.02, 0.69, 0.02,
      0.02, 0.39, 0.02,
      0.02, 0.39, 0.02
    ],
    [
      0.85, 0.95, 1.0,
      0.85, 0.95, 1.0,
      1.0, 1.0, 1.0,
      1.0, 1.0, 1.0,
      0.1, 1.0, 0.1,
      0.0, 1.0, 0.8,
      0.2, 0.9, 0.2,
      0.2, 0.9, 0.2
    ]
  ];
  var cIdx = 0;
  if(time >= 18 || time <= 5)cIdx = 0;
  else{
    cIdx = 1;
  }
  var color = colors[cIdx];
  var n = initVertexBuffers(allVertices, color);
  var modelMatrix = new Matrix4();
  modelMatrix.set(editModelMatrix);
  var temp = {
    mod: 'TRIANGLE_STRIP', start: from, count: n,
    transform: modelMatrix,
    animate: false
  }
  DrawInfo.push(temp);
  from = allVertices.length / 5.0;
  n = initVertexBuffers2(allVertices, color);
  temp = {
    mod: 'TRIANGLE_STRIP', start: from, count: n,
    transform: modelMatrix,
    animate: false
  }
  DrawInfo.push(temp);
}
function initVertexBuffers(allVertices, color) {
  var vertices = [
  -1.0, 1.0, color[0], color[1], color[2],
   1.0, 1.0, color[3], color[4], color[5],
  -1.0, -0.25, color[6], color[7], color[8],
   1.0, -0.25, color[9], color[10], color[11]];
  var n = vertices.length / 5.0;
  for(var i = 0; i < vertices.length; i++){
    allVertices.push(vertices[i]);
  }
  return n;
}
function initVertexBuffers2(allVertices, color){
  var vertices = [
    -1.0, -0.25, color[12], color[13], color[14],
     1.0, -0.25, color[15], color[16], color[17],
    -1.0, -1.0, color[18], color[19], color[20],
     1.0, -1.0, color[21], color[22], color[23],
  ];
  var n = vertices.length / 5.0;
  for(var i = 0; i < vertices.length; i++){
    allVertices.push(vertices[i]);
  }
  return n;
}