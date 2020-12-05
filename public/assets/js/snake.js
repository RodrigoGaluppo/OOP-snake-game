
// Base Variables and Consts
// ResponsibleHeigth
let HEIGTH =  window.innerHeight - 50
if(window.innerWidth > 768){
     HEIGTH =  window.innerHeight - 50 
}else if(window.innerWidth > 550){
     HEIGTH =  window.innerHeight - 100
}else{
     HEIGTH = window.innerHeight < 500 ? window.innerHeight - 200 : window.innerHeight - 300
}

let WIDTH =  window.innerWidth - 400
if(window.innerWidth > 768){
    WIDTH =  window.innerWidth - 400 
}else if(window.innerWidth > 550){
    WIDTH =  window.innerWidth - 50
}else{
    WIDTH =  window.innerWidth - 30
}

const All = document.querySelector('body')
const buttonUp = document.querySelector('#up')
const buttonDown = document.querySelector('#down')
const buttonLeft = document.querySelector('#left')
const buttonRight = document.querySelector('#right')

const scoreHtml = document.querySelector('#score')
const HighscoreHtml = document.querySelector('#highscore')
let Highscore = JSON.parse(localStorage.getItem("@SnakeGame-HighScore"))
let direction

// game functions

const UpdateScore = (NewScore)=>{
    scoreHtml.innerText = `score ${NewScore}`
    if(NewScore > Number(Highscore)){
        localStorage.setItem("@SnakeGame-HighScore",JSON.stringify(NewScore))
        HighscoreHtml.innerHTML=`highscore ${NewScore}`
    }else{
        HighscoreHtml.innerHTML=`highscore ${Highscore}`
    }
}

const GenerateRandomPOSITION = ()=>{
    return Math.floor(Math.random() * WIDTH / 20)
}

// Game classes

class Display{
    constructor(){
        this.stage = document.querySelector('#stage') 
        this.stage.setAttribute("height",HEIGTH.toString())
        this.stage.setAttribute("width",WIDTH.toString())

        this.ctx = this.stage.getContext('2d')

        // length of the piece
        this.lp = WIDTH > 960 ? 30 : 20 
        this.lp = WIDTH < 550 ? 17 : this.lp
        //  quantity of pieces
        this.qp = 20

        // max coordenates for the apple

        this.maxX = Math.floor( WIDTH/ this.lp)
        this.maxY = Math.floor(HEIGTH / this.lp)

        }

}

class Snake{
        constructor(){
            // velocity
            this.vel = 1
            this.vx = 0
            this.vy = 0

            // position of the head
            this.px = 0
            this.py = 0

            this.direction = "stop"

            // body
            this.trail = []
            this.tail = 3
        }
}

        
class Apple{
        constructor(){
            // position
            this.ax= GenerateRandomPOSITION()
            this.ay= GenerateRandomPOSITION()
        }
}
        

class Game{
        constructor(){
            this.wn = new Display()
            this.snake = new Snake()
            this.apple = new Apple()   
        }

        Start(){
            //score.innerText = this.snake.trail.length.toString()
            this.snake.px += this.snake.vx
            this.snake.py += this.snake.vy

            // guarateing that apple will be inside of canvas
            while(this.apple.ax < 0 || this.apple.ax > this.wn.maxX || 
                this.apple.ay < 0 || this.apple.ay > this.wn.maxY){
                    
                this.apple.ax = GenerateRandomPOSITION()
                this.apple.ay = GenerateRandomPOSITION()
            }

            this.CheckSpace()
            this.DrawElements()
            this.EatApple()
        }

        // Allowing snake to move through sides
        CheckSpace(){
            if(this.snake.px < 0){
                this.snake.px = this.wn.maxX
            }

            if(this.snake.px > this.wn.maxX){
                this.snake.px = 0
            }

            if(this.snake.py < -1){
                this.snake.py = this.wn.maxY
            }

            if(this.snake.py > this.wn.maxY){
                this.snake.py = 0
            }
        }

        DrawElements(){
            this.wn.ctx.fillStyle = '#ccc'
            this.wn.ctx.fillRect(0,0 ,this.wn.stage.width, this.wn.stage.height)
            this.wn.ctx.fillStyle='#e67300'
            this.wn.ctx.fillRect(this.apple.ax * this.wn.lp, this.apple.ay * this.wn.lp , this.wn.lp , this.wn.lp)
            this.wn.ctx.fillStyle = '#264d73'

            for(let i = 0; i < this.snake.trail.length; i++ ){
                this.wn.ctx.fillRect(this.snake.trail[i].x * this.wn.lp, this.snake.trail[i].y * this.wn.lp, this.wn.lp , this.wn.lp)    
                if( this.snake.trail[i].x == this.snake.px && this.snake.trail[i].y == this.snake.py){
                    this.snake.vx = this.snake.vy = 0
                    this.snake.tail=2
                }
            }
            this.snake.trail.push({x:this.snake.px,y:this.snake.py})
            
            while(this.snake.trail.length > this.snake.tail ){
                this.snake.trail.shift()
                
            }
        }


        EatApple(){
            if(this.apple.ax == this.snake.px && this.apple.ay == this.snake.py){
                this.snake.tail++;
                this.apple.ax = GenerateRandomPOSITION()
                this.apple.ay = GenerateRandomPOSITION()

                do{
                    this.apple.ax = GenerateRandomPOSITION()
                    this.apple.ay = GenerateRandomPOSITION()
                }
                while(this.apple.ax < 0 || this.apple.ax > this.wn.maxX || 
                    this.apple.ay < 0 || this.apple.ay > this.wn.maxY)

                UpdateScore((this.snake.trail.length - 1).toString())
                
            }
        }

        
}

const game = new Game()

window.onload = ()=>{
    Highscore = !!(localStorage.getItem("@SnakeGame-HighScore")) ? JSON.parse(localStorage.getItem("@SnakeGame-HighScore")) : "0"

    UpdateScore(game.snake.trail.length.toString()) 

    const MoveRight = ()=>{
        if(!(direction == "left")) {
            game.snake.vx =  game.snake.vel
            game.snake.vy = 0 
        }
        direction = "right"
    }
    const MoveLeft = ()=>{
        if(!(direction == "right")) {
            game.snake.vx = - game.snake.vel
            game.snake.vy = 0
            
        }
        direction = "left"
    }

    const MoveUp = ()=>{
        if(!(direction == "down")){
            game.snake.vx = 0
            game.snake.vy = - game.snake.vel
        }
        direction = "up"
    } 
    const MoveDown = ()=>{
        if(!(direction == "up")){
            game.snake.vx = 0
            game.snake.vy = game.snake.vel
        }
        direction = "down"
    }

    const keyPush = (e)=>{
            switch (e.keyCode) {
                case 37:  //left
                    MoveLeft()
                    break;

                case 38:  //up
                    MoveUp()
                    break;

                case 39:  //right
                    MoveRight()
                    break;

                case 40:  //down
                    MoveDown()
                    break; 

                default:
                break;
            }
    }

        
document.addEventListener('keydown',keyPush)
buttonUp.addEventListener("click",MoveUp)
buttonDown.addEventListener("click",MoveDown)
buttonLeft.addEventListener("click",MoveLeft)
buttonRight.addEventListener("click",MoveRight)

setInterval(()=>{
        game.Start()     
},80)
}
