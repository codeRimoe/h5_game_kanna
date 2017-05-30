
// Call the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/background.png";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
    heroReady = true;
};
heroImage.src = "images/hero.png";

// Monster image
var monsterReady = false;
var monsterImage = new Image();
monsterImage.onload = function () {
    monsterReady = true;
};
monsterImage.src = "images/monster.png";

// Game objects
var hero = {
speed: 256 // movement in pixels per second
};
var monster = {};
var monstersCaught = 0;

// Handle keyboard controls
var keysDown = {};

addEventListener("keydown", function (e) {
                 keysDown[e.keyCode] = true;
                 }, false);

addEventListener("keyup", function (e) {
                 delete keysDown[e.keyCode];
                 }, false);

// Reset the game when the player catches a monster
var reset = function () {
    hero.x = canvas.width / 2;
    hero.y = canvas.height / 2;
    
    // Throw the monster somewhere on the screen randomly
    monster.x = 32 + (Math.random() * (canvas.width - 64));
    monster.y = 32 + (Math.random() * (canvas.height - 64));
};

// Update game objects
var update = function (modifier) {
    if (38 in keysDown) { // Player holding up
        hero.y -= hero.speed * modifier;
    }
    if (40 in keysDown) { // Player holding down
        hero.y += hero.speed * modifier;
    }
    if (37 in keysDown) { // Player holding left
        hero.x -= hero.speed * modifier;
    }
    if (39 in keysDown) { // Player holding right
        hero.x += hero.speed * modifier;
    }
    
    // Are they touching?
    if (
        hero.x <= (monster.x + 32)
        && monster.x <= (hero.x + 32)
        && hero.y <= (monster.y + 32)
        && monster.y <= (hero.y + 32)
        ) {
        ++monstersCaught;
        reset();
    }
};

// Draw everything
var render = function () {
    if (bgReady) {
        ctx.drawImage(bgImage, 0, 0);
    }
    
    if (heroReady) {
        ctx.drawImage(heroImage, hero.x, hero.y);
    }
    
    if (monsterReady) {
        ctx.drawImage(monsterImage, monster.x, monster.y);
    }
    
    // Score
    ctx.fillStyle = "rgb(250, 250, 250)";
    ctx.font = "24px Helvetica";
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    ctx.fillText("Goblins caught: " + monstersCaught, 32, 32);
};

// The main game loop
var main = function () {
    var now = Date.now();
    var delta = now - then;
    
    update(delta / 1000);
    render();
    
    then = now;
    
    // Request to do this again ASAP
    requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();
reset();
main();

<!DOCTYPE html>
<html>
<head>
<title>分数显示</title>
<meta charset="utf-8">
</head>
<body>
<canvas id="myCanvas" width="800" height="374" style="border:solid">
你的浏览器不支持canvas画布元素，请更新浏览器获得演示效果。
</canvas>
<script type="text/javascript">
var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");
canvas.addEventListener("mousedown", onMouseDown, false);
canvas.addEventListener("mousemove", onMouseMove, false);
canvas.addEventListener("mouseup", onMouseUp, false);

var Fish = function (image, x, y) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.originX = x;
    this.originY = y;
    this.width = image.width;
    this.height = image.height / 4;
    this.scale = 0.2 + 0.6 * Math.random();
    this.isCaught = false;
    this.frm = 0;
    this.dis = 0;
};
Fish.prototype.getCaught = function (bool) {
    this.isCaught = bool;
    if (bool == false) {
        this.originX = 0;
        this.originY = this.y;
    }
};
Fish.prototype.testPoint = function (x, y) {
    var betweenX = (x >= this.x) && (x <= this.x + this.width * this.scale);
    var betweenY = (y >= this.y) && (y <= this.y + this.height * this.scale);
    return betweenX && betweenY;
};
Fish.prototype.move = function (dx, dy) {
    this.x += dx;
    this.y += dy;
};
Fish.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.scale, this.scale);
    ctx.drawImage(this.image, 0, this.frm * this.height, this.width, this.height, 0, 0, this.width, this.height);
    ctx.restore();
    
    if (!this.isCaught) {
        this.x += 2;
        this.originX += 2;
        if (this.x >= 800) {
            this.x = -200;
        }
        
        this.y = this.originY + 50 * Math.sin(Math.PI / 100 * this.originX);
    }
    
    this.dis++;
    if (this.dis >= 20) {
        this.dis = 0;
        this.frm++;
        if (this.frm >= 4) this.frm = 0;
    }
};

var Basket = function (image) {
    this.image = image;
    this.x = 650;
    this.y = 50;
    this.i = -1;
    this.width = 100;
    this.height = 70;
};
Basket.prototype.testPoint = function (x, y) {
    var betweenX = (x >= this.x) && (x <= this.x + this.width);
    var betweenY = (y >= this.y) && (y <= this.y + this.height);
    return betweenX && betweenY;
};
Basket.prototype.getFish = function (fish) {
    fish.x = fish.originX = -200;
    fish.y = fish.originY = 150 + 80 * Math.random();
    var index = fishes.indexOf(fish);
    fishes.splice(index, 1);
    
    score += 200 * (1 - fish.scale) | 0;
};
Basket.prototype.draw = function (ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
};

var ShowText = function (string, x, y) {
    this.string = string;
    this.beginY = y - 300;
    this.x = x;
    this.y = y;
};
ShowText.prototype.draw = function (ctx) {
    context.save();
    context.font = "50px Arial";
    context.translate(this.x, this.beginY);
    context.fillText(this.string, 0, 0);
    context.restore();
    
    if (this.beginY <= this.y) {
        this.beginY += 2;
    }
};

var fishes = [], caughtFish = null;
var basket;
var score = 0;
var isClicked = false;
var mouseX, mouseY, preX, preY;

var background = new Image();
var basketImg = new Image();
var image = new Image();
var image2 = new Image();
var image3 = new Image();
var image4 = new Image();
background.src = "http://211.66.128.178/picSrc/课本图片/海底.png";
basketImg.src = "http://211.66.128.178/picSrc/课本图片/竹篮.png";
image.src = "http://211.66.128.178/picSrc/课本图片/鱼动画.png";
image2.src = "http://211.66.128.178/picSrc/课本图片/鱼动画2.png";
image3.src = "http://211.66.128.178/picSrc/课本图片/鱼动画3.png";
image4.src = "http://211.66.128.178/picSrc/课本图片/鱼动画4.png";
image4.onload = function () {
    fishes.push(new Fish(image, -200, 220));
    fishes.push(new Fish(image2, 20, 250));
    fishes.push(new Fish(image3, 240, 200));
    fishes.push(new Fish(image4, 480, 180));
    fishes.push(new Fish(image, 300, 240));
    fishes.push(new Fish(image2, 380, 210));
    fishes.push(new Fish(image3, 440, 200));
    fishes.push(new Fish(image4, 240, 150));
    
    basket = new Basket(basketImg);
    context.font = "40px Arial";
    var text = new ShowText("游戏结束！", 300, 200);
    setInterval(function () {
                context.clearRect(0, 0, 800, 374);
                context.drawImage(background, 0, 0);
                if(basket.x>=650)basket.i=-5;
                if(basket.x<=200)basket.i=5;
                basket.x+=basket.i;
                basket.draw(context);
                context.fillText("分数：" + score, 20, 50);
                
                for (var i = 0; i < fishes.length; i++) {
                fishes[i].draw(context);
                }
                
                if (fishes.length <= 0) {
                text.draw(context);
                }
                }, 1000 / 60);
};

function onMouseDown(e) {
    preX = mouseX = e.pageX - canvas.clientLeft;
    preY = mouseY = e.pageY - canvas.clientTop;
    
    for (var i = 0; i < fishes.length; i++) {
        if (fishes[i].testPoint(mouseX, mouseY)) {
            fishes[i].getCaught(true);
            caughtFish = fishes[i];
            isClicked = true;
            return;
        }
    }
    isClicked = false;
    caughtFish = null;
}

function onMouseMove(e) {
    if (isClicked) {
        mouseX = e.pageX - canvas.clientLeft;
        mouseY = e.pageY - canvas.clientTop;
        caughtFish.move(mouseX - preX, mouseY - preY);
        preX = mouseX;
        preY = mouseY;
    }
}

function onMouseUp(e) {
    isClicked = false;
    if (caughtFish != null) {
        caughtFish.getCaught(false);
        mouseX = e.pageX - canvas.clientLeft;
        mouseY = e.pageY - canvas.clientTop;
        if (basket.testPoint(mouseX, mouseY)) {
            basket.getFish(caughtFish);
        }
        caughtFish = null;
    }
}
</script>
</body>
</html>
