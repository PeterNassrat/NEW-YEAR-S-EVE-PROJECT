var VSHADER_SOURCE =`
attribute vec4 a_Position;
attribute vec4 a_Color;
uniform mat4 u_modelMatrix;
varying vec4 v_Color;
void main(){
    gl_Position = u_modelMatrix * a_Position;
    v_Color = a_Color;
}
`
var FSHADER_SOURCE =`
precision mediump float;
varying vec4 v_Color;
void main(){
    gl_FragColor = v_Color;
}
`
var ANGLE_STEP = 45.0;
var allVertices = [], DrawInfo = [];
function main(){
    var canvas = document.getElementById('drawingArea');
    var gl = canvas.getContext('webgl');
    initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE);
    draw();
    initVertexBuffer(gl);
    var currentAngle1 = 0.0;
    var currentAngle2 = 0.0;
    var dis1 = 0.0;
    var dis2 = 0.0;
    var tick = function() {
        var angles = [currentAngle1, currentAngle2];
        var angles = animate(angles);
        dis1 = animate2(dis1);
        dis2 = animate3(dis2);
        currentAngle1 = angles[0];
        currentAngle2 = angles[1];
        clearFrame(gl, currentAngle1, currentAngle2, dis1, dis2);
        requestAnimationFrame(tick, canvas);
      };
    tick();
}
function draw(){
    var editModelMatrix = new Matrix4();
    editModelMatrix.scale(0.5, 1.0, 1.0);
    //Background
    editModelMatrix.setIdentity();
    createBackground(editModelMatrix, allVertices, DrawInfo);

    //Center Tree
    editModelMatrix.setScale(0.5, 1.0, 1.0);
    createTree(0.75, editModelMatrix, 50.0, allVertices, DrawInfo);

    //Right Tree
    editModelMatrix.setTranslate(0.7, -0.1, 0.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    createTree(0.25, editModelMatrix, 55.0, allVertices, DrawInfo);

    //Left Tree
    editModelMatrix.setTranslate(-0.7, -0.1, 0.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    createTree(0.25, editModelMatrix, 55.0, allVertices, DrawInfo);

    //Center Tree Star
    editModelMatrix.setTranslate(0.0, 0.75, 1.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    createAStar(0.15, editModelMatrix, allVertices, DrawInfo);

    //Right Tree Star
    editModelMatrix.setTranslate(0.7, 0.168, 0.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    createAStar(0.13, editModelMatrix, allVertices, DrawInfo);

    //Left Tree Star
    editModelMatrix.setTranslate(-0.7, 0.168, 0.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    createAStar(0.13, editModelMatrix, allVertices, DrawInfo);

    //Center Tree Decoration
    drawDecorationCTree();

    //Right Tree Decoration
    drawDecorationRLTree(1);

    //Left Tree Decoration
    drawDecorationRLTree(-1);
    for(var j = 0.0, cnt = 0; j <= 2.1; j+=0.1){
        for(var i = 0; i < 5; i++){
            editModelMatrix.setIdentity();
            var size = Math.random() * 0.05;
            var x;
            if(i % 2 == 0){
                x = Math.random();
            }
            else{
                x = -Math.random();
            }
            editModelMatrix.translate(x, 1.1 + j, 0.0);
            createSnow(cnt++, 1, size, editModelMatrix, allVertices, DrawInfo);
        }
    }
    for(var j = 0.0, cnt = 0; j <= 2.1; j+=0.1){
        for(var i = 0; i < 5; i++){
            editModelMatrix.setIdentity();
            var size = Math.random() * 0.05;
            var x;
            if(i % 2 == 0){
                x = Math.random();
            }
            else{
                x = -Math.random();
            }
            editModelMatrix.translate(x, 3.2 + j, 0.0);
            createSnow(cnt++, 2, size, editModelMatrix, allVertices, DrawInfo);
        }
    }
}
function drawDecorationCTree(){
    var modelMatrix = new Matrix4();
    for(var y = 0.6, x = -0.05; y >= -0.2; y-=0.1, x-=0.03){
        for(var i = x, cnt = 0; i <= -1*x; i+=0.05, cnt++){
            if(i >= 0.05 || i <= -0.05){
                if(cnt % 2 != 0){
                    modelMatrix.setTranslate(i, y, 0.0);
                    modelMatrix.scale(0.5, 1.0, 1.0);
                    createAStar(0.05, modelMatrix, allVertices, DrawInfo);
                }
                else{
                    modelMatrix.setTranslate(i, y, 0.0);
                    modelMatrix.scale(0.5, 1.0, 1.0);
                    createACircle(0.035, modelMatrix, allVertices, DrawInfo);
                }
            }
        }
    }
}
function drawDecorationRLTree(side){
    var editModelMatrix = new Matrix4();
    editModelMatrix.setTranslate(0.74 * side, 0.03, 0.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    createAStar(0.04, editModelMatrix, allVertices, DrawInfo);
     editModelMatrix.setTranslate(0.66 * side, 0.03, 0.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    createACircle(0.03, editModelMatrix, allVertices, DrawInfo);
     editModelMatrix.setTranslate(0.76 * side, -0.1, 0.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    createACircle(0.03, editModelMatrix, allVertices, DrawInfo);
     editModelMatrix.setTranslate(0.64 * side, 0.-0.1, 0.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    createAStar(0.04, editModelMatrix, allVertices, DrawInfo);
     editModelMatrix.setTranslate(0.62 * side, 0.-0.2, 0.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    createACircle(0.03, editModelMatrix, allVertices, DrawInfo);
     editModelMatrix.setTranslate(0.78 * side, 0.-0.2, 0.0);
    editModelMatrix.scale(0.5, 1.0, 1.0);
    createAStar(0.04, editModelMatrix, allVertices, DrawInfo);
}
var g_last = Date.now();
function animate(angle) {
  // Calculate the elapsed time
  var now = Date.now();
  var elapsed = now - g_last;
  g_last = now;
  // Update the current rotation angle (adjusted by the elapsed time)
  var newAngle = [];
  newAngle.push((angle[0] + (ANGLE_STEP * elapsed) / 1000.0) % 360);
  newAngle.push((angle[1] + (ANGLE_STEP * 0.3 * elapsed) / 1000.0) % 360);
  return newAngle;
}
function initVertexBuffer(gl){
    var verticesBuffer = new Float32Array(allVertices);
    var FSIZE = verticesBuffer.BYTES_PER_ELEMENT;
    var vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, verticesBuffer, gl.STATIC_DRAW);
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, FSIZE * 5, 0);
    gl.enableVertexAttribArray(a_Position);
    var a_Color = gl.getAttribLocation(gl.program, 'a_Color');
    gl.vertexAttribPointer(a_Color, 3, gl.FLOAT, false, FSIZE * 5, FSIZE * 2);
    gl.enableVertexAttribArray(a_Color);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    allVertices = [];
}
function clearFrame(gl, currentAngle1, currentAngle2, dis1, dis2){
    var u_modelMatrix = gl.getUniformLocation(gl.program, 'u_modelMatrix');
    var modelMatrix = new Matrix4();
    var cnt = 1;
    for(var i = 0; i < DrawInfo.length; i++){
        modelMatrix.set(DrawInfo[i].transform);
        if(DrawInfo[i].animate == true){
            if(cnt <= 3 * 8){
                modelMatrix.rotate(currentAngle1, 0, 0, 1);
                cnt++;
            }
            else{
                modelMatrix.rotate(currentAngle2, 0, 0, 1);
            }
        }
        else if(DrawInfo[i].animate == 'TRANSLATE'){
            var kind = DrawInfo[i].id % 3;
            if(kind == 2)kind = -1;
            if(DrawInfo[i].th == 1){
                modelMatrix.translate(dis1 * 0.3 * kind, -dis1, 0.0);
            }
            else{
                modelMatrix.translate(dis2 * 0.3 * kind, -dis2, 0.0);
            }
            modelMatrix.scale(DrawInfo[i].sz, DrawInfo[i].sz, 1.0);
            modelMatrix.scale(0.5, 1.0, 1.0);
            modelMatrix.rotate(currentAngle2, 0, 0, 1);
        }
        gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements);
        if(DrawInfo[i].mode == 'TRIANGLES'){
            gl.drawArrays(gl.TRIANGLES, DrawInfo[i].start, DrawInfo[i].count);
        }
        else{
            gl.drawArrays(gl.TRIANGLE_STRIP, DrawInfo[i].start, DrawInfo[i].count);
        }
    }
}
var DIS_SEC = 0.0001;
var g_last2 = Date.now();
function animate2(dis){
    var now = Date.now();
    var elapsed = now - g_last2;
    g_last2 = now;
    var currentDis = dis + DIS_SEC * elapsed;
    if(currentDis > 4.2)return 0.0;
    else return currentDis;
}
var g_last3 = Date.now();
function animate3(dis){
    var now = Date.now();
    var elapsed = now - g_last3;
    g_last3 = now;
    var currentDis = dis + DIS_SEC * elapsed;
    if(currentDis > 6.2){
        return 2.0;
    }
    else return currentDis;
}