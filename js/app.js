let speed = 20;
let scale = 0.15; // Image scale (I work on 1080p monitor)
let canvas;
let ctx;
let logoColor;
let img = new Image();
imgWidth = 200;
imgHeight = 200;


let buhritos = [];

document.addEventListener('keydown', function(event) {
  if (event.key === 'b') addNewBuhrito("images/buhrit-bounce-logo.png");
  if (event.key === 's') addNewBuhrito("images/spongebob-bounce-logo.png");
});

var background = document.getElementById("tv-screen");
var mc = new Hammer(background);

mc.on("tap", function() {
    addNewBuhrito("images/buhrit-bounce-logo.png");
});

mc.on("swipe", function() {
    addNewBuhrito("images/spongebob-bounce-logo.png");
});

function addNewBuhrito(imgSrc) {
    buhritos.push(new Object({
        x: Math.floor(Math.random() * (window.innerWidth - imgWidth - 20)) + 20,
        y: Math.floor(Math.random() * (window.innerHeight - imgHeight - 40)) + 40,
        xspeed: 5 * (Math.random() > 0.5 ? -1 : 1),
        yspeed: 5 * (Math.random() > 0.5 ? -1 : 1),
        img: imgSrc,
    }));
}

(function main() {
    canvas = document.getElementById("tv-screen");
    ctx = canvas.getContext("2d");

    //Draw the "tv screen"
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    alert("Press \"b\" or tap to make a Buhrito.\nPress \"s\" or swipe to make a Spongebob.");
    pickColor();
    update();
})();

function update() {
    setTimeout(() => {
        //Draw the canvas background
        ctx.fillStyle = '#000';

        canvas.height = window.innerHeight;   
        canvas.width = window.innerWidth;

        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //Draw burrito Logo and his background
        //console.log(buhritos.length + " burritos in the list");
        for (let i = 0; i < buhritos.length; i++) {
            img.src = buhritos[i].img;
            ctx.drawImage(img, buhritos[i].x, buhritos[i].y, imgWidth, imgHeight);
        //Move the logo
            buhritos[i].x += buhritos[i].xspeed;
            buhritos[i].y += buhritos[i].yspeed;
        //Check for collision 
            if(checkHitBox(buhritos[i])) {
                buhritos.splice(i, 1);
                i--;
            }
        }
        update();   
    }, speed)
}

//Check for border collision
function checkHitBox(b){
    if(b.x + imgWidth >= canvas.width || b.x <= 0) {
        if(b.x + imgWidth >= canvas.width && b.xspeed < 0) return true;
        if(b.x <= 0 && b.xspeed > 0) return true;
        b.xspeed *= -1;  
    }
        
    if(b.y + imgHeight >= canvas.height || b.y <= 0) {
        if(b.y + imgHeight >= canvas.height && b.yspeed < 0) return true;
        if(b.y <= 0 && b.yspeed > 0) return true;
        b.yspeed *= -1;
        
    }
    return false;
}

//Pick a random color in RGB format
function pickColor(b){

}

