var tituloValor = document.getElementById('titulo').value
var pontuacaoValor = document.getElementById('pontuacao').value

const verificaCadastro = () => {
    tituloValor = document.getElementById('titulo').value
    pontuacaoValor = document.getElementById('pontuacao').value

    //muda a cor da span de alert para vermelho representando um erro
    document.getElementById("spanAlert").style.color = "red"

    //verifica se o campo titulo está vazio
    if (tituloValor.length <= 0) document.getElementById("spanAlert").textContent = "O Título não pode estar vazio"

    //verifica se o campo pontuação está vazio
    else if (pontuacaoValor.length <= 0) document.getElementById("spanAlert").textContent = "A pontuação não pode ser um valor vazio"

    else {
        document.getElementById("spanAlert").textContent = "Cadastro realizado com sucesso"
        //muda a cor do span de alert para verde representando um sucesso
        document.getElementById("spanAlert").style.color = "green"

        postQuestionario()
            .catch(error => {
                console.log('Houve um erro na execução do postQuestionario')
                console.error(error)
            })

        location.replace("./cadastroPergunta.html")
    }
}

async function postQuestionario() {
    const options = {
        method: 'POST',
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            titulo: tituloValor,
            pontuacao_total: parseInt(pontuacaoValor),
        })
    };
    const response = await fetch('https://localhost:44378/api/questionarios', options);
    const data = await response.json();
    console.log(data.id)
    localStorage.setItem('questionarioId', data.id)
}
