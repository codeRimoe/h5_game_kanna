var kanna = new K(kimg,CBW/2,CBH/2,inithp,initspd,initboom,[0,0,0,0,0],0);
var baka_pool = [];
var boom_pool = [];
for(i = 0; i < kanna.boom;i++)
    boom_pool.push(new B(bing,-233,-233,0,0));
sbgmain[0].onload = function main(){
    mainctx.drawImage(sbgmain[0], 0, 0);
    refTimer = setInterval(function () {
        if (ppp&&los&&mmm){
            mainctx.clearRect(0, 0, 1200, 675);
            mainctx.drawImage(bg, 0, 0);
            moveM(kanna,mainctx);
            boomCheck(kanna,boom_pool,baka_pool,mainctx);
            bakaCheck(kanna,baka_pool);
            kanna.move(mainctx);
            if((32 in keysDown)&&(boomper--==1))
                kanna.setB(boom_pool);

            statectx.clearRect(0, 0, 1200, 100);
            statectx.drawImage(stbg, 0, 0);
            for (var i = 0; i < kanna.hp; i++)
            statectx.drawImage(kimg[0], 88+i*41, 13, 32 ,32);
            statectx.fillText(kanna.kill , 600, 51);
            for (var i = 0; i < kanna.st.length; i++)
                statectx.fillText(kanna.st[i] , 690+30*i, 51);
            if(kanna.hp<=0)lose(mainctx,statectx);
        }
    }, reftime );
    
    bakaTimer = setInterval(function () {
        if (ppp&&los&&mmm)
            addM(baka_pool,ming,inithp_M,initspd_M);
    }, bakacd );
    
    boomSlowTimer = setInterval(function () {
        boomper=1;
    }, boomcd );
    
    stateTimer = setInterval(function () {
        ttt++;
        if (ppp&&los&&mmm)
            kanna.stCheck();
        else if(!ppp){
            statectx.clearRect(0, 0, 1200, 100);
            statectx.drawImage(pbg[ttt%2], 0, 0);
        }
        else if(!mmm){
            statectx.clearRect(0, 0, 1200, 100);
            statectx.drawImage(sbgst[ttt%2], 0, 0);
        }
    }, 1000 );
    
}
