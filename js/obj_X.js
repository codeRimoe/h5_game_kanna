var X = function (image,hp,st){
    this.img = image;
    this.hp = hp;
    this.st=st;
};

X.prototype.draw = function (i,ctx) {
    ctx.drawImage(this.img[i], CBW/2-32, CBH/2-32, 32 ,32);
};

X.prototype.check = function(K,baka_pool){
    for(i = 0; i<baka_pool.length;i++)
        if((touch(K,baka_pool[i]))&&(K.st[0]==0)){
            switch(baka_pool[i].type){
                case 0:if(K.st[1]==0)K.st[1]=5;break;
                case 1:if(K.st[2]==0)K.st[2]=4;break;
                case 2:if(K.st[3]==0)K.st[3]=2;break;
                case 3:K.hp-=1;K.st[0]=3;break;
            }
            baka_pool[i].hp=0;
            K.kill--;
        }
}
