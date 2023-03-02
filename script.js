const canvas= document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = 520;
canvas.height = 520;

const gradient1= ctx.createLinearGradient(0,0, canvas.width, canvas.height);
gradient1.addColorStop(0.2, "pink");
gradient1.addColorStop(0.3, "yellow");
gradient1.addColorStop(0.4, "red");
gradient1.addColorStop(0.5, "orange");
gradient1.addColorStop(0.6, "green");
gradient1.addColorStop(0.7, "violet");
gradient1.addColorStop(0.8, "grey");
gradient1.addColorStop(0.9, "black");


const patternImage = document.getElementById("patternImage");
const pattern1 = ctx.createPattern(patternImage, 'no-repeat');

ctx.strokeStyle =pattern1;
//ctx.strokeStyle = gradient1;


// reactangles
/*
ctx.fillStyle = "red";
ctx.fillRect(100,150,200,150);
ctx.lineWidth = 10;
ctx.strokeStyle = "blue";
ctx.strokeRect(100,150,200,150);
*/

//global settings
ctx.lineWidth = 10;
ctx.lineCap = "round";




class Line {
    constructor(canvas){
        this.canvas = canvas;
        this.x=Math.random()*this.canvas.width;
        this.y=Math.random()*this.canvas.height;
        this.history = [{x:this.x,y:this.y}];
        this.lineWidth = Math.floor(Math.random()*5+1);
        this.hue =Math.floor(Math.random()*360+1);
        this.maxLength = Math.floor(Math.random()*150+10);
        this.speedX= Math.floor(Math.random()*1-.5);
        this.speedY= 7;
        this.lifeSpan = this.maxLength*2;
        this.timer = 0;
    }

    draw(context){
        //context.strokeStyle='hsl(' +this.hue+ ',100%,50%)';
        context.lineWidth = this.lineWidth;
        context.beginPath();
        context.moveTo(this.history[0].x,this.history[0].y);
       
        for (let i=0; i<this.history.length; i++){
            context.lineTo(this.history[i].x,this.history[i].y);
        }
        context.stroke();
    }

    update(){
        this.timer++;
        if(this.timer<this.lifeSpan){
        this.x+=this.speedX+Math.random()*30-10;
        this.y+=this.speedY+Math.random()*20-10;
        this.history.push({x:this.x,y:this.y});
        if(this.history.length>this.maxLength){
            this.history.shift();
        }
        }else if(this.history.length<=1){
            this.reset();
        }else {
            this.history.shift();  
        }
    }

    reset(){
        this.x=Math.random()*this.canvas.width;
        this.y=Math.random()*this.canvas.height;
        this.history = [{x:this.x,y:this.y}];
        this.timer = 0;
    }
}

const lineArray = [];
const numberOfLines = 250;
for(let i=0;i<numberOfLines;i++){
    lineArray.push(new Line(canvas));
}

console.log(lineArray);


function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    //draw lines
    lineArray.forEach(object => {
        object.draw(ctx)
        object.update();
    });
    
    
    requestAnimationFrame(animate);
    
}

animate();