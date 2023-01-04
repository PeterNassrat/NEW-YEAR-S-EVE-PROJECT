function createACircle(circleSize, editModelMatrix, allVertices, DrawInfo){
    var colors = [[1.0, 0.0, 0.0, 1.0], [1.0, 0.5, 0.0, 1.0], [1.0, 1.0, 0.0, 1.0], [0.0, 1.0, 0.0, 1.0],
    [0.0, 1.0, 1.0, 1.0], [0.0, 0.0, 1.0, 1.0], [0.5, 0.0, 1.0, 1.0]];
    var colorsLength = colors.length, idx = 0;
    var vertices = [];
    var check = 1;
    for(var angle = 0.0;; angle+=51.4, idx++){
        idx %= colorsLength;
        if(angle < 360.0){
            var xy = getVertexCordinates(angle, circleSize);
            if(check == 1){
                check = 0;
            }
            else {
                vertices.push(xy[0], xy[1], colors[idx][0], colors[idx][1], colors[idx][2]);
                var from = allVertices.length / 5.0;
                var n = 3;
                var modelMatrix = new Matrix4();
                modelMatrix.set(editModelMatrix);
                for(var i = 0; i < vertices.length; i++)allVertices.push(vertices[i]);
                vertices = [];
                var temp = {
                    mode: 'TRINAGLES', start: from, count: n,
                    transform: modelMatrix,
                    animate: true
                };
                DrawInfo.push(temp);
            }
            vertices.push(0.0, 0.0, colors[idx][0], colors[idx][1], colors[idx][2]);
            vertices.push(xy[0], xy[1], colors[idx][0], colors[idx][1], colors[idx][2]);
        }
        else{
            var xy = getVertexCordinates(360.0, circleSize);
            vertices.push(xy[0], xy[1], colors[idx][0], colors[idx][1], colors[idx][2]);
            var from = allVertices.length / 5.0;
            var n = 3;
            var modelMatrix = new Matrix4();
            modelMatrix.set(editModelMatrix);
            for(var i = 0; i < vertices.length; i++)allVertices.push(vertices[i]);
            vertices = [];
            var temp = {
                mode: 'TRINAGLES', start: from, count: n,
                transform: modelMatrix,
                animate: true
            };
            DrawInfo.push(temp);
            break;
        }
    }
}
function getVertexCordinates(angle, r){
    var xy = [];
    var radian = Math.PI * angle / 180.0;
    var cosB = Math.cos(radian), sinB = Math.sin(radian);
    xy.push(r * cosB);
    xy.push(r * sinB);
    return xy;
}