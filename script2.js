let pontos = document.getElementById('Pontos')
const canvas = document.getElementById('jogo2DD');
const ctx = canvas.getContext('2d');
let gameOver = false;
let rodando = true;
let pontos2 = 0

const walkFrames = [];
for (let i = 1; i <= 6; i++) {
    let img = new Image();
    img.src = `./images/FramesWalk/frame_${i}.png`;
    walkFrames.push(img);
}

const jumpFrames = [];
for (let i = 0; i <= 7; i++) {
    let img = new Image();
    img.src = `./images/JumpSprite/jump_frame_${i}.png`;
    jumpFrames.push(img);
}

const numWalkFrames = walkFrames.length;
const numJumpFrames = jumpFrames.length;

let frameIndex = 0;
let delay = 5;
let contador = 0;

document.addEventListener('keypress', (e) => {
    if (e.code === 'Space' && !personagem.pulando) {
        personagem.saltar();
    }
});

class Entidade {
    #gravidade;
    constructor(x, y, largura, altura) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.#gravidade = 0.4;
    }
    getGravidade() {
        return this.#gravidade;
    }

    desenhar(ctx, cor) {
        ctx.fillStyle = cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
}

class Personagem extends Entidade {
    #velocidadey;
    #pulando;
    constructor(x, y, largura, altura, cor) {
        super(x, y, largura, altura);
        this.cor = cor;
        this.#velocidadey = 0;
        this.#pulando = false;
    }
    saltar() {
        this.#velocidadey = 15;
        this.#pulando = true;
        console.log('saltando');
    }
    get pulando() {
        return this.#pulando;
    }

    desenharPersonagem() {
        contador++;
        if (contador >= delay) {
            frameIndex++;
            contador = 0;
        }
    
        let frameAtual;
        if (personagem.pulando) {
            if (frameIndex >= numJumpFrames) frameIndex = numJumpFrames - 1;
            frameAtual = jumpFrames[frameIndex];
        } else {
            if (frameIndex >= numWalkFrames) frameIndex = 0;
            frameAtual = walkFrames[frameIndex];
        }
    
        ctx.drawImage(frameAtual, personagem.x, personagem.y, personagem.largura, personagem.altura);
    }
    atualizarPersonagem() {
        if (this.#pulando) {
            this.#velocidadey -= this.getGravidade();
            this.y -= this.#velocidadey;
            if (this.y >= canvas.height - 50) {
                this.#velocidadey = 0;
                this.#pulando = false;
                this.y = canvas.height - 50;
            }
        }
    }
}

class Obstaculo extends Entidade {
    #velocidadex;
    constructor(x, y, largura, altura, cor) {
        super(x, y, largura, altura);
        this.#velocidadex = 3;
        this.cor = cor;
    }
    get velocidadex() {
        return this.#velocidadex;
    }
    desenharObstaculo() {
        ctx.fillStyle = this.cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
    atualizarObstaculo() {
        this.x -= this.#velocidadex;
        if (this.x <= 0 - this.largura) {
            contadorDePontos()
            this.x = canvas.width;
            this.#velocidadex += 0.2;
            let nova_altura = Math.random() * 50 + 100;
            this.altura = nova_altura;
            this.y = canvas.height - nova_altura;
        }
        
    }
}

function contadorDePontos(){
    pontos2++;
    pontos.innerHTML = 'Pontos: ' + pontos2;
}

function houveColisao() {
    personagem.velocidadey = 0;
    obstaculo.velocidadex = 0;
    rodando = false;
    setTimeout(() => alert('Game Over'), 100);
}

function verificarColisao() {
    if (
        personagem.x < obstaculo.x + obstaculo.largura && 
        personagem.x + personagem.largura > obstaculo.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y  
    ) {
        gameOver = true;
        houveColisao();
    }
}



const personagem = new Personagem(100, canvas.height - 50, 50, 50, 'black');
const obstaculo = new Obstaculo(canvas.width - 50, canvas.height - 50, 50, 100);

const loop = () => {
    if (!rodando) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    personagem.atualizarPersonagem();
    obstaculo.atualizarObstaculo();

    personagem.desenharPersonagem(ctx, personagem.cor);
    obstaculo.desenharObstaculo();
    verificarColisao();

    requestAnimationFrame(loop);
};

loop();