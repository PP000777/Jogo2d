const canvas = document.getElementById('jogo2DD');
const ctx = canvas.getContext('2d');
let gameOver = false;
let rodando = true;

  //  document.addEventListener('keypress', (e) => {
      //  if (e.code === 'Space' && !personagem.pulando) {
           // personagem.velocidadey = -16;
          //  personagem.pulando = true;
        //    frameIndex = 0;
      //  }
    //});

class Entidade{
    #gravidade
    constructor(x,y,largura, altura){
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.#gravidade = 0.5
    }
    getGravidade(){
        return this.gravidade
}

desenhar = function(ctx, cor){
    ctx.fillStyle =  cor;
    ctx.fillRect(this.x, this.y, this.largura, this.altura);

}

}

class Personagem extends Entidade{
    constructor(x,y,largura,altura,cor){
        super(x,y,largura,altura)
        this.cor = cor;
        cor = 'black'
    }
}


class Obstaculo extends Entidade{
    constructor(x,y,largura,altura){
        super(x,y,largura,altura)
    }
}

const personagem = new Personagem('100', canvas.height - 50, 50, 50)

const loop = () => {
    if (!rodando) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    personagem.desenhar(ctx,personagem.cor)
    requestAnimationFrame(loop);
}

loop();