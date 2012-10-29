(function() {

var speedOffset = 0;

var cloudSize = { width: 90, height: 70 };

function Cloud(canvas) {
    this.cloud = Math.floor(Math.random() * 4);
    this.x = (Math.random() * canvas.width + cloudSize.width);
    this.y = (Math.random() * canvas.height + cloudSize.height);
    this.speed = Math.random() * 5;
    this.width = cloudSize.width * this.speed / 2;
    this.height = cloudSize.height * this.speed / 2;
}
Cloud.prototype.move = function() {
    this.x = (this.x + this.getSpeed()) % (canvas.width + 2 * this.width);
    this.y = (this.y + this.getSpeed() * 0.38) % (canvas.height + 2 * this.height);
};
Cloud.prototype.paint = function(context) {
    context.drawImage(clouds, 
        0, this.cloud * cloudSize.height, cloudSize.width, cloudSize.height, 
        this.x - this.width, this.y - this.height, this.width, this.height
    );
};
Cloud.prototype.getSpeed = function() {
    return this.speed + speedOffset;
};


var canvas = document.getElementById('content');
var context = canvas.getContext('2d');

var turtle = new Image();
var clouds = new Image();
var logo = new Image();

var loaded = 0;
function onload() {
    loaded++;
    if (loaded === 3) {
        start();
    }
}
turtle.addEventListener('load', onload);
clouds.addEventListener('load', onload);
logo.addEventListener('load', onload);

turtle.src = './turtle.png'; // 800x360
clouds.src = './clouds.png'; // 90x270
logo.src= './logo.png'; // 650x290

function start() {
    var clouds = [];

    for (var j = 0; j < 20; j++) {
        clouds.push(new Cloud(canvas));
    }
    clouds.sort(function(c1,c2) {
        return c1.speed-c2.speed;
    });

    // setup 
    setInterval(function() {
        context.clearRect(0, 0, canvas.width, canvas.height);

        clouds.forEach(function(cloud) {
            cloud.move();
            cloud.paint(context);
        });

        context.drawImage(turtle, 
            0, 0, 800, 360, 
                canvas.width / 2 - 400 + (Math.random() * speedOffset / 2), 
                40 + (Math.random() * speedOffset / 2),
                800, 360
        );

        context.drawImage(logo, (canvas.width - 650) / 2, 400, 650, 290);

    }, 10);
}

document.addEventListener('keydown', function(e){
    switch(e.keyCode) {
        case 40: // down
            speedOffset = Math.max(speedOffset - 0.5, 0);
            break;
        case 38: // up
            speedOffset = Math.min(speedOffset + 0.5, 30);
            break;
    }
})

}());