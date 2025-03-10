const canvas = document.getElementById('jogo2D')
const ctx = canvas.getContext('2d')
const gravidade = 0.4
let gameOver = false
let rodando = true

const walkFrames = []
for (let i = 1; i <= 6; i++) {
    let img = new Image()
    img.src = `./images/FramesWalk/frame_${i}.png`
    walkFrames.push(img)
}

const jumpFrames = []
for (let i = 0; i <= 7; i++) {
    let img = new Image()
    img.src = `./images/JumpSprite/jump_frame_${i}.png`
    jumpFrames.push(img)
}

const numWalkFrames = walkFrames.length
const numJumpFrames = jumpFrames.length

let frameIndex = 0
let Delay = 5
let Contador = 0

document.addEventListener('keypress', (e) => {
    if (e.code === 'Space' && !personagem.pulando) {
        personagem.velocidadey = 16
        personagem.pulando = true
        frameIndex = 0
    }
})

const personagem = {
    x: 100,
    y: canvas.height - 50,
    altura: 50,
    largura: 50,
    velocidadey: 0,
    pulando: false
}

const obstaculo = {
    x: canvas.width - 50,
    y: canvas.height - 100,
    altura: 100,
    largura: 50,
    velocidadex: 2  
}

function desenharPersonagem() {
    Contador++
    if (Contador >= Delay) {
        ContadorFrames++
        Contador = 0
    }

    let frameAtual
    if (personagem.pulando == true ) {
        if (ContadorFrames >= numJumpFrames) ContadorFrames = numJumpFrames - 1
        frameAtual = jumpFrames[ContadorFrames]
    } else {
        if (ContadorFrames >= numWalkFrames) ContadorFrames = 0
        frameAtual = walkFrames[ContadorFrames]
    }

    ctx.drawImage(frameAtual, personagem.x, personagem.y, personagem.largura, personagem.altura)
}

function atualizarPersonagem() {
    if (personagem.pulando) {
        personagem.velocidadey -= gravidade
        personagem.y -= personagem.velocidadey
        if (personagem.y >= canvas.height - 50) {
            personagem.velocidadey = 0
            personagem.pulando = false
            personagem.y = canvas.height - 50
            frameIndex = 0
        }
    }
}

function desenharObstaculo() {
    ctx.fillStyle = 'green'
    ctx.fillRect(obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura)
}

function atualizarObstaculo() {
    obstaculo.x -= obstaculo.velocidadex    
    if (obstaculo.x <= 0 - obstaculo.largura) {
        obstaculo.x = canvas.width
        obstaculo.velocidadex += 0.2
        let nova_altura = (Math.random() * 50) + 100
        obstaculo.altura = nova_altura
        obstaculo.y = canvas.height - nova_altura
    }
}

function houveColisao() {
    personagem.velocidadey = 0
    obstaculo.velocidadex = 0
    rodando = false
    setTimeout(() => alert('Game Over'), 100)
}

function verificarColisao() {
    if (
        personagem.x < obstaculo.x + obstaculo.largura && 
        personagem.x + personagem.largura > obstaculo.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y  
    ) {
        gameOver = true
        houveColisao()
    }
}

const loop = () => {
    if (!rodando) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    desenharPersonagem()
    atualizarObstaculo()
    atualizarPersonagem()
    desenharObstaculo()
    verificarColisao()

    requestAnimationFrame(loop)
}

loop()
