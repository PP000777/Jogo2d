const canvas = document.getElementById('jogo2D')
const ctx = canvas.getContext('2d')
const gravidade = 1
let gameOver = false
let rodando = true // Controla a execução do jogo

document.addEventListener('keypress', (e) => {
    if(e.code == 'Space' && personagem.pulando == false){
        console.log('clicou para pular')
        personagem.velocidadey = 20
        personagem.pulando = true
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
    velocidadex: 7  
}

function desenharPersonagem(){
    ctx.fillStyle = 'yellow'
    ctx.fillRect(personagem.x, personagem.y, personagem.largura, personagem.altura)
}

function atualizarPersonagem(){
    if(personagem.pulando){
        personagem.velocidadey -= gravidade
        personagem.y -= personagem.velocidadey
        if(personagem.y >= canvas.height - 50){
            personagem.velocidadey = 0
            personagem.pulando = false
            personagem.y = canvas.height - 50
        }
    }
}

function desenharObstaculo(){
    ctx.fillStyle = 'green'
    ctx.fillRect(obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura)
}

function atualizarObstaculo(){
    obstaculo.x -= obstaculo.velocidadex    
    if(obstaculo.x <= 0 - obstaculo.largura){
        obstaculo.x = canvas.width
        obstaculo.velocidadex += 0.2
        let nova_altura = (Math.random() * 50) + 100
        obstaculo.altura = nova_altura
        obstaculo.y = canvas.height - nova_altura
    }
}

function houveColisao(){
    personagem.velocidadey = 0
    obstaculo.velocidadex = 0
    rodando = false // Para o jogo
    setTimeout(() => alert('Game Over'), 100)
}

function verificarColisao(){
    if (
        personagem.x < obstaculo.x + obstaculo.largura && 
        personagem.x + personagem.largura > obstaculo.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y  
    ){
        gameOver = true
        houveColisao()
    }
}

const loop = () => {
    if (!rodando) return // Para o loop se o jogo acabar

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    desenharPersonagem()
    atualizarObstaculo()
    atualizarPersonagem()
    desenharObstaculo()
    verificarColisao()

    requestAnimationFrame(loop)
}

loop()
