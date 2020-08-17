class Display{
    constructor(){
        this.stage = document.querySelector('#stage') 
        this.ctx = this.stage.getContext('2d')

        // length of the display
        this.lp = 20 

        //  quantity of pieces
        this.qp = 20
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

            // body
            this.trail = []
            this.tail = 3
        }
}

        
class Apple{
        constructor(){
            // position
            this.ax=15
            this.ay=15
        }
}
        

class Game{
        constructor(){
            this.wn = new Display()
            this.snake = new Snake()
            this.apple = new Apple()
            
        }

        Start(){
            this.snake.px += this.snake.vx
            this.snake.py += this.snake.vy

            this.CheckSpace()
            this.DrawElements()
            this.CreateSnake()
            this.EatApple()
        }

        CheckSpace(){
            if(this.snake.px < 0){
                this.snake.px = this.wn.qp -1
            }

            if(this.snake.px > this.wn.qp - 1){
                this.snake.px = 0
            }

            if(this.snake.py < 0){
                this.snake.py = this.wn.qp - 1
            }

            if(this.snake.py > this.wn.qp -1){
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
            
            while(this.snake.trail.length > this.snake.tail){
                this.snake.trail.shift()
            }
        }


        CreateSnake(){
           return  
        }

        EatApple(){
            if(this.apple.ax == this.snake.px && this.apple.ay == this.snake.py){
                this.snake.tail++;
                this.apple.ax = Math.floor(Math.random() * this.wn.qp)
                this.apple.ay = Math.floor(Math.random() * this.wn.qp)
            }
        }

        
}

let game = new Game()

window.onload = ()=>{
        
    let keyPush = (e)=>{
            
            switch (e.keyCode) {
                case 37:  //left
                    game.snake.vx = - game.snake.vel
                    game.snake.vy = 0
                    
                    break;

                case 38:  //up
 
                game.snake.vx = 0
                game.snake.vy = - game.snake.vel
                    break;

                case 39:  //right
                game.snake.vx = game.snake.vel
                game.snake.vy = 0
                    break;

                case 40:  //down
                game.snake.vx = 0
                game.snake.vy = game.snake.vel
                    break; 

                default:
                break;
            }
        }
        
document.addEventListener('keydown',keyPush)
setInterval(()=>{
        game.Start()     
},80)
}
