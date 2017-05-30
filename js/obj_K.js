//obj K

var K = function (image,x,y,hp,spd,boom,st){
    this.img = image[0];
    this.x = x;
    this.y = y;
    this.hp = hp;
    this.spd = spd;
    this.boom = boom;
    this.st=st;
};

K.prototype.draw = function (ctx) {
    ctx.drawImage(this.img, this.x-32, this.y-32, 32 ,32);
};

K.prototype.move = function (ctx) {
    this.y += (38 in keysDown)*(-this.spd)+(40 in keysDown)*this.spd;
    this.x += (37 in keysDown)*(-this.spd)+(39 in keysDown)*this.spd;
    if(this.y<=48)this.y=48;
    if(this.y>=CBH-32)this.y=CBH-32;
    if(this.x<=60)this.x=60;
    if(this.x>=CBW-20)this.x=CBW-20;
    this.draw(ctx);
};

K.prototype.setB = function (B) {
    for(i=0;i<B.length;i++){
        if(B[i].hp<=0){
            B[i].x = this.x;
            B[i].y = this.y;
            B[i].hp = 100;
            break;
        }
    }
};

K.prototype.stCheck = function(){
    for(i=0;i<this.st.length;i++){
        if(this.st[i]>0)
            this.st[i]-=1;
        else
            this.st[i]=0;
    }
}
