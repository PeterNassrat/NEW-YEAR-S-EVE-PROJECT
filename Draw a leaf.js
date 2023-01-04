function createLeaf(leafSize, degrees, editModelMatrix, leafColor, allVertices, DrawInfo){
    var from = allVertices.length / 5.0;
    var n = initLeafVertexBuffer(leafSize, degrees, allVertices, leafColor);
    var modelMatrix = new Matrix4();
    modelMatrix.set(editModelMatrix);
    modelMatrix.rotate(-90, 0, 0, 1);
    modelMatrix.translate(-leafSize, 0.0, 0.0);
    var temp = {
        mode: "TRINAGLE_STRIP", start : from, count : n,
        transform: modelMatrix,
        animate: false
    };
    DrawInfo.push(temp);
}
function initLeafVertexBuffer(leafSize, degrees, allVertices, leafColor){
    var lColor = leafColor;
    var vertices = [];
    var subValue;
    if(leafSize >= 0.0 && leafSize <= 0.5)subValue = leafSize * 0.05;
    else if(leafSize > 0.5 && leafSize <= 0.8)subValue = leafSize * 0.03;
    else if(leafSize > 0.8 && leafSize <= 0.95)subValue = leafSize * 0.02;
    else subValue = leafSize * 0.01;
    var sumValue = subValue / (0.8 * degrees);
    for(var angle = 0.0, x = sumValue; angle <= degrees; angle++){
        var vertex1 = getVertexCordinates(angle, leafSize), vertex2;
        if(angle <= 0.5 * degrees){
            vertex2 = getVertexCordinates(angle, leafSize - subValue);
        }
        else{
            vertex2 = getVertexCordinates(angle, leafSize - subValue + x);
            x += sumValue;
        }
        vertices.push(vertex1[0], vertex1[1], lColor[0], lColor[1], lColor[2]);
        vertices.push(vertex2[0], vertex2[1], lColor[0], lColor[1], lColor[2]);
    }
    var n = vertices.length / 5.0;
    for(var i = 0; i < vertices.length; i++){
        allVertices.push(vertices[i]);
    }
    return n;
}