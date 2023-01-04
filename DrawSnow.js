function createSnow(idx, number, size, editModelMatrix, allVertices, DrawInfo){
    var modelMatrix = new Matrix4();
    modelMatrix.set(editModelMatrix);
    var snowVertices = [];
    for(angle = 0; angle <= 360; angle+=45){
        var xy1 = getVertexCordinates(angle, 0.25);
        var xy2 = getVertexCordinates(angle, 0.1);
        snowVertices.push(xy1[0], xy1[1], 0.78, 0.95, 1.0);
        snowVertices.push(xy2[0], xy2[1], 0.78, 0.95, 1.0);
    }
    var from = allVertices.length / 5.0, n = snowVertices.length / 5.0;
    for(var i = 0; i < snowVertices.length; i++){
        allVertices.push(snowVertices[i]);
    }
    var temp = {
        mod : 'TRIANGLE_STRIP', start : from, count : n,
        transform : modelMatrix,
        animate : 'TRANSLATE',
        sz : size,
        th : number,
        id : idx
    }
    DrawInfo.push(temp);
    var Branch1 = [
        0.23, 0.05,
        0.23, -0.05,
        1.0, 0.05,
        1.0, -0.05
    ]
    var Branch2 = [
        0.4, 0.05,
        0.5, 0.15,
        0.5, 0.05,
        0.6, 0.15
    ]
    var Branch3 = [
        0.65, 0.05,
        0.8, 0.2,
        0.8, 0.05,
        0.95, 0.2,
    ]
    for(var angle = 0.0; angle < 360; angle+=45.0){
        put(Branch1, angle, size, number, idx, modelMatrix, allVertices, DrawInfo);
        put(Branch2, angle, size, number, idx, modelMatrix, allVertices, DrawInfo);
        for(var i = 1; i < Branch2.length; i+=2){
            Branch2[i] *= -1;
        }
        put(Branch2, angle, size, number, idx, modelMatrix, allVertices, DrawInfo);
        put(Branch3, angle, size, number, idx, modelMatrix, allVertices, DrawInfo);
        for(var i = 1; i < Branch2.length; i+=2){
            Branch3[i] *= -1;
        }
        put(Branch3, angle, size, number, idx, modelMatrix, allVertices, DrawInfo);
    }
}
function rotateVerticex(x, y, angle){
    var rotated = [];
    var radian = Math.PI * angle / 180.0;
    rotated.push(x * Math.cos(radian) + y * -1 * Math.sin(radian));
    rotated.push(x * Math.sin(radian) + y * Math.cos(radian));
    return rotated;
}
function put(Branch, angle, size, number, idx, modelMatrix, allVertices, DrawInfo){
    var snowVertices = [];
    for(var i = 0; i < Branch.length; i+=2){
        var xy = rotateVerticex(Branch[i], Branch[i+1], angle);
        snowVertices.push(xy[0], xy[1], 0.78, 0.95, 1.0);
    }
    var from = allVertices.length / 5.0, n = 4;
    for(var i = 0; i < snowVertices.length; i++){
        allVertices.push(snowVertices[i]);
    }
    var temp = {
        mod : 'TRIANGLE_STRIP', start : from, count : n,
        transform : modelMatrix,
        animate : 'TRANSLATE',
        sz : size,
        th : number,
        id : idx
    }
    DrawInfo.push(temp);
}