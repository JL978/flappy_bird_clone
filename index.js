const WIN_WIDTH = 400
const WIN_HEIGHT = WIN_WIDTH * 1.62

let bird
let BIRD_IMG
var BG_IMG

function preload() {
    BIRD_IMG = [loadImage('assets/bird1.png'),loadImage('assets/bird2.png'),loadImage('assets/bird3.png')]
    BG_IMG = loadImage('assets/bg.png')
}

function setup() {
    
    createCanvas(WIN_WIDTH, WIN_HEIGHT);
    angleMode(DEGREES)
    bird = new Bird()
    frameRate(30)
  }
  
function draw() { 
    background(BG_IMG);

    translate(bird.x, bird.y)
    rotate(bird.tilt)
    if (bird.img_count <= bird.FLAP_INTERVAL){
        bird.show(0)
    }else if (bird.img_count <= bird.FLAP_INTERVAL*2){
        bird.show(1)
    }else if (bird.img_count <= bird.FLAP_INTERVAL*3){
        bird.show(2)
    }else if (bird.img_count <= bird.FLAP_INTERVAL*4){
        bird.show(1)
    }

    bird.update()   
    imageMode(CORNER)
}


function keyPressed() {
    if (key === ' '){
        bird.jump()
    }
}

function Bird(){
    this.FLAP_INTERVAL = 2  
    this.SCALE = 1.75

    this.y = height/2 
    this.x = width/4     

    this.tilt = 0

    this.tick_count = 0
    this.gravity = 0.2         
    this.velocity = 0
    this.img_count = 0

    this.jump_height = this.y + 20

    this.show = (i) => {
        imageMode(CENTER)
        image(BIRD_IMG[i], 0, 0, this.SCALE*BIRD_IMG[i].width, this.SCALE*BIRD_IMG[i].height)
    }

    this.jump = () =>{
        this.velocity = 10                        
        this.tick_count = 0
        this.jump_height = this.y           
    }

    this.update = () =>{
        //displacement physics
        this.tick_count += 1
        
        let displacement = this.velocity - (0.5)*this.gravity*this.tick_count**2
        this.velocity -= this.gravity*this.tick_count

        if (this.velocity < 0){
            this.velocity = 0 
        }

        if (displacement >= 5){
            displacement = 5  
        }
        
        if (displacement > 0){
            displacement += 10
        }

        this.y -= displacement

        //Check to see when to tilt
        if (displacement >   0 || this.y < this.jump_height){
            this.tilt = -25
        }else{
            if (this.tilt < 90){
                this.tilt += 20 
            }
        }

        this.img_count += 1
        if (this.img_count > this.FLAP_INTERVAL*4){
            this.img_count = 0
        }

        if (this.y > height){
            this.y = height
            displacement = 0
        }
        

    }

}