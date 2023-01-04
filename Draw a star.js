function createAStar(starSize, editModelMatrix, allVertices, DrawInfo){
    var from;
    var n = 3;
    var vertices = [
    [0.0, 0.0, 1.0, 1.0, 0.0, starSize, 0.0, 1.0, 1.0, 0.0, starSize / 4.0, starSize / 4.0, 1.0, 1.0, 0.0],
    [0.0, 0.0, 0.8, 0.8, 0.0, starSize / 4.0, starSize / 4.0, 0.8, 0.8, 0.0, 0.0, starSize, 0.8, 0.8, 0.0],
    [0.0, 0.0, 1.0, 1.0, 0.0, 0.0, starSize, 1.0, 1.0, 0.0, -starSize / 4.0, starSize / 4.0, 1.0, 1.0, 0.0],
    [0.0, 0.0, 0.8, 0.8, 0.0, -starSize / 4.0, starSize / 4.0, 0.8, 0.8, 0.0, -starSize, 0.0, 0.8, 0.8, 0.0],
    [0.0, 0.0, 1.0, 1.0, 0.0, -starSize, 0.0, 1.0, 1.0, 0.0, -starSize / 4.0, -starSize / 4.0, 1.0, 1.0, 0.0],
    [0.0, 0.0, 0.8, 0.8, 0.0, -starSize / 4.0, -starSize / 4.0, 0.8, 0.8, 0.0, 0.0, -starSize, 0.8, 0.8, 0.0],
    [0.0, 0.0, 1.0, 1.0, 0.0, 0.0, -starSize, 1.0, 1.0, 0.0, starSize / 4.0, -starSize / 4.0, 1.0, 1.0, 0.0],
    [0.0, 0.0, 0.8, 0.8, 0.0, starSize / 4.0, -starSize / 4.0, 0.8, 0.8, 0.0, starSize, 0.0, 0.8, 0.8, 0.0]
    ];
    for(var i = 0; i < vertices.length; i++){
        from = allVertices.length / 5.0;
        var modelMatrix = new Matrix4();
        modelMatrix.set(editModelMatrix);
        for(var j = 0; j < vertices[i].length; j++)allVertices.push(vertices[i][j]);
        var temp = {
            mode: 'TRIANGLES', start: from, count: n,
            transform: modelMatrix,
            animate: true
        };
        DrawInfo.push(temp);
    }
}