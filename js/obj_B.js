//obj B
var B = function (image,x,y,hp,st){
    this.img = image[0];
    this.x = x;
    this.y = y;
    this.hp = hp;
    this.st=st;
};

B.prototype.draw = function (ctx) {
    ctx.drawImage(this.img, this.x-32, this.y-32, 32 ,32);
};

B.prototype.explode = function (ctx) {
    if(this.hp<=0){
        this.x = -233;
        this.y = -233;
    }
    else if(this.hp>0){
        this.hp--;
    }
    this.draw(ctx);
};

boomCheck = function(K,boom_pool,baka_pool,ctx){
    for(i = 0; i < K.boom;i++){
        boom_pool[i].explode(mainctx);
        for(j = 0; j < baka_pool.length;j++){
            if(touch(boom_pool[i],baka_pool[j])){
                boom_pool[i].hp=0;
                baka_pool[j].hp-=1;
            }
        }
    }
}
