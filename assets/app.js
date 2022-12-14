
let palpites = 6 // numero de palpites (heigth)
let tamanhoPalavra = 5 // tamanho da palavra (width)

var linha = 0
var coluna = 0

var gameOver = false
var palavra = "CHINA"

window.onload = function(){
    inicializar()
}


    //criar o tabuleiro
function inicializar(){
    for (let l = 0; l < palpites; l++){
        for(let c = 0; c < tamanhoPalavra; c++){
            // span id="0-0" class="tile"></span> <<está sendo criado isso.
            let tile = document.createElement("span")
            tile.id = l.toString() + "-" + c.toString()
            tile.classList.add("tile")
            tile.innerText = ""
            document.getElementById("board").appendChild(tile)
        }
    }




    // criando os ouvintes de teclado
    document.addEventListener("keyup", (e) => {
        if(gameOver) return
    
    //alerta de pressionament (e.code)
        if ("KeyA" <= e.code && e.code <= "KeyZ" ){ // validando todas as teclas de A a Z
            if (coluna < tamanhoPalavra){
                let currTile = document.getElementById(linha.toString()+ '-'+ coluna.toString())
                if (currTile.innerText == ""){ //nao permitir o enter antes de completar a linha
                    currTile.innerText = e.code[3]
                    coluna += 1 
                }
            }
        }
        else if (e.code == "Backspace"){
            if(0 < coluna && coluna <= tamanhoPalavra){
                coluna -= 1
            }   // responsavel por apagar letra por letra
            let currTile = document.getElementById(linha.toString()+ '-'+ coluna.toString())
            currTile.innerText= ""
        }
        else if (e.code == "Enter"){
            update()
            linha+=1 //caso pressione enter, iniciará uma nova linha e
            coluna = 0 // nova coluna do zero.
        }

        if(!gameOver && linha == palpites){
            gameOver = true
            document.getElementById("answer").innerText = palavra //mostra a palavra do dia
            //... caso dê gameOver.
        }
    })

}



function update(){
    let correto = 0
    let contaLetra = {} //exemplo: C:1 H:2 I:3 N:4 A:5
    for(let i =0; i < palavra.length; i++){
        letra = palavra[i]
        if(contaLetra[letra]){
            contaLetra[letra]+=1
        }
        else{
            contaLetra[letra] = 1
        }
    }

    for (let c = 0; c < tamanhoPalavra; c++){
        let currTile = document.getElementById(linha.toString()+ '-'+ c.toString())
        let letra = currTile.innerText
    
        //se conter na palavra
        if (!currTile.classList.contains("correct")){    
            if (palavra.includes(letra) &&  contaLetra[letra] > 0){
                currTile.classList.add("present")
                contaLetra[letra] -=1
            }else {
                currTile.classList.add("absent")
            }

            if (correto == tamanhoPalavra){
                gameOver = true
            }
        }
    }
}