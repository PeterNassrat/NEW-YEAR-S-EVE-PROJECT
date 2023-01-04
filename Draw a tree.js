function createTree(length, editModelMatrix, rotatingTriangle, allVertices, DrawInfo){
    for(var b = 0; b < 2; b++){
        for(var y = length, x = 0.0; y >= 0.0;x += 0.004){
            var branchSize = length - y;
            if(branchSize > 0.6 * length){
                branchSize = 0.6 * length + 0.15;
            }
            else{
                branchSize = branchSize + 0.15;
            }
            Draw2Branches(x, y, rotatingTriangle, branchSize, editModelMatrix, b, allVertices, DrawInfo);
            if(y >= 0.75 * length)y-=0.06;
            else{
                y-=0.1;
            }
        }
    }
    var from = allVertices.length / 5.0;
    var n = initVertexTreeBuffer(length, allVertices);
    var modelMatrix = new Matrix4();
    modelMatrix.set(editModelMatrix);
    var temp = {
        mode: 'TRIANGLE_STRIP', start: from, count: n,
        transform: modelMatrix,
        animate: false
    };
    DrawInfo.push(temp);
}
function initVertexTreeBuffer(length, allVertices){
    var tColor = [0.5, 0.29, 0.0, 1.0];
    var vertices = [];
    var x = 0.0;
    for(var y = length; y >= 0.0; y-=0.06, x += 0.005){
        vertices.push(x, y, tColor[0], tColor[1], tColor[2], -x, y, tColor[0], tColor[1], tColor[2]);
    }
    var editLength = 0.6 * -length;
    vertices.push(x, editLength, tColor[0], tColor[1], tColor[2], -x, editLength, tColor[0], tColor[1], tColor[2]);
    var n = vertices.length / 5.0;
    for(var i = 0; i < vertices.length; i++)allVertices.push(vertices[i]);
    return n;
}
function Draw2Branches(x, y, rotatingAngle, branchSize, editModelMatrix, b, allVertices, DrawInfo){
    var modelMatrix = new Matrix4();
    modelMatrix.set(editModelMatrix);
    modelMatrix.translate(x, y, 0.0);
    modelMatrix.rotate(-rotatingAngle, 0, 0, 1);
    if(b == 1){
        createBranch(branchSize, modelMatrix, allVertices, DrawInfo);
    }
    else{
        createBranchLeafs(branchSize, modelMatrix, allVertices, DrawInfo);
    }

    modelMatrix.set(editModelMatrix);
    modelMatrix.translate(-x, y, 0.0);
    modelMatrix.rotate(rotatingAngle, 0, 0, 1);
    modelMatrix.scale(-1.0, 1.0, 1.0);
    if(b == 1){
        createBranch(branchSize, modelMatrix, allVertices, DrawInfo);
    }
    else{
        createBranchLeafs(branchSize, modelMatrix, allVertices, DrawInfo);
    }
}