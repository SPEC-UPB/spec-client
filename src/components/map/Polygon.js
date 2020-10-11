const AMB = require('./Metropolitana.border.geo.json')

class Point{
    constructor(x,y){
        this.x = x
        this.y = y
    }
}

 class Polygon {

    constructor(points){
        if(points.length >0)
            this.points = points
        else{
            this.start()
        }
    }

    isLeft(P0,P1,P2){
        return ( (P1.x - P0.x) * (P2.y - P0.y)
            - (P2.x -  P0.x) * (P1.y - P0.y) );
    }

    inPolygon(P){
        var wn = 0;
        const n = this.points.length;
        for (var i=0; i<n; i++) {   // edge from points[i] to  points[i+1]
            var j = i+1;
            if (j>=n)
                j = 0;
            if (this.points[i].y <= P.y) {          // start y <= P.y
                if (this.points[j].y  > P.y)      // an upward crossing
                    if (this.isLeft( this.points[i], this.points[j], P) > 0)  // P left of  edge
                        ++wn;            // have  a valid up intersect
            }
            else {                        // start y > P.y (no test needed)
                if (this.points[j].y  <= P.y)     // a downward crossing
                    if (this.isLeft( this.points[i], this.points[j], P) < 0)  // P right of  edge
                        --wn;            // have  a valid down intersect
            }
        }
        return wn;
    }

    start(){
        this.points = []
        const coord = AMB.geometries[0].coordinates[0]
        coord.forEach(element => {
            this.points.push(new Point(element[0], element[1]))
        });
    }
}


const polygon =  new Polygon([])
export {
    polygon,
    Point
};