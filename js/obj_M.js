//obj M

var M = function (image,x,y,hp,spd,type){
    this.img = image[type];
    this.x = x;
    this.y = y;
    this.type = type;
    this.hp = hp;
    this.spd = spd;
};

M.prototype.draw = function (ctx) {
    ctx.drawImage(this.img, this.x-32, this.y-32, 32 ,32);
};

M.prototype.move = function (K,ctx) {
    if(this.hp>0){
        var dis_mid = (this.x-400)^2+(this.y-225)^2;
        var dis_K = (this.x-K.x)^2+(this.y-K.y)^2;
        var xx=400,yy=225;
        //if(dis_mid<dis_K){
            xx=K.x;
            yy=K.y;
        //}
        var dt=Math.atan(Math.abs(xx-this.x)/Math.abs(yy-this.y));
        var dir = -1;
        if((xx>=this.x)&&(yy>this.y))dir = 0;
        if((xx<=this.x)&&(yy>this.y))dir = 1;
        if((xx<this.x)&&(yy<=this.y))dir = 2;
        if((xx>this.x)&&(yy<=this.y))dir = 3;

        var theta = Math.PI/2*dir+dt+Math.random()*Math.PI/10;
        this.x += Math.cos(theta)*this.spd;
        this.y += Math.sin(theta)*this.spd;
        if(this.y<=40)this.y=40;
        if(this.y>=CBH-24)this.y=CBH-24;
        if(this.x<=58)this.x=58;
        if(this.x>=CBW-12)this.x=CBW-12;
    }
    else if(this.hp<=0){
        if((this.x>=0)||(this.y>0)){
            this.x = -2333;
            this.y = -2333;
        }
    }
    this.draw(ctx);
};

addM = function(baka_pool,image,hp,spd,type){
    var side = Math.ceil((Math.random()*4));
    var birthX = (side%2)*Math.random()*CBW+(side==4)*CBW;
    var birthY = (!(side%2))*Math.random()*CBH+(side==3)*CBH;
    var i = 0;
    for(;i < baka_pool.length;i++)
        if (baka_pool[i].hp<=0){
            baka_pool[i].hp=10;
            baka_pool[i].x=birthX;
            baka_pool[i].y=birthY;
            baka_pool[i].spd=spd;
            baka_pool[i].type=type;
            break;
        }
    if(i>=baka_pool.length)
        baka_pool.push(new M(image,birthX,birthY,hp,spd,type));
    return 1;
}

moveM = function(K,ctx){
    for(i=0;i<baka_pool.length;i++)
        baka_pool[i].move(K,ctx);
}

bakaCheck = function(K,baka_pool){
    for(i = 0; i<baka_pool.length;i++)
        if((touch(K,baka_pool[i]))&&(K.st[0]==0)){
            K.hp-=1;
            K.st[0]=3;
        }
}
