//Declare global variables (needed to be used in different functions)
const WIN_WIDTH = 400
const WIN_HEIGHT = WIN_WIDTH * 1.62

let bird
let BIRD_IMG
let BG_IMG
let BASE_IMG

//P5js functions - determines main logic of the game
//Everything that might take some time to load goes here 
function preload() {
    BIRD_IMG = [loadImage('assets/bird1.png'),loadImage('assets/bird2.png'),loadImage('assets/bird3.png')]
    BG_IMG = loadImage('assets/bg.png')
    BASE_IMG = loadImage('assets/base.png')
}

//Configuration of game window
function setup() {
    //P5js functions
    createCanvas(WIN_WIDTH, WIN_HEIGHT);
    angleMode(DEGREES)
    frameRate(30)
    //Initialize new game objects instances
    bird = new Bird()
    ground = new Ground()
  }
  
function draw() {
    //Setting background - using imageMode(CORNER) as there seem to be a
    //bug when using imageMode(CENTER) in the background 
    background(BG_IMG);

    ground.show()
    ground.update()  

    //Bird control logic
    translate(bird.x, bird.y)
    rotate(bird.tilt)
    if (bird.tilt > 80){
        //If bird is pointing down, don't animate flapping
        bird.show(1)
    }else{
        //Flapping animation - using imageMode(CENTER) so the rotation
        //is around in the center of the image
        if (bird.img_count <= bird.FLAP_INTERVAL){
            bird.show(0)
        }else if (bird.img_count <= bird.FLAP_INTERVAL*2){
            bird.show(1)
        }else if (bird.img_count <= bird.FLAP_INTERVAL*3){
            bird.show(2)
        }else if (bird.img_count <= bird.FLAP_INTERVAL*4){
            bird.show(1)
        }
    }
    bird.update() //Change bird actions every frame rerender   
    
    //Chang the imageMode back to corner before the next render so the
    //background renders right 
    
    imageMode(CORNER)
}

//On keypress event 
function keyPressed() {
    if (key === ' '){
        bird.jump()
    }
}

//Bird object
function Bird(){
    //Functional variable, not to be updated
    this.FLAP_INTERVAL = 2  
    this.SCALE = 1.75
    //Positioning and tilt varibles to be updated every frame
    this.y = height/2 
    this.x = width/4     
    this.tilt = 0
    //Variables to keep track of different physics 
    this.tick_count = 0
    this.img_count = 0
    this.gravity = 0.2         
    this.velocity = 0 //Jump velocity - NOT CONSTANT VELOCITY
    this.jump_height = this.y + 20

    //Class method to load the different images used for bird animation
    this.show = (i) => {
        imageMode(CENTER)
        image(BIRD_IMG[i], 0, 0, this.SCALE*BIRD_IMG[i].width, this.SCALE*BIRD_IMG[i].height)
    }

    //Jump event - add velocity to bird, reset tick_count for physics, record jump_height 
    //to keep track of rotation
    this.jump = () =>{
        this.velocity = 10                        
        this.tick_count = 0
        this.jump_height = this.y           
    }

    this.update = () =>{
        //displacement physics updated every frame render
        this.tick_count += 1
        //kinematics equation - initial velocity is 0 in most cases except for jump event
        let displacement = this.velocity - (0.5)*this.gravity*this.tick_count**2
        this.velocity -= this.gravity*this.tick_count
        //Don't want more negative value added on the displacement (too much acceleration)
        if (this.velocity < 0){
            this.velocity = 0 
        }
        //Terminal velocity
        if (displacement >= 5){
            displacement = 5  
        }
        //Adding more 'bounce' to jump
        if (displacement > 0){
            displacement += 10
        }
        //Finally updating the y variable with the determined displacement
        this.y -= displacement

        //Updating tilt positioning - if you just jump or still above the 
        //jump height , tilt upward 25 degree. Else, gradually update the 
        //tilt until it reachs 90 degree or the bird is pointing downwards 
        if (displacement >  0 || this.y < this.jump_height){
            this.tilt = -25
        }else{
            if (this.tilt < 76){
                this.tilt += 20 
            }
            if (this.tilt > 90){
                this.tilt = 90
            }
        }

        //Updates to keep track of flapping mechanism
        this.img_count += 1
        if (this.img_count > this.FLAP_INTERVAL*4){
            this.img_count = 0
        }
        
        //Stop the bird from moving off the screen
        if (this.y > height - 110){
            this.y = height - 110
            displacement = 0  
        }
    }
}


function Ground(){
    this.velocity = 5
    this.x1 = 0
    this.x2 = width
    this.y = height - 110  

    this.update = ()=>{
        this.x1 -= this.velocity
        this.x2 -= this.velocity
        if (this.x1 <= -width){
            this.x1 = width
        }
        if (this.x2 <= -width){
            this.x2 = width
        }
    }

    this.show = ()=>{
        image(BASE_IMG, this.x1, this.y, width, BASE_IMG.height)
        image(BASE_IMG, this.x2, this.y, width, BASE_IMG.height)
    }
}