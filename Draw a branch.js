function createBranch(branchSize, editModelMatrix, allVertices, DrawInfo){
    var from = allVertices.length / 5.0;
    var n = initRootVertexBuffer(branchSize, allVertices);
    var modelMatrix = new Matrix4();
    modelMatrix.set(editModelMatrix);
    modelMatrix.rotate(-90, 0, 0, 1);
    modelMatrix.translate(-branchSize, 0.0, 0.0);
    var temp = {
        mode: 'TRIANGLE_STRIP', start: from, count: n,
        transform: modelMatrix,
        animate: false
    };
    DrawInfo.push(temp);
}
function createBranchLeafs(branchSize, editModelMatrix, allVertices, DrawInfo){
    var modelMatrix = new Matrix4();
    modelMatrix.set(editModelMatrix);
    modelMatrix.rotate(-90, 0, 0, 1);
    modelMatrix.translate(-branchSize, 0.0, 0.0);
    var idx = 1;
    var leafColors = [[0.0, 0.85, 0.0, 1.0], [0.0, 0.65, 0.0, 1.0]];
    for(var angle = 3.0; angle <= 70; angle+=1.0){
        var leafDegrees = (70 - angle) * 1 / 3;
        var xy = getVertexCordinates(angle, branchSize);
        modelMatrix.set(editModelMatrix);
        modelMatrix.rotate(-90, 0, 0, 1);
        modelMatrix.translate(-branchSize, 0.0, 0.0);
        modelMatrix.translate(xy[0], xy[1], 0.0);
        modelMatrix.rotate(angle, 0, 0, 1);
        createLeaf(branchSize, leafDegrees, modelMatrix, leafColors[idx], allVertices, DrawInfo);
        if(idx == 0)idx=1;
        else idx = 0;
    }
    if(idx == 1)idx = 0;
    var subValue = branchSize * 0.001;
    var sumValue = subValue / 50.0;
    for(var angle = 3.0, x = 1.0 * sumValue; angle <= 70; angle+=1.0){
        var leafDegrees = (70 - angle) * 1 / 3;
        var xy;
        if(angle <= 20){
            xy = getVertexCordinates(angle, branchSize - subValue);
        }
        else{
            xy = getVertexCordinates(angle, branchSize - subValue + x);
            x += 1.0 * sumValue;
        }
        modelMatrix.set(editModelMatrix);
        modelMatrix.rotate(-90, 0, 0, 1);
        modelMatrix.translate(-branchSize, 0.0, 0.0);
        modelMatrix.translate(xy[0], xy[1], 0.0);
        modelMatrix.rotate(angle, 0, 0, 1);
        modelMatrix.scale(-1.0, 1.0, 1.0);
        createLeaf(branchSize, leafDegrees, modelMatrix, leafColors[idx], allVertices, DrawInfo);
        if(idx == 0)idx=1;
        else idx = 0;
    }
}
function initRootVertexBuffer(branchSize, allVertices){
    var bColor = [0.55, 0.29, 0.0, 1.0];
    var vertices = [];
    var subValue = branchSize * 0.02;
    var sumValue = subValue / 50.0;
    for(var angle = 0, x = 10.0 * sumValue; angle <= 70; angle+=10){
        var vertex1 = getVertexCordinates(angle, branchSize), vertex2;
        if(angle <= 20){
            vertex2 = getVertexCordinates(angle, branchSize - subValue);
        }
        else{
            vertex2 = getVertexCordinates(angle, branchSize - subValue + x);
            x += 10.0 * sumValue;
        }
        vertices.push(vertex1[0], vertex1[1], bColor[0], bColor[1], bColor[2]);
        vertices.push(vertex2[0], vertex2[1], bColor[0], bColor[1], bColor[2]);
    }
    var n = vertices.length / 5.0;
    for(var i = 0; i < vertices.length; i++){
        allVertices.push(vertices[i]);
    }
    return n;
}
