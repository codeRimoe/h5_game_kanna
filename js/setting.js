// Call the canvas
var main = document.getElementById("mainCanvas");
var mainctx = main.getContext("2d");
var state = document.getElementById("stateCanvas");
var statectx = state.getContext("2d");

var CBH=600,CBW=1080
var ttt=0,ppp=1,mmm=0,hhh=0,los=1;

var reftime=12;
var boomcd=200;
var bakacd=5000;
var boomper=1;

// Handle keyboard controls
var keysDown = {};
addEventListener("keydown", function (e) {
                 keysDown[e.keyCode] = true;
                 }, false);

addEventListener("keyup", function (e) {
                 delete keysDown[e.keyCode];
                 switch (e.keyCode){
                 case 13:if(mmm&&los){ppp=pause(mainctx,statectx,ppp);}else if(!mmm){mmm=1;}break;
                 case 27:if((!ppp)||(!los))reset(),menu(mainctx,statectx);break;
                 case 72:if(!mmm){hhh++,hhh%=2,menu(mainctx,statectx);}break;
                 }
                 }, false);

touch = function (A,B){
    var dx = Math.abs(A.x-B.x);
    var dy = Math.abs(A.y-B.y);
    if(Math.max(dx,dy)<32)
        return true;
    return false;
}

pause = function(mainctx,statectx,ppp){
    if(ppp){
        mainctx.fillStyle="rgba(255,255,255,0.5)";
        mainctx.fillRect(0,0,CBW,CBH);
        statectx.clearRect(0, 0, 1200, 100);
        statectx.drawImage(pbg[0], 0, 0);
        return 0;
    }
    else return 1;
}

lose = function(mainctx,statectx){
    alert("You Lose!Game Over!");
    mainctx.fillStyle="rgba(0,0,0,0.5)";
    mainctx.fillRect(0,0,CBW,CBH);
    mainctx.drawImage(losepic, 0, 0);
    statectx.clearRect(0, 0, 1200, 100);
    statectx.drawImage(pbg[1], 0, 0);
    los=0;
}

menu = function(mainctx,statectx){
    mainctx.drawImage(sbgmain[hhh], 0, 0);
    statectx.clearRect(0, 0, 1200, 100);
    statectx.drawImage(sbgst[0], 0, 0);
}

reset = function(){
    ppp=1,mmm=0,hhh=0,los=1;
    kanna = new K(kimg,CBW/2,CBH/2,10,5,10,[0,0,0,0,0]);
    baka_pool = [];
    boom_pool = [];
    for(i = 0; i < kanna.boom;i++)
        boom_pool.push(new B(bing,-233,-233,0,0));
}

var kimg = [new Image(),new Image()];
var ming = [new Image(),new Image(),new Image(),new Image()];
var bing = [new Image(),new Image(),new Image(),new Image(),new Image(),new Image()];
var ling = [new Image(),new Image()];
var losepic=new Image();
var sbgmain = [new Image(),new Image()];
var sbgst = [new Image(),new Image()];
var pbg=[new Image(),new Image()];
var stbg = new Image();
var bg = new Image();

kimg[0].src = "images/figure/kn.png";
kimg[1].src = "images/figure/kn2.png";
ling[0].src = "images/figure/xl.png";
ling[1].src = "images/figure/xl2.png";
ming[0].src = "images/figure/tr1.png";
ming[1].src = "images/figure/tr2.png";
ming[2].src = "images/figure/tr3.png";
ming[3].src = "images/figure/tr4.png";
bing[0].src = "images/boom/boom1.png";
bing[1].src = "images/boom/boom2.png";
bing[2].src = "images/boom/boom3.png";
bing[3].src = "images/boom/boom4.png";
bing[4].src = "images/boom/boom5.png";
bing[5].src = "images/boom/boom6.png";
losepic.src = "images/lose.png";
stbg.src = "images/bg.png";
pbg[0].src = "images/pbg.png";
pbg[1].src = "images/ebg.png";
sbgmain[0].src = "images/menu.png";
sbgmain[1].src = "images/help.png";
sbgst[0].src = "images/sbg.png";
sbgst[1].src = "images/hbg.png";
bg.src = "images/background.png";

