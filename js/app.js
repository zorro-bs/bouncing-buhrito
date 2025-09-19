let speed = 20;
let scale = 0.17; // Image scale (I work on 1080p monitor)
let canvas;
let ctx;
let logoColor;

let burrito = {
    x: 200,
    y: 300,
    xspeed: 7,
    yspeed: 7,
    img: new Image()
};

(function main(){
    canvas = document.getElementById("tv-screen");
    ctx = canvas.getContext("2d");
    burrito.img.src = 'buhrit-bounce-logo.png';

    //Draw the "tv screen"
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    pickColor();
    update();
})();

function update() {
    setTimeout(() => {
        //Draw the canvas background
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        //Draw burrito Logo and his background
        ctx.fillStyle = logoColor;
        ctx.fillRect(burrito.x, burrito.y, burrito.img.width*scale, burrito.img.height*scale);
        ctx.drawImage(burrito.img, burrito.x, burrito.y, burrito.img.width*scale, burrito.img.height*scale);
        //Move the logo
        burrito.x+=burrito.xspeed;
        burrito.y+=burrito.yspeed;
        //Check for collision 
        checkHitBox();
        update();   
    }, speed)
}

//Check for border collision
function checkHitBox(){
    if(burrito.x+burrito.img.width*scale >= canvas.width || burrito.x <= 0){
        burrito.xspeed *= -1;
        pickColor();
    }
        
    if(burrito.y+burrito.img.height*scale >= canvas.height || burrito.y <= 0){
        burrito.yspeed *= -1;
        pickColor();
    }    
}

//Pick a random color in RGB format
function pickColor(){
    r = Math.random() * (254 - 0) + 0;
    g = Math.random() * (254 - 0) + 0;
    b = Math.random() * (254 - 0) + 0;

    logoColor = 'rgb('+r+','+g+', '+b+')';
}