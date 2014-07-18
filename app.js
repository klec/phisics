/**
 * Created with PhpStorm.
 * User: klec
 * Date: 16.07.14
 * Time: 23:28
 *
 */

Vector = function(x,y){
    this.x = x||0;
    this.y = y||0;

    this.add = function(v){
        this.x+= v.x*0.8;
        this.y+= v.y*0.8;
    }

    this.diff = function(v){
        return new Vector(this.x - v.x, this.y - v.y);
    }

}

Electron = function(x,y,vx,vy){
    this.mass=-1;
    if(x && y)
        this.cord = new Vector(x, y);
    else
        this.cord = new Vector(Math.random()*500+300, Math.random()*500+200);

    if(vx && vy)
        this.speed = new Vector(vx, vy);
    else
        this.speed = new Vector(Math.random()*1-0.5, Math.random()*1-0.5);
//        this.speed = new Vector(vx, vy);

    this.a = new Vector();
    this.img = "electron.png";
    this.dom = document.createElement("span");
    document.getElementById("table").appendChild(this.dom);
    this.move = function (){
        this.speed.add(this.a);
        this.a = new Vector();
        this.cord.add(this.speed);

        this.dom.style.top = this.cord.y+"px";
        this.dom.style.left = this.cord.x+"px";
    }

    //this.move();

    this.pull = function(e){
        len = this.mass/table.elements.length;
        v1 = this.cord;
        v2 = e.cord;
        diff = v1.diff(v2);
        dist = Math.sqrt(Math.pow(diff.x,2)+Math.pow(diff.y,2));
        alfa = Math.atan(diff.y/diff.x);
        if(diff.y<0) len=-len;
        if(alfa<0) len=-len;

        this.a.add(new Vector(Math.cos(alfa)*len/(Math.pow(dist,1)), Math.sin(alfa)*len/(Math.pow(dist,1))));
//        e.a.add(new Vector(-Math.cos(alfa)*len/(Math.pow(dist,2)), -Math.sin(alfa)*len/(Math.pow(dist,2))));
    }
}

Table = function(id){
    this.dom=document.getElementById(id);
    this.nextFrame = function(){
        for(var i=0; i<table.elements.length; i++){
            for(var j=0; j<table.elements.length; j++){
                table.elements[i].pull(table.elements[j]);
            }
        }
        for(var i=0; i<table.elements.length; i++){
            table.elements[i].move();
            //table.
        }
    }
    this.elements = [];
    setInterval(this.nextFrame, 3);
}

