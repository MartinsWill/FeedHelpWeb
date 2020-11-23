var tituloValor = document.getElementById('titulo').value
var descricaoValor = document.getElementById('descricao').value
var alternativa1Valor = document.getElementById('alternativa1').value
var alternativa2Valor = document.getElementById('alternativa2').value
var alternativa3Valor = document.getElementById('alternativa3').value
var alternativa4Valor = document.getElementById('alternativa4').value
var idQuestionario = parseInt(localStorage.getItem('questionarioId'))

const verificaCadastro = () => {
    tituloValor = document.getElementById('titulo').value
    descricaoValor = document.getElementById('descricao').value
    alternativa1Valor = document.getElementById('alternativa1').value
    alternativa2Valor = document.getElementById('alternativa2').value
    alternativa3Valor = document.getElementById('alternativa3').value
    alternativa4Valor = document.getElementById('alternativa4').value

    //muda a cor da span de alert para vermelho representando um erro
    document.getElementById("spanAlert").style.color = "red"

    //verifica se o campo titulo está vazio
    if (tituloValor.length <= 0) document.getElementById("spanAlert").textContent = "O Título não pode estar vazio"
    else if (descricaoValor.length <= 0) document.getElementById("spanAlert").textContent = "A descricao não pode ser um valor vazio"
    else if (alternativa1Valor.length <= 0) document.getElementById("spanAlert").textContent = "A alternativa não pode ser um valor vazio"
    else if (alternativa1Valor.length <= 0) document.getElementById("spanAlert").textContent = "A alternativa não pode ser um valor vazio"
    else if (alternativa2Valor.length <= 0) document.getElementById("spanAlert").textContent = "A alternativa não pode ser um valor vazio"
    else if (alternativa4Valor.length <= 0) document.getElementById("spanAlert").textContent = "A alternativa não pode ser um valor vazio"
    else {
        document.getElementById("spanAlert").textContent = "Cadastro realizado com sucesso"
        //muda a cor do span de alert para verde representando um sucesso
        document.getElementById("spanAlert").style.color = "green"

        postPergunta()
            .catch(error => {
                console.log('Houve um erro na execução do postQuestionario')
                console.error(error)
            })

        document.getElementById("btn-concluido").disabled=false
        document.getElementById("btn-mais").disabled=false
        document.getElementById("btn-cadastrar").disabled=true
        //location.replace("./cadastroPergunta.html")
    }
}

async function postPergunta() {
    const options = {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titulo: tituloValor,
            descricao: descricaoValor,
            alternativa_1: alternativa1Valor,
            alternativa_2: alternativa2Valor,
            alternativa_3: alternativa3Valor,
            alternativa_4: alternativa4Valor,
            questionarioId: idQuestionario,
        })
    };
    const response = await fetch('https://localhost:44378/api/perguntas', options);
    const data = await response.json();
    console.log(data.id)
}
